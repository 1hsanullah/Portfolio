import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="relative section-spacing">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-apple-gray-50 to-white dark:from-apple-gray-900 dark:via-apple-gray-800 dark:to-apple-gray-900"></div>
      
      <div className="relative container mx-auto max-w-4xl container-padding">
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">About Me</span>
            </h2>
          </motion.div>
          
          <div className="glass-morphism rounded-3xl p-12 card-hover">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8"
            >
              <p className="text-xl lg:text-2xl text-apple-gray-700 dark:text-apple-gray-200 leading-relaxed text-center">
                I'm a passionate <span className="font-semibold text-apple-blue">Software Engineer</span> with a strong foundation in modern technologies.
                My journey in software development began with a curiosity for how things work,
                which grew into a career focused on building efficient and scalable applications.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="pt-8 border-t border-apple-gray-200 dark:border-apple-gray-700"
              >
                <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed text-center">
                  When I'm not coding, I enjoy learning about emerging technologies, optimizing systems, 
                  and refining my skills through hands-on projects. I believe in continuous learning and 
                  staying at the forefront of technological innovation.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex justify-center pt-8"
              >
                <div className="flex flex-wrap justify-center gap-4">
                  {['Problem Solving', 'Team Collaboration', 'Innovation', 'Continuous Learning'].map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 bg-apple-blue/10 text-apple-blue rounded-full font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About; 