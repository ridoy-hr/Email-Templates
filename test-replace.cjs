const fs = require('fs');
let html = fs.readFileSync('src/templates/survey_03.ts', 'utf8');

const replacement = `  html = html.replace(
    /(<td[^>]*class="body-container"[^>]*>)\\s*<p[\\s\\S]*?(?=<p class="signature")/i,
    \`$1\\n          <p>My New Body HTML</p>\\n\\n          \`
  );`;

html = html.replace(
    /(<td[^>]*class="body-container"[^>]*>)\s*<p[\s\S]*?(?=<p class="signature")/i,
    `$1\n          <p>My New Body HTML</p>\n\n          `
  );

console.log(html.substring(html.indexOf('body-container') - 50, html.indexOf('body-container') + 500));
