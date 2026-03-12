// Replace the src values below with your actual couple photo
// Place your image in: public/images/couple.jpg

import swissLogo from '../assets/images/swiss.png';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
    
      {/* Background image — replace with your couple photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/couple.jpg')" }}
      />

      {/* Greenish overlay */}
      <div className="absolute inset-0 bg-green-900/30" />

      {/* Gold decorative border */}
      <div className="absolute inset-4 md:inset-8 border border-[var(--gold-light)] opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-[var(--gold-light)] mb-6 animate-fade-in">
          We're getting married
        </p>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light italic leading-none mb-4"
          style={{ animationDelay: '0.2s' }}
        >
          Youssef
        </h1>

        <div className="ornament my-4">
          <span className="font-display text-2xl italic text-[var(--gold-light)]">&</span>
        </div>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light italic leading-none mb-8">
          {/* Replace with partner's name */}
          Inas
        </h1>

        <p className="font-body text-sm tracking-[0.3em] uppercase text-white/80 mb-2">
          August 2026
        </p>
        <p className="font-body text-sm tracking-widest text-[var(--gold-light)]">
          Swiss Club · Cairo
        </p>
        {/* logo under location */}
        <img
          src={swissLogo}
          alt="Swiss Club logo"
          className="mx-auto mt-2 w-16 h-auto opacity-80"
        />

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-body text-xs tracking-widest uppercase text-white/50">Scroll</span>
          <div className="h-8 w-px bg-white/30" />
        </div>
      </div>
    </section>
  );
}
