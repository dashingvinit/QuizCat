import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../services';
import { useUser } from '@clerk/clerk-react';

interface QuizStartResponse {
  quizId: string;
}

const QuizStarter = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: 'π' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'history', name: 'History', icon: '📚' },
    { id: 'geography', name: 'Geography', icon: '🌍' },
    { id: 'literature', name: 'Literature', icon: '📖' },
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', color: 'text-green-500' },
    { id: 'medium', name: 'Medium', color: 'text-yellow-500' },
    { id: 'hard', name: 'Hard', color: 'text-red-500' },
  ];

  const startQuiz = async () => {
    if (!selectedSubject || !selectedDifficulty) {
      alert('Please select a subject and difficulty');
      return;
    }

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

  return (
    <Card className="w-full max-w-md mx-auto my-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6" />
          Start New Quiz
        </CardTitle>
        <CardDescription>Choose your subject and difficulty level to begin</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Select Subject
          </label>
          <Select
            value={selectedSubject || ''}
            onValueChange={(value) => setSelectedSubject(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject, index) => (
                <SelectItem disabled={index !== 0} key={subject.id} value={subject.id}>
                  <span className="flex items-center gap-2">
                    <span>{subject.icon}</span>
                    {subject.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Select Difficulty
          </label>
          <Select
            value={selectedDifficulty || ''}
            onValueChange={(value) => setSelectedDifficulty(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty.id} value={difficulty.id}>
                  <span className={`font-medium ${difficulty.color}`}>{difficulty.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full"
          onClick={startQuiz}
          disabled={!selectedSubject || !selectedDifficulty}>
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizStarter;
