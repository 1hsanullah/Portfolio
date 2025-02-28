import AnimatedSection from './AnimatedSection';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-center">
              I'm a passionate Software Developer with a strong foundation in modern technologies.
              My journey in software development began with a curiosity for how things work,
              which grew into a career focused on building efficient and scalable applications.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
              When I'm not coding, I enjoy learning about emerging technologies, optimizing systems, and refining my skills through hands-on projects.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About; 