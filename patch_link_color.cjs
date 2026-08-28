const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace('color: #232288 !important;', 'color: #2563eb !important;');
fs.writeFileSync('src/index.css', css);

let genHtml = fs.readFileSync('src/generateResearchSurveyHtml.ts', 'utf8');
genHtml = genHtml.replace('style="color: #232288;', 'style="color: #2563eb;');
fs.writeFileSync('src/generateResearchSurveyHtml.ts', genHtml);

let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

// Add a color picker button component
const colorPickerComponent = `const CustomBtnColor = () => {
  const [showInput, setShowInput] = React.useState(false);
  const [color, setColor] = React.useState('#000000');
  const [savedRange, setSavedRange] = React.useState<Range | null>(null);

  const startColor = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showInput) {
      setShowInput(false);
      return;
    }
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0).cloneRange());
    }
    setShowInput(true);
  };

  const applyColor = (e: React.MouseEvent | React.KeyboardEvent, selectedColor: string) => {
    e.preventDefault();
    
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
      
      document.execCommand('foreColor', false, selectedColor);
      
      let node = savedRange.startContainer;
      while (node && node.nodeType !== 1 && node.parentNode) {
        node = node.parentNode;
      }
      const contentEditable = node && node.closest ? node.closest('[contenteditable]') : document.querySelector('.rsw-ce');
      
      if (contentEditable) {
         contentEditable.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      }
    }
    
    setShowInput(false);
  };

  const colors = ['#000000', '#4b5563', '#ef4444', '#f97316', '#f59e0b', '#22c55e', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#232288'];

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onMouseDown={startColor}
        title="Text Color"
        className="p-1 hover:bg-gray-200 rounded text-gray-700 transition-colors mx-0.5 cursor-pointer flex items-center justify-center"
        style={{ width: '28px', height: '28px' }}
      >
        <div className="w-4 h-4 border border-gray-300 rounded-full" style={{ background: 'linear-gradient(45deg, #ef4444, #3b82f6)' }}></div>
      </button>
      {showInput && (
        <div 
          className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-xl rounded-md p-2 grid grid-cols-4 gap-1 z-[100] min-w-[120px]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {colors.map(c => (
            <button
              key={c}
              type="button"
              className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer"
              style={{ backgroundColor: c }}
              onMouseDown={(e) => applyColor(e, c)}
            />
          ))}
          <input 
             type="color" 
             className="w-6 h-6 p-0 border-0 rounded-full cursor-pointer" 
             title="Custom Color" 
             onChange={(e) => { setColor(e.target.value); applyColor(e as any, e.target.value); }}
          />
        </div>
      )}
    </div>
  );
};`;

if (!code.includes('CustomBtnColor')) {
  // insert before CustomBtnLink
  code = code.replace('const CustomBtnLink =', colorPickerComponent + '\\n\\nconst CustomBtnLink =');
  
  // add to toolbar
  code = code.replace('<CustomBtnLink />', '<CustomBtnColor />\\n                    <CustomBtnLink />');
  if (!code.includes('<CustomBtnColor />')) {
     code = code.replace('<BtnLink />', '<CustomBtnColor />\\n                    <BtnLink />');
  }
}

fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);

