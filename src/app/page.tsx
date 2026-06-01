import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickSnapshot from '@/components/QuickSnapshot';
import FeaturedProjects from '@/components/FeaturedProjects';
import EngineeringFocus from '@/components/EngineeringFocus';
import Skills from '@/components/Skills';
import GitHubActivity from '@/components/GitHubActivity';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import VisitorEmailCapture from '@/components/VisitorEmailCapture';

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <QuickSnapshot />
      <FeaturedProjects />
      <EngineeringFocus />
      <Skills />
      <GitHubActivity />
      <Experience />
      <About />
      <Education />
      <Contact />
      <Footer />
      {/* Subtle email capture — shown after 15s, bottom-right, unobtrusive */}
      <VisitorEmailCapture />
    </main>
  );
}
