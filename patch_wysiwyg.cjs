const fs = require('fs');
let code = fs.readFileSync('src/ResearchSurveyEditor.tsx', 'utf8');

code = code.replace(
  "import Editor from 'react-simple-wysiwyg';",
  `import Editor, {
  Toolbar,
  BtnUndo,
  BtnRedo,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  BtnStyles,
  Separator
} from 'react-simple-wysiwyg';`
);

const targetEditor = `<Editor
                  value={data.bodyContent}
                  onChange={(e) => setData({ ...data, bodyContent: e.target.value })}
                  containerProps={{ style: { height: '100%', minHeight: '300px', width: '100%', resize: 'vertical', overflow: 'auto' } }}
                />`;

const replacementEditor = `<Editor
                  value={data.bodyContent}
                  onChange={(e) => setData({ ...data, bodyContent: e.target.value })}
                  containerProps={{ style: { height: '100%', minHeight: '300px', width: '100%', resize: 'vertical', overflow: 'auto' } }}
                >
                  <Toolbar>
                    <BtnUndo />
                    <BtnRedo />
                    <Separator />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                    <BtnClearFormatting />
                    <Separator />
                    <BtnStyles />
                  </Toolbar>
                </Editor>`;

code = code.replace(targetEditor, replacementEditor);

fs.writeFileSync('src/ResearchSurveyEditor.tsx', code);
