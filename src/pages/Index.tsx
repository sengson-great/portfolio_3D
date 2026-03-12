import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Languages from '@/components/Languages';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero owns its own full-screen section; id="home" here */}
        <div id="home">
          <Hero />
        </div>

        {/* Skills has no id of its own, so we add it here */}
        <div id="skills">
          <Skills />
        </div>

        {/* The components below already define their own id internally */}
        <About />
        <Experience />
        <Projects />
        <Education />
        <Languages />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
