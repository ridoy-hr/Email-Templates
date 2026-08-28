import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Plus, Trash2, Eye, Code } from 'lucide-react';
import { AutoResizeTextarea } from './components/AutoResizeTextarea';

interface WebcastData {
  sponsorLogoUrl: string;
  heroColor: string;
  heroTitle: string;
  dateTime: string;
  ctaLink: string;
  introText: string;
  takeaways: string[];
  speakers: { name: string; role: string; imageUrl: string }[];
  eventLinkText?: string;
  eventLinkUrl?: string;
}

export function WebcastEditorStandard({ onBack }: { onBack: () => void }) {
  const [isSending, setIsSending] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [codeContent, setCodeContent] = useState('');
  const [isCustomHtml, setIsCustomHtml] = useState(false);

  const [data, setData] = useState<WebcastData>({
    sponsorLogoUrl: 'https://public-cdn.hr.com/system/app/media/rs/2026/1/27/mkwqocuk/120.jpg',
    heroColor: '#02588E',
    heroTitle: 'How to Lead and Build Culture in Chaos: Leadership When Clarity, Control, and Certainty Are Gone',
    dateTime: 'May 6, 2026 at 1:00 PM - 2:00 PM ET',
    ctaLink: 'https://www.hr.com/',
    introText: 'When chaos and uncertainty reign, organizations with the strongest culture thrive. Join this webcast to learn how leaders can intentionally build culture, define vision, and adapt in adversity.',
    takeaways: [
      'Why building a strong culture is essential',
      'How to define your vision in chaotic times',
      'Aligning your people around a shared goal',
      'Measuring what truly matters in adversity'
    ],
    speakers: [
      {
        name: 'Joey Walters',
        role: 'Vice President, Human Resources - Schneider Electric',
        imageUrl: 'https://public-cdn.hr.com/profile_images/2026/3/17/1773772506764_120'
      }
    ],
    eventLinkText: "Curious? Find out more here →",
    eventLinkUrl: "https://web.hr.com/"
  });

  const generateHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.heroTitle}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #ECEEF0; }
    </style>
