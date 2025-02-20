import AnimatedSection from './AnimatedSection';
import TimelineItem from './common/TimelineItem';
import qmulLogo from '../assets/logos/qmul.jpeg'; // Add your university logo

const educationData = {
  university: {
    logo: qmulLogo,
    title: "BSc Computer Science",
    subtitle: "Queen Mary University of London",
    date: "2020 - 2023",
    description: "First Class Honours",
    items: [
      "Neural Networks and Deep Learning",
      "Web Programming",
      "Artificial Intelligence",
      "Software Engineering",
      "Database Systems"
    ]
  }
};

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
          <TimelineItem {...educationData.university} />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Education; 