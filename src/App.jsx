import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import { motion } from 'framer-motion'
import githubIcon from './assets/socials/github.png';
import linkedinIcon from './assets/socials/linkedin.png';
import gmailIcon from './assets/socials/gmail.png';
import phoneIcon from './assets/socials/phone.png';

function App() {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: githubIcon,
      url: "https://github.com/1hsanullah",
      alt: "GitHub"
    },
    {
      icon: linkedinIcon,
      url: "https://www.linkedin.com/in/ihsanullah-sadiq-624a5b201/",
      alt: "LinkedIn"
    },
    {
      icon: gmailIcon,
      url: "mailto:isadiq715@gmail.com",
      alt: "Email"
    },
    {
      icon: phoneIcon,
      url: "tel:+447550504450",
      alt: "Phone"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-20 px-4">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-20">
          {/* Text content - adjusted width */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Ihsanullah Sadiq</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              A Graduate developer that enjoys building amazing digital experiences.
            </p>
            <button 
              onClick={scrollToContact}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get in touch
            </button>
          </div>
          
          {/* Profile image and socials - adjusted width and alignment */}
          <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center md:items-end md:pr-[120px]">
            <motion.div 
              className="w-64 h-64 bg-gray-300 rounded-full overflow-hidden mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <motion.img
                src="src/assets/profile_img.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.3 }}
                transition={{ type: "tween", duration: 0.3 }}
              />
            </motion.div>

            {/* Social Icons */}
            <div className="flex justify-center space-x-4 md:pr-[8px]">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white dark:bg-blue-400 p-1 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img 
                    src={social.icon} 
                    alt={social.alt}
                    className="w-10 h-10"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <About />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
}

export default App
