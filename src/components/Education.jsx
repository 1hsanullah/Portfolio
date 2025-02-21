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
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
          <div className="space-y-12">
            {educationData.map((education, index) => (
              <TimelineItem key={index} {...education} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Education; 