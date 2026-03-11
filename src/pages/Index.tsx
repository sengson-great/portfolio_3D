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
    <main className="min-h-screen bg-background">
      <Hero />
      <Skills />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Languages />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
