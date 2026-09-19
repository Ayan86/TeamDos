const fs = require('fs');
['src/db/initialData.ts', 'database.json'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/https:\/\/images\.unsplash\.com\/[^"'\?]+/g, '/horror_background_wide.jpg');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
console.log('Done replacing unsplash URLs.');
