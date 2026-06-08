import config from '../config';

const BASE_URL = config.GOOGLE_SHEETS_URL;

/**
 * Fetch all guests from Google Sheets.
 */
export async function fetchGuests() {
  const url = `${BASE_URL}?action=getGuests`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch guests');
  const data = await response.json();
  return data.guests || [];
}

/**
 * Check if a guest name already exists in the sheet.
 */
export async function checkDuplicate(name) {
  const url = `${BASE_URL}?action=checkDuplicate&name=${encodeURIComponent(name)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to check duplicate');
  const data = await response.json();
  return data.isDuplicate;
}

/**
 * Add a new guest to Google Sheets.
 */
export async function addGuestToSheet(guest) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }, // Apps Script requires text/plain for CORS
    body: JSON.stringify({ action: 'addGuest', guest }),
  });
  if (!response.ok) throw new Error('Failed to add guest');
  const data = await response.json();
  if (data.duplicate) throw new Error('Guest already exists in the sheet');
  if (data.error) throw new Error(data.error);
  return data;
}

/**
 * Remove a guest from Google Sheets.
 */
export async function removeGuestFromSheet(name) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'removeGuest', name }),
  });
  if (!response.ok) throw new Error('Failed to remove guest');
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
}

/**
 * Update a guest's RSVP status in Google Sheets.
 */
export async function updateRsvpInSheet(name, rsvp) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'updateRsvp', name, rsvp }),
  });
  if (!response.ok) throw new Error('Failed to update RSVP');
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
}
