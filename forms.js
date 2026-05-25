/* ═══════════════════════════════════════════════════════════
   SOCCER BRAIN — Google Forms Logger (forms.js)
   Uses a pre-filled URL redirect to avoid CORS/401 issues.
   ═══════════════════════════════════════════════════════════ */

const FORM_BASE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe6Mb3rQPibTD5s_9h5WnDB2YLD8kPHZvp3XoJ9RTWQ4nNORQ/formResponse';

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

/**
 * Logs a completed game session to Google Forms.
 * Opens a pre-filled form URL in a new tab which submits
 * automatically and closes — bypasses CORS/401 restrictions.
 */
function logToForms(data) {
  const statusEl = document.getElementById('forms-status');

  try {
    // Parse category breakdown
    let cats = {};
    try { cats = JSON.parse(data.categoryBreakdown || '{}'); } catch(e) {}
    const pct = c => cats[c] ? Math.round((cats[c].correct / cats[c].total) * 100) : '';

    // Build pre-filled URL with all values as query params
    const params = new URLSearchParams({
      [FORM_FIELDS.playerName]:     data.playerName || 'Unknown',
      [FORM_FIELDS.date]:           data.date || new Date().toLocaleDateString(),
      [FORM_FIELDS.time]:           data.time || new Date().toLocaleTimeString(),
      [FORM_FIELDS.score]:          data.score || 0,
      [FORM_FIELDS.accuracy]:       data.accuracy || 0,
      [FORM_FIELDS.avgSpeed]:       data.avgResponseTime || 0,
      [FORM_FIELDS.correctAnswers]: data.correctAnswers || 0,
      [FORM_FIELDS.totalQuestions]: data.totalQuestions || 0,
      [FORM_FIELDS.level]:          data.level || 'Unknown',
      [FORM_FIELDS.passing]:        pct('passing'),
      [FORM_FIELDS.shooting]:       pct('shooting'),
      [FORM_FIELDS.defending]:      pct('defending'),
      [FORM_FIELDS.positioning]:    pct('positioning'),
      [FORM_FIELDS.awareness]:      pct('awareness'),
      [FORM_FIELDS.reactions]:      pct('speed'),
      'submit':                     'Submit',
    });

    const submitUrl = `${FORM_BASE_URL}?${params.toString()}`;

    // Open in new tab — Google Forms accepts GET submissions
    // via pre-filled URLs. The tab submits and can be closed.
    const tab = window.open(submitUrl, '_blank');

    // Close the tab automatically after 3 seconds
    if (tab) {
      setTimeout(() => {
        try { tab.close(); } catch(e) {}
      }, 3000);
      if (statusEl) statusEl.textContent = '✅ Saved to Google Sheets!';
    } else {
      // Pop-up blocked — show the link instead so they can submit manually
      if (statusEl) {
        statusEl.innerHTML = '⚠️ Pop-up blocked. <a href="' + submitUrl + '" target="_blank" style="color:#ffd60a">Tap here to save</a>';
      }
    }

    setTimeout(() => {
      if (statusEl) statusEl.textContent = '';
    }, 5000);

  } catch (err) {
    console.warn('Forms logging failed:', err);
    if (statusEl) statusEl.textContent = '⚠️ Could not save — check console';
  }
}
