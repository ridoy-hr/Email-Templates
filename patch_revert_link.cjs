const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

// Replace CustomBtnLink with BtnLink in the Toolbar
code = code.replace('<CustomBtnLink />', '<BtnLink />');

// Remove CustomBtnLink component
const customLinkRegex = /const CustomBtnLink = \(\) => \{[\s\S]*?\};\n\n/m;
code = code.replace(customLinkRegex, '');

fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
