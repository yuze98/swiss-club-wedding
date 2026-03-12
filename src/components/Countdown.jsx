import { useState, useEffect } from 'react';
import useFadeIn from '../hooks/useFadeIn';

// 🔧 Change this to your actual wedding date
const WEDDING_DATE = new Date('2025-08-01T18:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-5xl md:text-7xl font-light text-[var(--dark)] leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-body text-xs tracking-[0.3em] uppercase text-[var(--muted)] mt-2">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());
  const ref = useFadeIn();

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="countdown" className="py-24 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 text-center fade-in">
        <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">
          Counting down to
        </p>
        <h2 className="font-display text-4xl md:text-5xl italic font-light mb-16">
          The Big Day
        </h2>

        <div className="flex justify-center items-center gap-8 md:gap-16">
          <TimeUnit value={time.days} label="Days" />
          <span className="font-display text-4xl text-[var(--gold-light)] mb-4">·</span>
          <TimeUnit value={time.hours} label="Hours" />
          <span className="font-display text-4xl text-[var(--gold-light)] mb-4">·</span>
          <TimeUnit value={time.minutes} label="Minutes" />
          <span className="font-display text-4xl text-[var(--gold-light)] mb-4">·</span>
          <TimeUnit value={time.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}
