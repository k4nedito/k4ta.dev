import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { to: '/home', label: 'Home' },
    { to: '/whoami', label: 'Whoami' },
    { to: '/contact', label: 'Contact' },
    { to: '/blog', label: 'Blog' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex w-full sm:max-w-[980px] mx-auto mt-5 items-center justify-center px-6 py-3 bg-foreground border-b-2 brand-border">
        <div className="flex gap-4 text-sm">
          {menuItems.map((item) => (
            <Link key={item.to} to={item.to} className="button-like">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Burger Menu */}
      <div className="sm:hidden w-full max-w-[400px] mx-auto mt-5 px-6">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full flex items-center justify-center py-3 bg-foreground brand-border"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-text" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className="sm:hidden w-full max-w-[400px] mx-auto px-6">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="bg-foreground brand-border flex flex-col gap-3 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4),12px_12px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="button-like text-center text-base py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

    </>
  );
}
