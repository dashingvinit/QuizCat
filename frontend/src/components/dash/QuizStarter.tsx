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
import { motion } from 'framer-motion';

interface QuizStartResponse {
  quizId: string;
}

const QuizStarter = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '📐' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'history', name: 'History', icon: '🏺' },
    { id: 'geography', name: 'Geography', icon: '🌍' },
    { id: 'literature', name: 'Literature', icon: '📖' },
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', color: 'text-green-600 font-semibold' },
    { id: 'medium', name: 'Medium', color: 'text-amber-600 font-semibold' },
    { id: 'hard', name: 'Hard', color: 'text-red-600 font-semibold' },
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
      const quizId = response.data.data;
      navigate(`/quiz?id=${quizId}`);
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Failed to start quiz. Please try again.');
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}>
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold dark:text-indigo-100">
                <Brain className="w-7 h-7 text-indigo-600 dark:text-indigo-100" />
                Quiz Launcher
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                Customize your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  Subject
                </label>
                <Select
                  value={selectedSubject || ''}
                  onValueChange={(value) => setSelectedSubject(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject, index) => (
                      <SelectItem disabled={index != 0} key={subject.id} value={subject.id}>
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
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-500" />
                  Difficulty
                </label>
                <Select
                  value={selectedDifficulty || ''}
                  onValueChange={(value) => setSelectedDifficulty(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty.id} value={difficulty.id}>
                        <span className={`${difficulty.color}`}>{difficulty.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors dark:text-indigo-100 duration-300"
                onClick={startQuiz}
                // disabled={!selectedSubject || !selectedDifficulty}
              >
                Begin Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizStarter;
