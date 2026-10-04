# Story library

The site models Berlin at two administrative levels: **Bezirke** (boroughs) and **Ortsteile** (localities). The canonical list of all 12 Bezirke and their Ortsteile is in `berlin-locations.js`.

Each borough has its own folder and `stories.js` file. Add story objects to the matching borough file and set both `bezirk` and `ortsteil` using the exact names in `berlin-locations.js`. Add a new Ortsteil to that canonical list only if the taxonomy needs updating. The page includes each borough file before `app.js`, so stories stay in the static site without a build step.

Example story shape: `{ id, author, bezirk, ortsteil, title, excerpt, body, readTime, date }`.

The stories bundled with the prototype are illustrative placeholders, not verified testimonies.