</head>
<body style="background-color:#ECEEF0; margin:0; padding:0;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ECEEF0;width:100%;">
        <tbody><tr>
            <td align="center" valign="top" style="padding:20px 0 40px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto; background-color: #ffffff;">
                    <tbody><tr>
                        <td style="padding:0;font-size:0;line-height:0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tbody><tr>
                                    <td width="25%" style="background-color:#EF4A3D;height:5px;font-size:0;line-height:0;">&nbsp;</td>
                                    <td width="25%" style="background-color:#FDB414;height:5px;font-size:0;line-height:0;">&nbsp;</td>
                                    <td width="25%" style="background-color:#94C83D;height:5px;font-size:0;line-height:0;">&nbsp;</td>
                                    <td width="25%" style="background-color:#4AC4D6;height:5px;font-size:0;line-height:0;">&nbsp;</td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#FFFFFF;padding:12px 20px;border-bottom:1px solid #ECEEF0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tbody><tr>
                                    <td align="left" valign="middle" style="padding:0;">
                                        ${data.sponsorLogoUrl ? `<img src="${data.sponsorLogoUrl}" alt="Sponsor" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;">` : ''}
                                    </td>
                                    <td align="right" valign="middle" style="padding:0;">
                                        <span style="font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;">Upcoming Webcast</span>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="background-color: ${data.heroColor}; padding: 24px 36px 28px 36px;">
                            <h1 style="margin:0 0 8px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:32px;font-weight:900;color:#FFFFFF;line-height:41px;text-align:center;letter-spacing:-0.3px;">
                                ${data.heroTitle}
                            </h1>
                            <p style="margin:0 0 24px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);text-align:center;line-height:22px;letter-spacing:0.3px;">
                                ${data.dateTime} &nbsp;·&nbsp; Free to Attend
                            </p>
                            <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin-top:4px;">
                                <tbody><tr>
                                    <td align="center" style="border-radius:999px;background:#FFFFFF;" bgcolor="#FFFFFF">
                                        <a href="${data.ctaLink}" target="_blank" style="font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:${data.heroColor};text-decoration:none;border-radius:999px;padding:13px 42px;display:inline-block;font-weight:700;letter-spacing:0.4px;">
                                            Save My Spot — Register Free →
                                        </a>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="background-color: #FFFFFF; padding: 40px 36px 6px 36px;">
                            <p style="margin:0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">
                                ${data.introText.replace(/\\n/g, '<br>')}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" valign="top" style="background-color:#FFFFFF;padding:14px 36px 32px 36px;">
                            <p style="margin:0 0 18px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;">
                                What You'll Learn</p>
                            ${data.takeaways.map((t, i) => `
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:${i === data.takeaways.length - 1 ? '0' : '14px'};">
                                <tbody><tr>
                                    <td width="36" valign="middle" align="center" style="vertical-align:middle;padding:0;width:36px;">
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                                            <tbody><tr>
                                                <td align="center" valign="middle" style="background-color:${['#EF4A3D', '#4AC4D6', '#94C83D', '#FDB414'][i % 4]};border-radius:6px;width:26px;height:26px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:${i===3?'#1A1000':'#FFFFFF'};line-height:26px;text-align:center;">
                                                    0${i + 1}
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                    <td valign="middle" style="padding-left:12px;vertical-align:middle;">
                                        <span style="font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">${t}</span>
                                    </td>
                                </tr>
                            </tbody></table>
                            `).join('')}
                            
                            ${data.eventLinkText ? `
                            <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin:24px auto 0 auto;">
                                <tbody><tr>
                                    <td align="center">
                                        <a href="${data.eventLinkUrl}" target="_blank" style="font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:${data.heroColor};text-decoration:none;font-weight:600;letter-spacing:0.2px;">
                                            ${data.eventLinkText}
                                        </a>
                                    </td>
                                </tr>
                            </tbody></table>
                            ` : ''}
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#F8F9FA;height:1px;font-size:0;line-height:0;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="background-color:#F8F9FA;padding:36px 24px 32px 24px;">
                            <p style="margin:0 0 6px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;text-align:center;">
                                Your expert host${data.speakers.length > 1 ? 's' : ''}</p>
                            <h2 style="margin:0 0 28px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:#2A343E;text-align:center;line-height:27px;">
                                Learn directly from industry leader${data.speakers.length > 1 ? 's' : ''}
                            </h2>
                            <div style="text-align:center;font-size:0px;width:100%;">
                                ${data.speakers.map(s => `
                                <div style="display:inline-block;width:100%;max-width:260px;vertical-align:top;text-align:center;padding:10px 8px;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                                        <tbody><tr>
                                            <td align="center" style="padding: 24px 16px;">
                                                <img alt="${s.name}" src="${s.imageUrl || 'https://via.placeholder.com/90'}" width="90" height="90" style="display:block; width:90px; height:90px; object-fit:cover; border-radius:50%; margin:0 auto 14px auto; border: 3px solid #ECEEF0;">
                                                <span style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                                                    ${s.name}
                                                </span>
                                                <span style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                                                    ${s.role}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </div>
                                `).join('')}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="middle" style="background-color:#E8ECEF;padding:22px 28px;">
                            <p style="margin:0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#4A5568;line-height:20px;text-align:center;">
                                Can't attend the live webcast? <a href="${data.ctaLink}" target="_blank" style="color:#02588E;text-decoration:underline;font-weight:600;">Register anyway</a> to access the recording. Ensure you are logged in to your HR.com account to access registration for this webcast.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="background-color:#F8F9FA;padding:32px 30px;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody><tr>
                                                    <td width="90" align="center" valign="top">
                                                        <img alt="HRCI" src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/recert-provider-2026.png" style="display:inline-block;max-width:90px;width:80px;height:80px;border:0;">
                                                    </td>
                                                    <td align="left" valign="top" style="color:#718096;padding-left:14px;padding-top:10px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:400">
                                                      This Program has been pre-approved for 1 BUSINESS Credit toward aPHR®, aPHRi™, PHR®, PHRca®, SPHR®, GPHR®, PHRi™ and SPHRi™ recertification through HR Certification Institute® (HRCI®)
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </td>
                                    </tr>
                                    <tr><td height="18">&nbsp;</td></tr>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody><tr>
                                                    <td width="90" align="center" valign="top">
                                                        <img alt="SHRM" src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/shrm-recert-provider.png" style="display:inline-block;width:80px;height:80px;border:0;">
                                                    </td>
                                                    <td align="left" valign="top" style="color:#718096;padding-left:14px;padding-top:10px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:400">
                                                       HR.com is recognized by SHRM to offer Professional Development Credits, (PDC) for SHRM-CP® or SHRM-SCP® recertification activities.
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#1C2631;">
                                <tbody>
                                    <tr>
                                        <td style="padding:0;font-size:0;line-height:0;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody><tr>
                                                    <td width="25%" style="background-color:#EF4A3D;height:3px;font-size:0;line-height:0;">&nbsp;</td>
                                                    <td width="25%" style="background-color:#FDB414;height:3px;font-size:0;line-height:0;">&nbsp;</td>
                                                    <td width="25%" style="background-color:#94C83D;height:3px;font-size:0;line-height:0;">&nbsp;</td>
                                                    <td width="25%" style="background-color:#4AC4D6;height:3px;font-size:0;line-height:0;">&nbsp;</td>
                                                </tr>
                                            </tbody></table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top" style="padding:36px 20px 32px 20px;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" style="padding-bottom:20px;">
                                                            <a href="#" target="_blank" style="text-decoration:none;">
                                                                <img alt="HR.com" src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/hrdotcom-white.png" width="120" style="display:block;border:0;width:120px;">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
    </tbody></table>
