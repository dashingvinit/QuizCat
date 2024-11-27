import { CheckCircle2, TrendingUp, Tag } from 'lucide-react';

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

function PerformanceOverview({
  performancePercentage,
  correctQuestions,
  totalQuestions,
  quizDetail,
}: ): JSX.Element {
  return (
   
  );
}

export default PerformanceOverview;
