import { useState, useEffect } from 'react';

const links = ['Story', 'Venue', 'Countdown', 'Guests'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('default');

  const palettes = {
    default: {
      cream: '#faf4ee',
      gold: '#b85c38',
      'gold-light': '#e8c4a8',
      dark: '#3b2218',
      muted: '#9c6e5a',
    },
    dark: {
      cream: '#f4f7f0',
      gold: '#3d6b45',
      'gold-light': '#8fb896',
      dark: '#1c2b1e',
      muted: '#5a7260',
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
          className={`font-display text-xl italic tracking-wide transition-colors duration-300 ${
            scrolled ? 'text-[var(--gold)]' : 'text-white'
          }`}
        >
          Y & I
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className={`font-body text-sm tracking-widest uppercase transition-colors duration-300 hover:text-[var(--gold)] ${
                  scrolled ? 'text-[var(--muted)]' : 'text-white/80'
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'default' ? 'dark' : 'default')}
            className={`px-3 py-1 text-xs rounded border font-body tracking-widest uppercase transition-colors duration-300 ${
              scrolled
                ? 'border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold-light)]'
                : 'border-white/60 text-white/80 hover:bg-white/10'
            }`}
          >
            {theme === 'default' ? '🌿 Grassy' : '🍂 Terracotta'}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block h-px w-6 transition-all duration-300 ${
              scrolled ? 'bg-[var(--dark)]' : 'bg-white'
            } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-6 transition-all duration-300 ${
              scrolled ? 'bg-[var(--dark)]' : 'bg-white'
            } ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 transition-all duration-300 ${
              scrolled ? 'bg-[var(--dark)]' : 'bg-white'
            } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-[var(--gold-light)] px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-left font-body text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
            >
              {link}
            </button>
          ))}
          <div className="pt-2 border-t border-[var(--gold-light)]">
            <button
              onClick={() => setTheme(theme === 'default' ? 'dark' : 'default')}
              className="font-body text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
            >
              {theme === 'default' ? '🌿 Switch to Grassy' : '🍂 Switch to Terracotta'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}