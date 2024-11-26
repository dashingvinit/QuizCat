import { History, Progress } from '@/components/dash';
import { ScrollArea } from '@/components/ui/scroll-area';

function HistoryPage() {
  return (
    <ScrollArea>
      <History />
      <Progress />
    </ScrollArea>
  );
}

export default HistoryPage;
