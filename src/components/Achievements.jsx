import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const achievementsData = [
  {
    number: "98.08%",
    label: "ML Model Accuracy",
    description: "CIFAR-10 classification",
    icon: "🎯"
  },
  {
    number: "15+",
    label: "Projects Completed",
    description: "Full-stack to AI/ML",
    icon: "🚀"
  },
  {
    number: "5",
    label: "Programming Languages",
    description: "Python, Java, C#, JS, SQL",
    icon: "💻"
  },
  {
    number: "2+",
    label: "Years Experience",
    description: "Software development",
    icon: "⏱️"
  },
  {
    number: "First Class",
    label: "Honours Degree",
    description: "Computer Science BSc",
    icon: "🎓"
  },
  {
    number: "2",
    label: "Certifications",
    description: "Accenture & J.P. Morgan",
    icon: "📜"
  }
];

const AchievementCard = ({ achievement, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-morphism rounded-3xl p-8 text-center card-hover group"
    >
      <motion.div
        className="text-4xl mb-4"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {achievement.icon}
      </motion.div>
      
      <motion.div
        className="text-3xl lg:text-4xl font-bold mb-2 gradient-text"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
      >
        {achievement.number}
      </motion.div>
      
      <h3 className="text-lg font-semibold text-apple-gray-800 dark:text-white mb-2">
        {achievement.label}
      </h3>
      
      <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm">
        {achievement.description}
      </p>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section className="relative section-spacing bg-gradient-to-br from-apple-blue/5 via-purple-500/5 to-apple-blue/5 dark:from-apple-gray-900 dark:via-apple-gray-800 dark:to-apple-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,122,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_70%,rgba(0,122,255,0.05),transparent_50%)]"></div>
      
      <div className="relative container mx-auto max-w-6xl container-padding">
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Achievements</span>
            </h2>
            <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              Key milestones and metrics that showcase my technical growth and impact
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievementsData.map((achievement, index) => (
              <AchievementCard 
                key={index} 
                achievement={achievement} 
                index={index} 
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Achievements;