import { Link } from 'react-router-dom';
import { Mail, Github, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-6rem)] px-6">
      <div className="max-w-[400px] sm:max-w-4xl mx-auto px-6 py-8 sm:py-12 brand-border-spaced text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-accent-blue">Hi, Kata here.</h1>
        <div className="space-y-4 sm:space-y-6 max-w-xl mx-auto">
          <p className="text-base sm:text-lg leading-relaxed">
            Full Stack Developer and Linux Enthusiast.
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center gap-4 sm:gap-6">
            <a href="mailto:contact@k4ta.dev" className="button-like inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16">
              <Mail size={24} className="sm:w-8 sm:h-8" />
            </a>
            <a href="https://github.com/k4nedito" target="_blank" rel="noopener noreferrer" className="button-like inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16">
              <Github size={24} className="sm:w-8 sm:h-8" />
            </a>
            <a href="https://discord.com/users/1065407157631197205" target="_blank" rel="noopener noreferrer" className="button-like inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16">
              <MessageCircle size={24} className="sm:w-8 sm:h-8" />
            </a>
          </div>
          <div className="mt-4 flex justify-center">
            <Link to="/contact" className="text-base sm:text-lg opacity-100 link-subtle">or... Contact Me</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
