const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, 'assets', 'New Screenshots Quynah UI');
const OUTPUT_FILE = path.join(__dirname, 'assets', 'screenshots-manifest.json');
const OUTPUT_JS = path.join(__dirname, 'assets', 'screenshots-manifest.js');
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);

const isImage = (fileName) => IMAGE_EXTS.has(path.extname(fileName).toLowerCase());

function walkDir(absDir, parts) {
  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  const images = [];
  const sections = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const nextParts = [...parts, entry.name];
    const absPath = path.join(absDir, entry.name);

    if (entry.isDirectory()) {
      sections.push(...walkDir(absPath, nextParts));
      continue;
    }

    if (entry.isFile() && isImage(entry.name)) {
      images.push({
        filename: entry.name,
        src: path.join('assets', 'New Screenshots Quynah UI', ...parts, entry.name).replace(/\\/g, '/'),
      });
    }
  }

  if (images.length) {
    sections.unshift({
      sectionPath: parts.join('/'),
      titles: [...parts],
      images,
    });
  }

  return sections;
}

function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const manifest = walkDir(SOURCE_DIR, []);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  const jsPayload = `window.SCREENSHOTS_MANIFEST = ${JSON.stringify(manifest, null, 2)};\n`;
  fs.writeFileSync(OUTPUT_JS, jsPayload);
  console.log(`Wrote ${manifest.length} sections to ${OUTPUT_FILE} and ${OUTPUT_JS}`);
}

if (require.main === module) {
  main();
}
