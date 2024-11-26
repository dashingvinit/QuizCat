import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Axios } from '../services';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2, TrophyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizStartResponse {
  quizId: string;
}

interface ResultResponse {
  accuracy: number;
  correctAnswers: number;
  totalQuestions: number;
  suggestions: string;
}

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const quizId = searchParams.get('quizId');
  const { user } = useUser();

  const [results, setResults] = useState<ResultResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch results when the component mounts
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await Axios.get<{ data: ResultResponse }>(
          `/question/report/${user?.id}/${quizId}`
        );
        setResults(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to fetch results. Please try again.');
        setLoading(false);
      }
    };

    if (quizId) {
      fetchResults();
    }
  }, [quizId, user?.id]);

  const startQuiz = async () => {
    try {
      const response = await Axios.post<{ data: QuizStartResponse }>('/question/start', {
        id: user?.id,
      });
      const { quizId } = response.data.data;
      navigate(`/quiz?id=${quizId}`);
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Failed to start quiz. Please try again.');
    }
  };

  // Determine performance message and color
  const getPerformanceMessage = (accuracy: number) => {
    if (accuracy >= 90)
      return { message: 'Excellent Performance!', color: 'text-green-600', icon: TrophyIcon };
    if (accuracy >= 75)
      return { message: 'Great Job!', color: 'text-blue-600', icon: CheckCircle2 };
    if (accuracy >= 50)
      return { message: 'Good Effort', color: 'text-yellow-600', icon: AlertCircle };
    return { message: 'Keep Practicing', color: 'text-red-600', icon: AlertCircle };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-destructive">{error}</p>
            <div className="mt-4 flex justify-center">
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!results) return null;

  const performanceData = getPerformanceMessage(results.accuracy);
  const PerformanceIcon = performanceData.icon;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="bg-primary text-secondary text-center py-6">
          <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
          <p className="text-sm opacity-80">Quiz ID: {quizId}</p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <PerformanceIcon className={`w-16 h-16 ${performanceData.color}`} />
            <h2 className={`text-2xl font-semibold ${performanceData.color}`}>
              {performanceData.message}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700">Correct</h3>
              <p className="text-2xl font-bold text-green-600">{results.correctAnswers}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700">Total Questions</h3>
              <p className="text-2xl font-bold text-blue-600">{results.totalQuestions}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700">Accuracy</h3>
              <p className="text-2xl font-bold text-primary">{results.accuracy.toFixed(2)}%</p>
            </div>
          </div>

          <div className="mt-6">
            <Progress
              value={results.accuracy}
              className="w-full h-4"
              // indicatorColor={
              //   results.accuracy >= 90
              //     ? 'bg-green-500'
              //     : results.accuracy >= 75
              //     ? 'bg-blue-500'
              //     : results.accuracy >= 50
              //     ? 'bg-yellow-500'
              //     : 'bg-red-500'
              // }
            />
          </div>

          {results.suggestions && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-blue-700 italic">
                <strong>Suggestion:</strong> {results.suggestions}
              </p>
            </div>
          )}

          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="outline">Review Answers</Button>
            <Button onClick={startQuiz}>Take Another Quiz</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;
