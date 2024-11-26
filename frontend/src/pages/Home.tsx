import { ReactNode, useEffect, useRef } from 'react';
import { Brain, GitBranch, Zap, Award, Layers, Book, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, useInView, useAnimation } from 'framer-motion';

import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: delay,
            duration: 0.5,
          },
        },
      }}
      className="group">
      <Card className="hover:shadow-2xl cursor-pointer hover:border-blue-500 transition-all duration-300 h-full">
        <CardHeader>
          <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <CardTitle className="font-mono text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 font-mono text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const QuizPlatform = () => {
  const location = useLocation();
  const originalRequestUrl = location.pathname + location.search;

  const features = [
    {
      icon: (
        <Brain className="w-10 h-10 text-blue-600 group-hover:text-blue-800 transition-colors" />
      ),
      title: 'Intelligent Adaptive Testing',
      description:
        'Advanced Item Response Theory (IRT) algorithm dynamically adjusts question difficulty in real-time.',
    },
    {
      icon: (
        <Zap className="w-10 h-10 text-green-600 group-hover:text-green-800 transition-colors" />
      ),
      title: 'High-Performance Architecture',
      description:
        'Optimized React ecosystem with TypeScript, featuring cutting-edge performance metrics.',
    },
    {
      icon: (
        <Award className="w-10 h-10 text-purple-600 group-hover:text-purple-800 transition-colors" />
      ),
      title: 'Comprehensive Analytics',
      description:
        'Detailed performance tracking with machine learning-powered insights and recommendations.',
    },
  ];

  const performanceStats = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500 mr-2" />,
      number: '20+',
      label: 'Comprehensive Test Cases',
    },
    {
      icon: <Layers className="w-8 h-8 text-blue-500 mr-2" />,
      number: '98%',
      label: 'Rigorous Test Coverage',
    },
    {
      icon: <Book className="w-8 h-8 text-purple-500 mr-2" />,
      number: '< 100ms',
      label: 'Lightning-Fast Response',
    },
  ];

  return (
    <ScrollArea className="h-screen bg-gradient-to-br from-slate-50 to-gray-100 overflow-x-hidden">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full px-6 py-10 relative">
        <nav className="flex justify-between items-center mb-16 max-w-[2000px] mx-auto">
          <div className="flex items-center gap-4">
            <GitBranch className="w-8 h-8 text-blue-600 animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-800 tracking-wider">QuizMaster AI</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {['Features', 'Technology', 'Methodology'].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="text-gray-700 hover:text-blue-600 transition-colors">
                {item}
              </Button>
            ))}
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="rounded-full border-blue-500 text-blue-600 hover:bg-blue-50">
                <SignInButton mode="modal" fallbackRedirectUrl={originalRequestUrl}>
                  Sign In
                </SignInButton>
              </Button>
              <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
                <SignUpButton mode="modal" fallbackRedirectUrl={originalRequestUrl}>
                  Get Started
                </SignUpButton>
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-[2000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="secondary">React 18</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">AI-Powered</Badge>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Adaptive Learning Reimagined
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              A next-generation Computerized Adaptive Testing (CAT) platform leveraging advanced
              machine learning to personalize educational assessments.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg">
              <SignUpButton mode="modal" fallbackRedirectUrl={originalRequestUrl}>
                Start Your Learning Journey
              </SignUpButton>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}>
            <Card className="bg-gray-900 text-green-400 p-6 shadow-2xl border-none">
              <CardContent className="p-0">
                <pre className="text-sm overflow-x-auto">
                  <code>{`// Advanced Adaptive Algorithm
const selectOptimalQuestion = (
  userProfile: UserProfile, 
  questionBank: QuestionBank
): Question => {
  return questionBank
    .filter(q => isAppropriate(q, userProfile))
    .reduce((best, current) => 
      calculateInformationGain(current) > 
      calculateInformationGain(best) 
        ? current 
        : best
    );
};`}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.header>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-[2000px] mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Advanced Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-[2000px] mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Performance Metrics</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {performanceStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 120,
                }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="flex items-center justify-center mb-4">
                  {stat.icon}
                  <span className="text-3xl font-bold text-white">{stat.number}</span>
                </div>
                <p className="text-gray-300 uppercase tracking-wide text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ScrollArea>
  );
};

export default QuizPlatform;
