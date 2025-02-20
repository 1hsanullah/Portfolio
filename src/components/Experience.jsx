import AnimatedSection from './AnimatedSection';
import TimelineItem from './common/TimelineItem';
import companyLogo from '../assets/logos/GDSC.jpeg'; // Add your company logos

const experienceData = [
  {
    logo: companyLogo,
    title: "Software Engineer Intern",
    subtitle: "GDSC QMUL",
    date: "June 2022 - September 2022",
    description: "Worked on full-stack development using React and Node.js",
    items: [
      "Developed and maintained web applications using React",
      "Implemented RESTful APIs using Node.js and Express",
      "Collaborated with team members using Git and Agile methodologies"
    ]
  }
  // Add more experiences here
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
          {experienceData.map((experience, index) => (
            <TimelineItem key={index} {...experience} />
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Experience; 