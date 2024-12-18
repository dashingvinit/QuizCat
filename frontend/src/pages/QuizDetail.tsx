import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, XCircle, TrendingUp, Tag } from 'lucide-react';
import { Axios } from '@/services';
import { LoadingSpinner, NotFound, QuizHeader, NavigationTabs } from '@/components/QuizDetail';

// Keeping existing interfaces
interface QuestionDetail {
  isLast: boolean;
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
  tags: string[];
  weight: number;
}

interface QuestionAnswered {
  questionId: QuestionDetail;
  correct: boolean;
  difficulty: string;
  userAnswer: string;
}

interface QuizHistoryItem {
  _id: string;
  quizId: string;
  questionsAnswered: QuestionAnswered[];
  createdAt: string;
}

function HistoryDetail() {
  const { id } = useParams();
  const [quizDetail, setQuizDetail] = useState<QuizHistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'summary' | 'questions'>('summary');

  useEffect(() => {
    const fetchQuizDetail = async () => {
      try {
        const res = await Axios.get(`/question/history/detail/${id}`);
        setQuizDetail(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchQuizDetail();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!quizDetail) {
    return <NotFound />;
  }

  const totalQuestions = quizDetail.questionsAnswered.length;
  const correctQuestions = quizDetail.questionsAnswered.filter((q) => q.correct).length;
  const performancePercentage = ((correctQuestions / totalQuestions) * 100).toFixed(2);

  return (
    <div className="h-full p-2 lg:p-6">
      <div className="mx-auto">
        <QuizHeader
          title="Quiz Performance Report"
          subtitle="Detailed breakdown of your recent quiz"
          performancePercentage={parseFloat(performancePercentage)}
          correctQuestions={correctQuestions}
          totalQuestions={totalQuestions}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-700">Performance</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600">{performancePercentage}%</div>
            <div className="text-sm text-gray-500">
              {correctQuestions} out of {totalQuestions} correct
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-700">Correct Answers</h3>
            </div>
            <div className="text-3xl font-bold text-green-600">{correctQuestions}</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Tag className="h-6 w-6 text-purple-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-700">Question Types</h3>
            </div>
            <div className="space-y-2">
              {Array.from(new Set(quizDetail.questionsAnswered.flatMap((q) => q.questionId.tags)))
                .slice(0, 3)
                .map((tag) => (
                  <div key={tag} className="text-sm text-gray-600">
                    {tag}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <NavigationTabs activeView={activeView} setActiveView={setActiveView} />

        {/* Content Sections */}
        {activeView === 'summary' ? (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quiz Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Difficulty Breakdown</h3>
                {['Easy', 'Medium', 'Hard'].map((diff) => {
                  const diffQuestions = quizDetail.questionsAnswered.filter(
                    (q) => q.difficulty.toLowerCase() === diff.toLowerCase()
                  );
                  const correctDiffQuestions = diffQuestions.filter((q) => q.correct);
                  return (
                    <div key={diff} className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{diff}</span>
                        <span>
                          {correctDiffQuestions.length}/{diffQuestions.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${
                              (correctDiffQuestions.length / diffQuestions.length) * 100 || 0
                            }%`,
                          }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Tags Performance</h3>
                {Array.from(new Set(quizDetail.questionsAnswered.flatMap((q) => q.questionId.tags)))
                  .slice(0, 5)
                  .map((tag) => {
                    const tagQuestions = quizDetail.questionsAnswered.filter((q) =>
                      q.questionId.tags.includes(tag)
                    );
                    const correctTagQuestions = tagQuestions.filter((q) => q.correct);
                    return (
                      <div key={tag} className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{tag}</span>
                          <span>
                            {correctTagQuestions.length}/{tagQuestions.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{
                              width: `${
                                (correctTagQuestions.length / tagQuestions.length) * 100 || 0
                              }%`,
                            }}></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {quizDetail.questionsAnswered.map((q, index) => (
              <div
                key={`${q.questionId._id}-${index}`}
                className={`bg-white rounded-xl shadow-md p-6 
       ${q.correct ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                <div className="flex items-start space-x-4">
                  {q.correct ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  )}

                  <div className="flex-grow">
                    <h3 className="text-base font-semibold text-gray-800 mb-2">
                      Question {index + 1}
                    </h3>
                    <p className="text-gray-700 mb-3">{q.questionId.question}</p>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-gray-600">Correct Answer:</span>{' '}
                        <span className="text-green-600">{q.questionId.correctAnswer}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium uppercase
                ${q.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {q.difficulty}
                        </span>

                        <span className="text-xs text-gray-500">
                          Tags: {q.questionId.tags.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryDetail;
