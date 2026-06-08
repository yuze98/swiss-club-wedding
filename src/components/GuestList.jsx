import { useState } from 'react';
import useGuestList from '../hooks/useGuestList';
import useFadeIn from '../hooks/useFadeIn';
import { validateGuestName } from '../utils/validation';

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

const SIDE_COLORS = {
  groom: 'bg-blue-400',
  bride: 'bg-pink-400',
  both: 'bg-white border border-gray-300',
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}/${mm}/${yy}`;
}

export default function GuestList() {
  const { guests, addGuest, removeGuest, updateGuest, updateRsvp, counts, loading, error, clearError } = useGuestList();
  const [name, setName] = useState('');
  const [side, setSide] = useState('both');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plusOnes, setPlusOnes] = useState(0);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [validationError, setValidationError] = useState('');
  const [removingId, setRemovingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [unlocked, setUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const ref = useFadeIn();

  const handleUnlock = () => {
    setShowPasswordModal(true);
    setPasswordInput('');
    setPasswordError('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'safroota') {
      setUnlocked(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect. Try again!');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setValidationError('');
    clearError();

    // Client-side validation
    const validation = validateGuestName(name);
    if (!validation.valid) {
      setValidationError(validation.error);
      return;
    }

    const result = await addGuest(name, side, {
      email,
      phone,
      plusOnes: Number(plusOnes) || 0,
      dietaryRestrictions,
      notes,
    });

    if (result.success) {
      setName('');
      setEmail('');
      setPhone('');
      setPlusOnes(0);
      setDietaryRestrictions('');
      setNotes('');
    }
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

        {/* Unlock Button */}
        {!unlocked && (
          <div className="text-center mb-8">
            <button
              onClick={handleUnlock}
              className="bg-gold text-white font-body text-xs tracking-widest uppercase px-6 py-2 hover:bg-[#b8963e] transition-colors"
            >
              Unlock to Manage Guests
            </button>
          </div>
        )}

        {/* Add Guest Form */}
        <form onSubmit={handleAdd} className={`bg-white border border-[var(--gold-light)] p-6 mb-8 ${!unlocked ? 'opacity-50 pointer-events-none' : ''}`}>
          <h3 className="font-display text-xl italic mb-4">Add a Guest</h3>

          {/* Error Messages */}
          {(validationError || error) && (
            <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-red-600 font-body text-sm rounded">
              {validationError || error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setValidationError(''); }}
                placeholder="Guest name *"
                className="flex-1 border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold"
                disabled={loading}
              />
              <select
                value={side}
                onChange={(e) => setSide(e.target.value)}
                className="border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold bg-white"
                disabled={loading}
              >
                <option value="both">Both Sides</option>
                <option value="bride">Bride's Side</option>
                <option value="groom">Groom's Side</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="flex-1 border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold"
                disabled={loading}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                className="flex-1 border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold"
                disabled={loading}
              />
              <input
                type="number"
                value={plusOnes}
                onChange={(e) => setPlusOnes(e.target.value)}
                placeholder="Plus ones"
                min="0"
                max="10"
                className="w-24 border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Dietary restrictions (optional)"
                className="flex-1 border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold"
                disabled={loading}
              />
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes (optional)"
                className="flex-1 border border-gray-200 px-4 py-2 font-body text-sm focus:outline-none focus:border-gold"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="self-end bg-gold text-white font-body text-xs tracking-widest uppercase px-6 py-2 hover:bg-[#b8963e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Guest'}
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

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 font-body text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"></span> Groom's Side</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-pink-400 inline-block"></span> Bride's Side</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-white border border-gray-300 inline-block"></span> Both Sides</span>
        </div>

        {/* Guest Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[var(--muted)] font-body text-sm">
            {guests.length === 0 ? 'No guests added yet. Add your first guest above.' : 'No guests match your search.'}
          </div>
        ) : (
          <div className="bg-white border border-[var(--gold-light)] divide-y divide-gray-50">
            {filtered.map((guest) => (
              <div key={guest.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                {editingId === guest.id ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Name"
                        className="flex-1 border border-gray-200 px-3 py-1.5 font-body text-sm focus:outline-none focus:border-gold"
                      />
                      <select
                        value={editForm.side || 'both'}
                        onChange={(e) => setEditForm({ ...editForm, side: e.target.value })}
                        className="border border-gray-200 px-3 py-1.5 font-body text-sm focus:outline-none focus:border-gold bg-white"
                      >
                        <option value="both">Both Sides</option>
                        <option value="bride">Bride's Side</option>
                        <option value="groom">Groom's Side</option>
                      </select>
                      <input
                        type="number"
                        value={editForm.plusOnes || 0}
                        onChange={(e) => setEditForm({ ...editForm, plusOnes: Number(e.target.value) || 0 })}
                        min="0"
                        max="10"
                        className="w-20 border border-gray-200 px-3 py-1.5 font-body text-sm focus:outline-none focus:border-gold"
                        placeholder="+1s"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        placeholder="Email"
                        className="flex-1 border border-gray-200 px-3 py-1.5 font-body text-sm focus:outline-none focus:border-gold"
                      />
                      <input
                        type="tel"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        placeholder="Phone"
                        className="flex-1 border border-gray-200 px-3 py-1.5 font-body text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={editForm.dietaryRestrictions || ''}
                        onChange={(e) => setEditForm({ ...editForm, dietaryRestrictions: e.target.value })}
                        placeholder="Dietary restrictions"
                        className="flex-1 border border-gray-200 px-3 py-1.5 font-body text-sm focus:outline-none focus:border-gold"
                      />
                      <input
                        type="text"
                        value={editForm.notes || ''}
                        onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                        placeholder="Notes"
                        className="flex-1 border border-gray-200 px-3 py-1.5 font-body text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-1">
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-sm font-body px-3 py-1 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          await updateGuest(guest.id, editForm);
                          setEditingId(null);
                        }}
                        className="text-sm font-body px-3 py-1 bg-gold text-white hover:bg-[#b8963e] transition-colors rounded"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 mr-3 ${SIDE_COLORS[guest.side] || SIDE_COLORS.both}`} title={guest.side === 'both' ? 'Both Sides' : `${guest.side}'s Side`}></span>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-[var(--dark)]">
                        {guest.name}
                        {guest.plusOnes > 0 && <span className="text-xs text-[var(--muted)] ml-2">+{guest.plusOnes}</span>}
                      </p>
                      <p className="font-body text-xs text-[var(--muted)] mt-0.5">
                        Added {formatDate(guest.addedAt)}
                        {guest.notes && <span className="ml-2">· {guest.notes}</span>}
                      </p>
                    </div>

                    {/* RSVP Selector */}
                    <select
                      value={guest.rsvp}
                      onChange={(e) => updateRsvp(guest.id, e.target.value)}
                      disabled={!unlocked}
                      className={`font-body text-xs px-3 py-1 rounded-full border-0 mr-4 ${RSVP_COLORS[guest.rsvp]} ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="declined">Declined</option>
                    </select>

                    {/* Edit */}
                    <button
                      onClick={() => {
                        setEditingId(guest.id);
                        setEditForm({
                          name: guest.name,
                          side: guest.side,
                          email: guest.email,
                          phone: guest.phone,
                          plusOnes: guest.plusOnes,
                          dietaryRestrictions: guest.dietaryRestrictions,
                          notes: guest.notes,
                        });
                      }}
                      disabled={!unlocked}
                      className={`text-sm font-body px-2 py-1 rounded transition-colors ${unlocked ? 'text-gray-400 hover:text-blue-500 hover:bg-blue-50' : 'text-gray-300 cursor-not-allowed'}`}
                      title="Edit guest"
                    >
                      Edit
                    </button>

                    {/* Remove */}
                    <button
                      onClick={async () => {
                        if (window.confirm(`Remove "${guest.name}" from the guest list?`)) {
                          setRemovingId(guest.id);
                          await removeGuest(guest.id);
                          setRemovingId(null);
                        }
                      }}
                      disabled={!unlocked || removingId === guest.id}
                      className={`text-sm font-body ml-2 px-2 py-1 rounded transition-colors ${
                        !unlocked || removingId === guest.id
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                      title="Remove guest"
                    >
                      {removingId === guest.id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-center font-body text-xs text-[var(--muted)] mt-6">
          Guest list syncs automatically with Google Sheets.
        </p>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80">
            <h3 className="font-display text-lg italic text-center mb-4">Enter the magic word</h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(''); }}
                placeholder="••••••••"
                className="w-full border border-gray-200 px-4 py-2 font-body text-sm text-center tracking-widest focus:outline-none focus:border-gold mb-3"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-500 font-body text-xs text-center mb-3">{passwordError}</p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 font-body text-sm px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold text-white font-body text-sm px-4 py-2 hover:bg-[#b8963e] transition-colors rounded"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
