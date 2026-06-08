/**
 * Google Apps Script — Deploy as Web App
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire code into the script editor
 * 4. Click Deploy > New Deployment
 * 5. Choose "Web app", set "Execute as: Me", "Who has access: Anyone"
 * 6. Copy the deployment URL and paste it into src/config.js
 * 7. Add headers to Row 1 of Sheet1:
 *    Name | Side | RSVP | Added Date | Added Time | Email | Phone | Plus Ones | Dietary Restrictions | Notes
 */

const SHEET_NAME = "Sheet1";

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function doGet(e) {
  const action = e.parameter.action;

  if (action === "getGuests") {
    return handleGetGuests();
  }

  if (action === "checkDuplicate") {
    const name = e.parameter.name;
    return handleCheckDuplicate(name);
  }

  return jsonResponse({ error: "Unknown action" }, 400);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;

  if (action === "addGuest") {
    return handleAddGuest(data.guest);
  }

  if (action === "removeGuest") {
    return handleRemoveGuest(data.name);
  }

  if (action === "updateRsvp") {
    return handleUpdateRsvp(data.name, data.rsvp);
  }

  return jsonResponse({ error: "Unknown action" }, 400);
}

function handleGetGuests() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  if (data.length === 0) {
    return jsonResponse({ guests: [] });
  }

  // Check if first row is a header (first cell is "Name" case-insensitive)
  const hasHeader = data[0][0].toString().toLowerCase().trim() === "name";
  const rows = hasHeader ? data.slice(1) : data;

  const guests = rows.map((row) => ({
    name: row[0] ? row[0].toString() : "",
    side: row[1] ? row[1].toString() : "",
    rsvp: row[2] ? row[2].toString() : "pending",
    addedDate: row[3] ? row[3].toString() : "",
    addedTime: row[4] ? row[4].toString() : "",
    email: row[5] ? row[5].toString() : "",
    phone: row[6] ? row[6].toString() : "",
    plusOnes: row[7] || 0,
    dietaryRestrictions: row[8] ? row[8].toString() : "",
    notes: row[9] ? row[9].toString() : "",
  }));

  return jsonResponse({ guests });
}

function handleCheckDuplicate(name) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const hasHeader = data.length > 0 && data[0][0].toString().toLowerCase().trim() === "name";
  const rows = hasHeader ? data.slice(1) : data;
  const names = rows.map((row) => row[0].toString().toLowerCase().trim());
  const isDuplicate = names.includes(name.toLowerCase().trim());
  return jsonResponse({ isDuplicate });
}

function handleAddGuest(guest) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  // Check duplicate
  const hasHeader = data.length > 0 && data[0][0].toString().toLowerCase().trim() === "name";
  const rows = hasHeader ? data.slice(1) : data;
  const names = rows.map((row) => row[0].toString().toLowerCase().trim());
  if (names.includes(guest.name.toLowerCase().trim())) {
    return jsonResponse({ error: "Guest already exists", duplicate: true });
  }

  // Add new row
  sheet.appendRow([
    guest.name,
    guest.side || "both",
    guest.rsvp || "pending",
    guest.addedDate || new Date().toLocaleDateString(),
    guest.addedTime || new Date().toLocaleTimeString(),
    guest.email || "",
    guest.phone || "",
    guest.plusOnes || 0,
    guest.dietaryRestrictions || "",
    guest.notes || "",
  ]);

  return jsonResponse({ success: true });
}

function handleRemoveGuest(name) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const hasHeader = data.length > 0 && data[0][0].toString().toLowerCase().trim() === "name";
  const startIdx = hasHeader ? 1 : 0;

  for (let i = startIdx; i < data.length; i++) {
    if (
      data[i][0].toString().toLowerCase().trim() === name.toLowerCase().trim()
    ) {
      sheet.deleteRow(i + 1); // +1 because sheet rows are 1-indexed
      return jsonResponse({ success: true });
    }
  }

  return jsonResponse({ error: "Guest not found" });
}

function handleUpdateRsvp(name, rsvp) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const hasHeader = data.length > 0 && data[0][0].toString().toLowerCase().trim() === "name";
  const startIdx = hasHeader ? 1 : 0;

  for (let i = startIdx; i < data.length; i++) {
    if (
      data[i][0].toString().toLowerCase().trim() === name.toLowerCase().trim()
    ) {
      sheet.getRange(i + 1, 3).setValue(rsvp); // Column 3 = RSVP
      return jsonResponse({ success: true });
    }
  }

  return jsonResponse({ error: "Guest not found" });
}

function jsonResponse(data, code) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
