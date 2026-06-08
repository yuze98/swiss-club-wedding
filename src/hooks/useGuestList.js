import { useState, useEffect, useCallback } from 'react';
import { validateGuestName } from '../utils/validation';
import {
  fetchGuests,
  checkDuplicate,
  addGuestToSheet,
  removeGuestFromSheet,
  updateRsvpInSheet,
} from '../services/googleSheets';

const STORAGE_KEY = 'swiss-club-wedding-guests';

export default function useGuestList() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load guests from Google Sheets on mount, fallback to localStorage
  useEffect(() => {
    async function loadGuests() {
      setLoading(true);
      try {
        const sheetGuests = await fetchGuests();
        const mapped = sheetGuests.map((g, i) => ({
          id: Date.now() + i,
          name: g.name,
          side: g.side || 'both',
          rsvp: g.rsvp || 'pending',
          addedAt: g.addedDate || '',
          email: g.email || '',
          phone: g.phone || '',
          plusOnes: g.plusOnes || 0,
          dietaryRestrictions: g.dietaryRestrictions || '',
          notes: g.notes || '',
        }));
        setGuests(mapped);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      } catch (e) {
        console.error('Failed to load from Google Sheets, using localStorage:', e);
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) setGuests(JSON.parse(saved));
        } catch (localErr) {
          console.error('Failed to load from localStorage:', localErr);
        }
      } finally {
        setLoading(false);
      }
    }
    loadGuests();
  }, []);

  // Save to localStorage as backup whenever guests change
  useEffect(() => {
    if (guests.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
      } catch (e) {
        console.error('Failed to save guests to localStorage:', e);
      }
    }
  }, [guests]);

  const addGuest = useCallback(async (name, side = 'both', extras = {}) => {
    setError(null);

    // Validate name
    const validation = validateGuestName(name);
    if (!validation.valid) {
      setError(validation.error);
      return { success: false, error: validation.error };
    }

    const trimmedName = name.trim();

    setLoading(true);
    try {
      // Check for duplicate in Google Sheets
      const isDuplicate = await checkDuplicate(trimmedName);
      if (isDuplicate) {
        const dupError = `"${trimmedName}" is already on the guest list.`;
        setError(dupError);
        setLoading(false);
        return { success: false, error: dupError };
      }

      const now = new Date();
      const guest = {
        name: trimmedName,
        side,
        rsvp: 'pending',
        addedDate: now.toLocaleDateString(),
        addedTime: now.toLocaleTimeString(),
        email: extras.email || '',
        phone: extras.phone || '',
        plusOnes: extras.plusOnes || 0,
        dietaryRestrictions: extras.dietaryRestrictions || '',
        notes: extras.notes || '',
      };

      // Add to Google Sheets
      await addGuestToSheet(guest);

      // Add to local state
      const newGuest = {
        id: Date.now(),
        ...guest,
        addedAt: guest.addedDate,
      };
      setGuests((prev) => [...prev, newGuest]);
      setLoading(false);
      return { success: true };
    } catch (e) {
      const errMsg = e.message || 'Failed to add guest. Please try again.';
      setError(errMsg);
      setLoading(false);
      return { success: false, error: errMsg };
    }
  }, []);

  const removeGuest = useCallback(async (id) => {
    setError(null);
    const guest = guests.find((g) => g.id === id);
    if (!guest) return;

    setLoading(true);
    try {
      await removeGuestFromSheet(guest.name);
      setGuests((prev) => prev.filter((g) => g.id !== id));
    } catch (e) {
      console.error('Failed to remove from sheet, removing locally:', e);
      setGuests((prev) => prev.filter((g) => g.id !== id));
    } finally {
      setLoading(false);
    }
  }, [guests]);

  const updateRsvp = useCallback(async (id, rsvp) => {
    setError(null);
    const guest = guests.find((g) => g.id === id);
    if (!guest) return;

    // Optimistic update
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, rsvp } : g)));

    try {
      await updateRsvpInSheet(guest.name, rsvp);
    } catch (e) {
      console.error('Failed to update RSVP in sheet:', e);
      // Revert on failure
      setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, rsvp: guest.rsvp } : g)));
      setError('Failed to update RSVP. Please try again.');
    }
  }, [guests]);

  const clearError = useCallback(() => setError(null), []);

  const counts = {
    total: guests.length,
    confirmed: guests.filter((g) => g.rsvp === 'confirmed').length,
    pending: guests.filter((g) => g.rsvp === 'pending').length,
    declined: guests.filter((g) => g.rsvp === 'declined').length,
  };

  return { guests, addGuest, removeGuest, updateRsvp, counts, loading, error, clearError };
}
