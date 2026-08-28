import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Eye, Code, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { AutoResizeTextarea } from './components/AutoResizeTextarea';

interface NewsletterData {
  header: {
    title: string;
    date: string;
  };
  editorsNote: {
    greeting: string;
    paragraphs: string[];
    imageUrl: string;
    imageLink: string;
    authorName: string;
    authorTitle: string;
  };
  leadStory: {
    kicker: string;
    imageUrl: string;
    headline: string;
    byline: string;
    bodyHtml: string;
  };
  didYouKnow: {
    imageUrl: string;
    textHtml: string;
  };
  podcast: {
    title: string;
    description: string;
    imageUrl: string;
    watchLink: string;
  };
  resources: {
    type: string;
    title: string;
    description: string;
    linkUrl: string;
    linkText: string;
  }[];
  headlines: {
    imageUrl: string;
    title: string;
    descriptionHtml: string;
  }[];
  blog: {
    title: string;
    byline: string;
    description: string;
    linkUrl: string;
  };
  community: {
    title: string;
    linkUrl: string;
    linkText: string;
  };
}

export function NewsletterEditor({ onBack }: { onBack: () => void }) {
  const [isSending, setIsSending] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [codeContent, setCodeContent] = useState('');
  const [isCustomHtml, setIsCustomHtml] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string>('header');

  const [data, setData] = useState<NewsletterData>({
    header: {
      title: 'HR.com’s Payroll, HRIS & Workforce Management Excellence Newsletter',
      date: 'Wednesday, July 08, 2026'
    },
    editorsNote: {
      greeting: 'Dear __FIRST_NAME__,',
      paragraphs: [
        'Hopefully, all our readers based in the United States got their fill of freedom celebrating the 250th anniversary of the nation’s declaration of independence from the crown.',
        'What? Were you expecting me to relate some deep metaphor about the idea of going it alone, or of achieving independence, or of something else to the work of HR and payroll people? No, silly, this was just an engaging way to open this edition of the newsletter’s Editor’s Note.'
      ],
      imageUrl: 'https://public-cdn.hr.com/remoteimages/website-images/community-emailer/2026/payroll-excellence/July/08-07-2026-HR-in-Healthcare-Virtual-Event-300X250.jpg',
      imageLink: 'https://web.hr.com/xyb1',
      authorName: 'Brent Skinner',
      authorTitle: 'Editor, Payroll, HRIS & Workforce Management Excellence Newsletter'
    },
    leadStory: {
      kicker: 'Staying Human in the AI',
      imageUrl: 'https://public-cdn.hr.com/remoteimages/website-images/community-emailer/2026/payroll-excellence/July/08-07-2026-Staying-Human-660x176.jpg',
      headline: 'Finding the Sweet Spot for Humans When it Comes to AI: Part One',
      byline: 'By Brent Skinner, HR.com',
      bodyHtml: 'What if empathy isn’t the uniquely human advantage we’ve assumed it to be in the age of artificial intelligence? In the first installment of a new series of articles, the author challenges one of the most widely accepted assumptions surrounding AI and the future of work. <a href="https://web.hr.com/jqad1" target="_blank" style="color: #1e40af; text-decoration: underline; font-weight: bold;">Click through</a> to read Part One.'
    },
    didYouKnow: {
      imageUrl: 'https://public-cdn.hr.com/remoteimages/website-images/community-emailer/2026/payroll-excellence/July/08-07-2026-Did-you-know-170X170.jpg',
      textHtml: 'Globalization is no longer driven primarily by low-cost labor. According to <a href="https://web.hr.com/wj79" target="_blank" style="color: #1e40af; text-decoration: underline; font-weight: bold;">HR.com’s 2026 Global Expansion in HR survey</a>, organizations now prioritize accessing new customer markets (77%) over sourcing cheaper talent (23%).'
    },
    podcast: {
      title: 'The Future of PEOs: Why Great Technology Still Needs Great People',
      description: 'As small businesses grow, they quickly discover that success depends not only on finding the right technology, but also on the right partnerships.\n\nRecorded last month from the exhibitor floor at PrismHR LIVE just outside Denver, Colorado, host Brent Skinner sat down with Heather Gould, EVP at ResourcingEdge, to explore how the Professional Employer Organization (PEO) industry is evolving alongside AI and modern HCM technology.',
      imageUrl: 'https://public-cdn.hr.com/remoteimages/website-images/community-emailer/2026/payroll-excellence/July/08-07-2026-Podcast-260x147.jpg',
      watchLink: 'https://web.hr.com/du53'
    },
    resources: [
      {
        type: 'Virtual Event:',
        title: 'Hot Trends in Benefits Virtual Event',
        description: 'Attend this special virtual event to learn about the latest employee benefits trends, developments, and practices.',
        linkUrl: 'https://web.hr.com/hg2o',
        linkText: 'Register Now'
      },
      {
        type: 'Webcast:',
        title: 'Your Workforce\'s Key to Financial Wellness? Pay Literacy!',
        description: 'Financial wellness programs can go a long way in helping you keep more employees, reduce their stress and boost their loyalty.',
        linkUrl: 'https://web.hr.com/ngky8',
        linkText: 'View OnDemand'
      },
      {
        type: 'Featured Research:',
        title: 'Future of Global Expansion in HR 2026',
        description: 'Exploring the workforce, technology, compliance, and operational challenges shaping global HR and providing recommendations for building future-ready organizations.',
        linkUrl: 'https://web.hr.com/wj79',
        linkText: 'Download Research Report'
      }
    ],
    headlines: [
      {
        imageUrl: 'https://public-cdn.hr.com/remoteimages/website-images/community-emailer/2026/payroll-excellence/July/08-07-2026-Payroll-Headlines-1-170X170.jpg',
        title: 'Federal Court Orders Maine Sports Bars to Pay $83K for Wage and Child Labor Violations',
        descriptionHtml: 'Three Maine sports bars have been ordered to pay more than $83,000 after a federal court approved a consent order resolving allegations that the businesses violated federal wage, overtime, and child labor laws, according to DOL. <a href="https://web.hr.com/bsjd8" target="_blank" style="color: #1e40af; text-decoration: underline; font-weight: bold;">Read More.</a>'
      },
      {
        imageUrl: 'https://public-cdn.hr.com/remoteimages/website-images/community-emailer/2026/payroll-excellence/July/08-07-2026-Payroll-Headlines-2-170X170.jpg',
        title: 'DOL Updates Prevailing Wage Data for FY 2026–27, Affecting Employment-Based Immigration Programs',
        descriptionHtml: 'The U.S. Department of Labor\'s Office of Foreign Labor Certification (OFLC) has implemented updated prevailing wage data for the July 2026 through June 2027 wage year, with the revised wage determinations taking effect July 1, 2026 across employment-based immigration programs. <a href="https://web.hr.com/ts0u" target="_blank" style="color: #1e40af; text-decoration: underline; font-weight: bold;">Read More.</a>'
      }
    ],
    blog: {
      title: 'AI in the workplace runs on trust. When trust breaks, security risk follows',
      byline: 'By Tony Anscombe, Chief Security Evangelist, ESET',
      description: 'Artificial intelligence can boost productivity and streamline work, but trust remains the foundation of successful adoption. This article explores how clear governance, secure AI tools, employee training, and responsible leadership help organizations reduce security risks while enabling employees to use AI confidently and effectively.',
      linkUrl: 'https://web.hr.com/vehy'
    },
    community: {
      title: 'Was this email forwarded to you?',
      linkUrl: 'https://www.hr.com/en/app/group/Payroll20&20Workforce20Mgmt20Community_klkhsx12.html',
      linkText: 'Join the Payroll, HRIS, Time & Attendance Excellence Community here.'
    }
  });

  useEffect(() => {
    setIsCustomHtml(false);
  }, [data]);

  const updateData = (section: keyof NewsletterData, key: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const generateHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
    <title>${data.header.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
    <style type="text/css">
      table { border-spacing: 0; border-collapse: collapse; }
      td { padding: 0; }
      p { font-size: 16px; line-height: 1.5; }
      img { border: 0; }
      a { color: #277fd2; text-decoration: none; font-size: 16px; }
      body { background-color: #f7fafc; margin: 0; padding: 0; }
      
      @media screen and (max-width: 700px) {
        .two-third-columns .column { width: 100% !important; max-width: 100% !important; display: block !important; }
        .two-third-columns .column .padding { padding-left: 20px !important; padding-right: 20px !important; }
      }
    </style>
</head>
<body>
  <div style="width: 100%; background-color: #f7fafc; font-family: Roboto, Arial, sans-serif; font-size: 16px; padding: 20px 0;">
      <div style="max-width: 700px; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin: 0 auto;">
        <table align="center" style="border-spacing: 0; width: 100%; max-width: 700px; background-color: #fff;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 20px;">
              <div style="text-align: right; margin-bottom: 15px;">
                <a href="http://hr.com/newslettersubscription" target="_blank" style="color: #1e40af; font-weight: bold; text-decoration: underline; font-size: 14px;">Sign Up</a>
              </div>
              <div style="text-align: center;">
                <h1 style="margin: 0; font-size: 32px; line-height: 1.2; color: #0ea5e9; font-weight: 900;">
                  ${data.header.title}
                </h1>
                <p style="margin: 16px 0 4px; font-size: 17px; color: #334155;"><em>Stay ahead in payroll, compliance & workforce strategies</em></p>
                <p style="font-size: 14px; font-weight: 700; padding: 12px 0;">${data.header.date}</p>
                <div style="height: 2px; background: linear-gradient(90deg, #EF4A3D, #FDB414, #94C83D, #4AC4D6); width: 100%;"></div>
              </div>
            </td>
          </tr>

          <!-- Editor's Note -->
          <tr>
            <td style="padding: 20px;">
              <table width="100%" class="two-third-columns" style="border-spacing: 0;">
                <tr>
                  <td class="column" valign="top" style="width: 60%; padding-right: 20px;">
                    <p style="margin: 0 0 12px; color: #334155;">${data.editorsNote.greeting}</p>
                    ${data.editorsNote.paragraphs.map(p => `<p style="margin: 0 0 12px; color: #334155;">${p}</p>`).join('')}
                    <p style="color: #334155; font-weight: bold; margin-top: 20px;">
                      - ${data.editorsNote.authorName},<br>
                      <span style="font-weight: normal; font-style: italic; font-size: 14px;">${data.editorsNote.authorTitle}</span>
                    </p>
                  </td>
                  <td class="column" valign="top" style="width: 40%;">
                    <a href="${data.editorsNote.imageLink}" target="_blank">
                      <img src="${data.editorsNote.imageUrl}" style="width: 100%; max-width: 300px; height: auto; border-radius: 8px;" alt="Promo">
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Story -->
          <tr>
            <td style="padding: 10px 20px;">
              <div style="text-align: center; background: #e6f4ff; color: #0ea5e9; font-weight: 700; padding: 12px; border-radius: 8px 8px 0 0;">
                ${data.leadStory.kicker}
              </div>
              <img src="${data.leadStory.imageUrl}" style="width: 100%; height: auto; display: block;" alt="Lead Story">
              <div style="padding: 20px 0;">
                <h3 style="margin: 0 0 8px; font-size: 22px; font-weight: 900; color: #0f172a;">${data.leadStory.headline}</h3>
                <p style="margin: 0 0 12px; font-size: 14px; color: #64748b;"><strong>${data.leadStory.byline}</strong></p>
                <p style="margin: 0; color: #334155;">${data.leadStory.bodyHtml}</p>
              </div>
            </td>
          </tr>

          <tr><td style="padding: 0 20px;"><div style="height: 1px; background: #e5e7eb; margin: 20px 0;"></div></td></tr>

          <!-- Did You Know -->
          <tr>
            <td style="padding: 10px 20px; text-align: center;">
              <span style="display: inline-block; background: #f1f5f9; border-radius: 6px; padding: 6px 12px; color: #0ea5e9; font-weight: 700; margin-bottom: 20px;">
                Did you know?
              </span>
              <table width="100%" class="two-third-columns" style="border-spacing: 0;">
                <tr>
                  <td class="column" valign="middle" style="width: 30%; text-align: center; padding-bottom: 20px;">
                    <img src="${data.didYouKnow.imageUrl}" style="width: 150px; height: 150px; border-radius: 16px; object-fit: cover;" alt="Did you know">
                  </td>
                  <td class="column" valign="middle" style="width: 70%; padding-left: 20px; text-align: left;">
                    <p style="margin: 0; font-size: 18px; color: #0f172a; line-height: 1.4;">
                      ${data.didYouKnow.textHtml}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Podcast -->
          <tr>
            <td style="background: #f1f5f9; padding: 30px 20px;">
              <table width="100%" class="two-third-columns" style="border-spacing: 0;">
                <tr>
                  <td class="column" valign="top" style="width: 60%; padding-right: 20px;">
                    <span style="display: inline-block; background: #fff; color: #0ea5e9; font-weight: 700; padding: 6px 12px; border-radius: 6px; margin-bottom: 16px;">
                      Podcast
                    </span>
                    <h3 style="margin: 0 0 12px; font-size: 18px; font-weight: 900; color: #0f172a;">${data.podcast.title}</h3>
                    ${data.podcast.description.split('\\n').map(p => `<p style="margin: 0 0 12px; font-size: 14px; color: #334155;">${p}</p>`).join('')}
                    <a href="${data.podcast.watchLink}" target="_blank" style="color: #1e40af; font-weight: bold; text-decoration: underline;">Watch Now</a>
                  </td>
                  <td class="column" valign="top" style="width: 40%; text-align: center;">
                    <img src="${data.podcast.imageUrl}" style="width: 100%; max-width: 260px; height: auto; border-radius: 12px;" alt="Podcast">
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Resources -->
          <tr>
            <td style="padding: 30px 20px; text-align: center;">
              <span style="display: inline-block; background: #f1f5f9; color: #0ea5e9; font-weight: 700; padding: 6px 12px; border-radius: 6px; margin-bottom: 30px;">
                HR.com Resources & Events
              </span>
              <table width="100%" class="two-third-columns" style="border-spacing: 0;">
                <tr>
                  ${data.resources.map((res, i) => `
                    <td class="column" valign="top" style="width: 33.33%; padding: 0 10px; text-align: left; padding-bottom: 20px;">
                      <div style="color: #0ea5e9; font-weight: 700; font-size: 13px; margin-bottom: 8px;">${res.type}</div>
                      <div style="font-weight: bold; margin-bottom: 8px; color: #373737;">${res.title}</div>
                      <div style="font-size: 14px; margin-bottom: 12px; color: #373737; line-height: 1.4;">${res.description}</div>
                      <a href="${res.linkUrl}" target="_blank" style="color: #1e40af; font-weight: bold; font-size: 14px;">${res.linkText}</a>
                    </td>
                    ${(i + 1) % 3 === 0 ? '</tr><tr>' : ''}
                  `).join('')}
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="padding: 0 20px;"><div style="height: 1px; background: #e5e7eb; margin: 0;"></div></td></tr>

          <!-- Headlines -->
          <tr>
            <td style="padding: 30px 20px; text-align: center;">
              <span style="display: inline-block; background: #f1f5f9; color: #0ea5e9; font-weight: 700; padding: 6px 12px; border-radius: 6px; margin-bottom: 30px;">
                Payroll Headlines
              </span>
              ${data.headlines.map(hl => `
                <table width="100%" class="two-third-columns" style="border-spacing: 0; margin-bottom: 30px;">
                  <tr>
                    <td class="column" valign="middle" style="width: 25%; text-align: center; padding-bottom: 15px;">
                      <img src="${hl.imageUrl}" style="width: 150px; height: 150px; border-radius: 12px; object-fit: cover;" alt="Headline">
                    </td>
                    <td class="column" valign="middle" style="width: 75%; padding-left: 20px; text-align: left;">
                      <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 900; color: #0f172a;">${hl.title}</h3>
                      <p style="margin: 0; font-size: 15px; color: #334155;">${hl.descriptionHtml}</p>
                    </td>
                  </tr>
                </table>
              `).join('')}
            </td>
          </tr>

          <tr><td style="padding: 0 20px;"><div style="height: 1px; background: #e5e7eb; margin: 0;"></div></td></tr>

          <!-- Blog -->
          <tr>
            <td style="padding: 30px 20px; text-align: center;">
              <span style="display: inline-block; background: #f1f5f9; color: #0ea5e9; font-weight: 700; padding: 6px 12px; border-radius: 6px; margin-bottom: 20px;">
                From the Blog
              </span>
              <h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900; color: #0f172a;">${data.blog.title}</h3>
              <div style="margin: 0 0 15px; font-size: 12px; color: #64748b; font-weight: bold;">${data.blog.byline}</div>
              <p style="margin: 0 0 15px; color: #334155; text-align: center;">${data.blog.description}</p>
              <a href="${data.blog.linkUrl}" target="_blank" style="color: #1e40af; font-weight: bold; text-decoration: underline;">Read more</a>
            </td>
          </tr>

          <!-- Community -->
          <tr>
            <td style="background: #f1f5f9; padding: 40px 20px; text-align: center;">
              <h3 style="margin: 0 0 15px; font-size: 20px; font-weight: 900; color: #0f172a;">${data.community.title}</h3>
              <a href="${data.community.linkUrl}" target="_blank" style="color: #1e40af; font-weight: 700; font-size: 16px; text-decoration: underline; display: block; margin-bottom: 10px;">${data.community.linkText}</a>
              <p style="margin: 0; font-size: 14px; color: #334155;">(You need to be a member of HR.com to sign up)</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 20px; text-align: center; background: #fff;">
              <img src="https://public-cdn.hr.com/remoteimages/website-images/HRDotCom_Product_Logos/hrdotcom-dark-170-white-bg.png" width="170" alt="HR.com" style="margin-bottom: 20px;">
              <p style="font-size: 14px; color: #334155; margin-bottom: 20px;">
                Thanks for reading! See you next week with more stories and insights that matter to HR leaders.
              </p>
              <a href="http://hr.com/newslettersubscription" style="color: #1e40af; font-weight: 900; text-transform: uppercase; text-decoration: underline; display: block; margin-bottom: 20px;">
                Subscribe to our other newsletters
              </a>
              <p style="font-size: 12px; color: #64748b; margin-bottom: 10px;">
                Copyright 2026, All Rights Reserved. HR.com Limited.<br>
                56 Malone Road, Jackson's Point, ON, Canada, L0E 1L0
              </p>
            </td>
          </tr>

        </table>
      </div>
  </div>
</body>
</html>`;
  };

  const renderSectionHeader = (title: string, id: string) => (
    <button 
      onClick={() => setExpandedSection(expandedSection === id ? '' : id)}
      className="w-full flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
    >
      <span className="font-bold text-gray-800">{title}</span>
      {expandedSection === id ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] w-full">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-4">
           <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-gray-500 hover:text-gray-900">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <h1 className="text-lg font-bold text-gray-900">Newsletter Editor</h1>
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
        <div className="w-[450px] bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
          
          {/* Header Section */}
          {renderSectionHeader('Header & Title', 'header')}
          {expandedSection === 'header' && (
            <div className="p-4 space-y-4 bg-white border-b border-gray-200">
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Title</label>
                 <AutoResizeTextarea value={data.header.title} onChange={v => updateData('header', 'title', v)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Date String</label>
                 <input type="text" value={data.header.date} onChange={e => updateData('header', 'date', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
               </div>
            </div>
          )}

          {/* Editor's Note */}
          {renderSectionHeader('Editor\'s Note', 'editorsNote')}
          {expandedSection === 'editorsNote' && (
            <div className="p-4 space-y-4 bg-white border-b border-gray-200">
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Greeting</label>
                 <input type="text" value={data.editorsNote.greeting} onChange={e => updateData('editorsNote', 'greeting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Paragraphs (One per line)</label>
                 <AutoResizeTextarea value={data.editorsNote.paragraphs.join('\n\n')} onChange={v => updateData('editorsNote', 'paragraphs', v.split('\n\n'))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[120px]" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Image URL</label>
                 <input type="text" value={data.editorsNote.imageUrl} onChange={e => updateData('editorsNote', 'imageUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <div>
                   <label className="text-xs font-medium text-gray-700 block mb-1">Author Name</label>
                   <input type="text" value={data.editorsNote.authorName} onChange={e => updateData('editorsNote', 'authorName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                 </div>
                 <div>
                   <label className="text-xs font-medium text-gray-700 block mb-1">Author Title</label>
                   <input type="text" value={data.editorsNote.authorTitle} onChange={e => updateData('editorsNote', 'authorTitle', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                 </div>
               </div>
            </div>
          )}

          {/* Lead Story */}
          {renderSectionHeader('Lead Story', 'leadStory')}
          {expandedSection === 'leadStory' && (
            <div className="p-4 space-y-4 bg-white border-b border-gray-200">
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Kicker / Tag</label>
                 <input type="text" value={data.leadStory.kicker} onChange={e => updateData('leadStory', 'kicker', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Image URL</label>
                 <input type="text" value={data.leadStory.imageUrl} onChange={e => updateData('leadStory', 'imageUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Headline</label>
                 <AutoResizeTextarea value={data.leadStory.headline} onChange={v => updateData('leadStory', 'headline', v)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Byline</label>
                 <input type="text" value={data.leadStory.byline} onChange={e => updateData('leadStory', 'byline', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Body (HTML allowed)</label>
                 <AutoResizeTextarea value={data.leadStory.bodyHtml} onChange={v => updateData('leadStory', 'bodyHtml', v)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px]" />
               </div>
            </div>
          )}

          {/* Did You Know */}
          {renderSectionHeader('Did You Know?', 'didYouKnow')}
          {expandedSection === 'didYouKnow' && (
            <div className="p-4 space-y-4 bg-white border-b border-gray-200">
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Image URL</label>
                 <input type="text" value={data.didYouKnow.imageUrl} onChange={e => updateData('didYouKnow', 'imageUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Text (HTML allowed)</label>
                 <AutoResizeTextarea value={data.didYouKnow.textHtml} onChange={v => updateData('didYouKnow', 'textHtml', v)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[80px]" />
               </div>
            </div>
          )}

          {/* Podcast */}
          {renderSectionHeader('Podcast', 'podcast')}
          {expandedSection === 'podcast' && (
            <div className="p-4 space-y-4 bg-white border-b border-gray-200">
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Title</label>
                 <AutoResizeTextarea value={data.podcast.title} onChange={v => updateData('podcast', 'title', v)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Description</label>
                 <AutoResizeTextarea value={data.podcast.description} onChange={v => updateData('podcast', 'description', v)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px]" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Image URL</label>
                 <input type="text" value={data.podcast.imageUrl} onChange={e => updateData('podcast', 'imageUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Watch Link URL</label>
                 <input type="text" value={data.podcast.watchLink} onChange={e => updateData('podcast', 'watchLink', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
            </div>
          )}
          
          {/* Resources */}
          {renderSectionHeader('Resources & Events', 'resources')}
          {expandedSection === 'resources' && (
            <div className="p-4 space-y-6 bg-white border-b border-gray-200">
               {data.resources.map((res, i) => (
                 <div key={i} className="space-y-3 p-3 bg-gray-50 border border-gray-200 rounded-lg relative">
                   <button onClick={() => {
                     const newRes = [...data.resources];
                     newRes.splice(i, 1);
                     setData(prev => ({ ...prev, resources: newRes }));
                   }} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded">
                     <Trash2 className="w-4 h-4" />
                   </button>
                   <div>
                     <label className="text-xs font-medium text-gray-500 block">Type Tag</label>
                     <input type="text" value={res.type} onChange={e => {
                       const newRes = [...data.resources]; newRes[i].type = e.target.value;
                       setData(prev => ({ ...prev, resources: newRes }));
                     }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" />
                   </div>
                   <div>
                     <label className="text-xs font-medium text-gray-500 block">Title</label>
                     <input type="text" value={res.title} onChange={e => {
                       const newRes = [...data.resources]; newRes[i].title = e.target.value;
                       setData(prev => ({ ...prev, resources: newRes }));
                     }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" />
                   </div>
                   <div>
                     <label className="text-xs font-medium text-gray-500 block">Description</label>
                     <AutoResizeTextarea value={res.description} onChange={v => {
                       const newRes = [...data.resources]; newRes[i].description = v;
                       setData(prev => ({ ...prev, resources: newRes }));
                     }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" />
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                     <div>
                       <label className="text-xs font-medium text-gray-500 block">Link Text</label>
                       <input type="text" value={res.linkText} onChange={e => {
                         const newRes = [...data.resources]; newRes[i].linkText = e.target.value;
                         setData(prev => ({ ...prev, resources: newRes }));
                       }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" />
                     </div>
                     <div>
                       <label className="text-xs font-medium text-gray-500 block">Link URL</label>
                       <input type="text" value={res.linkUrl} onChange={e => {
                         const newRes = [...data.resources]; newRes[i].linkUrl = e.target.value;
                         setData(prev => ({ ...prev, resources: newRes }));
                       }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" />
                     </div>
                   </div>
                 </div>
               ))}
               <button onClick={() => setData(prev => ({ ...prev, resources: [...prev.resources, { type: 'New Type', title: 'New Title', description: '', linkText: 'Click here', linkUrl: '#' }] }))} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center">
                 <Plus className="w-4 h-4 mr-1" /> Add Resource
               </button>
            </div>
          )}

          {/* Headlines */}
          {renderSectionHeader('Payroll Headlines', 'headlines')}
          {expandedSection === 'headlines' && (
            <div className="p-4 space-y-6 bg-white border-b border-gray-200">
               {data.headlines.map((hl, i) => (
                 <div key={i} className="space-y-3 p-3 bg-gray-50 border border-gray-200 rounded-lg relative">
                   <button onClick={() => {
                     const newHl = [...data.headlines];
                     newHl.splice(i, 1);
                     setData(prev => ({ ...prev, headlines: newHl }));
                   }} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded">
                     <Trash2 className="w-4 h-4" />
                   </button>
                   <div>
                     <label className="text-xs font-medium text-gray-500 block">Image URL</label>
                     <input type="text" value={hl.imageUrl} onChange={e => {
                       const newHl = [...data.headlines]; newHl[i].imageUrl = e.target.value;
                       setData(prev => ({ ...prev, headlines: newHl }));
                     }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" />
                   </div>
                   <div>
                     <label className="text-xs font-medium text-gray-500 block">Title</label>
                     <AutoResizeTextarea value={hl.title} onChange={v => {
                       const newHl = [...data.headlines]; newHl[i].title = v;
                       setData(prev => ({ ...prev, headlines: newHl }));
                     }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" />
                   </div>
                   <div>
                     <label className="text-xs font-medium text-gray-500 block">Description (HTML allowed)</label>
                     <AutoResizeTextarea value={hl.descriptionHtml} onChange={v => {
                       const newHl = [...data.headlines]; newHl[i].descriptionHtml = v;
                       setData(prev => ({ ...prev, headlines: newHl }));
                     }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm min-h-[80px]" />
                   </div>
                 </div>
               ))}
               <button onClick={() => setData(prev => ({ ...prev, headlines: [...prev.headlines, { imageUrl: '', title: 'New Headline', descriptionHtml: '' }] }))} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center">
                 <Plus className="w-4 h-4 mr-1" /> Add Headline
               </button>
            </div>
          )}

        </div>

        {/* Right Panel: Canvas */}
        <div className="flex-1 overflow-auto p-8 flex justify-center items-start bg-gray-50/50 relative">
          
          {showSendModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Send Newsletter</h2>
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
                       value={data.header.title}
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
                        alert(`Newsletter sent successfully to ${recipientEmail || 'all recipients'}!`);
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
