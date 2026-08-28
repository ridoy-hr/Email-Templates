const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

const oldInput = `<input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://"
            className="text-xs px-2 py-1.5 border border-gray-200 rounded-md flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />`;

const newInput = `<input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (savedRange) {
                  const selection = window.getSelection();
                  selection?.removeAllRanges();
                  selection?.addRange(savedRange);
                  if (url) {
                    document.execCommand('createLink', false, url);
                  }
                }
                setShowInput(false);
                setUrl('');
              } else if (e.key === 'Escape') {
                setShowInput(false);
                setUrl('');
              }
            }}
            placeholder="https://"
            className="text-xs px-2 py-1.5 border border-gray-200 rounded-md flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />`;

code = code.replace(oldInput, newInput);
fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
