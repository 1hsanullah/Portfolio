import AnimatedSection from './AnimatedSection';
import TimelineItem from './common/TimelineItem';
import { motion } from 'framer-motion';
import qmulLogo from '../assets/logos/qmul.jpeg'; // Add your university logo
import arkLogo from '../assets/logos/arkacton.png'; // Add your sixth form logo

const educationData = [
  {
    logo: arkLogo,
    title: "A-Levels",
    subtitle: "Ark Acton Sixth Form",
    date: "September 2019 - July 2021",
    description: "A-Level Results:",
    items: [
      "Further Mathematics – A",
      "Mathematics – A",
      "Chemistry – B"
    ]
  },
  {
    logo: qmulLogo,
    title: "BSc Computer Science",
    subtitle: "Queen Mary University of London",
    date: "September 2021 - July 2024",
    description: "Grade: First Class Honours",
    items: [
      "Neural Networks and Deep Learning",
      "Web Programming",
      "Object-Oriented Programming",
      "Algorithms & Data Structures",
      "Software Engineering",
      "Database Systems"
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="relative section-spacing">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-apple-gray-50 to-white dark:from-apple-gray-900 dark:via-apple-gray-800 dark:to-apple-gray-900"></div>
      
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
              <span className="gradient-text">Education</span>
            </h2>
            <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              My academic journey in computer science and mathematics
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {educationData.map((education, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <TimelineItem {...education} />
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Education; 