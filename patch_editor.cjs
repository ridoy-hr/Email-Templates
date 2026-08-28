const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

// 1. Add Editor import
code = code.replace(
  "import { generateResearchSurveyHtml } from './generateResearchSurveyHtml';",
  "import { generateResearchSurveyHtml } from './generateResearchSurveyHtml';\nimport Editor from 'react-simple-wysiwyg';"
);

// 2. Replace state fields
const targetState = `bodyPara1: 'As we move through 2025, the team at HR.com is gathering valuable data on today’s Recruitment technologies to help HR professionals gain a better understanding of the tools, platforms, and innovations shaping the way organizations attract and hire top talent.',
    bodyPara2: '<strong>The survey takes only 7 minutes to complete. Key findings will be shared in an HR.com webcast,</strong> and you’ll receive early access to the full research report: Future of Recruitment Technologies 2025.',
    bodyPara3: 'These findings will reveal how your strategies and tools compare to other organizations, helping you stay competitive.',
    bodyPara4: 'We appreciate your support and look forward to your insights.',`;

const replacementState = `bodyContent: \`<p style="margin: 0 0 24px 0">As we move through 2025, the team at HR.com is gathering valuable data on today’s Recruitment technologies to help HR professionals gain a better understanding of the tools, platforms, and innovations shaping the way organizations attract and hire top talent.</p><p style="margin: 0 0 24px 0; background: #e6f0fa; border-radius: 8px; padding: 15px 20px; font-weight: 600;"><strong>The survey takes only 7 minutes to complete. Key findings will be shared in an HR.com webcast,</strong> and you’ll receive early access to the full research report: Future of Recruitment Technologies 2025.</p><p style="margin: 0 0 24px 0">These findings will reveal how your strategies and tools compare to other organizations, helping you stay competitive.</p><p style="margin: 0 0 24px 0">We appreciate your support and look forward to your insights.</p>\`,`;

code = code.replace(targetState, replacementState);

// 3. Replace UI section
const targetUI = `<div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">4. Body Content</h3>
            <TextAreaField label="Paragraph 1" value={data.bodyPara1} field="bodyPara1" icon={AlignLeft} />
            <TextAreaField label="Paragraph 2 (Highlighted, supports HTML)" value={data.bodyPara2} field="bodyPara2" icon={AlignLeft} />
            <TextAreaField label="Paragraph 3" value={data.bodyPara3} field="bodyPara3" icon={AlignLeft} />
            <TextAreaField label="Paragraph 4" value={data.bodyPara4} field="bodyPara4" icon={AlignLeft} />
          </div>`;

const replacementUI = `<div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">4. Body Content</h3>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-gray-500" />
                Email Body (WYSIWYG)
              </label>
              <div className="w-full bg-white rounded-md border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 overflow-hidden relative" style={{ minHeight: '300px' }}>
                <Editor
                  value={data.bodyContent}
                  onChange={(e) => setData({ ...data, bodyContent: e.target.value })}
                  containerProps={{ style: { height: '100%', minHeight: '300px', width: '100%', resize: 'vertical', overflow: 'auto' } }}
                />
              </div>
            </div>
          </div>`;

code = code.replace(targetUI, replacementUI);

fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
