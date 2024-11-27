import { Layers, Book, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function Performance() {
  const performanceStats = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500 mr-2" />,
      number: '20+',
      label: 'Comprehensive Test Cases',
    },
    {
      icon: <Layers className="w-8 h-8 text-indigo-500 mr-2" />,
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
  );
}

export default Performance;
