import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div className="font-body bg-cream min-h-screen relative">
      <Hero />
      {/* Navigation tabs */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-6 z-20">
        <Link
          to="/invitation"
          className="px-6 py-2 border border-white/40 text-white/80 text-sm tracking-widest uppercase rounded hover:bg-white/10 transition-colors"
        >
          Invitation
        </Link>
        <Link
          to="/sec-gate"
          className="px-6 py-2 border border-white/40 text-white/80 text-sm tracking-widest uppercase rounded hover:bg-white/10 transition-colors"
        >
          Our Story
        </Link>
      </div>
    </div>
  );
}