</body>
</html>`;
  };

  useEffect(() => {
    setIsCustomHtml(false);
  }, [data]);

  const updateData = (key: keyof WebcastData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] w-full">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-4">
           <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-gray-500 hover:text-gray-900">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <h1 className="text-lg font-bold text-gray-900">Webcast Email Generator</h1>
        </div>
        <div className="flex items-center space-x-3">
           <div className="flex bg-gray-100 p-1 rounded-lg">
             <button 
               onClick={() => setViewMode('visual')}
               className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center space-x-2 ${viewMode === 'visual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
             >
               <Eye className="w-4 h-4" />
               <span>Preview</span>
             </button>
             <button 
               onClick={() => {
                 if (!isCustomHtml) setCodeContent(generateHtml());
                 setViewMode('code');
               }}
               className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center space-x-2 ${viewMode === 'code' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
             >
               <Code className="w-4 h-4" />
               <span>Code</span>
             </button>
           </div>

           <button 
             onClick={() => {
                const html = isCustomHtml ? codeContent : generateHtml();
                navigator.clipboard.writeText(html);
                alert('HTML copied to clipboard!');
             }}
             className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm cursor-pointer transition-colors"
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

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Form */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
          <div className="p-6 space-y-6">
             <div>
               <label className="text-sm font-medium text-gray-700 block mb-2">Hero Color</label>
               <div className="flex space-x-2">
                 {['#02588E', '#C01060', '#00b85c', '#111827'].map(color => (
                   <button
                     key={color}
                     onClick={() => updateData('heroColor', color)}
                     className={`w-8 h-8 rounded-full border border-gray-200 cursor-pointer ${data.heroColor === color ? 'ring-2 ring-offset-1 ring-[#00b85c]' : ''}`}
                     style={{ backgroundColor: color }}
                   />
                 ))}
               </div>
             </div>

             <div>
               <label className="text-sm font-medium text-gray-700 block mb-1">Sponsor Logo URL</label>
               <input 
                 type="text" 
                 value={data.sponsorLogoUrl}
                 onChange={(e) => updateData('sponsorLogoUrl', e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
               />
             </div>

             <div>
               <label className="text-sm font-medium text-gray-700 block mb-1">Hero Title</label>
               <AutoResizeTextarea
                 value={data.heroTitle}
                 onChange={(val) => updateData('heroTitle', val)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
               />
             </div>

             <div>
               <label className="text-sm font-medium text-gray-700 block mb-1">Date & Time String</label>
               <input 
                 type="text" 
                 value={data.dateTime}
                 onChange={(e) => updateData('dateTime', e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
               />
             </div>

             <div>
               <label className="text-sm font-medium text-gray-700 block mb-1">CTA Link (Registration)</label>
               <input 
                 type="text" 
                 value={data.ctaLink}
                 onChange={(e) => updateData('ctaLink', e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
               />
             </div>

             <div>
               <label className="text-sm font-medium text-gray-700 block mb-1">Intro Text</label>
               <AutoResizeTextarea
                 value={data.introText}
                 onChange={(val) => updateData('introText', val)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
               />
             </div>

             <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 block">Takeaways (Max 4)</label>
                  <button 
                    onClick={() => {
                      if (data.takeaways.length < 4) {
                        updateData('takeaways', [...data.takeaways, 'New Takeaway']);
                      }
                    }}
                    className="text-xs font-semibold text-[#00b85c] flex items-center disabled:opacity-50"
                    disabled={data.takeaways.length >= 4}
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </button>
                </div>
                {data.takeaways.map((t, idx) => (
                  <div key={idx} className="flex space-x-2">
                    <input 
                      type="text" 
                      value={t}
                      onChange={(e) => {
                        const newT = [...data.takeaways];
                        newT[idx] = e.target.value;
                        updateData('takeaways', newT);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
                    />
                    <button onClick={() => {
                        const newT = data.takeaways.filter((_, i) => i !== idx);
                        updateData('takeaways', newT);
                    }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 block">Speakers</label>
                  <button 
                    onClick={() => {
                        updateData('speakers', [...data.speakers, { name: 'New Speaker', role: 'Role', imageUrl: '' }]);
                    }}
                    className="text-xs font-semibold text-[#00b85c] flex items-center"
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </button>
                </div>
                {data.speakers.map((s, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 p-3 rounded-lg space-y-3 relative">
                    <button onClick={() => {
                        const newS = data.speakers.filter((_, i) => i !== idx);
                        updateData('speakers', newS);
                    }} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div>
                       <label className="text-xs font-medium text-gray-500 block mb-1">Name</label>
                       <input type="text" value={s.name} onChange={e => {
                         const newS = [...data.speakers]; newS[idx].name = e.target.value; updateData('speakers', newS);
                       }} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                    </div>
                    <div>
                       <label className="text-xs font-medium text-gray-500 block mb-1">Role</label>
                       <input type="text" value={s.role} onChange={e => {
                         const newS = [...data.speakers]; newS[idx].role = e.target.value; updateData('speakers', newS);
                       }} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                    </div>
                    <div>
                       <label className="text-xs font-medium text-gray-500 block mb-1">Image URL</label>
                       <input type="text" value={s.imageUrl} onChange={e => {
                         const newS = [...data.speakers]; newS[idx].imageUrl = e.target.value; updateData('speakers', newS);
                       }} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm" placeholder="https://..." />
                    </div>
                  </div>
                ))}
             </div>

             <div>
               <label className="text-sm font-medium text-gray-700 block mb-1">Optional Event Link Text</label>
               <input 
                 type="text" 
                 value={data.eventLinkText || ''}
                 onChange={(e) => updateData('eventLinkText', e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
                 placeholder="e.g. Curious? Find out more here →"
               />
             </div>
             <div>
               <label className="text-sm font-medium text-gray-700 block mb-1">Optional Event Link URL</label>
               <input 
                 type="text" 
                 value={data.eventLinkUrl || ''}
                 onChange={(e) => updateData('eventLinkUrl', e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
               />
             </div>

          </div>
        </div>

        {/* Right Panel: Canvas */}
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
                       value={data.heroTitle}
                       disabled
                       className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg text-sm truncate"
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
                        alert(`Webcast Email sent successfully to ${recipientEmail || 'all recipients'}!`);
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

          {viewMode === 'visual' ? (
             <div className="w-full max-w-2xl bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden min-h-[600px] flex flex-col">
                <iframe 
                  srcDoc={isCustomHtml ? codeContent : generateHtml()}
                  title="Email Preview"
                  className="w-full flex-1 border-0"
                />
             </div>
          ) : (
            <div className="w-full max-w-4xl bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl flex flex-col h-full border border-gray-800">
              <div className="h-12 flex items-center px-4 border-b border-gray-700/50 shrink-0">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-4 text-xs font-mono text-gray-400">index.html (Note: Form changes will overwrite custom HTML edits)</div>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <textarea 
                  value={isCustomHtml ? codeContent : generateHtml()}
                  onChange={(e) => {
                    setCodeContent(e.target.value);
                    setIsCustomHtml(true);
                  }}
                  className="w-full grow min-h-[600px] font-mono text-sm bg-transparent text-gray-300 focus:outline-none resize-none"
                  spellCheck={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
