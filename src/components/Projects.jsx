import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import scg from '../assets/icons/scg.jpg';
import echo from '../assets/icons/echo.jpg';
import cifar from '../assets/icons/cifar10.jpg';
import ec from '../assets/icons/ec.jpg';

const projects = [
  {
    title: "Deep Learning Model for CIFAR-10 Image Classification",
    description: "Developed a CNN to classify CIFAR-10 dataset images, achieving 98.08% validation accuracy using custom loss functions and Adam optimization.",
    image: cifar,
    github: "https://github.com/yourusername/cifar10-classification",
    demo: "https://colab.research.google.com/drive/your-notebook-id", // Colab notebook demo
    technologies: ["Python", "PyTorch", "Matplotlib", "scikit-learn"],
    metrics: "98.08% accuracy"
  },
  {
    title: "Eye-Controlled Peripherals with Speech Detection",
    description: "Built a desktop application enabling eye-controlled cursor movement and speech-to-text input for improved accessibility.",
    image: echo,
    github: "https://github.com/1hsanullah/EchoVision",
    demo: "https://youtu.be/demo-video", // Video demo for desktop app
    technologies: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "SpeechRecognition"],
    metrics: "Real-time processing"
  },
  {
    title: "Last Hope - 3D Survival Game",
    description: "Created a Unity-based survival game, enhancing gameplay with advanced mechanics and dynamic environments using C#.",
    image: scg,
    github: "https://github.com/SapezB/Survival-Craft-Game",
    demo: "https://play-unity-game-link.com", // WebGL build or video
    technologies: ["C#", "Unity", "Visual Studio", "Blender"],
    metrics: "15+ game mechanics"
  },
  {
    title: "EC-Ticket-App",
    description: "Built an event ticketing application with a user-friendly interface for seamless ticket purchasing and real-time event updates.",
    image: ec,
    github: "https://github.com/1hsanullah/EC-Ticket-App",
    demo: "https://ec-ticket-app-demo.herokuapp.com", // Live web app
    technologies: ["Flask", "SQLite", "HTML", "CSS", "JavaScript"],
    metrics: "Full CRUD operations"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="relative section-spacing bg-apple-gray-100/50 dark:bg-apple-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-apple-gray-50/30 to-transparent dark:via-apple-gray-900/30"></div>
      
      <div className="relative container mx-auto container-padding">
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              A showcase of my technical skills and creative problem-solving
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-morphism rounded-3xl overflow-hidden card-hover group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300" />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-apple-gray-800 dark:text-white group-hover:text-apple-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-4 py-2 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-medium hover:bg-apple-blue/20 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Metrics */}
                  {project.metrics && (
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                        ✨ {project.metrics}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex gap-3 justify-end">
                    {project.demo && (
                      <motion.a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 glass-morphism border border-apple-blue/20 hover:border-apple-blue/40 text-apple-blue px-6 py-3 rounded-2xl font-medium shadow-apple hover:shadow-apple-hover transition-all duration-300 group"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M6 6h12M6 18h12" />
                        </svg>
                        Live Demo
                      </motion.a>
                    )}
                    
                    <motion.a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-apple-blue hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium shadow-apple hover:shadow-apple-hover transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </motion.a>
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