import AnimatedSection from './AnimatedSection';
import TimelineItem from './common/TimelineItem';
import gdscLogo from '../assets/logos/GDSC.jpeg';
import qmulLogo from '../assets/logos/qmul.jpeg';
import diamondLogo from '../assets/logos/DiamondBuildersLogo.jpeg';
import amwLogo from '../assets/logos/amwelfare.png';

const experienceData = [
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
    <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
          <div className="space-y-12">
            {experienceData.map((experience, index) => (
              <TimelineItem 
                key={index} 
                {...experience}
                className="hover: transition-shadow duration-300"
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Experience; 