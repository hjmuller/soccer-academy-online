/* ═══════════════════════════════════════════════════════════
   SOCCER BRAIN — Airtable Logger (airtable.js)

   SETUP: Fill in the three values below.
   See README.md for step-by-step instructions.
   ═══════════════════════════════════════════════════════════ */

// ▼▼▼ YOUR THREE AIRTABLE VALUES ▼▼▼
const AIRTABLE_TOKEN  = 'patdZgHrEVLatFYy9.1d1900f838eb4b44d4708a4da00b571cfc1ceb12654c1b70431a05468580733f';
const AIRTABLE_BASE   = 'appI75ovvwFgVVtGk';
const AIRTABLE_TABLE  = 'Game Log';
// ▲▲▲ ──────────────────────────── ▲▲▲

/**
 * Logs a completed game session to Airtable.
 * Called automatically at the end of each game.
 */
async function logToAirtable(data) {
  const statusEl = document.getElementById('airtable-status');

  // Skip if not configured
  if (!AIRTABLE_TOKEN || AIRTABLE_TOKEN === 'YOUR_AIRTABLE_TOKEN_HERE') {
    if (statusEl) statusEl.textContent = '📋 Airtable not configured yet. See README.md.';
    return;
  }

  if (statusEl) statusEl.textContent = '📤 Saving to Airtable...';

  try {
    // Parse category breakdown into individual fields
    let cats = {};
    try { cats = JSON.parse(data.categoryBreakdown || '{}'); } catch(e) {}
    const pct = c => cats[c] ? Math.round((cats[c].correct / cats[c].total) * 100) : null;

    const fields = {
      'Player Name':       data.playerName || 'Unknown',
      'Date':              new Date().toISOString().split('T')[0], // YYYY-MM-DD for Airtable date field
      'Time':              data.time || new Date().toLocaleTimeString(),
      'Score':             data.score || 0,
      'Accuracy (%)':      data.accuracy || 0,
      'Avg Speed (s)':     data.avgResponseTime || 0,
      'Correct Answers':   data.correctAnswers || 0,
      'Total Questions':   data.totalQuestions || 0,
      'Level':             data.level || 'Unknown',
      'Passing (%)':       pct('passing'),
      'Shooting (%)':      pct('shooting'),
      'Defending (%)':     pct('defending'),
      'Positioning (%)':   pct('positioning'),
      'Awareness (%)':     pct('awareness'),
      'Reactions (%)':     pct('speed'),
    };

    // Remove null fields — Airtable ignores empty ones
    Object.keys(fields).forEach(k => { if (fields[k] === null) delete fields[k]; });

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || response.statusText);
    }

    if (statusEl) statusEl.textContent = '✅ Saved to Airtable!';
    setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 3000);

  } catch (err) {
    console.warn('Airtable logging failed:', err);
    if (statusEl) statusEl.textContent = '⚠️ Could not save to Airtable — check README.md';
  }
}
