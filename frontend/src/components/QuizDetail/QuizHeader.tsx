interface QuizHeaderProps {
  title: string;
  subtitle: string;
  performancePercentage: number;
  correctQuestions: number;
  totalQuestions: number;
}

function QuizHeader({
  title,
  subtitle,
  performancePercentage,
  correctQuestions,
  totalQuestions,
}: QuizHeaderProps): JSX.Element {
  const getPerformanceCategory = (percentage: number) => {
    if (percentage >= 90) return { label: 'Excellent', color: 'text-green-600' };
    if (percentage >= 75) return { label: 'Great', color: 'text-blue-600' };
    if (percentage >= 50) return { label: 'Good', color: 'text-yellow-600' };
    return { label: 'Needs Improvement', color: 'text-red-600' };
  };

  const performance = getPerformanceCategory(performancePercentage);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div>
          <div className={`text-2xl font-bold ${performance.color}`}>{performance.label}!</div>
          <p>
            {correctQuestions} / {totalQuestions} correct
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuizHeader;
