import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const features = [
    {
      icon: (
        <Brain className="w-10 h-10 text-indigo-600 group-hover:text-indigo-800 transition-colors" />
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

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section className="py-16 px-6">
      <div className="max-w-[2000px] mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Advanced Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.2,
                    duration: 0.5,
                  },
                },
              }}
              className="group">
              <Card className="hover:shadow-2xl cursor-pointer hover:border-indigo-500 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="mb-4 group-hover:scale-105 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-mono text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-mono text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
