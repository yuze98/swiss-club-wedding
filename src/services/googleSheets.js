import config from '../config';

const BASE_URL = config.GOOGLE_SHEETS_URL;

/**
 * Fetch all guests from Google Sheets.
 */
export async function fetchGuests() {
  const url = `${BASE_URL}?action=getGuests`;
  const response = await fetch(url, { redirect: 'follow' });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('Google Sheets response was not JSON:', text.substring(0, 500));
    throw new Error('Failed to parse guest list response');
  }
  if (data.error) throw new Error(data.error);
  return data.guests || [];
}

/**
 * Check if a guest name already exists in the sheet.
 */
export async function checkDuplicate(name) {
  const url = `${BASE_URL}?action=checkDuplicate&name=${encodeURIComponent(name)}`;
  const response = await fetch(url, { redirect: 'follow' });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('checkDuplicate response was not JSON:', text.substring(0, 500));
    throw new Error('Failed to check duplicate');
  }
  return data.isDuplicate;
}

/**
 * Add a new guest to Google Sheets.
 */
export async function addGuestToSheet(guest) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'addGuest', guest }),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('addGuest response was not JSON:', text.substring(0, 500));
    throw new Error('Failed to add guest');
  }
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
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'removeGuest', name }),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('removeGuest response was not JSON:', text.substring(0, 500));
    throw new Error('Failed to remove guest');
  }
  if (data.error) throw new Error(data.error);
  return data;
}

/**
 * Update a guest's RSVP status in Google Sheets.
 */
export async function updateRsvpInSheet(name, rsvp) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'updateRsvp', name, rsvp }),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('updateRsvp response was not JSON:', text.substring(0, 500));
    throw new Error('Failed to update RSVP');
  }
  if (data.error) throw new Error(data.error);
  return data;
}
