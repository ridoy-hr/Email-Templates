const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace("import { EbulletinEditor } from './EbulletinEditor';", "import { EbulletinEditor } from './EbulletinEditor';\nimport { ResearchSurveyEditor } from './ResearchSurveyEditor';");
code = code.replace("const [currentView, setCurrentView] = useState<'dashboard' | 'editor' | 'webcast-editor' | 'newsletter-editor' | 'virtual-event-editor' | 'ebulletin-editor'>('dashboard');", "const [currentView, setCurrentView] = useState<'dashboard' | 'editor' | 'webcast-editor' | 'newsletter-editor' | 'virtual-event-editor' | 'ebulletin-editor' | 'internal-editor'>('dashboard');");

code = code.replace("if (currentView === 'ebulletin-editor') {\n    return <EbulletinEditor onBack={() => setCurrentView('dashboard')} />;\n  }", "if (currentView === 'ebulletin-editor') {\n    return <EbulletinEditor onBack={() => setCurrentView('dashboard')} />;\n  }\n\n  if (currentView === 'internal-editor') {\n    return <ResearchSurveyEditor onBack={() => setCurrentView('dashboard')} />;\n  }");

fs.writeFileSync('src/App.tsx', code);
