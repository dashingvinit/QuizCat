import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '@/services';
import { useUser } from '@clerk/clerk-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Shared interface for quiz history
interface QuizHistoryItem {
  _id: string;
  quizId: string;
  questionsAnswered: Array<{
    questionId: string;
    correct: boolean;
    difficulty: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
  }>;
  createdAt: string;
}

// History Component
function History() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState<QuizHistoryItem[]>([]);

  const getHistory = async () => {
    try {
      const res = await Axios.get(`/question/history/${user?.id}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, [user?.id]);

  const calculatePerformance = (quiz: QuizHistoryItem) => {
    const totalQuestions = quiz.questionsAnswered.length;
    const correctQuestions = quiz.questionsAnswered.filter((q) => q.correct).length;
    const performance =
      totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      correctQuestions,
      performance,
    };
  };

  const getDifficultyBreakdown = (quiz: QuizHistoryItem) => {
    const breakdown = quiz.questionsAnswered.reduce((acc, question) => {
      if (!acc[question.difficulty]) {
        acc[question.difficulty] = { total: 0, correct: 0 };
      }
      acc[question.difficulty].total++;
      if (question.correct) {
        acc[question.difficulty].correct++;
      }
      return acc;
    }, {} as Record<string, { total: number; correct: number }>);

    return breakdown;
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Quiz History</h1>
      {data.length === 0 ? (
        <p className="text-gray-500">No quiz history found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((quiz) => {
            const { totalQuestions, correctQuestions, performance } = calculatePerformance(quiz);
            const difficultyBreakdown = getDifficultyBreakdown(quiz);

            return (
              <Card
                key={quiz._id}
                className="w-full hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate(`/history/${quiz._id}`)}>
                <CardHeader>
                  <CardTitle>
                    Quiz Attempt on {new Date(quiz.createdAt).toLocaleDateString()}
                  </CardTitle>
                  <CardDescription>
                    Performance: {performance}% ({correctQuestions}/{totalQuestions} correct)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      {Object.entries(difficultyBreakdown).map(([difficulty, stats]) => (
                        <Badge
                          key={difficulty}
                          variant={stats.correct === stats.total ? 'default' : 'destructive'}
                          className="capitalize">
                          {difficulty}: {stats.correct}/{stats.total}
                        </Badge>
                      ))}
                    </div>
                    {quiz.questionsAnswered.length === 0 && (
                      <p className="text-gray-500">No questions answered in this quiz.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
