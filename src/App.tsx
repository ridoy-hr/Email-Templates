/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Search, Bell, User, LayoutDashboard, FileText, 
  Send, Users, Settings, Plus, Mail, Presentation,
  Newspaper, Calendar, PartyPopper, MessageSquare,
  Clock, MoreHorizontal, ArrowRight, ArrowLeft, Type, AlignLeft,
  Image as ImageIcon, MousePointerClick, Minus, Trash2, ChevronUp, ChevronDown,
  Code, Upload
} from 'lucide-react';

import { AutoResizeTextarea } from './components/AutoResizeTextarea';
import { WebcastEditor } from './WebcastEditor';
import { NewsletterEditor } from './NewsletterEditor';
import { VirtualEventEditor } from './VirtualEventEditor';
import { EbulletinEditor } from './EbulletinEditor';
import { ResearchSurveyEditor } from './ResearchSurveyEditor';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState<'dashboard' | 'editor' | 'webcast-editor' | 'newsletter-editor' | 'virtual-event-editor' | 'ebulletin-editor' | 'internal-editor'>('dashboard');

  const emailTypes = [
    { id: 'webcast', name: 'Webcast Email', icon: <Presentation className="w-6 h-6" />, desc: 'Invite your audience to a live online event.', color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
    { id: 'newsletter', name: 'Newsletter', icon: <Newspaper className="w-6 h-6" />, desc: 'Share updates, news, and valuable content.', color: 'bg-[#f0fdf4] text-[#00b85c]', borderColor: 'border-[#bbf7d0]' },
    { id: 'virtual-event', name: 'Virtual Event Email', icon: <Calendar className="w-6 h-6" />, desc: 'Drive sign-ups for your upcoming virtual events.', color: 'bg-purple-50 text-purple-600', borderColor: 'border-purple-100' },
    { id: 'promo', name: 'Ebulletin', icon: <Mail className="w-6 h-6" />, desc: 'Curate news, events, and industry updates into a professional bulletin.', color: 'bg-amber-50 text-amber-600', borderColor: 'border-amber-100' },
    { id: 'internal', name: 'Research Survey Emails', icon: <MessageSquare className="w-6 h-6" />, desc: 'Communicate important news to your team.', color: 'bg-gray-50 text-gray-600', borderColor: 'border-gray-200' },
    { id: 'blank', name: 'Start from Scratch', icon: <Plus className="w-6 h-6" />, desc: 'Build a custom email using the drag-and-drop editor.', color: 'bg-slate-50 text-slate-600', borderColor: 'border-slate-200' },
  ];

  const recentDrafts = [
    { id: 1, name: 'Q3 Product Update Newsletter', type: 'Newsletter', lastEdited: '2 hours ago', status: 'Draft' },
    { id: 2, name: 'Annual Tech Summit Invite', type: 'Webcast', lastEdited: 'Yesterday', status: 'In Review' },
    { id: 3, name: 'Weekly HR Ebulletin', type: 'Ebulletin', lastEdited: 'Oct 12, 2023', status: 'Draft' },
  ];

  if (currentView === 'editor') {
    return <EmailEditor onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'webcast-editor') {
    return <WebcastEditor onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'newsletter-editor') {
    return <NewsletterEditor onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'virtual-event-editor') {
    return <VirtualEventEditor onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'ebulletin-editor') {
    return <EbulletinEditor onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'internal-editor') {
    return <ResearchSurveyEditor onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans flex text-gray-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-[#00b85c] rounded flex items-center justify-center mr-3 shrink-0">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">Email Hub</h1>
        </div>

        <div className="p-4">
          <button 
            onClick={() => setCurrentView('editor')}
            className="w-full flex items-center justify-center space-x-2 bg-[#00b85c] hover:bg-[#00a854] text-white py-2.5 rounded-lg font-medium transition-colors shadow-sm cursor-pointer mb-6"
          >
            <Plus className="w-5 h-5" />
            <span>Create Email</span>
          </button>

          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <NavItem icon={<FileText />} label="Templates" active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} />
            <NavItem icon={<Send />} label="Campaigns" active={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} />
            <NavItem icon={<Users />} label="Audience" active={activeTab === 'audience'} onClick={() => setActiveTab('audience')} />
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-gray-100">
          <nav className="space-y-1">
            <NavItem icon={<Settings />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates, drafts, or campaigns..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] bg-gray-50 hover:bg-gray-100 transition-colors focus:bg-white"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 ml-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors relative cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <button className="flex items-center space-x-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#e6f8ef] flex items-center justify-center border border-[#bbf7d0]">
                <User className="w-4 h-4 text-[#00b85c]" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Mahbub Alam</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What are you creating today?</h2>
              <p className="text-gray-500">Choose a template type to jumpstart your email building process.</p>
            </div>

            {/* Email Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {emailTypes.map((type) => (
                <div 
                  key={type.id}
                  onClick={() => {
                    if (type.id === 'blank') {
                      setCurrentView('editor');
                    } else if (type.id === 'promo') {
                      setCurrentView('ebulletin-editor');
                    } else if (type.id === 'webcast') {
                      setCurrentView('webcast-editor');
                    } else if (type.id === 'newsletter') {
                      setCurrentView('newsletter-editor');
                    } else if (type.id === 'virtual-event') {
                      setCurrentView('virtual-event-editor');
                    } else if (type.id === 'internal') {
                      setCurrentView('internal-editor');
                    }
                  }}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#00b85c] transition-all cursor-pointer group flex flex-col"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${type.color} ${type.borderColor}`}>
                    {type.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#00b85c] transition-colors">{type.name}</h3>
                  <p className="text-sm text-gray-500 flex-1 leading-relaxed">{type.desc}</p>
                  
                  <div className="mt-4 flex items-center text-sm font-semibold text-[#00b85c] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Use Template</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Drafts */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Drafts</h3>
              <button className="text-sm font-semibold text-[#00b85c] hover:text-[#00a854] cursor-pointer">View All</button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-100">
                {recentDrafts.map((draft) => (
                  <div key={draft.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#00b85c] transition-colors cursor-pointer">{draft.name}</h4>
                        <div className="flex items-center space-x-2 mt-0.5 text-xs text-gray-500">
                          <span className="font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{draft.type}</span>
                          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {draft.lastEdited}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        {draft.status}
                      </span>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
        active 
          ? 'bg-[#f0fdf4] text-[#00b85c]' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className={`w-5 h-5 flex items-center justify-center ${active ? 'text-[#00b85c]' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}

function EmailEditor({ onBack }: { onBack: () => void }) {
  const [isSending, setIsSending] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('New Campaign');
  const [viewMode, setViewMode] = useState<'visual' | 'code' | 'split'>('visual');
  const [codeContent, setCodeContent] = useState('');
  const [isCustomHtml, setIsCustomHtml] = useState(false);
  const [brandColor, setBrandColor] = useState('#00b85c');
  const [isParsing, setIsParsing] = useState(false);

  const [emailBgColor, setEmailBgColor] = useState('#ffffff');

  const [spacing, setSpacing] = useState<'small'|'normal'|'large'>('normal');

  const [blocks, setBlocks] = useState([
    { id: '1', type: 'image', content: '', settings: { fullWidth: true } },
    { id: '2', type: 'heading', content: 'Welcome to our latest update' },
    { id: '3', type: 'text', content: 'We are thrilled to share the newest features and improvements we\'ve been working on. This email builder makes it incredibly easy to create beautiful messages.' },
    { id: '4', type: 'button', content: 'Read More' },
  ]);
  useEffect(() => {
    setIsCustomHtml(false);
  }, [subject, brandColor, emailBgColor, spacing, blocks]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setIsParsing(true);
        try {
          const res = await fetch('/api/parse-html-blocks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ htmlContent: content })
          });
          const data = await res.json();
          if (data.blocks) {
            setBlocks(data.blocks);
          } else if (data.error) {
            alert("Error parsing template: " + data.error);
          }
        } catch (err) {
          alert("Error parsing template. Please try again.");
        } finally {
          setIsParsing(false);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const spacingMap = {
    small: { pad: '4px 0', tailwind: 'py-1' },
    normal: { pad: '10px 0', tailwind: 'py-3' },
    large: { pad: '24px 0', tailwind: 'py-6' }
  };

  const addBlock = (type: string) => {
    let content = '';
    let settings = {};
    if (type === 'heading') content = 'New Heading';
    if (type === 'text') content = 'Start typing your text here...';
    if (type === 'button') content = 'Click Here';
    if (type === 'html') content = '<!-- Add your custom HTML here -->';
    if (type === 'image') settings = { fullWidth: false };
    if (type === 'signature') content = 'Best regards,\n\nJohn Doe\nCEO, Company';
    if (type === 'footer') content = '© 2026 Company. All rights reserved.\n\nUpdate your preferences or Unsubscribe';
    setBlocks([...blocks, { id: Math.random().toString(), type, content, settings }]);
  };

  const generateEmailHtml = () => {
    const pad = spacingMap[spacing].pad;
    const rows = blocks.map(b => {
      const content = b.content || '';
      if (b.type === 'heading') return `<tr><td style="padding: ${pad};"><h1 style="font-family: Helvetica, Arial, sans-serif; font-size: 24px; color: #111827; margin: 0; font-weight: bold;">${content}</h1></td></tr>`;
      if (b.type === 'text') return `<tr><td style="padding: ${pad};"><p style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; color: #4b5563; margin: 0; line-height: 1.6;">${content.replace(/\n/g, '<br>')}</p></td></tr>`;
      if (b.type === 'image') {
        const widthStyle = b.settings?.fullWidth ? 'width: 100%;' : 'max-width: 100%; border-radius: 8px;';
        return `<tr><td style="padding: ${pad}; text-align: center;">${content ? `<img src="${content}" alt="" style="${widthStyle} height: auto; display: block; margin: 0 auto;" />` : `<div style="background-color: #f3f4f6; padding: 40px; text-align: center; color: #9ca3af; font-family: sans-serif; border-radius: 8px;">Image Placeholder</div>`}</td></tr>`;
      }
      if (b.type === 'button') return `<tr><td style="padding: ${pad}; text-align: center;"><table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;"><tr><td align="center" style="border-radius: 6px;" bgcolor="${brandColor}"><a href="#" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 6px; padding: 14px 28px; border: 1px solid ${brandColor}; display: inline-block; font-weight: bold;">${content}</a></td></tr></table></td></tr>`;
      if (b.type === 'divider') return `<tr><td style="padding: ${pad};"><hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0;" /></td></tr>`;
      if (b.type === 'html') return `<tr><td style="padding: ${pad};">${content}</td></tr>`;
      if (b.type === 'signature') return `<tr><td style="padding: ${pad};"><p style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #4b5563; margin: 0; line-height: 1.5;">${content.replace(/\n/g, '<br>')}</p></td></tr>`;
      if (b.type === 'footer') return `<tr><td style="padding: 24px 0 10px 0; text-align: center;"><p style="font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #9ca3af; margin: 0; line-height: 1.5;">${content.replace(/\n/g, '<br>')}</p></td></tr>`;
      return '';
    }).join('\n          ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!--[if mso]>
        <table width="600" border="0" cellspacing="0" cellpadding="0"><tr><td>
        <![endif]-->
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: ${emailBgColor}; border-radius: 12px; max-width: 600px; width: 100%; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          <tr>
            <td style="padding: 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                ${rows}
              </table>
            </td>
          </tr>
        </table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
  };

  const updateBlock = (id: string, content: string, settings?: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content, settings: settings || b.settings } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...blocks];
    [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    setBlocks(newBlocks);
  };

  const moveDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
    setBlocks(newBlocks);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8f9fa] fixed inset-0 z-50 font-sans">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center flex-1">
          <button onClick={onBack} className="p-2 mr-4 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject Line</span>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-lg font-bold text-gray-900 border-none focus:outline-none focus:ring-0 bg-transparent placeholder-gray-300 w-96 p-0"
              placeholder="Enter subject line..."
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
           <label className={`px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm cursor-pointer transition-colors flex items-center space-x-2 ${isParsing ? 'opacity-50 pointer-events-none' : ''}`}>
             <Upload className="w-4 h-4" />
             <span>{isParsing ? 'Parsing...' : 'Upload HTML'}</span>
             <input type="file" accept=".html,.htm" className="hidden" onChange={handleFileUpload} disabled={isParsing} />
           </label>
           <button 
             onClick={() => {
                const html = isCustomHtml ? codeContent : generateEmailHtml();
                navigator.clipboard.writeText(html);
                alert('HTML copied to clipboard!');
             }}
             className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm cursor-pointer transition-colors"
           >
             Copy HTML
           </button>
           <button 
             onClick={() => setShowSendModal(true)}
             className="px-4 py-2 text-sm font-semibold text-white bg-[#00b85c] rounded-lg hover:bg-[#00a854] shadow-sm flex items-center space-x-2 cursor-pointer transition-colors"
           >
             <Send className="w-4 h-4" />
             <span>Send Email</span>
           </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col shrink-0 overflow-y-auto">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Content Blocks</h3>
           <p className="text-sm text-gray-500 mb-6">Click to add blocks to your email.</p>
           
           <div className="grid grid-cols-2 gap-3">
              <ToolButton icon={<Type className="w-5 h-5" />} label="Heading" onClick={() => addBlock('heading')} />
              <ToolButton icon={<AlignLeft className="w-5 h-5" />} label="Text" onClick={() => addBlock('text')} />
              <ToolButton icon={<ImageIcon className="w-5 h-5" />} label="Image" onClick={() => addBlock('image')} />
              <ToolButton icon={<MousePointerClick className="w-5 h-5" />} label="Button" onClick={() => addBlock('button')} />
              <ToolButton icon={<Minus className="w-5 h-5" />} label="Divider" onClick={() => addBlock('divider')} />
              <ToolButton icon={<Code className="w-5 h-5" />} label="HTML Code" onClick={() => addBlock('html')} />
              <ToolButton icon={<Type className="w-5 h-5" />} label="Signature" onClick={() => addBlock('signature')} />
              <ToolButton icon={<AlignLeft className="w-5 h-5" />} label="Footer" onClick={() => addBlock('footer')} />
           </div>

           <div className="mt-8 pt-6 border-t border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Global Styles</h3>
             <div className="space-y-6">
               <div>
                 <label className="text-sm font-medium text-gray-700 block mb-2">Background Color</label>
                 <div className="flex items-center space-x-2">
                   {['#ffffff', '#f8f9fa', '#eff6ff', '#f0fdf4'].map(color => (
                     <button
                       key={color}
                       onClick={() => setEmailBgColor(color)}
                       className={`w-8 h-8 rounded-full border border-gray-200 cursor-pointer ${emailBgColor === color ? 'ring-2 ring-offset-1 ring-[#00b85c]' : ''}`}
                       style={{ backgroundColor: color }}
                     />
                   ))}
                   <div className="h-8 w-px bg-gray-200 mx-1"></div>
                   <input
                     type="color"
                     value={emailBgColor}
                     onChange={(e) => setEmailBgColor(e.target.value)}
                     className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden cursor-pointer shrink-0"
                     title="Custom color"
                   />
                 </div>
               </div>

               <div>
                 <label className="text-sm font-medium text-gray-700 block mb-2">Brand Color (Buttons)</label>
                 <div className="flex items-center space-x-2">
                   {['#00b85c', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6'].map(color => (
                     <button
                       key={color}
                       onClick={() => setBrandColor(color)}
                       className={`w-8 h-8 rounded-full border border-gray-200 cursor-pointer ${brandColor === color ? 'ring-2 ring-offset-1 ring-[#00b85c]' : ''}`}
                       style={{ backgroundColor: color }}
                     />
                   ))}
                   <div className="h-8 w-px bg-gray-200 mx-1"></div>
                   <input
                     type="color"
                     value={brandColor}
                     onChange={(e) => setBrandColor(e.target.value)}
                     className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden cursor-pointer shrink-0"
                     title="Custom color"
                   />
                 </div>
               </div>

               <div>
                 <label className="text-sm font-medium text-gray-700 block mb-2">Block Spacing</label>
                 <div className="flex bg-gray-100 p-1 rounded-lg">
                   {['small', 'normal', 'large'].map((s: any) => (
                     <button 
                       key={s}
                       onClick={() => setSpacing(s)}
                       className={`flex-1 px-2 py-1.5 text-xs font-semibold rounded-md transition-colors capitalize ${spacing === s ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
                     >
                       {s}
                     </button>
                   ))}
                 </div>
               </div>
             </div>
           </div>
        </div>

         {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-8 flex justify-center items-start bg-gray-50/50 relative">
          
          {showSendModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Send Campaign</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To (Recipients)</label>
                    <input 
                      type="text" 
                      value={recipientEmail}
                      onChange={e => setRecipientEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
                      placeholder="e.g. subscribers@example.com"
                    />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                     <input 
                       type="text" 
                       value={subject}
                       disabled
                       className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg text-sm"
                     />
                  </div>
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                  <button onClick={() => setShowSendModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setIsSending(true);
                      setTimeout(() => {
                        setIsSending(false);
                        setShowSendModal(false);
                        alert(`Email campaign sent successfully to ${recipientEmail || 'all recipients'}!`);
                        setRecipientEmail('');
                      }, 1500);
                    }}
                    disabled={isSending || !recipientEmail}
                    className="px-4 py-2 text-sm font-semibold text-white bg-[#00b85c] rounded-lg hover:bg-[#00a854] shadow-sm flex items-center space-x-2 cursor-pointer transition-colors disabled:opacity-75 disabled:cursor-wait"
                  >
                    {isSending ? (
                      <>
                        <Send className="w-4 h-4 animate-pulse" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={`w-full bg-white shadow-sm border border-gray-200 rounded-lg flex flex-col min-h-[600px] transition-all duration-300 ${viewMode === 'split' ? 'max-w-6xl' : 'max-w-2xl'}`}>
             <div className="bg-gray-50 border-b border-gray-100 p-4 rounded-t-lg flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                   <span className="font-medium">From:</span>
                   <span className="bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-700">newsletter@company.com</span>
                </div>
                
                <div className="flex bg-gray-200 p-1 rounded-lg">
                  <button 
                    onClick={() => setViewMode('visual')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${viewMode === 'visual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
                  >Visual</button>
                  <button 
                    onClick={() => {
                      if (!isCustomHtml) setCodeContent(generateEmailHtml());
                      setViewMode('split');
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${viewMode === 'split' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
                  >Split</button>
                  <button 
                    onClick={() => {
                      if (!isCustomHtml) setCodeContent(generateEmailHtml());
                      setViewMode('code');
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${viewMode === 'code' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
                  >Code</button>
                </div>
             </div>
             
             {viewMode === 'split' && (
               <div className="flex flex-1 overflow-hidden rounded-b-lg">
                 {/* Split Preview */}
                 <div className="w-1/2 border-r border-gray-200 bg-white relative overflow-hidden flex flex-col">
                   <div className="bg-gray-50 p-2 text-xs font-semibold text-gray-500 border-b border-gray-200 text-center shrink-0">Live Preview</div>
                   <iframe srcDoc={isCustomHtml ? codeContent : generateEmailHtml()} className="w-full flex-1 border-0" title="Split HTML Preview" />
                 </div>
                 {/* Split Code */}
                 <div className="w-1/2 flex flex-col bg-gray-900">
                   <div className="bg-gray-800 p-2 text-xs font-semibold text-gray-400 border-b border-gray-700 text-center shrink-0">Code Editor</div>
                   <textarea 
                     value={isCustomHtml ? codeContent : generateEmailHtml()}
                     onChange={(e) => {
                       setCodeContent(e.target.value);
                       setIsCustomHtml(true);
                     }}
                     className="w-full grow p-4 font-mono text-sm bg-transparent text-gray-100 focus:outline-none resize-none"
                     spellCheck={false}
                   />
                 </div>
               </div>
             )}

             {viewMode === 'visual' && (
               isCustomHtml ? (
                 <iframe srcDoc={codeContent} className="w-full flex-1 border-0 bg-white rounded-b-xl" title="Custom HTML Preview" />
               ) : (
                 <div className="p-8 grow flex flex-col" style={{ backgroundColor: emailBgColor }}>
               {blocks.length === 0 && (
                 <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 pt-20">
                   <ImageIcon className="w-12 h-12 text-gray-200" />
                   <p className="text-sm font-medium">Your email is empty. Add blocks from the left sidebar.</p>
                 </div>
               )}

               {blocks.map((block, index) => (
                  <div key={block.id} className={`relative group border-2 border-transparent hover:border-[#00b85c] px-4 ${spacingMap[spacing].tailwind} rounded-lg transition-colors`}>
                    
                    {/* Hover Actions */}
                    <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity flex bg-white shadow-sm border border-gray-200 rounded-md overflow-hidden z-10">
                       {block.type === 'image' && (
                          <button onClick={() => updateBlock(block.id, block.content, { fullWidth: !block.settings?.fullWidth })} className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-r border-gray-200">
                            {block.settings?.fullWidth ? 'Make Boxed' : 'Make Full Width'}
                          </button>
                       )}
                       <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-30">
                         <ChevronUp className="w-4 h-4" />
                       </button>
                       <button onClick={() => moveDown(index)} disabled={index === blocks.length - 1} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-30 border-l border-gray-200">
                         <ChevronDown className="w-4 h-4" />
                       </button>
                       <button onClick={() => removeBlock(block.id)} className="p-1.5 text-red-500 hover:bg-red-50 border-l border-gray-200">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>

                    {block.type === 'heading' && (
                       <input 
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, e.target.value)}
                          className="w-full text-3xl font-bold text-gray-900 focus:outline-none bg-transparent placeholder-gray-300"
                          placeholder="Heading text..."
                       />
                    )}
                    
                    {block.type === 'text' && (
                       <AutoResizeTextarea 
                          value={block.content}
                          onChange={(val: string) => updateBlock(block.id, val)}
                          className="w-full text-base text-gray-600 focus:outline-none bg-transparent resize-none overflow-hidden placeholder-gray-300 leading-relaxed"
                          placeholder="Type your message here..."
                       />
                    )}

                    {block.type === 'signature' && (
                       <AutoResizeTextarea 
                          value={block.content}
                          onChange={(val: string) => updateBlock(block.id, val)}
                          className="w-full text-sm text-gray-600 focus:outline-none bg-transparent resize-none overflow-hidden placeholder-gray-300 leading-relaxed"
                          placeholder="Your signature..."
                       />
                    )}

                    {block.type === 'footer' && (
                       <AutoResizeTextarea 
                          value={block.content}
                          onChange={(val: string) => updateBlock(block.id, val)}
                          className="w-full text-xs text-center text-gray-400 focus:outline-none bg-transparent resize-none overflow-hidden placeholder-gray-300 leading-relaxed"
                          placeholder="Footer text..."
                       />
                    )}
                    
                    {block.type === 'image' && (
                       <div className={`w-full relative group/img overflow-hidden ${block.settings?.fullWidth ? '' : 'rounded-lg max-w-lg mx-auto'}`}>
                          {block.content ? (
                            <img src={block.content} alt="" className="w-full h-auto object-cover block bg-gray-100" />
                          ) : (
                            <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400">
                              <ImageIcon className="w-8 h-8 mb-2" />
                              <span className="text-sm font-medium">Click to set image URL</span>
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <input 
                              type="text" 
                              className="w-3/4 p-2 text-sm text-center border-none rounded bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00b85c]" 
                              placeholder="Paste Image URL here..." 
                              value={block.content} 
                              onChange={e => updateBlock(block.id, e.target.value)} 
                            />
                          </div>
                       </div>
                    )}
                    
                    {block.type === 'button' && (
                       <div className="flex justify-center py-2">
                         <input 
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, e.target.value)}
                            className="px-8 py-3.5 text-white font-bold rounded-lg focus:outline-none text-center shadow-sm placeholder-white/70 min-w-[150px]"
                            style={{ backgroundColor: brandColor }}
                            placeholder="Button Text"
                         />
                       </div>
                    )}
                    
                    {block.type === 'divider' && (
                       <hr className="my-6 border-t-2 border-gray-100" />
                    )}

                    {block.type === 'html' && (
                       <div className="w-full">
                         <div className="bg-gray-800 text-gray-200 text-xs px-3 py-2 rounded-t-md font-mono flex justify-between items-center">
                           <span>Custom HTML</span>
                         </div>
                         <textarea 
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, e.target.value)}
                            className="w-full h-32 p-3 text-sm font-mono text-gray-100 bg-gray-900 focus:outline-none resize-y rounded-b-md"
                            placeholder="<div>Your custom HTML here</div>"
                            spellCheck={false}
                         />
                       </div>
                    )}
                  </div>
               ))}
             </div>
               )
             )}

             {viewMode === 'code' && (
               <div className="grow flex flex-col rounded-b-lg overflow-hidden">
                 <div className="bg-blue-50 p-3 text-sm text-blue-700 border-b border-blue-100">
                   <strong>Code View:</strong> Edit raw HTML here. (Note: Form changes will overwrite custom HTML edits)
                 </div>
                 <textarea 
                   value={isCustomHtml ? codeContent : generateEmailHtml()}
                   onChange={(e) => {
                     setCodeContent(e.target.value);
                     setIsCustomHtml(true);
                   }}
                   className="w-full grow min-h-[500px] p-6 font-mono text-sm bg-gray-900 text-gray-100 focus:outline-none resize-none"
                   spellCheck={false}
                 />
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-[#00b85c] hover:bg-[#f0fdf4] hover:text-[#00b85c] transition-all text-gray-600 bg-white shadow-sm cursor-pointer group"
    >
      <div className="mb-2 text-gray-400 group-hover:text-[#00b85c] transition-colors">{icon}</div>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}

