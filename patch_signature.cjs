const fs = require('fs');
let code = fs.readFileSync('src/generateResearchSurveyHtml.ts', 'utf8');

code = code.replace(
  "  // Hide PS block if empty",
  `  // Hide signature if empty
  if (!data.signatureName && !data.signatureTitle && !data.signatureEmail) {
    html = html.replace(/<p class="signature"[\\s\\S]*?<\\/p>/i, '');
  }

  // Hide PS block if empty`
);

fs.writeFileSync('src/generateResearchSurveyHtml.ts', code);
