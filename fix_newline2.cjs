const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');
code = code.replace('};\n\\n\\nconst CustomBtnLink', '};\n\nconst CustomBtnLink');
code = code.replace('};\\n\\nconst CustomBtnLink', '};\n\nconst CustomBtnLink');
fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
