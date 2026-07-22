import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PASSCODE = 'yuzino';

export default function SecGate() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === PASSCODE) {
      sessionStorage.setItem('sec_unlocked', 'true');
      navigate('/sec', { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="font-body bg-cream min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="text-center max-w-sm w-full">
        <p className="text-[var(--muted)] text-sm tracking-widest uppercase mb-6">
          Enter password to continue
        </p>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          className="w-full border border-[var(--gold-light)] bg-transparent text-center text-[var(--dark)] py-3 px-4 rounded focus:outline-none focus:border-[var(--gold)] transition-colors"
          placeholder="Password"
          autoFocus
        />
        {error && (
          <p className="text-red-500 text-xs mt-2">Incorrect password</p>
        )}
        <button
          type="submit"
          className="mt-4 px-8 py-2 bg-[var(--gold)] text-white text-sm tracking-widest uppercase rounded hover:opacity-90 transition-opacity"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
