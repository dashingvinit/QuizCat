import QuestionCard from './QuestionCard';

interface Question {
  questionId: {
    _id: string;
    question: string;
    difficulty: string;
    tags: string[];
  };
  correct: boolean;
}

interface QuestionsSectionProps {
  questions: Question[];
}

function QuestionsSection({ questions }: QuestionsSectionProps): JSX.Element {
  return (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <QuestionCard key={q.questionId._id} question={q} index={index} />
      ))}
    </div>
  );
}

export default QuestionsSection;
