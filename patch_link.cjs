const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

const customLinkCode = `
const CustomBtnLink = () => {
  const [showInput, setShowInput] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [savedRange, setSavedRange] = React.useState<Range | null>(null);

  const startLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0));
    }
    setShowInput(true);
  };

  const applyLink = (e: React.MouseEvent) => {
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
  };

  return (
    <div className="relative inline-block flex items-center">
      <button
        type="button"
        onMouseDown={startLink}
        title="Link"
        className="p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors mx-0.5"
      >
        <Link className="w-4 h-4" />
      </button>
      {showInput && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-md p-2 flex items-center gap-2 z-50 min-w-[200px]">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://"
            className="text-xs px-2 py-1.5 border border-gray-200 rounded-md flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="button"
            onMouseDown={applyLink}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded text-xs font-medium transition-colors"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};
`;

code = code.replace("interface ResearchSurveyEditorProps", customLinkCode + "\ninterface ResearchSurveyEditorProps");
code = code.replace("<BtnLink />", "<CustomBtnLink />");

fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
