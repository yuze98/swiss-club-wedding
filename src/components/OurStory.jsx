import useFadeIn from '../hooks/useFadeIn';

// import images from src so bundler handles them and path issues disappear
import batmanImg from '../assets/images/the-batman.jpg';
import proposalImg from '../assets/images/proposal.gif';
import foreverImg from '../assets/images/iy.jpeg';

// 🔧 Replace with your actual story and photos
const story = [
  {
    year: '2022',
    title: 'How We Met',
    text: 'Sharing the same night without knowing what it would one day mean. Sometimes life keeps two people apart, yet never truly far, until the moment is just right — and three years between that moment and everything that followed.',
    image: batmanImg,
  },
  {
    year: '2025',
    title: 'The Proposal',
    text: 'After 3 months apart, under the open sky, with the music of a guitar and little fireworks lighting up the night — then came the ring. A moment that needed nothing more than exactly what it was.',
    image: proposalImg,
  },
  {
    year: '2026',
    title: 'Forever Begins',
    text: "Now you stand at the beginning of a lifelong adventure together. We can't wait to celebrate with you.",
    image: foreverImg,
  },
];

export default function OurStory() {
  const ref = useFadeIn();

  return (
    <section id="story" className="py-24 bg-[var(--cream)]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 fade-in">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">A love story</p>
          <h2 className="font-display text-4xl md:text-5xl italic font-light text-gold">Our Story</h2>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-20">
          {story.map((item, i) => (
            <div
              key={item.year}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 aspect-[5/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bg-[var(--gold-light)]', 'flex', 'items-center', 'justify-center');
                    e.target.parentElement.innerHTML = `<span class="font-display text-6xl italic text-white/60">${item.year}</span>`;
                  }}
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 text-center md:text-left px-4">
                <span className="font-body text-xs tracking-[0.4em] uppercase text-gold">{item.year}</span>
                <h3 className="font-display text-3xl italic font-light mt-2 mb-4 text-gold">{item.title}</h3>
                <div className="w-12 h-px bg-gold mb-4 mx-auto md:mx-0" />
                <p className="font-body text-sm leading-relaxed text-[var(--dark)]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
