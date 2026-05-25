# ⚽ Soccer Brain

A fast-paced decision-making game for young soccer players.
Built for GitHub Pages. Tracks speed & accuracy. Logs to Airtable.

---

## Files Overview

| File | Purpose |
|------|---------|
| `index.html` | Main game UI |
| `style.css` | All styling |
| `game.js` | Game engine & logic |
| `airtable.js` | Airtable logging |
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

## 📊 Step 2: Set Up Airtable

### A. Create your account

1. Go to [airtable.com](https://airtable.com) and sign up for a free account

### B. Create the Base and Table

1. Click **+ Add a base** → **Start from scratch**
2. Name it **Soccer Brain**
3. Rename the default table to **Game Log** (click the table name tab to rename)
4. Delete all the default columns, then create these fields in this exact order:

| Field Name | Field Type |
|---|---|
| Player Name | Single line text |
| Date | Date |
| Time | Single line text |
| Score | Number |
| Accuracy (%) | Number |
| Avg Speed (s) | Number (set decimal places to 1) |
| Correct Answers | Number |
| Total Questions | Number |
| Level | Single line text |
| Passing (%) | Number |
| Shooting (%) | Number |
| Defending (%) | Number |
| Positioning (%) | Number |
| Awareness (%) | Number |
| Reactions (%) | Number |

### C. Get your Base ID

1. With your base open, look at the URL in your browser:
   `https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYY/...`
2. The Base ID is the part starting with **app** — copy it
   Example: `appXXXXXXXXXXXXXX`

### D. Create a Personal Access Token

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **+ Create new token**
3. Name it: **Soccer Brain**
4. Under **Scopes**, add: `data.records:write`
5. Under **Access**, click **+ Add a base** and select your Soccer Brain base
6. Click **Create token**
7. **Copy the token immediately** — Airtable only shows it once!
   It starts with `pat...`

### E. Add your values to airtable.js

Open `airtable.js` and fill in lines 9–10:

```javascript
const AIRTABLE_TOKEN = 'patXXXXXXXXXXXXXX';   // ← your token
const AIRTABLE_BASE  = 'appXXXXXXXXXXXXXX';   // ← your base ID
```

Save and upload `airtable.js` to GitHub.

---

## 🎨 Step 3: Make Airtable Look Great (optional but recommended)

### Add a Gallery or color-coded Grid view:

1. In your **Game Log** table, click **+ Add a view** → **Grid view** (already there)
2. To color-code rows by accuracy:
   - Click the **Color** button in the toolbar
   - Set: color by **Accuracy (%)** field
   - Configure: green ≥ 80, yellow ≥ 50, red below 50

### Add a Summary view:

1. Click **+ Add a view** → **Summary**
   - This auto-calculates averages, max scores, totals across all columns

### Add a Chart:

1. Click **+ Add an extension** (top right)
2. Add **Chart** extension
3. Set X-axis to Date, Y-axis to Score — instant progress graph!

---

## ✏️ Step 4: Update Game Content

See **CONTENT_GUIDE.md** for how to add/edit scenarios using Claude Desktop.

---

## 🛠️ Troubleshooting

**"Could not save to Airtable" message in game:**
- Check `AIRTABLE_TOKEN` and `AIRTABLE_BASE` are filled in correctly in `airtable.js`
- Make sure your token has `data.records:write` scope
- Make sure the token has access to your Soccer Brain base
- Check the table name in `airtable.js` exactly matches your Airtable table name (case-sensitive)

**Token security:**
Your token is visible in `airtable.js` on GitHub. To limit exposure, the token is scoped to only write to this one base — it cannot read, delete, or access anything else in your Airtable account.
