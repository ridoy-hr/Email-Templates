const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');
code = code.replace('<CustomBtnColor />\\n                    <CustomBtnLink />', '<CustomBtnColor />\n                    <CustomBtnLink />');
fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
