import QuestionCard from './QuestionCard';

export interface Question {
  questionId: {
    _id: string;
    question: string;
    difficulty: string;
    tags: string[];
  };
  correct: boolean;
}

export interface QuizDetail {
  questionsAnswered: Question[];
  tagsPerformance: Record<string, number>;
  difficultyPerformance: Record<string, number>;
}

function QuestionsSection({ quizDetail }: QuizDetail) {
  return (
    <div className="space-y-4">
      {quizDetail.questionsAnswered.map((q, index) => (
        <QuestionCard key={`${q.questionId._id}-${index}`} question={q} index={index} />
      ))}
    </div>
  );
}

export default QuestionsSection;
