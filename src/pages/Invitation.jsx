import { useState } from 'react';
import Countdown from 'react-countdown';
import confetti from 'canvas-confetti';
import letterImg from '../assets/invitations/letter.jpg';
import backgroundImg from '../assets/invitations/BACKGROUND.jpg';
import birdsImg from '../assets/invitations/BIRDS.png';
import countdownImg from '../assets/invitations/COUNTDOWN.png';
import envelopeImg from '../assets/invitations/ENVELOPE.png';
import rsvpImg from '../assets/invitations/rsvp.jpg';
import { addRsvpToSheet } from '../services/googleSheets';

export default function Invitation() {
  const [stage, setStage] = useState('envelope'); // envelope | invite | rsvp
  const [fading, setFading] = useState(false);

  // RSVP form state
  const [formData, setFormData] = useState({ name: '', phone: '', guests: '1' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const fadeToStage = (next) => {
    setFading(true);
    setTimeout(() => {
      setStage(next);
      setFading(false);
    }, 700);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    setSubmitting(true);
    try {
      await addRsvpToSheet({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        guests: formData.guests,
      });
      setSubmitted(true);
      // Fire confetti burst
      const opts = { zIndex: 9999 };
      confetti({ ...opts, particleCount: 150, spread: 80, origin: { y: 0.7 } });
      setTimeout(() => confetti({ ...opts, particleCount: 80, spread: 100, origin: { y: 0.5, x: 0.3 } }), 300);
      setTimeout(() => confetti({ ...opts, particleCount: 80, spread: 100, origin: { y: 0.5, x: 0.7 } }), 600);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  // --- Envelope screen ---
  if (stage === 'envelope') {
    return (
      <div className="min-h-screen bg-[#2c2418]">
        <div
          className={`min-h-screen flex items-center justify-center cursor-pointer transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}
          onClick={() => fadeToStage('invite')}
        >
          <img
            src={letterImg}
            alt="Wedding invitation envelope"
            className="w-full md:max-w-[430px] max-h-screen object-cover animate-scaleIn hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    );
  }

  // --- Opened invitation ---
  if (stage === 'invite') {
    return (
      <div className="min-h-screen bg-[#2c2418]">
        <div
          className={`min-h-screen flex flex-col items-center transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Back button */}
          <button
            onClick={() => fadeToStage('envelope')}
            className="fixed top-5 left-5 z-50 text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors"
          >
            ← Back
          </button>

          {/* Main content area with background */}
          <div className="relative w-full md:max-w-[430px] overflow-hidden">
            {/* Background image */}
            <img
              src={backgroundImg}
              alt=""
              className="w-full object-contain"
            />

            {/* Birds (fade in at the top) */}
            <div className="absolute top-[-1%] left-[-5%] right-0 opacity-0 animate-fadeIn-delay-1">
              <img src={birdsImg} alt="Doves" className="w-[80%] mx-auto" />
            </div>

            {/* Envelope (fades in from the bottom) */}
            <div className="absolute top-[8%] left-14 translate-x-1/2 w-[72%] opacity-0 animate-slideUp-delay-2">
              <img src={envelopeImg} alt="Envelope" className="w-full" />
            </div>

            {/* Countdown text image */}
            <div className="absolute top-[27%] left-0 right-0 opacity-0 animate-fadeIn-delay-3">
              <img src={countdownImg} alt="The Countdown is on!" className="w-[64%] mx-auto" />
            </div>

            {/* Countdown numbers */}
            <div className="absolute top-[37%] left-0 right-0 flex justify-center opacity-0 animate-fadeIn-delay-3">
              <Countdown
                date={new Date('2026-08-21T18:30:00')}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div className="flex gap-3 sm:gap-5">
                    {[
                      { value: days, label: 'Days' },
                      { value: hours, label: 'Hours' },
                      { value: minutes, label: 'Min' },
                      { value: seconds, label: 'Sec' },
                    ].map(({ value, label }) => (
                      <div key={label} className="flex flex-col items-center">
                        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-[48px] sm:min-w-[64px]">
                          <span className="font-display text-2xl sm:text-4xl text-white tabular-nums">
                            {String(value).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-white/60 text-[10px] sm:text-xs uppercase tracking-widest mt-1">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Clickable Swiss Club location area — opens Google Maps */}
            <a
              href="https://maps.app.goo.gl/LwkjD5PJakFfW7qE9"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-[63%] left-1/2 -translate-x-1/2 w-[80%] h-[20%] z-10 cursor-pointer"
              aria-label="Open Swiss Club location in Google Maps"
            />

            {/* Clickable Kindly RSVP tray area at the bottom */}
            <button
              onClick={() => fadeToStage('rsvp')}
              className="absolute bottom-[1%] left-1/2 -translate-x-1/2 w-[80%] h-[11%] cursor-pointer opacity-0 z-10"
              aria-label="RSVP"
            />
          </div>
        </div>
      </div>
    );
  }

  // --- RSVP screen ---
  return (
    <div className="min-h-screen bg-[#2c2418]">
      <div className={`min-h-screen flex flex-col items-center transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}>
      {/* Back button */}
      <button
        onClick={() => fadeToStage('invite')}
        className="fixed top-5 left-5 z-50 text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors"
      >
        ← Back
      </button>
      <div className="relative w-full md:max-w-[430px] min-h-screen">
        <img
          src={rsvpImg}
          alt="RSVP"
          className="w-full h-screen object-cover absolute inset-0 animate-fadeIn"
        />

      {/* Form overlaid on the olive space (lower portion) */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-[10%] px-6">
        {submitted ? (
          <div className="text-center animate-scaleIn space-y-3">
            <div className="text-4xl animate-float">✨</div>
            <p className="font-display text-4xl italic text-white/90">See you there!</p>
            <p className="text-white/50 text-sm tracking-widest">We can't wait to celebrate with you</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            {/* Decorative header */}
            <div className="text-center mb-6 opacity-0 animate-slideUp">
              <p className="font-display text-2xl italic text-white/80">We'd love to have you</p>
              <div className="w-12 h-px mx-auto mt-2 bg-white/30" />
            </div>

            <div className="space-y-3 bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-2xl opacity-0 animate-slideUp-delay-1 [animation-fill-mode:forwards]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/10 border-b border-white/30 text-white placeholder-white/40 text-center py-3 px-4 rounded-t-md outline-none focus:border-white/70 focus:bg-white/15 transition-[background-color,border-color] duration-200"
                />
              </div>
              
              <div className="relative">
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-white/10 border-b border-white/30 text-white text-center py-3 px-4 rounded-b-md outline-none focus:border-white/70 focus:bg-white/15 transition-[background-color,border-color] duration-200 appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n} className="text-black bg-[#2c2418]">
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {error && <p className="text-red-300 text-xs text-center pt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-5 py-3.5 bg-gradient-to-r from-white/20 via-white/30 to-white/20 border border-white/40 text-white text-sm tracking-[0.25em] uppercase rounded-lg hover:from-white/30 hover:via-white/40 hover:to-white/30 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 disabled:opacity-50 opacity-0 animate-slideUp-delay-2"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : 'Confirm RSVP'}
            </button>
          </form>
        )}
      </div>
      </div>
      </div>
    </div>
  );
}
