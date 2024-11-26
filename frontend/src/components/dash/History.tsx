import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '@/services';
import { useUser } from '@clerk/clerk-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, BarChart2, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

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

// Utility functions
const calculatePerformance = (quiz: QuizHistoryItem) => {
  const totalQuestions = quiz.questionsAnswered.length;
  const correctQuestions = quiz.questionsAnswered.filter((q) => q.correct).length;
  return {
    totalQuestions,
    correctQuestions,
    performance: totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0,
  };
};

const getDifficultyBreakdown = (quiz: QuizHistoryItem) => {
  return quiz.questionsAnswered.reduce((acc, question) => {
    if (!acc[question.difficulty]) {
      acc[question.difficulty] = { total: 0, correct: 0 };
    }
    acc[question.difficulty].total++;
    if (question.correct) {
      acc[question.difficulty].correct++;
    }
    return acc;
  }, {} as Record<string, { total: number; correct: number }>);
};

const getPerformanceIcon = (performance: number) => {
  if (performance >= 90) return <Award className="text-green-600" />;
  if (performance >= 75) return <TrendingUp className="text-blue-600" />;
  if (performance >= 50) return <BarChart2 className="text-yellow-600" />;
  return <BookOpen className="text-red-600" />;
};

// Sub-components
const DifficultyBadges = ({
  breakdown,
}: {
  breakdown: Record<string, { total: number; correct: number }>;
}) => (
  <div className="flex flex-wrap gap-2">
    {Object.entries(breakdown).map(([difficulty, stats]) => (
      <Badge
        key={difficulty}
        variant={stats.correct === stats.total ? 'default' : 'destructive'}
        className="capitalize">
        {difficulty}: {stats.correct}/{stats.total}
      </Badge>
    ))}
  </div>
);

const HistoryCard = ({
  quiz,
  navigate,
}: {
  quiz: QuizHistoryItem;
  navigate: (path: string) => void;
}) => {
  const { totalQuestions, correctQuestions, performance } = calculatePerformance(quiz);
  const difficultyBreakdown = getDifficultyBreakdown(quiz);

  return (
    <Card
      key={quiz._id}
      className="w-full hover:shadow-lg transition-all bg-muted border-2 border-transparent hover:border-primary/50"
      onClick={() => navigate(`/history/${quiz._id}`)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="dark:text-white">Quiz Attempt</CardTitle>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(quiz.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          {getPerformanceIcon(performance)}
          <div>
            <p className="text-xl font-semibold dark:text-white">{performance}% Performance</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {correctQuestions}/{totalQuestions} correct
            </p>
          </div>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-2">
          <p className="text-sm font-medium dark:text-white">Difficulty Breakdown</p>
          <DifficultyBadges breakdown={difficultyBreakdown} />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main component
function History() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState<QuizHistoryItem[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'performance'>('date');

  useEffect(() => {
    if (!user?.id) return;
    const getHistory = async () => {
      try {
        const res = await Axios.get(`/question/history/${user.id}`);
        setData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getHistory();
  }, [user?.id]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return calculatePerformance(b).performance - calculatePerformance(a).performance;
    });
  }, [data, sortBy]);

  return (
    <div className="sm:p-4 space-y-6 mx-auto">
      <div className="md:flex justify-between items-center">
        <h1 className="md:text-3xl font-bold dark:text-white mb-4 sm:mb-0">Quiz History</h1>
        <div className="flex space-x-2">
          <Button
            variant={sortBy === 'date' ? 'default' : 'outline'}
            onClick={() => setSortBy('date')}>
            Sort by Date
          </Button>
          <Button
            variant={sortBy === 'performance' ? 'default' : 'outline'}
            onClick={() => setSortBy('performance')}>
            Sort by Performance
          </Button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-xl">
            No quiz history found. Start exploring quizzes!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedData.map((quiz) => (
            <HistoryCard key={quiz._id} quiz={quiz} navigate={navigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
