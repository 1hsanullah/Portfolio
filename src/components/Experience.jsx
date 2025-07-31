import AnimatedSection from './AnimatedSection';
import TimelineItem from './common/TimelineItem';
import { motion } from 'framer-motion';
import gdscLogo from '../assets/logos/GDSC.jpeg';
import qmulLogo from '../assets/logos/qmul.jpeg';
import diamondLogo from '../assets/logos/DiamondBuildersLogo.jpeg';
import amwLogo from '../assets/logos/amwelfare.png';

const experienceData = [
  {
    logo: '/src/assets/logos/differentia_consulting.png', // You'll need to add this logo
    title: "Software Engineer",
    subtitle: "Differentia Consulting",
    date: "Present",
    location: "London, UK",
    description: "Full-time software engineering role at innovative consulting firm",
    items: [
      "Developing scalable web applications using modern technologies",
      "Collaborating with cross-functional teams to deliver client solutions",
      "Implementing best practices in software architecture and development",
      "Contributing to code reviews and technical documentation"
    ]
  },
  {
    logo: gdscLogo,
    title: "Assistant",
    subtitle: "Google Developer Student Club (GDSC)",
    date: "September 2023 - July 2024",
    location: "Hybrid – London, UK",
    description: "Part-time role supporting student tech community at QMUL",
    items: [
      "Assisted in organizing and facilitating tech workshops and events for students",
      "Provided technical troubleshooting support for various programming challenges",
      "Gained hands-on experience with PostgreSQL and collaborative software development",
      "Helped create an inclusive learning environment for aspiring developers"
    ]
  },
  {
    logo: qmulLogo,
    title: "Algorithms and Data Structures Laboratory Demonstrator",
    subtitle: "Queen Mary University of London",
    date: "December 2023 - April 2024",
    location: "On-site – London, UK",
    description: "Part-time teaching assistant role in the Computer Science department",
    items: [
      "Provided one-on-one assistance to students with algorithms and data structures concepts",
      "Collaborated with module instructor to align lab activities with lecture materials",
      "Developed and demonstrated problem-solving techniques using Python",
      "Enhanced teaching and communication skills through student support"
    ]
  },
  {
    logo: diamondLogo,
    title: "Project Management Intern",
    subtitle: "Diamond Builders Services LTD",
    date: "September 2020 - August 2021",
    location: "On-site – London, UK",
    description: "Part-time internship in construction project management",
    items: [
      "Assisted in construction project planning, execution, and quality assurance",
      "Helped ensure projects adhered to deadlines and specifications",
      "Gained practical experience in project management and team coordination",
      "Developed skills in documentation and progress tracking"
    ]
  },
  {
    logo: amwLogo,
    title: "Community Event Volunteer & Facilities Assistant",
    subtitle: "AM Welfare Association",
    date: "September 2019 - Present",
    location: "On-site – London, UK",
    description: "Long-term volunteer role in community service",
    items: [
      "Helped plan and execute 5+ community events per year to enhance local engagement",
      "Assisted with logistics and outreach, ensuring smooth event operations",
      "Contributed to building stronger community relationships",
      "Developed leadership and organizational skills through event management"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="relative section-spacing bg-apple-gray-100/50 dark:bg-apple-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-apple-gray-50/30 to-transparent dark:via-apple-gray-900/30"></div>
      
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
              <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              My professional journey in software development and technology
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {experienceData.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <TimelineItem {...experience} />
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Experience; 