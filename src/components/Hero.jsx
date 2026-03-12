import swissLogo from '../assets/images/swiss.png';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/couple.jpg')" }}
      />

      {/* Overlay — dark enough for text, tinted with theme color */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(160deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.70) 100%)'
      }} />

      {/* Decorative double border */}
      <div className="absolute inset-4 md:inset-8 border border-white/20 pointer-events-none" />
      <div className="absolute inset-6 md:inset-10 border border-white/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <p className="font-body text-xs tracking-[0.5em] uppercase text-[var(--gold-light)] mb-6">
          We're getting married
        </p>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light italic leading-none mb-4 text-white">
          Youssef
        </h1>

        <div className="ornament my-4">
          <span className="font-display text-2xl italic text-[var(--gold-light)]">&</span>
        </div>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light italic leading-none mb-8 text-white">
          Inas
        </h1>

        <div className="w-16 h-px mx-auto mb-6 bg-white/30" />

        <p className="font-body text-sm tracking-[0.3em] uppercase text-white/70 mb-2">
          August 2026
        </p>
        <p className="font-body text-sm tracking-widest text-[var(--gold-light)]">
          Swiss Club · Cairo
        </p>

        <img
          src={swissLogo}
          alt="Swiss Club logo"
          className="mx-auto mt-4 w-16 h-auto opacity-60"
          style={{ filter: 'brightness(0) invert(1)' }}
        />

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-body text-xs tracking-widest uppercase text-white/40">Scroll</span>
          <div className="h-8 w-px bg-white/25" />
        </div>
      </div>
    </section>
  );
}