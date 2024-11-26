import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy } from 'lucide-react';

interface FeatureProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  color: string;
}

const Feature: React.FC<FeatureProps> = ({ Icon, text, color }) => (
  <div className="flex items-center gap-2">
    <Icon className={`w-6 h-6 ${color}`} aria-hidden="true" />
    <span className="text-gray-600 text-base">{text}</span>
  </div>
);

const QuizLandingPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8">
        <h1 className="text-5xl font-bold  leading-tight">
          Ready to <br />
          <span className="text-indigo-600">Challenge Yourself?</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-200 leading-relaxed">
          Embark on a personalized learning adventure. Choose your subject, set your difficulty, and
          unlock your potential with every quiz you take.
        </p>

        <div className="flex flex-wrap gap-6 ">
          <Feature Icon={BookOpen} text="Multiple Subjects" color="text-green-500" />
          <Feature Icon={Trophy} text="Track Progress" color="text-yellow-500" />
        </div>
      </motion.div>
    </div>
  );
};

export default QuizLandingPage;
