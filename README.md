# ⚽ Soccer Brain

A fast-paced decision-making game for young soccer players.
Built for GitHub Pages. Tracks speed & accuracy. Logs to Google Sheets.

---

## Files Overview

| File | Purpose |
|------|---------|
| `index.html` | Main game UI |
| `style.css` | All styling |
| `game.js` | Game engine & logic |
| `sheets.js` | Google Sheets logging |
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

## 📊 Step 2: Set Up Google Sheets Logging

### A. Create the Spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it **Soccer Brain Stats**
3. In Row 1, add these headers exactly:

```
Timestamp | Player Name | Date | Time | Score | Accuracy (%) | Avg Response Time (s) | Correct Answers | Total Questions | Level | Category Breakdown
```

### B. Create the Apps Script

1. In your spreadsheet, go to **Extensions → Apps Script**
2. Delete all existing code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date().toLocaleString(),
      data.playerName,
      data.date,
      data.time,
      data.score,
      data.accuracy,
      data.avgResponseTime,
      data.correctAnswers,
      data.totalQuestions,
      data.level,
      data.categoryBreakdown
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Soccer Brain Sheets Logger is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click **Save** (name the project anything, e.g. "Soccer Brain Logger")

### C. Deploy the Web App

1. Click **Deploy → New Deployment**
2. Click the gear icon next to "Type" and select **Web app**
3. Set:
   - **Description**: Soccer Brain Logger
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/XXXXXXX/exec`

### D. Add the URL to the Game

1. Open `sheets.js` in a text editor
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your copied URL:

```javascript
const SHEETS_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec';
```

3. Save and re-upload `sheets.js` to GitHub

---

## ✏️ Step 3: Update Game Content with Claude Desktop

See **CONTENT_GUIDE.md** for full instructions on using Claude Desktop to add and edit scenarios.

The short version:
1. Open `scenarios.json` in Claude Desktop
2. Ask Claude to add, change, or remove scenarios
3. Save the file and upload it to GitHub

---

## 🎮 How the Game Works

- **8 scenarios per game**, randomly selected each time
- **3 types of challenges**:
  - **Choice** — Pick the best tactical decision from 4 options
  - **Spot** — Tap the most open or most dangerous player
  - **Reaction** — Tap the green light, ignore the red!
- **Scoring**: 50 base points + up to 50 speed bonus + streak bonus
- **Timer**: Gets faster as you progress through levels
- **Levels**: Grasshopper → Striker → Champion (based on score)
- Stats are saved locally and logged to Google Sheets after each game

---

## 📱 Device Support

Works on mobile, tablet, and desktop. Best on a phone or tablet for the tap interactions.

---

## 🛠️ Troubleshooting

**Game doesn't load scenarios**: Make sure `scenarios.json` is in the same folder as `index.html`. GitHub Pages serves files relative to the repo root.

**Google Sheets not logging**: 
- Check the URL in `sheets.js` is correct
- Make sure you deployed with "Anyone" access
- Try opening the Web App URL directly in a browser — it should show "Soccer Brain Sheets Logger is running!"

**Timer not showing**: The timer ring uses SVG. Make sure `style.css` is loading correctly.
