import { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Header, Hero, Features, Performance } from '@/components/landing';

const QuizPlatform = () => {
  const startServer = async () => {
    await axios.get('https://quiz-backend-zel6.onrender.com');
  };

  useEffect(() => {
    startServer();
  }, []);

  return (
    <ScrollArea className="h-screen bg-gradient-to-br from-slate-50 to-gray-100 overflow-x-hidden">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full px-6 py-10 relative">
        <Header />
        <Hero />
      </motion.header>
      <Features />
      <Performance />
    </ScrollArea>
  );
};

export default QuizPlatform;
