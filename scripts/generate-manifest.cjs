const fs = require('fs');
const path = require('path');

/** Reads image filenames from public/images/{category} */
function getImageFileNames(category) {
  const dir = path.join(__dirname, '..', 'public', 'images', category);
  try {
    return fs.readdirSync(dir)
      .filter(f => f.match(/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/))
      .map(f => f.replace(/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/, ''))
      .sort();
  } catch {
    console.warn(`⚠️  Cannot read ${dir}`);
    return [];
  }
}

const base = path.join(__dirname, '..', 'public', 'images');
const categories = fs.readdirSync(base).filter(f =>
  fs.statSync(path.join(base, f)).isDirectory()
);

const manifest = {};
for (const cat of categories) {
  manifest[cat] = getImageFileNames(cat);
  console.log(`📸 ${cat}: ${manifest[cat].length} images`);
}

const outPath = path.join(__dirname, '..', 'public', 'image-manifest.json');
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
console.log(`\n✅ Manifest written to ${outPath}`);
