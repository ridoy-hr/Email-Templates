const fs = require('fs');
let code = fs.readFileSync('src/generateResearchSurveyHtml.ts', 'utf8');

code = code.replace(
  "// Hide Hero Image block if empty",
  `// Hide CTA block if empty
  if (!data.ctaText) {
    html = html.replace(/<table[^>]*class="x_btn-table"[^>]*>[\\s\\S]*?<\\/table>/i, '');
    html = html.replace(/<table[^>]*class="button"[^>]*>[\\s\\S]*?<\\/table>/i, '');
    // Some templates use a specific button structure:
    html = html.replace(/<table[^>]*class="?button"?[^>]*>[\\s\\S]*?<\\/table>/ig, '');
  }

  // Hide Hero Image block if empty`
);

fs.writeFileSync('src/generateResearchSurveyHtml.ts', code);
