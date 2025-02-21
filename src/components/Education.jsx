import AnimatedSection from './AnimatedSection';
import TimelineItem from './common/TimelineItem';
import qmulLogo from '../assets/logos/qmul.jpeg'; // Add your university logo
import arkLogo from '../assets/logos/arkacton.png'; // Add your sixth form logo

const educationData = [
  {
    logo: qmulLogo,
    title: "BSc Computer Science",
    subtitle: "Queen Mary University of London",
    date: "September 2021 - July 2024",
    description: "First Class Honours",
    items: [
      "Neural Networks and Deep Learning",
      "Web Programming",
      "Artificial Intelligence",
      "Algorithms & Data Structures",
      "Software Engineering",
      "Database Systems"
    ]
  },
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
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {educationData.map((education, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <TimelineItem 
                  {...education}
                  className="!mb-0"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Education; 