import BreadcrumbDemo from '@/components/layout/BreadcrumbDemo';
import ModeToggle from './ModeToggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Topbar = () => {
  return (
    <div className="sticky top-0 flex items-center justify-between h-12 border-b border-gray-500 bg-background shadow-md z-50">
      <div className="flex items-center gap-2 px-2">
        <SidebarTrigger />
        <BreadcrumbDemo />
      </div>

      <div className="flex items-center gap-2 px-2">
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex items-center justify-center w-8 h-8"
          onClick={() => window.open('https://x.com/Brogrammer_ai', '_blank')}>
          <svg
            className="h-4 w-4 fill-current"
            viewBox="0 0 1200 1227"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
          </svg>
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center justify-center w-8 h-8">
                <Gem className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Prime</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ModeToggle />
      </div>
    </div>
  );
};

export default Topbar;
