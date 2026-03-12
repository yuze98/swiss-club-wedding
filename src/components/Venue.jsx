import useFadeIn from '../hooks/useFadeIn';
import venue from '../assets/images/venue.png';

// 🔧 Replace with your actual venue details and photos
const venueDetails = [
  { icon: '📍', label: 'Location', value: 'Swiss Club, Cairo, Egypt' },
  { icon: '📅', label: 'Date', value: 'August 21, 2026' },
  { icon: '🕕', label: 'Time', value: '6:00 PM' },
  { icon: '👗', label: 'Dress Code', value: 'Formal / Black Tie' },
];

export default function Venue() {
  const ref = useFadeIn();

  return (
    <section id="venue" className="py-24 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 fade-in">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">Where it happens</p>
          <h2 className="font-display text-4xl md:text-5xl italic font-light">The Venue</h2>
        </div>

        {/* Venue Image — replace with your actual venue photo */}
        <div className="relative object-contain w-full aspect-[16/7] overflow-hidden mb-16">
          <img
            src={venue}
            alt="Swiss Club Venue"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'var(--gold-light)';
              e.target.parentElement.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:center;height:100%;width:100%">
                  <span style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-style:italic;color:rgba(255,255,255,0.7)">
                    Swiss Club · Cairo
                  </span>
                </div>`;
            }}
          />
          {/* Gold frame overlay */}
          <div className="absolute inset-3 border border-white/20 pointer-events-none" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {venueDetails.map((detail) => (
            <div key={detail.label} className="text-center">
              <div className="text-2xl mb-3">{detail.icon}</div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-1">
                {detail.label}
              </p>
              <p className="font-display text-lg italic text-[var(--dark)]">{detail.value}</p>
            </div>
          ))}
        </div>

        {/* Map link */}
        <div className="text-center mt-12">
          <a
            href="https://maps.google.com/?q=Swiss+Club+Cairo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-xs tracking-[0.3em] uppercase border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-white transition-all duration-300"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
