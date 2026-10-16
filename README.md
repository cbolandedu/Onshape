# Onshape Tutorials site

A GitHub Pages site where students rewatch Onshape modeling videos, jump to chapters, view the matching engineering drawing, and practice reading it.

## Put it online (one time, ~10 minutes)

1. Sign in to GitHub and create a new **public** repository (e.g. `onshape-tutorials`).
2. Click **Add file → Upload files** and drag in everything from this folder (including the `drawings` folder). Commit.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. After a minute or two your site is live at `https://YOUR-USERNAME.github.io/onshape-tutorials/`.

## Add a tutorial

1. **Record** your screen while working in Onshape (OBS, Loom, Zoom recording, or Windows `Win+Alt+R` / Mac `Cmd+Shift+5`).
2. **Upload to YouTube** (Unlisted works if you don't want it searchable). Copy the video ID: for `https://youtu.be/AbC123xyz` the ID is `AbC123xyz`.
   - Don't put video files in GitHub: there's a 100 MB file limit and it's slow.
3. **Export the drawing** from Onshape: right-click the drawing tab → **Export** → PDF. Upload it to the `drawings/` folder in the repo.
4. **(Optional) Share the model**: in the Onshape document, Share → make it public, copy the link.
5. **Edit `data.js`** on GitHub (click the file → pencil icon). Copy an existing tutorial block, change the fields, commit. The site updates in about a minute.

Chapters use `"m:ss"` timestamps. Practice questions are `{ q: "question", a: "answer" }`.

## Files

| File | What it does |
|---|---|
| `data.js` | **The only file you normally edit**: site title and all tutorials |
| `index.html` | Tutorial library with search and unit filters |
| `tutorial.html` | One page per tutorial (video, chapters, drawing, practice questions) |
| `reading-drawings.html` | Reference guide: title block, views, line types, dimension symbols |
| `style.css`, `app.js` | Look and behavior |
| `drawings/` | Your exported drawing PDFs/PNGs |
