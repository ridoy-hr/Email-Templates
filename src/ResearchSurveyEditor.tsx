import React, { useState } from 'react';
import { 
  ArrowLeft, Copy, Check, MousePointerClick, 
  Image as ImageIcon, AlignLeft, Send, Link, ChevronDown, Sparkles, Gift
} from 'lucide-react';
import { AutoResizeTextarea } from './components/AutoResizeTextarea';
import { generateResearchSurveyHtml } from './generateResearchSurveyHtml';
import Editor, {
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
} from 'react-simple-wysiwyg';

const InputField = ({ label, value, field, setData, icon: Icon }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-gray-500" />}
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => setData((prev: any) => ({ ...prev, [field]: e.target.value }))}
      className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
    />
  </div>
);

const TextAreaField = ({ label, value, field, setData, icon: Icon }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-gray-500" />}
      {label}
    </label>
    <AutoResizeTextarea
      value={value}
      onChange={(val) => setData((prev: any) => ({ ...prev, [field]: val }))}
      placeholder={label}
      className="w-full text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none min-h-[60px]"
    />
  </div>
);


const CustomBtnColor = () => {
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
};

const CustomBtnLink = () => {
  const [showInput, setShowInput] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [savedRange, setSavedRange] = React.useState<Range | null>(null);
  
  const startLink = (e: React.MouseEvent) => {
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
    setUrl('');
  };

  const applyLink = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    
    if (savedRange && url) {
      let linkUrl = url;
      if (!linkUrl.startsWith('http://') && !linkUrl.startsWith('https://') && !linkUrl.startsWith('mailto:')) {
        linkUrl = 'https://' + linkUrl;
      }
      
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
      
      const text = savedRange.toString();
      
      let success = false;
      try {
        if (text.trim() === '') {
          success = document.execCommand('insertHTML', false, `<a href="${linkUrl}">${linkUrl}</a>`);
        } else {
          success = document.execCommand('createLink', false, linkUrl);
        }
      } catch (e) {
        console.error(e);
      }
      
      if (!success) {
        const a = document.createElement('a');
        a.href = linkUrl;
        a.textContent = text || linkUrl;
        savedRange.deleteContents();
        savedRange.insertNode(a);
      }
      
      // Force react-simple-wysiwyg to pick up the change via its onBlur handler
      if (contentEditable) {
         // Focus and blur to trigger the internal onChange of ContentEditable
         (contentEditable as HTMLElement).blur();
         (contentEditable as HTMLElement).focus();
         // Also dispatch input event just in case
         contentEditable.dispatchEvent(new Event('input', { bubbles: true }));
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
          className="absolute top-full right-0 mt-1 bg-white border border-gray-200 shadow-xl rounded-md p-2 flex items-center gap-2 z-[100] min-w-[250px]"
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
};

interface ResearchSurveyEditorProps {
  onBack: () => void;
}

export function ResearchSurveyEditor({ onBack }: ResearchSurveyEditorProps) {
  const [copied, setCopied] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState('');

  const [data, setData] = useState<any>({
    templateId: '04',
    preheaderText: 'Take 7 minutes to help shape the future of recruitment technologies — your insights matter!',
    category: 'Talent Acquisition',
    heroHeading: 'How do your recruitment technologies enhance talent acquisition?',
    heroImage: 'https://public-cdn.hr.com/remoteimages/website-images/emailer-images/survey-mockup-aug-2025-v4-header.png',
    ctaText: 'Take the Survey',
    ctaUrl: 'https://web.hr.com/coaxx',
    bodyContent: `<p style="margin: 0 0 24px 0">As we move through 2025, the team at HR.com is gathering valuable data on today’s Recruitment technologies to help HR professionals gain a better understanding of the tools, platforms, and innovations shaping the way organizations attract and hire top talent.</p><p style="margin: 0 0 24px 0; background: #e6f0fa; border-radius: 8px; padding: 15px 20px; font-weight: 600;"><strong>The survey takes only 7 minutes to complete. Key findings will be shared in an HR.com webcast,</strong> and you’ll receive early access to the full research report: Future of Recruitment Technologies 2025.</p><p style="margin: 0 0 24px 0">These findings will reveal how your strategies and tools compare to other organizations, helping you stay competitive.</p><p style="margin: 0 0 24px 0">We appreciate your support and look forward to your insights.</p>`,
    signatureContentHtml: `<strong>Sue Kelley</strong><br />Product Manager, HR Research Institute<br />research@hr.com<br />Maximizing Human Potential`,
    psContentHtml: `<strong>P.S.</strong> If you missed our last research release, you may enjoy the insights from <a href="#" target="_blank" style="color: #232288; text-decoration: underline;">the previous report</a>. It’s a quick read with helpful benchmarks.`
  });

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);
    setAiError('');
    try {
      const response = await fetch('/api/generate-survey-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          currentTemplateId: data.templateId
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to generate email content.');
      }

      setData(prev => ({
        ...prev,
        preheaderText: resData.preheaderText ?? '',
        category: resData.category ?? '',
        heroHeading: resData.heroHeading ?? '',
        ctaText: resData.ctaText ?? '',
        bodyContent: resData.bodyContent ?? '',
        signatureContentHtml: resData.signatureContentHtml ?? (
          (resData.signatureName || resData.signatureTitle || resData.signatureEmail) ? 
          `<strong>${resData.signatureName || ''}</strong><br />${resData.signatureTitle || ''}<br />${resData.signatureEmail || ''}` : ''
        ),
        psContentHtml: resData.psContentHtml ?? '',
      }));

      // Clear prompt upon successful generation
      setAiPrompt('');

    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'An error occurred while generating content.');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleInsertAppreciationBox = () => {
    const boxHtml = `<p style="margin: 0 0 24px 0; background: #e6f0fa; border-radius: 8px; padding: 15px 20px; font-weight: 600;"><strong>To show our appreciation for sharing your thoughts:</strong> You will receive a complimentary copy of HR.com’s Future of Pay Equity and Transparency 2026 research report and infographic with key findings and recommendations for your organization.</p>`;
    
    // Attempt cursor injection first
    const contentEditable = document.querySelector('.rsw-ce') as HTMLElement;
    const selection = window.getSelection();
    
    if (contentEditable && selection && selection.rangeCount > 0 && contentEditable.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0);
      let success = false;
      try {
        success = document.execCommand('insertHTML', false, boxHtml);
      } catch (e) {
        console.error(e);
      }
      
      if (!success) {
        range.deleteContents();
        const div = document.createElement('div');
        div.innerHTML = boxHtml;
        const frag = document.createDocumentFragment();
        let child = div.firstChild;
        while (child) {
          frag.appendChild(child);
          child = div.firstChild;
        }
        range.insertNode(frag);
      }
      
      contentEditable.blur();
      contentEditable.focus();
      contentEditable.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    } else {
      // Fallback: Append it
      setData(prev => {
        const currentBody = prev.bodyContent || '';
        const spacing = currentBody ? (currentBody.endsWith('\n') || currentBody.endsWith(' ') ? '' : ' ') : '';
        return {
          ...prev,
          bodyContent: currentBody + spacing + boxHtml
        };
      });
    }
  };

  const CustomBtnHighlight = () => {
    return (
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          handleInsertAppreciationBox();
        }}
        title="Insert Appreciation Block (Blue Box)"
        className="p-1 hover:bg-indigo-100 rounded text-indigo-600 transition-colors mx-0.5 cursor-pointer flex items-center justify-center bg-indigo-50/50 hover:text-indigo-700"
        style={{ width: '28px', height: '28px' }}
      >
        <Gift className="w-4 h-4" />
      </button>
    );
  };

  const generatedHtml = generateResearchSurveyHtml(data);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    
    // Assign proper default images based on the template selected
    let defaultHero = data.heroImage;
    if (id === '01') defaultHero = 'https://public-cdn.hr.com/remoteimages/website-images/emailer-images/survey-mockup-aug-2025-hero-01.jpg';
    if (id === '02') defaultHero = 'https://public-cdn.hr.com/remoteimages/website-images/emailer-images/survey-mockup-aug-2025-hero-02.jpg';
    if (id === '03') defaultHero = 'https://public-cdn.hr.com/remoteimages/website-images/emailer-images/survey-mockup-aug-2025-v3-hero.jpg';
    if (id === '04') defaultHero = 'https://public-cdn.hr.com/remoteimages/website-images/emailer-images/survey-mockup-aug-2025-v4-header.png';
    if (id === '05') defaultHero = 'https://public-cdn.hr.com/remoteimages/website-images/emailer-images/survey-mockup-aug-2025-v5-hero.jpg';
    if (id === '06') defaultHero = '';
    if (id === '07') defaultHero = 'https://public-cdn.hr.com/remoteimages/website-images/emailer-images/survey-mockup-aug-2025-v7-hero.jpg';
    if (id === '08') defaultHero = 'https://public-cdn.hr.com/remoteimages/website-images/emailer-images/survey-emailer-header-img-2025-08-04.jpg';
    
    setData({ ...data, templateId: id, heroImage: defaultHero });
  };

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden">
      {/* Sidebar Controls */}
      <div className="w-[400px] border-r border-gray-200 bg-white flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)] z-10">
        <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-20 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-semibold text-gray-900 leading-tight">Research Survey Emails</h1>
            <p className="text-xs text-gray-500 mt-0.5">Edit email content and variables</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-visible p-5 space-y-8 scrollbar-thin">
          
          <div className="bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-white border border-indigo-100 rounded-xl p-4.5 space-y-3.5 relative overflow-hidden shadow-sm">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 w-20 h-20 bg-indigo-100/30 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-100">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-gray-900 leading-none flex items-center gap-1.5">
                  AI Survey Email Assistant
                </h4>
                <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                  Paste raw copy or notes to auto-generate the complete email template!
                </p>
              </div>
            </div>

            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Paste raw email draft, copy from docs, or simply write: 'A 10-minute survey on HR software adoption trends in 2026'..."
              className="w-full text-xs p-2.5 border border-indigo-100 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 min-h-[90px] max-h-[200px] resize-y placeholder-gray-400 leading-relaxed font-sans transition-colors"
            />

            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={aiGenerating || !aiPrompt.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white py-2 rounded-lg text-xs font-semibold shadow-sm hover:shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {aiGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating Email Elements...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Generate with AI</span>
                </>
              )}
            </button>
            
            {aiError && (
              <p className="text-[10px] text-red-500 text-center font-medium bg-red-50 border border-red-100/50 py-1 px-2 rounded">{aiError}</p>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">1. Select Template</h3>
            <div className="space-y-1 relative">
              <label className="text-xs font-medium text-gray-700">Template Version</label>
              <div className="relative">
                <select
                  value={data.templateId}
                  onChange={handleTemplateChange}
                  className="w-full text-sm pl-3 pr-8 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white font-medium text-gray-900"
                >
                  <option value="01">Template 01 - Pink Button, Checkmark laptop</option>
                  <option value="02">Template 02 - Pink Button, Checklist laptop</option>
                  <option value="03">Template 03 - 60/40 Layout, Right laptop</option>
                  <option value="04">Template 04 - Gray Hero Box, Right laptop</option>
                  <option value="05">Template 05 - Full Hero Image, Checkmark laptop</option>
                  <option value="06">Template 06 - Top Badge, Gradient Button</option>
                  <option value="07">Template 07 - Orange Rounded Shadow Button</option>
                  <option value="08">Template 08 - Bold Left CTA, Large Graphic</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">2. Header & Hero</h3>
            <InputField label="Preheader Text" value={data.preheaderText} field="preheaderText" setData={setData} icon={AlignLeft} />
            <InputField label="Category / Tag" value={data.category} field="category" setData={setData} icon={AlignLeft} />
            <TextAreaField label="Hero Heading" value={data.heroHeading} field="heroHeading" setData={setData} icon={AlignLeft} />
            <InputField label="Hero Image URL" value={data.heroImage} field="heroImage" setData={setData} icon={ImageIcon} />
            <p className="text-[10px] text-gray-500 mt-1">Leave empty to remove hero image</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">3. Call to Action</h3>
            <InputField label="Button Text" value={data.ctaText} field="ctaText" setData={setData} icon={MousePointerClick} />
            <InputField label="Button URL" value={data.ctaUrl} field="ctaUrl" setData={setData} icon={Link} />
            <p className="text-[10px] text-gray-500 mt-1">Leave Button Text empty to remove CTA completely</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">4. Body Content</h3>
            <div className="space-y-1">
              <div className="flex justify-between items-center pb-1">
                <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                  <AlignLeft className="w-3.5 h-3.5 text-gray-500" />
                  Email Body (WYSIWYG)
                </label>
                <button
                  type="button"
                  onClick={handleInsertAppreciationBox}
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100/70 px-2 py-1 rounded-md border border-indigo-100 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  <Gift className="w-3 h-3 text-indigo-500 animate-pulse" />
                  <span>Add Appreciation Box (Blue Highlight)</span>
                </button>
              </div>
              <div className="w-full bg-white rounded-md border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 relative z-10" style={{ minHeight: '300px' }}>
                <Editor
                  value={data.bodyContent}
                  onChange={(e: any) => { if (data.bodyContent !== e.target.value) setData({ ...data, bodyContent: e.target.value }) }}
                  containerProps={{ style: { height: '100%', minHeight: '300px', width: '100%', resize: 'vertical', overflow: 'visible' } }}
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
                    <CustomBtnColor />
                    <CustomBtnLink />
                    <CustomBtnHighlight />
                    <BtnClearFormatting />
                    <Separator />
                    <BtnStyles />
                  </Toolbar>
                </Editor>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">5. Signature & P.S.</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-gray-500" />
                Signature Content (WYSIWYG)
              </label>
              <div className="w-full bg-white rounded-md border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 relative z-10" style={{ minHeight: '150px' }}>
                <Editor
                  value={data.signatureContentHtml}
                  onChange={(e) => {
                    if (data.signatureContentHtml !== e.target.value) setData((prev: any) => ({ ...prev, signatureContentHtml: e.target.value }));
                  }}
                  containerProps={{ style: { height: '100%', minHeight: '150px', width: '100%', resize: 'vertical', overflow: 'visible' } }}
                >
                  <Toolbar>
                    <BtnUndo />
                    <BtnRedo />
                    <Separator />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <Separator />
                    <CustomBtnColor />
                    <CustomBtnLink />
                    <BtnClearFormatting />
                  </Toolbar>
                </Editor>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">Leave signature empty to remove section</p>
            </div>
            
            <div className="pt-2 space-y-2">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-gray-500" />
                P.S. Content (WYSIWYG)
              </label>
              <div className="w-full bg-white rounded-md border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 relative z-10" style={{ minHeight: '150px' }}>
                <Editor
                  value={data.psContentHtml}
                  onChange={(e) => {
                    if (data.psContentHtml !== e.target.value) setData((prev: any) => ({ ...prev, psContentHtml: e.target.value }));
                  }}
                  containerProps={{ style: { height: '100%', minHeight: '150px', width: '100%', resize: 'vertical', overflow: 'visible' } }}
                >
                  <Toolbar>
                    <BtnUndo />
                    <BtnRedo />
                    <Separator />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <Separator />
                    <CustomBtnColor />
                    <CustomBtnLink />
                    <BtnClearFormatting />
                  </Toolbar>
                </Editor>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">Leave P.S. content empty to remove section</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
        <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Preview</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-medium border border-blue-100">
              Template {data.templateId}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              copied
                ? 'bg-green-500 text-white shadow-sm shadow-green-200'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied HTML' : 'Copy HTML'}
          </button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <div className="max-w-[600px] mx-auto bg-white shadow-sm ring-1 ring-black/5 rounded-lg overflow-hidden min-h-[800px]">
            <iframe
              title="Email Preview"
              srcDoc={generatedHtml}
              className="w-full h-full min-h-[800px] border-0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
