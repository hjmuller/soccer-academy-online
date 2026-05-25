# ⚽ Soccer Brain

A fast-paced decision-making game for young soccer players.
Built for GitHub Pages. Tracks speed & accuracy. Logs to Google Sheets via Google Forms.

---

## Files Overview

| File | Purpose |
|------|---------|
| `index.html` | Main game UI |
| `style.css` | All styling |
| `game.js` | Game engine & logic |
| `forms.js` | Google Forms logger |
| `scenarios.json` | All game content (edit this!) |
| `CONTENT_GUIDE.md` | How to add/edit scenarios with Claude Desktop |

---

## 🚀 Step 1: Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `soccer-brain`)
2. Upload all files to the repository root
3. Go to **Settings → Pages**
4. Set Source to **Deploy from a branch → main → / (root)**
5. Click Save — your game will be live at `https://yourusername.github.io/soccer-brain`

---

## 📊 Step 2: Set Up Google Forms → Sheets

### A. Create the Form

1. Go to [forms.google.com](https://forms.google.com)
2. Click **Blank form**
3. Title it: **Soccer Brain Stats**
4. Add the following questions **in this exact order**, all as **Short answer** type:

```
1.  Player Name
2.  Date
3.  Time
4.  Score
5.  Accuracy
6.  Avg Speed
7.  Correct Answers
8.  Total Questions
9.  Level
10. Passing
11. Shooting
12. Defending
13. Positioning
14. Awareness
15. Reactions
```

> Tip: Click the "+" button to add each question. Set type to "Short answer" for all of them. Don't mark any as required.

### B. Link to a Google Sheet

1. In your form, click the **Responses** tab at the top
2. Click the green **Sheets icon** (Create spreadsheet)
3. Choose **Create a new spreadsheet** → name it **Soccer Brain Stats**
4. Click **Create** — this links the form to the sheet automatically

### C. Get the Form Action URL

1. In your form, click the **⋮ menu** (three dots, top right) → **Get pre-filled link**
2. Fill in a dummy value in the first field (e.g. "test") → click **Get link**
3. Copy the link — it looks like:
   `https://docs.google.com/forms/d/e/XXXXXXXXXXXXXXXX/viewform?usp=pp_url&entry.123456789=test`
4. Edit the copied URL:
   - Change `/viewform` to `/formResponse`
   - Remove everything from `?usp=` onwards
   - Result: `https://docs.google.com/forms/d/e/XXXXXXXXXXXXXXXX/formResponse`
5. Paste this URL into `forms.js` as `FORM_ACTION_URL`

### D. Get the Entry IDs

1. Right-click anywhere on your form page → **View page source** (Ctrl+U / Cmd+U)
2. Press Ctrl+F and search for `entry.`
3. You'll find entries like `entry.123456789` — one for each question, in order
4. Copy each entry ID and paste into `forms.js` matching the field names:

```javascript
const FORM_FIELDS = {
  playerName:     'entry.XXXXXXXXX',   // ← entry ID for question 1
  date:           'entry.XXXXXXXXX',   // ← entry ID for question 2
  time:           'entry.XXXXXXXXX',   // ← entry ID for question 3
  score:          'entry.XXXXXXXXX',   // ← entry ID for question 4
  accuracy:       'entry.XXXXXXXXX',   // ← entry ID for question 5
  avgSpeed:       'entry.XXXXXXXXX',   // ← entry ID for question 6
  correctAnswers: 'entry.XXXXXXXXX',   // ← entry ID for question 7
  totalQuestions: 'entry.XXXXXXXXX',   // ← entry ID for question 8
  level:          'entry.XXXXXXXXX',   // ← entry ID for question 9
  passing:        'entry.XXXXXXXXX',   // ← entry ID for question 10
  shooting:       'entry.XXXXXXXXX',   // ← entry ID for question 11
  defending:      'entry.XXXXXXXXX',   // ← entry ID for question 12
  positioning:    'entry.XXXXXXXXX',   // ← entry ID for question 13
  awareness:      'entry.XXXXXXXXX',   // ← entry ID for question 14
  reactions:      'entry.XXXXXXXXX',   // ← entry ID for question 15
};
```

### E. Upload the updated forms.js to GitHub

That's it — every completed game will now silently submit to your Google Form and appear as a new row in your linked spreadsheet.

---

## ✅ Testing It Works

1. Play a full game at your GitHub Pages URL
2. Open your linked Google Sheet
3. You should see a new row with all the game data

If no row appears after finishing a game, double-check:
- The `FORM_ACTION_URL` ends in `/formResponse` (not `/viewform`)
- All 15 entry IDs are filled in correctly in `forms.js`
- The file has been saved and re-uploaded to GitHub

---

## ✏️ Updating Game Content

See **CONTENT_GUIDE.md** for how to add/edit scenarios using Claude Desktop.
