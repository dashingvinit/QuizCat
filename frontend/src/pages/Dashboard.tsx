import { Main, QuizStarter, History } from '@/components/dash';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard = () => {
  return (
    <ScrollArea>
      <div className="p-2 md:p-4">
        <div className="md:flex sm:h-screen sm:-mt-14 w-full items-center gap-2">
          <div className="sm:w-1/2">
            <Main />
          </div>
          <div className="mt-5 sm:mt-0 sm:w-1/2">
            <QuizStarter />
          </div>
        </div>
        {/* <Progress /> */}
        <History />
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
