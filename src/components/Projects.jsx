import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Deep Learning Model for CIFAR-10 Image Classification",
    description: "Developed a CNN to classify CIFAR-10 dataset images, achieving 98.08% validation accuracy using custom loss functions and Adam optimization.",
    image: "https://via.placeholder.com/400x300?text=CIFAR-10+Classification",
    github: "https://github.com/yourusername/cifar10-classification",
    technologies: ["Python", "PyTorch", "Matplotlib", "scikit-learn"]
  },
  {
    title: "Eye-Controlled Peripherals with Speech Detection",
    description: "Built a desktop application enabling eye-controlled cursor movement and speech-to-text input for improved accessibility.",
    image: "https://via.placeholder.com/400x300?text=Eye+Control+System",
    github: "https://github.com/yourusername/eye-control-system",
    technologies: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "SpeechRecognition"]
  },
  {
    title: "Online Newspaper Web Application",
    description: "Developed a cutting-edge online newspaper application featuring personalized news feeds, dynamic content updates, and an interactive comment system.",
    image: "https://via.placeholder.com/400x300?text=Online+Newspaper",
    github: "https://github.com/yourusername/online-newspaper",
    technologies: ["Django", "Python", "Vue", "Vite", "Pinia", "TypeScript"]
  },
  {
    title: "EC-Ticket-App",
    description: "Built an event ticketing application with a user-friendly interface for seamless ticket purchasing and real-time event updates.",
    image: "https://via.placeholder.com/400x300?text=Event+Ticketing",
    github: "https://github.com/yourusername/ec-ticket-app",
    technologies: ["Flask", "SQLite", "HTML", "CSS", "JavaScript"]
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative group">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projects; 