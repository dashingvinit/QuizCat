import { GitBranch } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const originalRequestUrl = location.pathname + location.search;

  return (
    <div>
      <nav className="flex justify-between items-center mb-16 max-w-[2000px] mx-auto">
        <div className="flex items-center gap-4">
          <GitBranch className="w-8 h-8 text-indigo-600 animate-pulse" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-wider">QuizMaster</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Button
            variant="ghost"
            className="text-gray-700 hover:text-indigo-600 transition-colors rounded-xl">
            <a href="https://www.linkedin.com/in/vinit-p-jain-327444178/" target="_blank">
              Vinit Jain
            </a>
          </Button>

          <div className="h-6 w-px bg-gray-200" />
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="rounded-full border-indigo-500 text-indigo-600 hover:bg-blue-50">
              <SignInButton mode="modal" fallbackRedirectUrl={originalRequestUrl}>
                Sign In
              </SignInButton>
            </Button>
            <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
              <SignUpButton mode="modal" fallbackRedirectUrl={originalRequestUrl}>
                Get Started
              </SignUpButton>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
