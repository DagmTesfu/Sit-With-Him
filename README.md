# Sit with Him

Static app, no build step.

## Setup
1. Get a whole-Bible KJV JSON from https://github.com/midvash/bible-data
   (look in `versions/en/kjv/`; check `metadata.json` there for the license).
   Save it as `data/kjv.json`.
2. `npm start` (serves this folder; open the URL it prints).
   On your phone, use the network URL it prints while on the same Wi-Fi.
3. To use it anywhere, host the folder on any static host (Netlify, GitHub Pages, Cloudflare Pages).

If the Bible tab says the file shape is unrecognized, edit `normalize()` in `bible.js`.
