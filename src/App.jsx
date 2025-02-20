import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-20 px-4">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-20">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Ihsanullah Sadiq</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              A passionate web developer building amazing digital experiences.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Get in touch
            </button>
          </div>
          
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="w-64 h-64 mx-auto bg-gray-300 rounded-full overflow-hidden">
              <img
                src="src/assets/profile_img.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <About />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
