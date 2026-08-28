const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.rsw-editor')) {
  css += `\n\n.rsw-editor {\n  overflow: visible !important;\n}\n.rsw-toolbar {\n  z-index: 50 !important;\n}\n`;
  fs.writeFileSync('src/index.css', css);
}

let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

const oldApplyLink = `  const applyLink = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
      if (url) {
        document.execCommand('createLink', false, url);
        
        // Force trigger input event so react-simple-wysiwyg registers the change
        let node = savedRange.startContainer;
        while (node && node.nodeType !== 1) {
          node = node.parentNode;
        }
        const contentEditable = node?.closest ? node.closest('[contenteditable]') : null;
        if (contentEditable) {
           contentEditable.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
    setShowInput(false);
    setUrl('');
  };`;

const newApplyLink = `  const applyLink = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (savedRange) {
      let node = savedRange.startContainer;
      while (node && node.nodeType !== 1) {
        node = node.parentNode;
      }
      const contentEditable = node?.closest ? node.closest('[contenteditable]') : null;
      
      if (contentEditable) {
        (contentEditable as HTMLElement).focus();
      }

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
      
      if (url) {
        document.execCommand('createLink', false, url);
        
        if (contentEditable) {
           contentEditable.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
    setShowInput(false);
    setUrl('');
  };`;

code = code.replace(oldApplyLink, newApplyLink);

const oldEditor = `                <Editor
                  value={data.bodyContent}
                  onChange={(e) => setData({ ...data, bodyContent: e.target.value })}
                  containerProps={{ style: { height: '100%', minHeight: '300px', width: '100%', resize: 'vertical', overflow: 'auto' } }}
                >`;

const newEditor = `                <Editor
                  value={data.bodyContent}
                  onChange={(e) => setData({ ...data, bodyContent: e.target.value })}
                  containerProps={{ style: { height: '100%', minHeight: '300px', width: '100%', resize: 'vertical', overflow: 'visible' } }}
                >`;

code = code.replace(oldEditor, newEditor);

fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);

