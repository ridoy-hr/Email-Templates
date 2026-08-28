const fs = require('fs');
let code = fs.readFileSync('src/generateResearchSurveyHtml.ts', 'utf8');

const target = `  // 7. Body Para 1
  html = html.replace(
    /As we move through 2025, the team at HR\\.com is gathering valuable\\s*data on today’s Recruitment technologies to help HR professionals\\s*gain a better understanding of the tools, platforms, and innovations\\s*shaping the way organizations attract and hire top talent\\./g,
    data.bodyPara1 || ''
  );

  // 8. Body Para 2 (with the <strong> tag)
  html = html.replace(
    /<strong>The survey takes only 7 minutes to complete\\. Key findings will be\\s*shared in an HR\\.com webcast,<\\/strong>\\s*and you’ll receive early access to the full research report: Future\\s*of Recruitment Technologies 2025\\./g,
    data.bodyPara2 || ''
  );

  // 9. Body Para 3
  html = html.replace(
    /These findings will reveal how your strategies and tools compare to\\s*other organizations, helping you stay competitive\\./g,
    data.bodyPara3 || ''
  );

  // 10. Body Para 4
  html = html.replace(
    /We appreciate your support and look forward to your insights\\./g,
    data.bodyPara4 || ''
  );`;

const replacement = `  // 7. Body Content
  // Replace everything inside the body-container up to the signature
  html = html.replace(
    /(<td[^>]*class="body-container"[^>]*>)\\s*<p[\\s\\S]*?(?=<p class="signature")/i,
    \`$1\\n          \${data.bodyContent || ''}\\n\\n          \`
  );`;

code = code.replace(target, replacement);

fs.writeFileSync('src/generateResearchSurveyHtml.ts', code);
