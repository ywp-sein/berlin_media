# Berlin Media

Share the good news. Tell a better story.

A lightweight, static storytelling site for collecting and exploring stepping-stone stories of hope across Berlin. In the repository, stories are organized under Berlin's 12 administrative Bezirke and tagged to their Ortsteile (local quarters); visitors explore by neighborhood. The illustrated map, story filters, featured story, and submission dialog run in the browser without a build step.

## Open the site

Open `index.html` in a browser. The site uses plain HTML, CSS, and JavaScript; the typefaces load from Google Fonts, with local system fallbacks.

## Publish with GitHub Pages

The workflow in `.github/workflows/pages.yml` assembles the static files and deploys them to GitHub Pages whenever changes are pushed to `main` (or when manually started from the Actions tab). For the first deployment:

1. Push the repository to GitHub.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Open **Actions** and confirm **Deploy Berlin Media to GitHub Pages** completes successfully.

The published site URL for this repository is <https://ywp-sein.github.io/berlin_media/>. Later pushes to `main` publish automatically. Since this is a static site, submitted stories are still local to each visitor's browser; Pages does not provide shared story submissions.

## Story storage

Stories submitted through the form are saved in the current browser's `localStorage`. This is a front-end prototype, not a shared publishing system: submissions are not sent to a server and are not visible to other visitors. Add a backend or hosted content service before using this for public submissions. The bundled stories are example-only placeholders for display and testing, not real community testimonies.

## Story organization

The story library is under `stories/`, with one folder per Bezirk and a `stories.js` data file inside each folder. Each entry records both its `bezirk` and `ortsteil`. The complete location taxonomy is maintained in `stories/berlin-locations.js`. See `stories/README.md` for the story object shape and editing guidance.
