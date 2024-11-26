import { Main, QuizStarter, Progress, History } from '@/components/dash';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard = () => {
  return (
    <ScrollArea>
      <div className="p-1 md:p-4">
        <Main />
        <QuizStarter />
        <Progress />
        <History />
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
