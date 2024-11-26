import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Axios } from '@/services';

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

function HistoryDetail() {
  const { id } = useParams();
  const [quizDetail, setQuizDetail] = useState<QuizHistoryItem | null>(null);
  const [loading, setLoading] = useState(true);

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500">Loading quiz details...</div>
      </div>
    );
  }

  if (!quizDetail) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No quiz details found.
      </div>
    );
  }

  const totalQuestions = quizDetail.questionsAnswered.length;
  const correctQuestions = quizDetail.questionsAnswered.filter((q) => q.correct).length;
  const performancePercentage = ((correctQuestions / totalQuestions) * 100).toFixed(2);

  return (
    <div className=" px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Quiz Performance</h1>
          <div className="mt-2 text-sm text-gray-600">
            {performancePercentage}% ({correctQuestions}/{totalQuestions} correct)
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {quizDetail.questionsAnswered.map((q, index) => (
            <div
              key={q._id}
              className={`p-6 transition-colors duration-200 
                ${q.correct ? 'bg-green-50 hover:bg-green-100' : 'bg-red-50 hover:bg-red-100'}`}>
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
                          ${
                            q.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
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
      </div>
    </div>
  );
}

export default HistoryDetail;
