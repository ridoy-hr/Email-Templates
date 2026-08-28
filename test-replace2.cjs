const fs = require('fs');
let html = fs.readFileSync('src/templates/survey_03.ts', 'utf8');

const match = html.match(/(<td[^>]*class="body-container"[^>]*>)\s*<p[\s\S]*?(?=<p class="signature")/i);
if (match) {
  console.log("MATCHED:\n", match[0].substring(0, 100), "...");
  const replaced = html.replace(
    /(<td[^>]*class="body-container"[^>]*>)\s*<p[\s\S]*?(?=<p class="signature")/i,
    `$1\n          <p>My New Body HTML</p>\n\n          `
  );
  
  const start = replaced.indexOf('<td\n          class="body-container"');
  console.log("REPLACED:\n", replaced.substring(start, start + 300));
}
