/* ═══════════════════════════════════════════════════════════
   SOCCER BRAIN — Google Sheets Logger (sheets.js)

   SETUP INSTRUCTIONS:
   1. Go to script.google.com and create a new project
   2. Paste the Apps Script code from README.md
   3. Deploy as Web App (Anyone can access)
   4. Copy the Web App URL and paste it below as SHEETS_URL
   5. Pick any secret token string and set it in BOTH this
      file AND in the Apps Script (see README.md)
   ═══════════════════════════════════════════════════════════ */

// ▼▼▼ PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ▼▼▼
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxfrtgiTDXroAthjX_3cB7jHb00b12B-ZmV3rjVhQz5vrXarsKq7X0KAc5Pl7G12so5TQ/exec';
// ▲▲▲ ─────────────────────────────────────────────── ▲▲▲

// ▼▼▼ SET YOUR SECRET TOKEN HERE (same value goes in Apps Script) ▼▼▼
const SHEETS_TOKEN = 'fuhjoilh37o58tgyhl3qf2';
// ▲▲▲ ─────────────────────────────────────────────────────────── ▲▲▲

/**
 * Logs a completed game session to Google Sheets.
 * Called automatically at the end of each game.
 * Sends a secret token so the Apps Script can reject
 * requests that didn't come from this game.
 */
async function logToSheets(data) {
  const statusEl = document.getElementById('sheets-status');

  // Skip if not configured
  if (!SHEETS_URL || SHEETS_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    if (statusEl) statusEl.textContent = '📋 Google Sheets not configured yet. See README.md.';
    return;
  }

  if (statusEl) statusEl.textContent = '📤 Saving to Google Sheets...';

  try {
    const payload = {
      token: SHEETS_TOKEN,
      playerName: data.playerName || 'Unknown',
      date: data.date || new Date().toLocaleDateString(),
      time: data.time || new Date().toLocaleTimeString(),
      score: data.score || 0,
      accuracy: data.accuracy || 0,
      avgResponseTime: data.avgResponseTime || 0,
      correctAnswers: data.correctAnswers || 0,
      totalQuestions: data.totalQuestions || 0,
      level: data.level || 'Unknown',
      categoryBreakdown: data.categoryBreakdown || '{}'
    };

    // Use no-cors mode — Sheets will still receive the data
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (statusEl) statusEl.textContent = '✅ Saved to Google Sheets!';
    setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 3000);

  } catch (err) {
    console.warn('Sheets logging failed:', err);
    if (statusEl) statusEl.textContent = '⚠️ Could not save to Sheets (check URL in sheets.js)';
  }
}
