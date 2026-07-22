import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import OurStory from '../components/OurStory';
import Venue from '../components/Venue';
import GuestList from '../components/GuestList';
import Footer from '../components/Footer';

export default function Sec() {
  return (
    <div className="font-body bg-cream min-h-screen">
      <Navbar />
      <Hero />
      <Countdown />
      <OurStory />
      <Venue />
      <GuestList />
      <Footer />
    </div>
  );
}
