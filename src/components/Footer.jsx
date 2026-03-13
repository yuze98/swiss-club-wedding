export default function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-white py-16 text-center">
      <div className="max-w-xl mx-auto px-6">
        <p className="font-display text-4xl italic text-[var(--gold-light)] mb-2">Y & I</p>
        <p className="font-body text-xs tracking-[0.4em] uppercase text-white/40 mb-8">
          August 2026 · Swiss Club · Cairo
        </p>

        <div className="w-16 h-px bg-[var(--gold-light)] opacity-30 mx-auto mb-8" />

        <p className="font-display text-lg italic text-white/50">
          "وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ"
        </p>
        <p className="font-body text-xs text-white/30 mt-2">— آية 21 من سورة الروم</p>

        <p className="font-body text-xs text-white/20 mt-12">
          Made with love for Youssef & Inas's wedding
        </p>
      </div>
    </footer>
  );
}
