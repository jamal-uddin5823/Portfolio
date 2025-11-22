import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/BentoGrid";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      <Hero />

      <BentoGrid />

      <Skills />

      <Projects />

      <Experience />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
          Let's Connect
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <div className="flex justify-center gap-6">
          <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12 glass border-0 hover:bg-white/20 hover:text-primary hover:scale-110 transition-all">
            <Link href="mailto:jamaluddin10775@gmail.com">
              <Mail className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12 glass border-0 hover:bg-white/20 hover:text-primary hover:scale-110 transition-all">
            <Link href="https://github.com/jamal-uddin5823" target="_blank">
              <Github className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full w-12 h-12 glass border-0 hover:bg-white/20 hover:text-primary hover:scale-110 transition-all">
            <Link href="https://www.linkedin.com/in/jamal-uddin-mallick-791221282/" target="_blank">
              <Linkedin className="w-5 h-5" />
            </Link>
          </Button>
        </div>
        <footer className="mt-20 text-sm text-gray-600">
          © {new Date().getFullYear()} Jamal Uddin. Built with Next.js & Tailwind.
        </footer>
      </section>
    </main>
  );
}
