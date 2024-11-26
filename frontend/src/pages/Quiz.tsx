import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Axios } from '../services';
import { useUser } from '@clerk/clerk-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';

interface Question {
  _id: string;
  index: number;
  totalQuestions: number;
  question: string;
  options: string[];
  isLast: boolean;
}

const QuizPage = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('id');
  const navigate = useNavigate();
  const { user } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (quizId) {
      fetchNextQuestion(quizId);
    }
  }, [quizId]);

  const fetchNextQuestion = async (quizId: string) => {
    setIsLoading(true);
    try {
      const response = await Axios.post<{ data: Question }>(`/question/next`, {
        data: {
          quizId: quizId,
        },
      });
      setCurrentQuestion(response.data.data);
      setSelectedAnswer(null);
    } catch (error) {
      console.error('Error fetching next question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!selectedAnswer || !quizId || !currentQuestion) return;

    setIsLoading(true);
    try {
      await Axios.post('/question/submit', {
        id: user?.id,
        quizId,
        questionId: currentQuestion._id,
        answer: selectedAnswer,
      });

      if (currentQuestion.isLast) {
        navigate(`/quiz/results?quizId=${quizId}`);
      } else {
        fetchNextQuestion(quizId);
      }
      fetchNextQuestion(quizId);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(selectedAnswer === option ? null : option);
  };

  if (isLoading || !currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col md:flex-row h-full min-h-screen">
        {/* Question Section */}
        <div className="flex-1 flex items-center justify-center bg-blue-50/70 dark:bg-gray-800/80 p-6">
          <div className="max-w-2xl text-center space-y-6">
            <div className="flex justify-center items-center space-x-3">
              <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 bg-blue-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
                Question
              </span>
            </div>
            <h2 className="text-4xl font-extralight text-gray-800 dark:text-gray-100 leading-tight tracking-wide">
              {currentQuestion?.question}
            </h2>
          </div>
        </div>

        {/* Options Section */}
        <div className="flex-1 bg-white dark:bg-gray-900 flex items-center justify-center p-8">
          <Card className="w-full max-w-md p-8 shadow-2xl dark:bg-gray-800 dark:border-gray-700 space-y-6">
            {/* CAT Algorithm Note */}
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg p-4 flex items-start space-x-3">
              <Info className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                  Adaptive Learning: Questions are dynamically selected using Computerized Adaptive
                  Testing (CAT) to match your skill level.
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
                    selectedAnswer === option
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-700/50 ring-2 ring-indigo-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:bg-indigo-50/30 dark:hover:bg-gray-700/30'
                  }`}>
                  <span className="font-medium text-gray-800 dark:text-gray-100">{option}</span>
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              {currentQuestion.isLast ? (
                <Button
                  onClick={submitAnswer}
                  disabled={!selectedAnswer}
                  className="w-full py-6 text-base bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-xl transition-transform transform hover:scale-[1.02]">
                  Finish Quiz
                </Button>
              ) : (
                <Button
                  onClick={submitAnswer}
                  disabled={!selectedAnswer}
                  className="w-full py-6 text-base bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl transition-transform transform hover:scale-[1.02]">
                  Submit Answer
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
