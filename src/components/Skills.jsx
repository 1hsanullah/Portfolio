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
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {isCertification ? (
        // Render certification links
        skills.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            {cert.name}
          </motion.a>
        ))
      ) : (
        // Render regular skills
        skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
          >
            {skill}
          </motion.div>
        ))
      )}
    </div>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
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