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

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await Axios.get<{ data: ResultResponse }>(`/question/report/${quizId}`);
        setResults(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to fetch results. Please try again.');
        setLoading(false);
      }
    };

    if (quizId) fetchResults();
  }, [quizId, user?.id]);

  const startQuiz = async () => {
    try {
      const response = await Axios.post<{ data: QuizStartResponse }>('/question/start', {
        id: user?.id,
      });
      const quizId = response.data.data;
      navigate(`/quiz?id=${quizId}`);
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Failed to start quiz. Please try again.');
    }
  };

  const reviewQuiz = () => navigate(`/history/${quizId}`);

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
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader className="bg-primary text-secondary text-center py-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold">Quiz Results</CardTitle>
          <p className="text-sm opacity-80">Quiz ID: {quizId}</p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <PerformanceIcon className={`w-16 h-16 ${performanceData.color}`} />
            <h2 className={`text-xl sm:text-2xl font-semibold ${performanceData.color}`}>
              {performanceData.message}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Correct</h3>
              <p className="text-xl font-bold text-green-600">{results.correctAnswers}</p>
            </div>
            <div className="text-center bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Total Questions</h3>
              <p className="text-xl font-bold text-blue-600">{results.totalQuestions}</p>
            </div>
            <div className="text-center bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Accuracy</h3>
              <p className="text-xl font-bold text-primary">{results.accuracy.toFixed(2)}%</p>
            </div>
          </div>

          <Progress value={results.accuracy} className="w-full h-4 mt-4" />

          {results.suggestions && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded-lg">
              <p className="text-yellow-700 italic">
                <strong>Suggestion:</strong> {results.suggestions}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4">
            <Button onClick={reviewQuiz} variant="outline" className="w-full sm:w-auto">
              Review Answers
            </Button>
            <Button onClick={startQuiz} className="w-full sm:w-auto">
              Take Another Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;
