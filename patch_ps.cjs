const fs = require('fs');
let code = fs.readFileSync('src/generateResearchSurveyHtml.ts', 'utf8');

code = code.replace(
  "  return html;\n};",
  `  // Hide PS block if empty
  if (!data.psText && !data.psLinkText && !data.psTextAfter) {
    html = html.replace(/<tr>\\s*<td[^>]*>\\s*<p[^>]*>\\s*<strong[^>]*>P\\.S\\.<\\/strong>[\\s\\S]*?<\\/p>\\s*<\\/td>\\s*<\\/tr>/i, '');
  }

  // Hide Hero Image block if empty
  if (!data.heroImage) {
    // If it's a 60/40 template, hide the 40% column
    html = html.replace(/<td[^>]*class="column hide-mobile"[^>]*width="40%"[^>]*>[\\s\\S]*?<\\/td>/i, '');
    // If it's a full width hero, hide the row
    html = html.replace(/<tr>\\s*<td[^>]*>\\s*<img[^>]*alt="Survey illustration[^>]*>[\\s\\S]*?<\\/td>\\s*<\\/tr>/i, '');
  }

  return html;
};`
);

fs.writeFileSync('src/generateResearchSurveyHtml.ts', code);
