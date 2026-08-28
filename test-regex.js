const fs = require('fs');
let html = fs.readFileSync('src/templates/survey_03.ts', 'utf8');

const match = html.match(/(<td[^>]*class="body-container"[^>]*>)\s*<p[\s\S]*?(?=<p class="signature")/i);
if (match) {
  console.log("MATCHED:");
  console.log(match[0].substring(0, 150) + "...\n...\n" + match[0].substring(match[0].length - 150));
} else {
  console.log("NO MATCH");
}
