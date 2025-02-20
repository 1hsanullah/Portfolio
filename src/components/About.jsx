import AnimatedSection from './AnimatedSection';

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              I'm a passionate web developer with a strong foundation in modern technologies.
              My journey in web development started with a curiosity about how things work on the internet,
              and it has evolved into a professional career building robust and scalable applications.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or sharing my knowledge through technical blog posts.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About; 