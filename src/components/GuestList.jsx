import { useState } from 'react';
import useGuestList from '../hooks/useGuestList';
import useFadeIn from '../hooks/useFadeIn';

const RSVP_COLORS = {
  confirmed: 'text-emerald-600 bg-emerald-50',
  pending: 'text-amber-600 bg-amber-50',
  declined: 'text-red-400 bg-red-50',
};

const RSVP_LABELS = {
  confirmed: 'Confirmed',
  pending: 'Pending',
  declined: 'Declined',
};

export default function GuestList() {
  const { guests, addGuest, removeGuest, updateRsvp, counts } = useGuestList();
  const [name, setName] = useState('');
  const [side, setSide] = useState('both');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const ref = useFadeIn();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addGuest(name, side);
    setName('');
  };

  const filtered = guests.filter((g) => {
    const matchesFilter = filter === 'all' || g.rsvp === filter || g.side === filter;
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="guests" className="py-24 bg-[var(--cream)]" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 fade-in">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">Join the celebration</p>
          <h2 className="font-display text-4xl md:text-5xl italic font-light">Guest List</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total', value: counts.total },
            { label: 'Confirmed', value: counts.confirmed },
            { label: 'Pending', value: counts.pending },
            { label: 'Declined', value: counts.declined },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-white p-4 border border-[var(--gold-light)]">
              <p className="font-display text-3xl font-light text-[var(--dark)]">{stat.value}</p>
              <p className="font-body text-xs tracking-widest uppercase text-[var(--muted)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Add Guest Form */}
        <form onSubmit={handleAdd} className="bg-white border border-[var(--gold-light)] p-6 mb-8">
          <h3 className="font-display text-xl italic mb-4">Add a Guest</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Guest name"
              className="flex-1 border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold"
            />
            <select
              value={side}
              onChange={(e) => setSide(e.target.value)}
              className="border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold bg-white"
            >
              <option value="both">Both Sides</option>
              <option value="bride">Bride's Side</option>
              <option value="groom">Groom's Side</option>
            </select>
            <button
              type="submit"
              className="bg-gold text-white font-body text-xs tracking-widest uppercase px-6 py-2 hover:bg-[#b8963e] transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guests..."
            className="flex-1 border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold bg-white"
          >
            <option value="all">All Guests</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
            <option value="bride">Bride's Side</option>
            <option value="groom">Groom's Side</option>
          </select>
        </div>

        {/* Guest Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[var(--muted)] font-body text-sm">
            {guests.length === 0 ? 'No guests added yet. Add your first guest above.' : 'No guests match your search.'}
          </div>
        ) : (
          <div className="bg-white border border-[var(--gold-light)] divide-y divide-gray-50">
            {filtered.map((guest) => (
              <div key={guest.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-[var(--dark)]">{guest.name}</p>
                  <p className="font-body text-xs text-[var(--muted)] mt-0.5 capitalize">
                    {guest.side === 'both' ? 'Both Sides' : `${guest.side}'s Side`} · Added {guest.addedAt}
                  </p>
                </div>

                {/* RSVP Selector */}
                <select
                  value={guest.rsvp}
                  onChange={(e) => updateRsvp(guest.id, e.target.value)}
                  className={`font-body text-xs px-3 py-1 rounded-full border-0 cursor-pointer mr-4 ${RSVP_COLORS[guest.rsvp]}`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="declined">Declined</option>
                </select>

                {/* Remove */}
                <button
                  onClick={() => removeGuest(guest.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                  title="Remove guest"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-center font-body text-xs text-[var(--muted)] mt-6">
          Guest list is saved automatically to this browser.
        </p>
      </div>
    </section>
  );
}
