import { useState } from 'react';
import { Mail, Github, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    console.log('Form submitted:', { email, message });
    alert('Message sent! (Not really, this is a placeholder)');
  };

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-6rem)] px-4 sm:px-6 pt-6 sm:pt-8 pb-8">
      <div className="brand-border w-full max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-accent-blue">[ Contact Me ]</h1>
        
        {/* Social Links Section */}
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-accent-blue text-white">
          <p className="mb-3 sm:mb-4 text-center font-bold text-sm sm:text-base">
            What did you expect, a working form below? :D Please use the proper channels {"<"}3
          </p>
          <div className="flex justify-center gap-4 sm:gap-6">
            <a 
              href="mailto:contact@k4ta.dev" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Email</span>
            </a>
            <a 
              href="https://github.com/k4nedito" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">GitHub</span>
            </a>
            <a 
              href="https://discord.com/users/1065407157631197205" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Discord</span>
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-foreground border-2 border-border focus:outline-none focus:border-accent-blue"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              required
              rows={8}
              className="w-full px-4 py-3 bg-foreground border-2 border-border focus:outline-none focus:border-accent-blue resize-none"
            />
          </div>

          <button
            type="submit"
            disabled
            className="button-like w-full md:w-auto px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            [ Send Message ]
          </button>
        </form>
      </div>
    </div>
  );
}
