import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const skillsData = {
  "Programming Languages": [
    "Python", "JavaScript", "TypeScript", "C++", "Java"
  ],
  "Frontend": [
    "React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"
  ],
  "Backend": [
    "Node.js", "Express", "MongoDB", "PostgreSQL"
  ],
  "Tools & Others": [
    "Git", "Docker", "AWS", "Linux", "Agile"
  ]
};

const SkillCategory = ({ title, skills }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
        >
          {skill}
        </motion.div>
      ))}
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
            <SkillCategory key={category} title={category} skills={skills} />
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills; 