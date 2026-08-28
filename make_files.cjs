const fs = require('fs');

const editorCode = `import React, { useState } from 'react';
import { 
  RotateCcw, Eye, Code, Monitor, Smartphone, Copy, Download, 
  Calendar as CalendarIcon, Megaphone, FileText, Clock, BarChart, 
  ChevronDown, ChevronUp, ArrowUp, ArrowDown, Check, Globe, ArrowLeft,
  Plus, ImageIcon
} from 'lucide-react';
import { generateEbulletinHtml } from './generateEbulletinHtml';

export function EbulletinEditor({ onBack }: { onBack: () => void }) {
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  
  const [data, setData] = useState({
    date: '06/15/2026',
    title: 'All Things HR',
    badge: 'Weekly eBulletin',
    
    sections: {
      news: {
        enabled: true,
        sectionTitle: 'HR in the News!',
        adImage: 'https://media-cdn.hr.com/media.hr.com/email_images/ebulletins/sponsorads/2026/300px250px_HR-eNewsletter_06@2x.jpg',
        adUrl: 'https://lattice.com/noregrets?utm_source=hrcom&utm_medium=paid-email&utm_campaign=noregrets&utm_content=newsletter&imcn=fy27brand',
        items: [
          { id: 1, title: 'Manager Alleges Capital One Disguised His Disability as a Performance Problem', note: 'HR lessons learned', url: 'https://www.hcamag.com/us/news/general/manager-alleges-capital-one-disguised-his-disability-as-a-performance-problem/578150' },
          { id: 2, title: 'How Can Employers Address AI Anxiety in the Workplace?', note: 'How can we bridge the gap?', url: 'https://www.hcamag.com/us/specialization/employee-engagement/how-can-employers-address-ai-anxiety-in-the-workplace/578170' }
        ]
      },
      event: {
        enabled: true,
        sectionTitle: 'Featured Event',
        title: 'What Most HR Leaders Miss Before Someone Quits',
        dateStr: 'June 30  ·  2PM ET',
        desc: 'Most employees decide to leave months before resigning, and HR teams miss the signals. Learn to spot flight-risk employees early, use AI to surface attrition risk, and compete for talent on culture instead of budget. Attend live for 1 SHRM PDC.',
        image: 'https://media-cdn.hr.com/Emails/eBulletin/rippling-logo-2400x342.png',
        url: 'https://rippling.registration.goldcast.io/webinar/d391620e-203f-48ab-a781-28837bf70f9f?utm_source=hr.com&utm_medium=email&utm_program=experimental-engagement&utm_campaign=15June2026_HR.com_Newsletter_Native_HR_Leader_in_AI_Webinar&utm_product=hr',
        btnText: '&#10003; Register Now'
      },
      report: {
        enabled: true,
        sectionTitle: 'Featured Report',
        title: '2026 State of People Strategy Report: Key HR Trends to Watch',
        desc: 'Read the report to learn what 1000+ HR leaders shared on top priorities and concerns for 2026: focusing on AI, DEIB, performance management, and more.',
        image: 'https://media-cdn.hr.com/Emails/eBulletin/lattice-logo-2.jpg',
        url: 'https://lattice.com/state-of-people-strategy/2026?utm_source=hrcom&utm_medium=paid-email&utm_campaign=noregrets&utm_content=newsletter&imcn=fy27brand',
        btnText: '&#128229; Download Research'
      },
      survey: {
        enabled: true,
        tag: 'Spotlight Survey',
        title: 'Is your L&D tech driving real employee growth?',
        desc: 'Find out how you measure up when you provide your insights and expertise.',
        image: 'https://media-cdn.hr.com/Emails/eBulletin/spotlight-survey.png',
        url: 'https://survey.alchemer.com/s3/8814852/Future-of-Learning-Technology-and-Upskilling-2026-HRRI',
        btnText: '&#128203; Complete Survey'
      },
      research: {
        enabled: true,
        sectionTitle: 'HR Research Institute',
        linkText: 'More',
        linkUrl: 'https://www.hr.com/en/resources/free_research_white_papers/',
        title: "HR.com's State of Today's HR Technology and Integrations 2026",
        desc: 'New research shows "death-by-a-thousand-cuts" tech friction is slowing organizations. 61% rate their tech as moderately developed or lower. Discover key insights for HR.',
        image: 'https://public-cdn.hr.com/system/app/media/rs/2026/5/25/mpl2968v/og.jpg',
        url: 'https://www.hr.com/en/resources/free_research_white_papers/hrcoms-state-of-todays-hr-technology-and-integrati_mpl2dhk3.html',
        btnText: '&#128229; Download Research'
      },
      aihub: {
        enabled: true,
        sectionTitle: 'HR & AI Hub',
        linkText: 'Subscribe for AI News',
        linkUrl: 'https://aixfiles.substack.com',
        title: 'Charisma, Looks, Transcendent Talent, Messy Jobs: Great Work If You Can Get It',
        desc: 'AI is more likely to reshape jobs than eliminate them. Economist Tyler Cowen highlights the growing value of adaptability, initiative, and human-centric skills — underscoring the need for workforce reskilling and AI readiness strategies.',
        image: 'https://media-cdn.hr.com/Emails/eBulletin/hr-and-ai-hub.png',
        url: 'https://aixfiles.substack.com/p/charisma-looks-transcendent-talent',
        btnText: '&#128214; Read More'
      },
      awards: {
        enabled: true,
        sectionTitle: 'Congratulations HR Award Winners!',
        linkText: 'View All Awards',
        linkUrl: 'https://web.hr.com/xcn0',
        tag: '&#127942; Award Winner',
        category: 'Best Rewards & Recognition Platform:',
        winner: 'AwardCo',
        image: 'https://media-cdn.hr.com/Emails/eBulletin/hr-com-awards-logo-2.png'
      },
      podcast: {
        enabled: true,
        sectionTitle: 'Podcast Spotlight',
        linkText: 'More',
        linkUrl: 'https://www.hr.com/en/resources/podcasts/',
        title: 'Who Wants to Do Payroll?',
        desc: 'Learn how organizations can elevate payroll into a strategic business function. Hear about practical approaches to leadership, ownership, career development, and building payroll teams that drive accuracy, compliance, and organizational impact.',
        guest: 'Guest: Mariah Hantis, Turing',
        image: 'https://public-cdn.hr.com/remoteimages/website-images/podcasts/images/Who-Wants-to-Do-Payroll.webp',
        url: 'https://web.hr.com/xn4v',
        btnText: '&#128250; Tune In'
      },
      webcasts: {
        enabled: true,
        sectionTitle: 'Featured Webcasts',
        linkText: 'More',
        linkUrl: 'https://www.hr.com/en?t=/webcasts/upcoming',
        items: [
          {
            id: 1,
            title: 'Is Your Health Plan Driving Up Chronic Disease Costs by Design?',
            date: 'June 16, 2026  ·  2:00–3:00 PM ET',
            desc: 'Explore how chronic disease, especially diabetes, drives health plan costs and how benefit design may unintentionally increase expenses and fiduciary risk.',
            image: 'https://public-cdn.hr.com/system/app/media/rs/2021/5/27/kp745nqj/120.jpg',
            url: 'https://web.hr.com/k76go'
          },
          {
            id: 2,
            title: 'Lead Loud and Clear: Communication Strategies That Inspire Action',
            date: 'June 18, 2026  ·  1:00–2:00 PM ET',
            desc: 'Learn how to energize employees and drive peak performance through effective communication. Explore insights to close engagement gaps, build trust, and leverage culture and technology.',
            image: 'https://public-cdn.hr.com/system/app/media/rs/2020/3/4/k7dhbena/120.jpg',
            url: 'https://web.hr.com/ik0n'
          },
          {
            id: 3,
            title: 'The Leave of Absence Tipping Point: Protecting Your Bottom Line With a Holistic LOA Strategy',
            date: 'June 23, 2026  ·  2:00–3:00 PM ET',
            desc: 'Leave of absence is often handled reactively after paperwork is submitted. This session focuses on a proactive approach to workforce stability using risk signals and supportive leave practices.',
            image: 'https://public-cdn.hr.com/system/app/media/rs/2021/12/14/kx5tyjds/120.jpg',
            url: 'https://web.hr.com/km43'
          }
        ]
      },
      virtual: {
        enabled: true,
        sectionTitle: 'Upcoming Virtual Events',
        linkText: 'More',
        linkUrl: 'https://www.hr.com/en?t=/webcasts/upcomingVirtualEvents',
        items: [
          {
            id: 1,
            title: "HR.com's State of People Analytics",
            date: 'June 17, 2026',
            desc: 'Discover how to use people analytics and data to make smarter workforce decisions, integrate multiple data sources, and turn insights into better planning.',
            image: 'https://public-cdn.hr.com/remoteimages/website-images/buzz/00_NewBuzz/hr-com-state-of-people-analytics-june-2026.jpg',
            url: 'https://web.hr.com/xi7f'
          },
          {
            id: 2,
            title: 'AI4HR Live!',
            date: 'June 25, 2026',
            desc: 'Stay ahead of AI in HR. Each month this event delivers practical insights, trends, and quick how-to demos across recruiting, compliance, payroll, and productivity.',
            image: 'https://public-cdn.hr.com/remoteimages/website-images/buzz/00_NewBuzz/ai4hr-live-june-2026.jpg',
            url: 'https://web.hr.com/g8nc'
          }
        ]
      },
      bottomAd: {
        enabled: true,
        adImage: 'https://media-cdn.hr.com/media.hr.com/email_images/ebulletins/internal/2024/HR-certification-prep-SHRM-or-HRCI-invest-in-your-career-300x250.gif',
        adUrl: 'https://web.hr.com/1bg2'
      }
    }
  });

  const [expandedSection, setExpandedSection] = useState<string | null>('header');

  const formattedDate = () => {
    try {
      const d = new Date(data.date);
      if (isNaN(d.getTime())) return 'Week of June 15, 2026';
      return \`Week of \${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}\`;
    } catch {
      return 'Week of June 15, 2026';
    }
  };

  const filenameDate = () => {
    try {
      const parts = data.date.split('/');
      if (parts.length === 3) {
        return \`\${parts[2]}-\${parts[0]}-\${parts[1]}\`;
      }
      return '2026-06-15';
    } catch {
      return '2026-06-15';
    }
  };

  const htmlContent = generateEbulletinHtml({ ...data, formattedDate: formattedDate() });

  const sectionDefs = [
    { id: 'header', title: 'Header & Branding', icon: <CalendarIcon className="w-5 h-5 text-blue-500" />, color: 'bg-blue-500' },
    { id: 'news', title: 'HR in the News & Ad', icon: <Megaphone className="w-5 h-5 text-gray-400" />, color: 'bg-red-500' },
    { id: 'event', title: 'Featured Event', icon: <Clock className="w-5 h-5 text-gray-400" />, color: 'bg-red-500' },
    { id: 'report', title: 'Featured Report', icon: <FileText className="w-5 h-5 text-gray-400" />, color: 'bg-indigo-900' },
    { id: 'survey', title: 'Spotlight Survey', icon: <BarChart className="w-5 h-5 text-gray-400" />, color: 'bg-indigo-900' },
    { id: 'research', title: 'HR Research Institute', icon: <FileText className="w-5 h-5 text-gray-400" />, color: 'bg-indigo-900' },
    { id: 'aihub', title: 'HR & AI Hub', icon: <Monitor className="w-5 h-5 text-gray-400" />, color: 'bg-indigo-500' },
    { id: 'awards', title: 'Awards Section', icon: <Globe className="w-5 h-5 text-gray-400" />, color: 'bg-orange-500' },
    { id: 'podcast', title: 'Podcast Spotlight', icon: <Smartphone className="w-5 h-5 text-gray-400" />, color: 'bg-teal-600' },
    { id: 'webcasts', title: 'Featured Webcasts', icon: <Monitor className="w-5 h-5 text-gray-400" />, color: 'bg-red-500' },
    { id: 'virtual', title: 'Upcoming Virtual Events', icon: <CalendarIcon className="w-5 h-5 text-gray-400" />, color: 'bg-indigo-500' },
    { id: 'bottomAd', title: 'Bottom Ad', icon: <ImageIcon className="w-5 h-5 text-gray-400" />, color: 'bg-gray-500' }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    alert('HTML copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`\${filenameDate()}-ebulletin.html\`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateSection = (sectionId: string, updates: any) => {
    setData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: {
          // @ts-ignore
          ...prev.sections[sectionId],
          ...updates
        }
      }
    }));
  };

  const addListItem = (sectionId: 'webcasts' | 'virtual' | 'news') => {
    // @ts-ignore
    const newItems = [...data.sections[sectionId].items, { id: Date.now(), title: 'New Item', date: 'Date here', note: 'Note', desc: 'Description here', image: '', url: '' }];
    updateSection(sectionId, { items: newItems });
  };

  const removeListItem = (sectionId: 'webcasts' | 'virtual' | 'news', id: number) => {
    // @ts-ignore
    const newItems = data.sections[sectionId].items.filter(item => item.id !== id);
    updateSection(sectionId, { items: newItems });
  };

  const updateListItem = (sectionId: 'webcasts' | 'virtual' | 'news', id: number, updates: any) => {
    // @ts-ignore
    const newItems = data.sections[sectionId].items.map(item => item.id === id ? { ...item, ...updates } : item);
    updateSection(sectionId, { items: newItems });
  };

  return (
    <div className="flex w-full h-screen bg-[#f4f5f7] overflow-hidden text-gray-800 font-sans">
      <div className="w-[450px] flex flex-col bg-white border-r border-gray-200 shrink-0 shadow-sm z-10">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-medium">Back</span>
            </div>
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-600 rounded-sm inline-block"></span>
              Bulletin Sections
            </h2>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
          {sectionDefs.map((sectionDef) => {
            const isExpanded = expandedSection === sectionDef.id;
            // @ts-ignore
            const sectionData = sectionDef.id === 'header' ? data : data.sections[sectionDef.id];
            
            return (
              <div key={sectionDef.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all">
                <div 
                  className={\`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors \${isExpanded ? 'border-b border-gray-100 bg-gray-50' : ''}\`}
                  onClick={() => setExpandedSection(isExpanded ? null : sectionDef.id)}
                >
                  <div className={\`w-1 h-10 absolute left-0 top-0 bottom-0 \${isExpanded ? sectionDef.color : 'bg-transparent'}\`}></div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center bg-white p-1.5 rounded-lg border border-gray-100 shadow-sm">
                      {sectionDef.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{sectionDef.title}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-400">
                    {!isExpanded && (
                      <>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><ArrowDown className="w-3.5 h-3.5" /></button>
                      </>
                    )}
                    {sectionDef.id !== 'header' && sectionData && sectionData.enabled && <div className="w-2 h-2 rounded-full bg-[#00b85c] ml-1"></div>}
                    {sectionDef.id !== 'header' && sectionData && !sectionData.enabled && <div className="w-2 h-2 rounded-full bg-gray-300 ml-1"></div>}
                    {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 space-y-4 bg-white relative">
                    
                    {sectionDef.id !== 'header' && (
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                        <label className="text-[11px] font-bold text-gray-600 tracking-wider">INCLUDE SECTION IN EMAIL</label>
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          checked={sectionData.enabled}
                          onChange={(e) => updateSection(sectionDef.id, { enabled: e.target.checked })}
                        />
                      </div>
                    )}

                    {sectionDef.id === 'header' && (
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="text-[10px] text-gray-500 mb-1 block font-bold">Issue Date</label>
                            <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={data.date} onChange={(e) => setData({...data, date: e.target.value})} />
                          </div>
                          <div className="w-1/3 pt-5">
                            <button className="w-full py-1.5 text-[11px] font-bold text-blue-600 bg-blue-50 rounded border border-blue-100 hover:bg-blue-100 transition-colors" onClick={() => {
                                const today = new Date();
                                setData({...data, date: \`\${String(today.getMonth() + 1).padStart(2, '0')}/\${String(today.getDate()).padStart(2, '0')}/\${today.getFullYear()}\`});
                            }}>Set Today</button>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 mb-1 block font-bold">Main Title</label>
                          <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 mb-1 block font-bold">Top Pill Badge Text</label>
                          <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={data.badge} onChange={(e) => setData({...data, badge: e.target.value})} />
                        </div>
                      </div>
                    )}

                    {sectionDef.id === 'bottomAd' && sectionData.enabled && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] text-gray-500 mb-1 block font-bold">Ad Image URL</label>
                          <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.adImage} onChange={(e) => updateSection('bottomAd', { adImage: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 mb-1 block font-bold">Ad Destination URL</label>
                          <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm text-blue-600 font-mono" value={sectionData.adUrl} onChange={(e) => updateSection('bottomAd', { adUrl: e.target.value })} />
                        </div>
                      </div>
                    )}

                    {sectionDef.id === 'news' && sectionData.enabled && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] text-gray-500 mb-1 block font-bold">Section Title Label</label>
                          <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.sectionTitle} onChange={(e) => updateSection('news', { sectionTitle: e.target.value })} />
                        </div>
                        <div className="border border-blue-100 rounded-lg p-3 bg-blue-50/30">
                          <h4 className="text-xs font-bold text-blue-800 mb-2">Right Column Sponsor Ad</h4>
                          <div className="space-y-2">
                            <div>
                              <label className="text-[9px] text-gray-500 mb-1 block uppercase">Ad Image URL</label>
                              <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" value={sectionData.adImage} onChange={(e) => updateSection('news', { adImage: e.target.value })} />
                            </div>
                            <div>
                              <label className="text-[9px] text-gray-500 mb-1 block uppercase">Ad Destination URL</label>
                              <input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs text-blue-600 font-mono" value={sectionData.adUrl} onChange={(e) => updateSection('news', { adUrl: e.target.value })} />
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-[11px] font-bold text-gray-700">NEWS ITEMS</h4>
                            <button onClick={() => addListItem('news')} className="text-[10px] text-blue-600 font-medium">(+ add)</button>
                          </div>
                          <div className="space-y-3">
                            {sectionData.items.map((item: any, i: number) => (
                              <div key={item.id} className="border border-gray-200 rounded p-3 bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-bold">Item #{i + 1}</span>
                                  <button onClick={() => removeListItem('news', item.id)} className="text-[10px] text-red-500">delete</button>
                                </div>
                                <div className="space-y-2">
                                  <input type="text" placeholder="Title" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" value={item.title} onChange={(e) => updateListItem('news', item.id, { title: e.target.value })} />
                                  <input type="text" placeholder="Note (e.g. HR lessons)" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" value={item.note} onChange={(e) => updateListItem('news', item.id, { note: e.target.value })} />
                                  <input type="text" placeholder="URL" className="w-full px-2 py-1 border border-gray-200 rounded text-[11px] font-mono text-blue-600" value={item.url} onChange={(e) => updateListItem('news', item.id, { url: e.target.value })} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {(sectionDef.id === 'webcasts' || sectionDef.id === 'virtual') && sectionData.enabled && (
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-[10px] text-gray-500 mb-1 block font-bold">Section Title Label</label>
                            <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.sectionTitle} onChange={(e) => updateSection(sectionDef.id, { sectionTitle: e.target.value })} />
                          </div>
                          <div className="w-1/3">
                            <label className="text-[10px] text-gray-500 mb-1 block font-bold">Top Right Link</label>
                            <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.linkText} onChange={(e) => updateSection(sectionDef.id, { linkText: e.target.value })} />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 mb-1 block font-bold">Top Right Link URL</label>
                          <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-xs text-blue-600 font-mono" value={sectionData.linkUrl} onChange={(e) => updateSection(sectionDef.id, { linkUrl: e.target.value })} />
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-[11px] font-bold text-gray-700">ITEMS LIST</h4>
                            <button onClick={() => addListItem(sectionDef.id as any)} className="text-[10px] text-blue-600 font-medium">(+ add)</button>
                          </div>
                          <div className="space-y-3">
                            {sectionData.items.map((item: any, i: number) => (
                              <div key={item.id} className="border border-gray-200 rounded p-3 bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-bold">Item #{i + 1}</span>
                                  <button onClick={() => removeListItem(sectionDef.id as any, item.id)} className="text-[10px] text-red-500">delete</button>
                                </div>
                                <div className="space-y-2">
                                  <input type="text" placeholder="Title" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" value={item.title} onChange={(e) => updateListItem(sectionDef.id as any, item.id, { title: e.target.value })} />
                                  <input type="text" placeholder="Date string" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" value={item.date} onChange={(e) => updateListItem(sectionDef.id as any, item.id, { date: e.target.value })} />
                                  <textarea placeholder="Description" className="w-full px-2 py-1 border border-gray-200 rounded text-xs h-12 resize-none" value={item.desc} onChange={(e) => updateListItem(sectionDef.id as any, item.id, { desc: e.target.value })} />
                                  <input type="text" placeholder="Image URL" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" value={item.image} onChange={(e) => updateListItem(sectionDef.id as any, item.id, { image: e.target.value })} />
                                  <input type="text" placeholder="Destination URL" className="w-full px-2 py-1 border border-gray-200 rounded text-[11px] font-mono text-blue-600" value={item.url} onChange={(e) => updateListItem(sectionDef.id as any, item.id, { url: e.target.value })} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {['event', 'report', 'survey', 'research', 'aihub', 'awards', 'podcast'].includes(sectionDef.id) && sectionData.enabled && (
                      <div className="space-y-3">
                        {sectionData.sectionTitle !== undefined && (
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Section Title Label</label>
                              <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.sectionTitle} onChange={(e) => updateSection(sectionDef.id, { sectionTitle: e.target.value })} />
                            </div>
                            {sectionData.linkText !== undefined && (
                              <div className="w-1/3">
                                <label className="text-[10px] text-gray-500 mb-1 block font-bold">Top Right Link</label>
                                <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.linkText} onChange={(e) => updateSection(sectionDef.id, { linkText: e.target.value })} />
                              </div>
                            )}
                          </div>
                        )}
                        {sectionData.linkUrl !== undefined && (
                          <div>
                            <label className="text-[10px] text-gray-500 mb-1 block font-bold">Top Right Link URL</label>
                            <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-xs font-mono text-blue-600" value={sectionData.linkUrl} onChange={(e) => updateSection(sectionDef.id, { linkUrl: e.target.value })} />
                          </div>
                        )}

                        <div className="pt-2 border-t border-gray-100 space-y-3">
                          {sectionData.tag !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Accent Tag (e.g. Spotlight Survey)</label>
                              <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.tag} onChange={(e) => updateSection(sectionDef.id, { tag: e.target.value })} />
                            </div>
                          )}
                          {sectionData.category !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Category</label>
                              <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.category} onChange={(e) => updateSection(sectionDef.id, { category: e.target.value })} />
                            </div>
                          )}
                          {sectionData.winner !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Winner Name</label>
                              <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm font-bold" value={sectionData.winner} onChange={(e) => updateSection(sectionDef.id, { winner: e.target.value })} />
                            </div>
                          )}
                          {sectionData.dateStr !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Date String</label>
                              <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.dateStr} onChange={(e) => updateSection(sectionDef.id, { dateStr: e.target.value })} />
                            </div>
                          )}
                          {sectionData.title !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Main Title</label>
                              <textarea className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm h-14 resize-none" value={sectionData.title} onChange={(e) => updateSection(sectionDef.id, { title: e.target.value })} />
                            </div>
                          )}
                          {sectionData.guest !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Guest Info</label>
                              <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.guest} onChange={(e) => updateSection(sectionDef.id, { guest: e.target.value })} />
                            </div>
                          )}
                          {sectionData.desc !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Description</label>
                              <textarea className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm h-20 resize-none" value={sectionData.desc} onChange={(e) => updateSection(sectionDef.id, { desc: e.target.value })} />
                            </div>
                          )}
                          {sectionData.btnText !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Button Text (supports HTML entities)</label>
                              <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm" value={sectionData.btnText} onChange={(e) => updateSection(sectionDef.id, { btnText: e.target.value })} />
                            </div>
                          )}
                          {sectionData.url !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Destination URL</label>
                              <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-xs font-mono text-blue-600" value={sectionData.url} onChange={(e) => updateSection(sectionDef.id, { url: e.target.value })} />
                            </div>
                          )}
                          {sectionData.image !== undefined && (
                            <div>
                              <label className="text-[10px] text-gray-500 mb-1 block font-bold">Image URL</label>
                              <input type="text" className="w-full px-3 py-1.5 border border-gray-200 rounded text-xs" value={sectionData.image} onChange={(e) => updateSection(sectionDef.id, { image: e.target.value })} />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-[#f0f2f5] min-w-0">
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button className={\`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors \${viewMode === 'visual' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}\`} onClick={() => setViewMode('visual')}>
              <Eye className="w-4 h-4" /> Visual Preview
            </button>
            <button className={\`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors \${viewMode === 'code' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}\`} onClick={() => setViewMode('code')}>
              <Code className="w-4 h-4" /> HTML Source
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border border-gray-200 p-1 rounded-lg bg-white">
              <button className={\`p-1.5 rounded-md transition-colors \${deviceMode === 'desktop' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}\`} onClick={() => setDeviceMode('desktop')}>
                <Monitor className="w-4 h-4" />
              </button>
              <button className={\`p-1.5 rounded-md transition-colors \${deviceMode === 'mobile' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}\`} onClick={() => setDeviceMode('mobile')}>
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              <Copy className="w-4 h-4" /> Copy HTML
            </button>
            <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Download HTML
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 flex flex-col items-center">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-xs font-mono font-medium text-gray-500">
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            RENDERING: {deviceMode === 'desktop' ? '600px (Desktop Width)' : '320px (Mobile Width)'}
          </div>
          <div className={\`transition-all duration-300 w-full flex flex-col shadow-2xl rounded-xl overflow-hidden border border-gray-200 bg-white \${deviceMode === 'desktop' ? 'max-w-4xl' : 'max-w-[375px]'}\`}>
            <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 relative shrink-0">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 px-4 py-1 bg-white border border-gray-200 rounded text-xs font-mono text-gray-500">
                {filenameDate()}-ebulletin.html
              </div>
            </div>
            <div className="bg-white flex-1 min-h-[600px]">
              {viewMode === 'visual' ? (
                <iframe srcDoc={htmlContent} title="Email Preview" className="w-full h-[800px] border-0 bg-white" />
              ) : (
                <div className="relative">
                  <div className="absolute top-4 right-4 bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded border border-blue-100 font-medium">HTML Source Code</div>
                  <textarea value={htmlContent} readOnly className="w-full h-[800px] font-mono text-xs p-6 bg-gray-50 text-gray-700 border-0 focus:outline-none resize-none" spellCheck={false} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/EbulletinEditor.tsx', editorCode);

const generatorCode = `
export const generateEbulletinHtml = (data: any) => {
  return \`<!DOCTYPE html>
<html lang="en">

<head>
    <title>\${data.title} - \${data.formattedDate}</title>

    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="robots" content="noindex,follow">

    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" type="text/css">
    <!--<![endif]-->

    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100% !important;
            -ms-text-size-adjust: 100% !important;
            -webkit-font-smoothing: antialiased !important;
            background-color: #f4f4f4;
        }
        img {
            border: 0 !important;
            outline: none !important;
            display: block;
        }
        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        td, a, span {
            mso-line-height-rule: exactly;
        }
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
    </style>
</head>

<body style="min-width: 100%; width: 100% !important; margin: 0; padding: 0; background-color: #f4f4f4;">

    <!-- OUTER WRAPPER -->
    <table role="presentation" width="100%" border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4" style="background-color: #f4f4f4;">
        <tbody>
            <tr>
                <td align="center" style="padding: 20px 0;">

                    <!-- MAIN TABLE -->
                    <table role="presentation" width="600" border="0" align="center" cellspacing="0" cellpadding="0" style="width: 600px; max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <tbody>
                            <tr>
                                <td align="center">

                                    <!-- HEADER BRANDING -->
                                    <table role="presentation" width="600" border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="#0f172a" style="width: 600px; background-color: #0f172a;">
                                        <tbody>
                                            <!-- Rainbow top bar -->
                                            <tr>
                                                <td style="height: 6px; font-size: 0; line-height: 0;">
                                                    <img src="https://media-cdn.hr.com/Emails/eBulletin/hr-rainbow-bottom-eb-550x8.png" width="600" height="10" alt="" style="width: 600px; height: 6px;">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding: 0;">
                                                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                                                        <tr>
                                                            <!-- Logo -->
                                                            <td width="130" valign="middle" style="padding: 24px 0 24px 28px; width: 130px; text-align: left;">
                                                                 <a href="https://www.hr.com" target="_blank">
                                                                     <img src="https://media-cdn.hr.com/Emails/eBulletin/hrcom-white-rainbow-circle-logo.png"
                                                                         alt="HR.com Maximizing Human Potential logo"
                                                                         width="120"
                                                                         style="width: 120px;">
                                                                 </a>
                                                            </td>

                                                            <!-- Title + date -->
                                                            <td align="left" valign="middle" style="padding: 38px; text-align: left;">
                                                                 <p style="margin: 0 0 6px 0; font-family: 'Inter', Arial, sans-serif; font-size: 34px; line-height: 34px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">\${data.title}</p>
                                                                 <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 600; color: #f0493c; letter-spacing: 2px; text-transform: uppercase;">\${data.formattedDate}</p>
                                                            </td>

                                                            <!-- Volume pill badge -->
                                                            <td align="right" valign="middle" style="padding: 24px 28px 24px 0; text-align: right;">
                                                                <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="right">
                                                                    <tr>
                                                                        <td style="padding: 5px 14px; border-radius: 20px;">
                                                                            <span style="font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 700; color: #ffffff; white-space: nowrap;">\${data.badge}</span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <!-- WHITE BODY CONTAINER -->
                                    <table role="presentation" width="600" border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="width: 600px; background-color: #ffffff;">
                                        <tbody>
\${data.sections?.news?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- HR IN THE NEWS SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#ef4444" style="background-color: #ef4444; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">\${data.sections.news.sectionTitle}</span>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td align="center" valign="top" style="padding: 16px 28px 24px 28px; background-color: #ffffff;">
                                                     <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px;">
                                                         <tbody>
                                                             <tr>
                                                                 <td width="224" valign="top" style="padding-right: 20px; width: 224px; text-align: left;">
                                                                     \${data.sections.news.items.map((item: any, i: number) => \`
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                                                                         <tr>
                                                                             <td style="padding-bottom: 8px;">
                                                                                 <a href="\${item.url}"
                                                                                     target="_blank"
                                                                                     style="text-decoration: none; color: #1e3a5f; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 1.4em;">
                                                                                     \${item.title}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                         <tr>
                                                                             <td style="padding-bottom: 6px; font-family: 'Inter', Arial, sans-serif; font-size: 12px; line-height: 1.5em; color: #64748b;">
                                                                                 \${item.note}
                                                                             </td>
                                                                         </tr>
                                                                         <tr>
                                                                             <td style="padding-bottom: \${i < data.sections.news.items.length - 1 ? '16px' : '0'};">
                                                                                 <a href="\${item.url}"
                                                                                     target="_blank"
                                                                                     style="text-decoration: none; color: #6366f1; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                                     &#128214; Read More
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                     \${i < data.sections.news.items.length - 1 ? \`
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                                                                         <tr>
                                                                             <td style="border-top: 1px solid #e2e8f0; font-size: 0; line-height: 0; padding-bottom: 16px;">&nbsp;</td>
                                                                         </tr>
                                                                     </table>
                                                                     \` : ''}
                                                                     \`).join('')}
                                                                 </td>
                                                                 <td width="300" valign="middle" align="center" style="padding-left: 20px; width: 300px;">
                                                                     <a href="\${data.sections.news.adUrl}" target="_blank">
                                                                         <img src="\${data.sections.news.adImage}"
                                                                             width="300"
                                                                             alt="Future Ready HR for People-Focused Teams"
                                                                             style="width: 300px;">
                                                                     </a>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
\` : ''}
\${data.sections?.event?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- FEATURED EVENT SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#ef4444" style="background-color: #ef4444; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">\${data.sections.event.sectionTitle}</span>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td align="center" valign="top" style="padding: 16px 28px 28px 28px; background-color: #ffffff;">
                                                     <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #f8fafc; border-radius: 12px;">
                                                         <tbody>
                                                             <tr>
                                                                 <td width="190" valign="middle" align="center" style="padding: 20px 0 20px 20px; width: 190px;">
                                                                     <img src="\${data.sections.event.image}"
                                                                         alt=""
                                                                         width="150"
                                                                         style="width: 150px; border-radius: 8px; margin-bottom: 14px; background-color: #ffffff;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#ef4444" style="background-color: #ef4444; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="\${data.sections.event.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     \${data.sections.event.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 8px 0; font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 700; color: #ef4444; letter-spacing: 1px; text-transform: uppercase;">\${data.sections.event.dateStr}</p>
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="\${data.sections.event.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             \${data.sections.event.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         \${data.sections.event.desc}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
\` : ''}
\${data.sections?.report?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- FEATURED REPORT SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #f8fafc; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#1e3a5f" style="background-color: #1e3a5f; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">\${data.sections.report.sectionTitle}</span>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td align="center" valign="top" style="padding: 16px 28px 28px 28px; background-color: #f8fafc;">
                                                     <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #ffffff; border-radius: 12px;">
                                                         <tbody>
                                                             <tr>
                                                                 <td width="190" valign="middle" align="center" style="padding: 20px 0 20px 20px; width: 190px;">
                                                                     <img src="\${data.sections.report.image}"
                                                                         alt=""
                                                                         width="150"
                                                                         style="width: 150px; border-radius: 8px; margin-bottom: 14px;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#1e3a5f" style="background-color: #1e3a5f; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="\${data.sections.report.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     \${data.sections.report.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="\${data.sections.report.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             \${data.sections.report.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         \${data.sections.report.desc}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
\` : ''}
\${data.sections?.survey?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- SPOTLIGHT SURVEY SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="center" valign="top" style="padding: 0 28px 28px 28px; background-color: #ffffff;">
                                                     <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #1e1b4b; border-radius: 12px;">
                                                         <tbody>
                                                             <tr>
                                                                 <td valign="middle" style="padding: 24px 20px 24px 24px; text-align: left;">
                                                                     <p style="margin: 0 0 8px 0; font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 700; color: #a5b4fc; letter-spacing: 2px; text-transform: uppercase;">\${data.sections.survey.tag}</p>
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 17px; font-weight: 800; line-height: 1.3em;">
                                                                         <a href="\${data.sections.survey.url}"
                                                                             style="text-decoration: none; color: #ffffff;">
                                                                             \${data.sections.survey.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0 0 16px 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.5em; color: #c7d2fe;">
                                                                         \${data.sections.survey.desc}
                                                                     </p>
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td bgcolor="#6366f1" style="background-color: #6366f1; padding: 9px 20px; border-radius: 20px;">
                                                                                 <a href="\${data.sections.survey.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     \${data.sections.survey.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td width="120" valign="middle" align="center" style="padding: 24px 24px 24px 0; width: 120px;">
                                                                     <img src="\${data.sections.survey.image}"
                                                                         alt=""
                                                                         width="100"
                                                                         style="width: 100px; height: auto;">
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
\` : ''}
\${data.sections?.research?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- HR RESEARCH INSTITUTE SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #f8fafc; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#1e3a5f" style="background-color: #1e3a5f; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">\${data.sections.research.sectionTitle}</span>
                                                             </td>
                                                             \${data.sections.research.linkText ? \`
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="\${data.sections.research.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #1e3a5f; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     \${data.sections.research.linkText}
                                                                 </a>
                                                             </td>\` : ''}
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td align="center" valign="top" style="padding: 16px 28px 28px 28px; background-color: #f8fafc;">
                                                     <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #ffffff; border-radius: 12px;">
                                                         <tbody>
                                                             <tr>
                                                                 <td width="190" valign="middle" align="center" style="padding: 20px 0 20px 20px; width: 190px;">
                                                                     <img src="\${data.sections.research.image}"
                                                                         alt=""
                                                                         width="200"
                                                                         style="width: 200px; border-radius: 8px; margin-bottom: 14px;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#1e3a5f" style="background-color: #1e3a5f; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="\${data.sections.research.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     \${data.sections.research.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="\${data.sections.research.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             \${data.sections.research.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         \${data.sections.research.desc}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
\` : ''}
\${data.sections?.aihub?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- HR & AI HUB SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#6366f1" style="background-color: #6366f1; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">\${data.sections.aihub.sectionTitle}</span>
                                                             </td>
                                                             \${data.sections.aihub.linkText ? \`
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="\${data.sections.aihub.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #6366f1; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     \${data.sections.aihub.linkText}
                                                                 </a>
                                                             </td>\` : ''}
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td align="center" valign="top" style="padding: 16px 28px 28px 28px; background-color: #ffffff;">
                                                     <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #f8fafc; border-radius: 12px;">
                                                         <tbody>
                                                             <tr>
                                                                 <td width="190" valign="middle" align="center" style="padding: 20px 0 20px 20px; width: 190px;">
                                                                     <img src="\${data.sections.aihub.image}"
                                                                         alt=""
                                                                         width="200"
                                                                         style="width: 200px; border-radius: 8px; margin-bottom: 14px;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#6366f1" style="background-color: #6366f1; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="\${data.sections.aihub.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     \${data.sections.aihub.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="\${data.sections.aihub.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             \${data.sections.aihub.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         \${data.sections.aihub.desc}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
\` : ''}
\${data.sections?.awards?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- AWARDS SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #f8fafc; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#f59e0b" style="background-color: #f59e0b; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">\${data.sections.awards.sectionTitle}</span>
                                                             </td>
                                                             \${data.sections.awards.linkText ? \`
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="\${data.sections.awards.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #f59e0b; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     \${data.sections.awards.linkText}
                                                                 </a>
                                                             </td>\` : ''}
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td align="center" valign="top" style="padding: 16px 28px 28px 28px; background-color: #f8fafc;">
                                                     <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #ffffff; border-radius: 12px;">
                                                         <tbody>
                                                             <tr>
                                                                 <td width="190" valign="middle" align="center" style="padding: 20px 0 20px 20px; width: 190px;">
                                                                     <img src="\${data.sections.awards.image}"
                                                                         alt=""
                                                                         width="150"
                                                                         style="width: 150px;">
                                                                 </td>
                                                                 <td valign="middle" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 8px 0; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 1px;">\${data.sections.awards.tag}</p>
                                                                     <div style="margin-top: 0;">
                                                                         <p style="margin: 0 0 4px 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; color: #475569; font-weight: 600;">\${data.sections.awards.category}</p>
                                                                         <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 800; color: #1e3a5f; line-height: 1.2em;">\${data.sections.awards.winner}</p>
                                                                     </div>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
\` : ''}
\${data.sections?.podcast?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- PODCAST SPOTLIGHT SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#0f766e" style="background-color: #0f766e; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">\${data.sections.podcast.sectionTitle}</span>
                                                             </td>
                                                             \${data.sections.podcast.linkText ? \`
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="\${data.sections.podcast.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #0f766e; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     \${data.sections.podcast.linkText}
                                                                 </a>
                                                             </td>\` : ''}
                                                             <td style="padding-left: 12px; vertical-align: middle;">
                                                                 <a href="https://www.youtube.com/@hrcom/podcasts" target="_blank">
                                                                     <img src="https://media-cdn.hr.com/Emails/eBulletin/youtube-icon2.png"
                                                                         alt="YouTube"
                                                                         width="50"
                                                                         style="display: inline; width: 50px;">
                                                                 </a>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td align="center" valign="top" style="padding: 16px 28px 28px 28px; background-color: #ffffff;">
                                                     <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #f0fdf4; border-radius: 12px;">
                                                         <tbody>
                                                             <tr>
                                                                 <td width="190" valign="middle" align="center" style="padding: 20px 0 20px 20px; width: 190px;">
                                                                     <img src="\${data.sections.podcast.image}"
                                                                         alt=""
                                                                         width="200"
                                                                         style="width: 200px; border-radius: 8px; margin-bottom: 14px;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#0f766e" style="background-color: #0f766e; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="\${data.sections.podcast.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     \${data.sections.podcast.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="\${data.sections.podcast.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             \${data.sections.podcast.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         \${data.sections.podcast.desc}
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: #0f766e; font-weight: 700;">
                                                                         \${data.sections.podcast.guest}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
\` : ''}
\${data.sections?.webcasts?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- FEATURED WEBCASTS SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #f8fafc; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#f0493c" style="background-color: #f0493c; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">\${data.sections.webcasts.sectionTitle}</span>
                                                             </td>
                                                             \${data.sections.webcasts.linkText ? \`
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="\${data.sections.webcasts.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #f0493c; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     \${data.sections.webcasts.linkText}
                                                                 </a>
                                                             </td>\` : ''}
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             \${data.sections.webcasts.items.map((item: any, i: number) => \`
                                             <tr>
                                                 <td align="center" valign="top" style="padding: \${i === 0 ? '16px' : '0'} 28px 8px 28px; background-color: #f8fafc;">
                                                     <a href="\${item.url}" target="_blank" style="text-decoration: none; display: block; color: inherit;">
                                                         <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #ffffff; border-radius: 10px;">
                                                             <tbody>
                                                                 <tr>
                                                                     <td valign="top" style="padding: 16px 16px 16px 20px; text-align: left;">
                                                                         <p style="margin: 0 0 4px 0; font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 700; color: #ef4444; letter-spacing: 1px; text-transform: uppercase;">\${item.date}</p>
                                                                         <p style="margin: 0 0 6px 0; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 1.4em; color: #1e3a5f;">
                                                                             \${item.title}
                                                                         </p>
                                                                         <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 12px; line-height: 1.5em; color: #64748b;">
                                                                             \${item.desc}
                                                                         </p>
                                                                     </td>
                                                                     <td width="120" valign="middle" align="center" style="width: 120px; padding-right: 16px;">
                                                                         <img src="\${item.image}"
                                                                             alt=""
                                                                             width="120"
                                                                             style="width: 120px; border-radius: 6px;">
                                                                     </td>
                                                                 </tr>
                                                             </tbody>
                                                         </table>
                                                     </a>
                                                 </td>
                                             </tr>
                                             \`).join('')}
                                             <tr>
                                                 <td style="background-color: #f8fafc; height: 20px; font-size: 0; line-height: 0;">&nbsp;</td>
                                             </tr>
\` : ''}
\${data.sections?.virtual?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- UPCOMING VIRTUAL EVENTS SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#6366f1" style="background-color: #6366f1; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">\${data.sections.virtual.sectionTitle}</span>
                                                             </td>
                                                             \${data.sections.virtual.linkText ? \`
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="\${data.sections.virtual.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #6366f1; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     \${data.sections.virtual.linkText}
                                                                 </a>
                                                             </td>\` : ''}
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             \${data.sections.virtual.items.map((item: any, i: number) => \`
                                             <tr>
                                                 <td align="center" valign="top" style="padding: \${i === 0 ? '16px' : '0'} 28px 8px 28px; background-color: #ffffff;">
                                                     <a href="\${item.url}" target="_blank" style="text-decoration: none; display: block; color: inherit;">
                                                         <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #f8fafc; border-radius: 10px;">
                                                             <tbody>
                                                                 <tr>
                                                                     <td width="110" valign="top" align="center" style="padding: 16px 0 16px 16px; width: 110px;">
                                                                         <img src="\${item.image}"
                                                                             alt=""
                                                                             width="100"
                                                                             style="width: 100px; height: auto; border-radius: 8px;">
                                                                     </td>
                                                                     <td valign="top" style="padding: 16px 16px 16px 12px; text-align: left;">
                                                                         <p style="margin: 0 0 4px 0; font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 700; color: #6366f1; letter-spacing: 1px; text-transform: uppercase;">\${item.date}</p>
                                                                         <p style="margin: 0 0 6px 0; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 1.4em; color: #1e3a5f;">
                                                                             \${item.title}
                                                                         </p>
                                                                         <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 12px; line-height: 1.5em; color: #64748b;">
                                                                             \${item.desc}
                                                                         </p>
                                                                     </td>
                                                                 </tr>
                                                             </tbody>
                                                         </table>
                                                     </a>
                                                 </td>
                                             </tr>
                                             \`).join('')}
                                             <tr>
                                                 <td style="background-color: #ffffff; height: 20px; font-size: 0; line-height: 0;">&nbsp;</td>
                                             </tr>
\` : ''}
\${data.sections?.bottomAd?.enabled ? \`
                                             <!-- ============================================ -->
                                             <!-- BOTTOM AD -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="center" style="padding: 0 28px 28px 28px; background-color: #ffffff; text-align: center;">
                                                     <a href="\${data.sections.bottomAd.adUrl}" target="_blank">
                                                         <img src="\${data.sections.bottomAd.adImage}"
                                                             alt=""
                                                             width="300"
                                                             style="width: 300px; margin: 0 auto; border-radius: 12px;">
                                                     </a>
                                                 </td>
                                             </tr>
\` : ''}
                                         </tbody>
                                     </table>
                                     <!-- END WHITE BODY CONTAINER -->

                                     <!-- ============================================ -->
                                     <!-- FOOTER -->
                                     <!-- ============================================ -->
                                     <table role="presentation" width="600" border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="#0f172a" style="width: 600px; background-color: #0f172a;">
                                         <tbody>
                                             <!-- Rainbow bar -->
                                             <tr>
                                                 <td style="height: 6px; font-size: 0; line-height: 0;">
                                                     <img src="https://media-cdn.hr.com/Emails/eBulletin/hr-rainbow-bottom-eb-550x8.png" width="600" height="10" alt="" style="width: 600px; height: 6px;">
                                                 </td>
                                             </tr>

                                             <!-- Footer logo -->
                                             <tr>
                                                 <td align="center" style="padding: 28px 0 16px 0;">
                                                     <a href="https://www.hr.com/" target="_blank"><img src="https://media-cdn.hr.com/Emails/eBulletin/hrcom-logo-white.png"
                                                         width="120"
                                                         alt="HR.com Maximizing Human Potential logo"
                                                         border="0"
                                                         style="width: 120px; margin: 0 auto;"></a>
                                                 </td>
                                             </tr>

                                             <!-- Footer divider line -->
                                             <tr>
                                                 <td style="padding: 0 40px;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                                                         <tr>
                                                             <td style="height: 1px; font-size: 0; line-height: 0; background-color: #1e293b;">&nbsp;</td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>

                                             <!-- Footer text -->
                                             <tr>
                                                 <td align="center" style="padding: 20px 40px 32px 40px; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 11px; line-height: 1.7em; color: #64748b;">
                                                     <p style="margin: 0 0 10px 0;">HR.com Limited &nbsp;&#183;&nbsp; 56 Malone Road, Jackson's Point, ON, Canada, L0E 1L0</p>

                                                     <p style="margin: 0 0 10px 0;">
                                                         <a href="https://www.hr.com/en/about_us/privacy_information/"
                                                             target="_blank"
                                                             style="text-decoration: underline; color: #64748b;">Privacy Policy</a>
                                                         &nbsp; | &nbsp;
                                                         <a href="mailto:info@hr.com?Subject=Contact Us: General ebulletin"
                                                             style="text-decoration: underline; color: #64748b;">Contact Us</a>
                                                     </p>

                                                     <p style="margin: 0 0 10px 0;">
                                                         If you no longer wish to receive this email campaign you may
                                                         <a href="https://www.hr.com/en?t=/CustomCode/hr/subscribe/sub.campaign.7&cid1=__CUSTOMER_ID__&cid2=1163325496968"
                                                             target="_blank"
                                                             style="text-decoration: underline; color: #64748b;">unsubscribe here</a>,
                                                         or go to our
                                                         <a href="https://www.hr.com/en?t=/CustomCode/accsetting/lib/navigation&amp;mode=show&amp;tabid=3&amp;action=notifications"
                                                             target="_blank"
                                                             style="text-decoration: underline; color: #64748b;">subscription page</a>
                                                         to manage your preferences.
                                                     </p>

                                                     <p style="margin: 0; color: #475569;">This email account is not monitored. Please do not reply to this email.</p>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>

                                 </td>
                             </tr>
                         </tbody>
                     </table>
                     <!-- END MAIN TABLE -->

                 </td>
             </tr>
         </tbody>
     </table>
     <!-- END OUTER WRAPPER -->

 </body>
 </html>\`;
};
`;

fs.writeFileSync('src/generateEbulletinHtml.ts', generatorCode);
console.log('Successfully generated complete HTML builder.');
