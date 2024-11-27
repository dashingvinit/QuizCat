import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SignUpButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function Hero() {
  const location = useLocation();
  const originalRequestUrl = location.pathname + location.search;
  return (
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
          A next-generation Computerized Adaptive Testing (CAT) platform leveraging advanced machine
          learning to personalize educational assessments.
        </p>
        <Button
          size="lg"
          className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 text-lg">
          <SignUpButton mode="modal" fallbackRedirectUrl={originalRequestUrl}>
            Start Your Learning Journey
          </SignUpButton>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}>
        <Card className="bg-gray-900 text-green-400 p-6 shadow-2xl border-none overflow-hidden hidden md:block">
          <CardContent className="p-0">
            <pre className="text-sm overflow-x-hidden">
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
  );
}

export default Hero;
