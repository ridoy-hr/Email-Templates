const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

const regex = /const CustomBtnLink = \(\) => \{[\s\S]*?return \([\s\S]*?  \);\n\};/m;

const newLinkCode = `const CustomBtnLink = () => {
  const [showInput, setShowInput] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [savedRange, setSavedRange] = React.useState<Range | null>(null);
  const [selectedText, setSelectedText] = React.useState('');
  
  const startLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showInput) {
      setShowInput(false);
      return;
    }
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).cloneRange();
      setSavedRange(range);
      setSelectedText(range.toString());
    }
    setShowInput(true);
    setUrl('');
  };

  const applyLink = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    
    if (savedRange) {
      let node = savedRange.startContainer;
      while (node && node.nodeType !== 1 && node.parentNode) {
        node = node.parentNode;
      }
      
      const contentEditable = node && node.closest ? node.closest('[contenteditable]') : document.querySelector('.rsw-ce');
      
      if (contentEditable) {
        (contentEditable as HTMLElement).focus();
      }

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
      
      if (url) {
        let linkUrl = url;
        if (!linkUrl.startsWith('http://') && !linkUrl.startsWith('https://') && !linkUrl.startsWith('mailto:')) {
          linkUrl = 'https://' + linkUrl;
        }
        
        if (selectedText.trim() === '') {
          // If no text was selected, insert the URL as the linked text
          document.execCommand('insertHTML', false, \`<a href="\${linkUrl}">\${linkUrl}</a>\`);
        } else {
          // If text was selected, create link on the selected text
          document.execCommand('createLink', false, linkUrl);
        }
        
        // Ensure react-simple-wysiwyg detects the change
        if (contentEditable) {
           contentEditable.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        }
      }
    }
    setShowInput(false);
    setUrl('');
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onMouseDown={startLink}
        title="Insert Link"
        className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors mx-0.5 cursor-pointer flex items-center justify-center"
        style={{ width: '28px', height: '28px' }}
      >
        <Link className="w-4 h-4" />
      </button>
      {showInput && (
        <div 
          className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-xl rounded-md p-2 flex items-center gap-2 z-[100] min-w-[250px]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                applyLink(e);
              } else if (e.key === 'Escape') {
                setShowInput(false);
                setUrl('');
              }
            }}
            placeholder="https://example.com"
            className="text-xs px-2 py-1.5 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="button"
            onMouseDown={applyLink}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};`;

code = code.replace(regex, newLinkCode);

fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
