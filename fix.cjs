const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

// Remove from line 24 to 88.
// Basically, we can match from `  const applyLink = (e: React.MouseEvent) => {`
// up to `};\n\nconst CustomBtnLink`

code = code.replace(/  const applyLink = \(e: React\.MouseEvent\) => \{[\s\S]*?\};\n\nconst CustomBtnLink/m, 'const CustomBtnLink');

fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
