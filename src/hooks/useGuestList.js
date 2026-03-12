import { useState, useEffect } from 'react';

const STORAGE_KEY = 'swiss-club-wedding-guests';

export default function useGuestList() {
  const [guests, setGuests] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setGuests(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load guests:', e);
    }
  }, []);

  // Save to localStorage whenever guests change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
    } catch (e) {
      console.error('Failed to save guests:', e);
    }
  }, [guests]);

  const addGuest = (name, side = 'both', rsvp = 'pending') => {
    const newGuest = {
      id: Date.now(),
      name: name.trim(),
      side,
      rsvp,
      addedAt: new Date().toLocaleDateString(),
    };
    setGuests((prev) => [...prev, newGuest]);
  };

  const removeGuest = (id) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  const updateRsvp = (id, rsvp) => {
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, rsvp } : g)));
  };

  const counts = {
    total: guests.length,
    confirmed: guests.filter((g) => g.rsvp === 'confirmed').length,
    pending: guests.filter((g) => g.rsvp === 'pending').length,
    declined: guests.filter((g) => g.rsvp === 'declined').length,
  };

  return { guests, addGuest, removeGuest, updateRsvp, counts };
}
