import { useState, useEffect } from 'react';
import { Brain, Code, Database, Menu, X, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';

const QuizPlatform = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const originalRequestUrl = location.pathname + location.search;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <ScrollArea className="h-screen min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 w-full">
      <header className="w-full px-4 py-8 relative">
        <nav className="flex justify-between items-center mb-16 max-w-[2000px] mx-auto">
          <div className="flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-blue-600" />
            <div className="text-xl font-mono text-gray-800">Quiz Platform</div>
          </div>

          {/* Desktop Navigation with Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Button>Implementation</Button>
            <Button>Technical Stack</Button>
            <Button>Documentation</Button>
            <div className="h-6 w-px bg-gray-200" /> {/* Separator */}
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={originalRequestUrl}
              className="w-auto text-sm px-4 py-2 rounded-full bg-white hover:bg-gray-100 font-semibold transition border border-gray-200">
              Sign In
            </SignInButton>
            <SignUpButton
              mode="modal"
              fallbackRedirectUrl={originalRequestUrl}
              className="w-auto text-sm px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-semibold transition">
              Get Started
            </SignUpButton>
          </div>
        </nav>

        {/* Project Overview */}
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 max-w-[2000px] mx-auto ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
              </div>
              <h1 className="text-4xl font-mono text-gray-800 animate-title">
                Adaptive Quiz Platform
              </h1>
            </div>
            <p className="text-gray-600 font-mono">
              An implementation of a Computerized Adaptive Testing (CAT) system for grades 7-10,
              featuring dynamic question selection and performance analysis.
            </p>
            <SignUpButton
              mode="modal"
              fallbackRedirectUrl={originalRequestUrl}
              className="w-full text-sm px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-semibold transition">
              Get Started
            </SignUpButton>
          </div>
          <div className="relative font-mono">
            <Card className="bg-black text-green-400 p-4 shadow-xl">
              <CardContent className="p-0">
                <pre className="text-sm overflow-x-auto">
                  <code>{`// Example Question Implementation
interface Question {
  id: string;
  difficulty: number;
  topic: string;
  content: string;
  options: string[];
  correctAnswer: number;
}

const calculateNextQuestion = (
  userAbility: number,
  questionPool: Question[]
): Question => {
  return questionPool.reduce((best, current) => {
    const info = calculateInformation(
      current.difficulty, 
      userAbility
    );
    return info > best.info ? 
      { question: current, info } : 
      best;
  }).question;
};`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {/* Technical Features */}
      <section className="w-full px-4 py-16">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="text-2xl font-mono text-gray-800 mb-12">Technical Implementation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8 text-blue-600" />,
                title: 'Adaptive Algorithm',
                description:
                  'Implements Item Response Theory (IRT) with dynamic difficulty adjustment based on student performance.',
              },
              {
                icon: <Code className="w-8 h-8 text-blue-600" />,
                title: 'System Architecture',
                description:
                  'Built with React and TypeScript, featuring state management and responsive design patterns.',
              },
              {
                icon: <Database className="w-8 h-8 text-blue-600" />,
                title: 'Data Management',
                description:
                  'Efficient question pooling and response analysis system with performance metrics calculation.',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}>
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="font-mono">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-mono text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Stats */}
      <section className="bg-slate-900 text-white py-16 w-full">
        <div className="px-4 w-full">
          <div className="grid md:grid-cols-3 gap-8 text-center max-w-[2000px] mx-auto">
            {[
              { number: '20+', label: 'Test Cases' },
              { number: '98%', label: 'Test Coverage' },
              { number: '< 100ms', label: 'Avg Response Time' },
            ].map((stat, index) => (
              <Card key={index} className="bg-transparent border-slate-700">
                <CardContent className="pt-6">
                  <div className="text-2xl text-white font-mono mb-2">{stat.number}</div>
                  <div className="text-slate-400 font-mono text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </ScrollArea>
  );
};

export default QuizPlatform;
