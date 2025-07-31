import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const skillsData = {
  "Programming": [
    "Python", "Java", "C#", "C", "C++", "HTML/CSS", "JavaScript", "SQL", "MongoDB", "Django", "PyTorch"
  ],
  "Tools": [
    "Git", "GitHub", "Linux", "MacOS", "Shell (Bash/Zsh)", "VS Code", "Unity", "Jupyter", "Pycharm", "IntelliJ", "CollabNotebook"
  ],
  "Certifications": [
    {
      name: "Accenture Developer Virtual Experience",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20UK/3xnZEj9kfpoQKW885_Accenture%20UK_cefozgk9sY5jiTDAE_1681709145127_completion_certificate.pdf"
    },
    {
      name: "J.P. Morgan Software Engineering Virtual Experience",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/R5iK7HMxJGBgaSbvk_J.P.%20Morgan_cefozgk9sY5jiTDAE_1720808127103_completion_certificate.pdf"
    }
  ]
};

const SkillCategory = ({ title, skills, isCertification = false }) => (
  <motion.div 
    className="mb-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-2xl font-bold mb-6 text-apple-gray-800 dark:text-white">{title}</h3>
    <div className="flex flex-wrap gap-4">
      {isCertification ? (
        // Render certification links
        skills.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: index * 0.1 }}
            className="glass-morphism px-6 py-4 text-apple-blue font-medium rounded-2xl card-hover border border-apple-blue/20 hover:border-apple-blue/40 transition-all duration-300"
          >
            {cert.name}
          </motion.a>
        ))
      ) : (
        // Render regular skills
        skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ delay: index * 0.05 }}
            className="glass-morphism px-5 py-3 text-apple-gray-700 dark:text-apple-gray-200 font-medium rounded-2xl card-hover"
          >
            {skill}
          </motion.div>
        ))
      )}
    </div>
  </motion.div>
);

const Skills = () => {
  return (
    <section id="skills" className="relative section-spacing">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-apple-gray-50 to-white dark:from-apple-gray-900 dark:via-apple-gray-800 dark:to-apple-gray-900"></div>
      
      <div className="relative container mx-auto max-w-5xl container-padding">
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>
          
          {Object.entries(skillsData).map(([category, skills]) => (
            <SkillCategory 
              key={category} 
              title={category} 
              skills={skills}
              isCertification={category === "Certifications"}
            />
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills; 