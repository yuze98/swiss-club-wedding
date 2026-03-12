import { useState, useEffect } from 'react';

const links = ['Story', 'Venue', 'Countdown', 'Guests'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('default');

  // define palettes for dynamic theming
  const palettes = {
    default: {
      cream: '#f5ebe0',
      gold: '#c1683a',
      'gold-light': '#e5bba4',
      dark: '#4a2e2a',
      muted: '#8c6b63',
    },
    dark: {
      cream: '#0a141f',
      gold: '#3e97c5',
      'gold-light': '#1a445b',
      dark: '#b5d1d5',
      muted: '#73949c',
    },
  };

  const applyPalette = (p) => {
    const root = document.documentElement;
    Object.entries(palettes[p]).forEach(([key, val]) => {
      root.style.setProperty(`--${key}`, val);
    });
  };

  useEffect(() => {
    applyPalette(theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-xl italic tracking-wide text-gold"
        >
          Y & I
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className="font-body text-sm tracking-widest uppercase text-[var(--muted)] hover:text-gold transition-colors"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'default' ? 'dark' : 'default')}
          className="ml-4 px-2 py-1 text-xs rounded border border-gold text-gold hover:bg-gold-light transition-colors"
        >
          {theme === 'default' ? 'Terracotta' : 'Grassy'}
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-px w-6 bg-[var(--dark)] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-[var(--dark)] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-[var(--dark)] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-[var(--gold-light)] px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-left font-body text-sm tracking-widest uppercase text-[var(--muted)] hover:text-gold transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
