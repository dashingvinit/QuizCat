import { Main, QuizStarter, Progress, History } from '@/components/dash';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard = () => {
  return (
    <ScrollArea>
      <div className="p-1 md:p-4">
        <div className="flex h-screen -mt-14 w-full items-center gap-2">
          <div className="w-1/2">
            <Main />
          </div>
          <div className="w-1/2">
            <QuizStarter />
          </div>
        </div>
        <Progress />
        <History />
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
