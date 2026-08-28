const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.rsw-ce a')) {
  css += `\n\n.rsw-ce a {\n  color: #232288 !important;\n  text-decoration: underline !important;\n  cursor: pointer;\n}\n`;
  fs.writeFileSync('src/index.css', css);
}

let genHtml = fs.readFileSync('src/generateResearchSurveyHtml.ts', 'utf8');
if (!genHtml.includes('processedBody.replace(/<a')) {
  genHtml = genHtml.replace(
    '  // 7. Body Content\n  // Replace everything inside the body-container up to the signature\n  html = html.replace(\n    /(<td[^>]*class="body-container"[^>]*>)\\s*<p[\\s\\S]*?(?=<p class="signature")/i,\n    `$1\\n          ${data.bodyContent || \'\'}\\n\\n          `\n  );',
    `  // 7. Body Content
  let processedBody = data.bodyContent || '';
  processedBody = processedBody.replace(/<a([^>]*)>/gi, (match, attrs) => {
    if (!attrs.includes('style=')) {
      return \`<a\${attrs} style="color: #232288; text-decoration: underline;">\`;
    }
    return match;
  });

  // Replace everything inside the body-container up to the signature
  html = html.replace(
    /(<td[^>]*class="body-container"[^>]*>)\\s*<p[\\s\\S]*?(?=<p class="signature")/i,
    \`$1\\n          \${processedBody}\\n\\n          \`
  );`
  );
  fs.writeFileSync('src/generateResearchSurveyHtml.ts', genHtml);
}
