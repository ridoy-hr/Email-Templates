const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

code = code.replace(
  '<InputField label="Hero Image URL" value={data.heroImage} field="heroImage" icon={ImageIcon} />',
  '<InputField label="Hero Image URL" value={data.heroImage} field="heroImage" icon={ImageIcon} />\n            <p className="text-[10px] text-gray-500 mt-1">Leave empty to remove hero image</p>'
);

code = code.replace(
  '<InputField label="Button URL" value={data.ctaUrl} field="ctaUrl" icon={Link} />',
  '<InputField label="Button URL" value={data.ctaUrl} field="ctaUrl" icon={Link} />\n            <p className="text-[10px] text-gray-500 mt-1">Leave Button Text empty to remove CTA completely</p>'
);

code = code.replace(
  '<InputField label="P.S. Suffix Text" value={data.psTextAfter} field="psTextAfter" icon={AlignLeft} />',
  '<InputField label="P.S. Suffix Text" value={data.psTextAfter} field="psTextAfter" icon={AlignLeft} />\n              <p className="text-[10px] text-gray-500 mt-1 col-span-2">Leave P.S. fields empty to remove section</p>'
);

fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
