/* ═══════════════════════════════════════════════════════════
   SOCCER BRAIN — Google Forms Logger (forms.js)

   SETUP: Fill in FORM_ACTION_URL and the ENTRY IDs below.
   See README.md for step-by-step instructions.
   ═══════════════════════════════════════════════════════════ */

// ▼▼▼ PASTE YOUR GOOGLE FORM ACTION URL HERE ▼▼▼
const FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe6Mb3rQPibTD5s_9h5WnDB2YLD8kPHZvp3XoJ9RTWQ4nNORQ/formResponse';
// ▲▲▲ ─────────────────────────────────────── ▲▲▲

// ▼▼▼ PASTE YOUR ENTRY IDs HERE (from README.md instructions) ▼▼▼
const FORM_FIELDS = {
  playerName:      'entry.683914709',
  date:            'entry.268042596',
  time:            'entry.1325386389',
  score:           'entry.226234346',
  accuracy:        'entry.1008079740',
  avgSpeed:        'entry.1657482745',
  correctAnswers:  'entry.473226490',
  totalQuestions:  'entry.1193165009',
  level:           'entry.1558213197',
  passing:         'entry.666758379',
  shooting:        'entry.184191762',
  defending:       'entry.1513703087',
  positioning:     'entry.780178879',
  awareness:       'entry.528681445',
  reactions:       'entry.1768554015',
};
// ▲▲▲ ──────────────────────────────────────── ▲▲▲

/**
 * Logs a completed game session via Google Forms.
 * Uses a hidden iframe trick to submit without CORS errors
 * or page redirects — the form receives the data silently.
 */
function logToForms(data) {
  const statusEl = document.getElementById('forms-status');

  if (!FORM_ACTION_URL || FORM_ACTION_URL === 'YOUR_FORM_ACTION_URL_HERE') {
    if (statusEl) statusEl.textContent = '📋 Google Forms not configured yet. See README.md.';
    return;
  }

  try {
    // Parse category breakdown
    let cats = {};
    try { cats = JSON.parse(data.categoryBreakdown || '{}'); } catch(e) {}
    const pct = c => cats[c] ? Math.round((cats[c].correct / cats[c].total) * 100) : '';

    // Build form data
    const formData = new FormData();
    formData.append(FORM_FIELDS.playerName,     data.playerName || 'Unknown');
    formData.append(FORM_FIELDS.date,           data.date || new Date().toLocaleDateString());
    formData.append(FORM_FIELDS.time,           data.time || new Date().toLocaleTimeString());
    formData.append(FORM_FIELDS.score,          data.score || 0);
    formData.append(FORM_FIELDS.accuracy,       data.accuracy || 0);
    formData.append(FORM_FIELDS.avgSpeed,       data.avgResponseTime || 0);
    formData.append(FORM_FIELDS.correctAnswers, data.correctAnswers || 0);
    formData.append(FORM_FIELDS.totalQuestions, data.totalQuestions || 0);
    formData.append(FORM_FIELDS.level,          data.level || 'Unknown');
    formData.append(FORM_FIELDS.passing,        pct('passing'));
    formData.append(FORM_FIELDS.shooting,       pct('shooting'));
    formData.append(FORM_FIELDS.defending,      pct('defending'));
    formData.append(FORM_FIELDS.positioning,    pct('positioning'));
    formData.append(FORM_FIELDS.awareness,      pct('awareness'));
    formData.append(FORM_FIELDS.reactions,      pct('speed'));

    // Submit via hidden iframe — avoids CORS and page redirect
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = FORM_ACTION_URL;
    form.target = 'hidden_iframe';

    for (const [key, value] of formData.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();

    // Clean up after submit
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 3000);

    if (statusEl) statusEl.textContent = '✅ Saved to Google Sheets!';
    setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 3000);

  } catch (err) {
    console.warn('Forms logging failed:', err);
    if (statusEl) statusEl.textContent = '⚠️ Could not save — check README.md';
  }
}
