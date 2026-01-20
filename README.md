# Quynah Website

## Screenshots gallery workflow
Place new images only inside the assets/New Screenshots Quynah UI/ folder, following the same folder hierarchy as the product navigation. Before deploying, regenerate the manifest with `node generate-screenshots-manifest.js` (or run the PowerShell equivalent from that script) to refresh both assets/screenshots-manifest.json and assets/screenshots-manifest.js. The screenshots page will read the JS manifest when opened from file:// and will fetch the JSON manifest when served over HTTP, so no code changes are needed when new folders or files are added.
