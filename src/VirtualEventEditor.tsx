import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Eye, Code, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { AutoResizeTextarea } from './components/AutoResizeTextarea';

interface Session {
  title: string;
  time: string;
  linkUrl: string;
}

interface Sponsor {
  name: string;
  imageUrl: string;
}

interface VirtualEventData {
  header: {
    imageUrl: string;
    imageLink: string;
    altText: string;
  };
  message: {
    greeting: string;
    bodyHtml: string;
    signUpUrl: string;
  };
  schedule: {
    headerText: string;
    sessions: Session[];
  };
  sponsors: Sponsor[];
}

export function VirtualEventEditor({ onBack }: { onBack: () => void }) {
  const [isSending, setIsSending] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [codeContent, setCodeContent] = useState('');
  const [isCustomHtml, setIsCustomHtml] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string>('header');

  const [data, setData] = useState<VirtualEventData>({
    header: {
      imageUrl: 'https://media-cdn.hr.com/Emails/images/hot-trends-in-benefits-july-2026-970x250.jpg',
      imageLink: 'https://web.hr.com/p82f',
      altText: 'Hot Trends in Benefits Virtual Event - July 22, 2026'
    },
    message: {
      greeting: 'Hi __FIRST_NAME__,',
      bodyHtml: `Attend this special, free virtual event to discover the latest employee benefits trends, developments, and practices. It is the ideal opportunity to learn about updates, additions, and enhancements you can make to your organization's benefits and well-being offerings. By joining, you will gain critical insights to better support the diverse and evolving needs of your entire workforce.

The event features a series of expert-led webcasts covering the specific types of benefits offered by modern employers of choice and how to effectively target and personalize these plans for various employee groups. Speakers will also address the role of voluntary benefits in today’s total rewards packages, alongside the costs and challenges of managing a diverse benefits plan.

Register today to stay ahead of the curve!`,
      signUpUrl: 'https://www.hr.com/en?t=/CustomCode/events/registration&eventID=1752861719068&email=__EMAIL__'
    },
    schedule: {
      headerText: 'EVENT SCHEDULE - JULY 22',
      sessions: [
        {
          title: '2026 Award Winner Announcement',
          time: 'July 22, 10:50 AM - 10:55 AM',
          linkUrl: ''
        },
        {
          title: 'How the best HR leaders evaluate benefits',
          time: 'July 22, 11:00 AM - 11:55 AM ET',
          linkUrl: 'https://web.hr.com/oa8w'
        },
        {
          title: 'Evaluating ICHRA: How to Tell If It’s Right for Your Health Benefits Strategy',
          time: 'July 22, 12:00 PM - 12:55 PM ET',
          linkUrl: 'https://web.hr.com/tn24u'
        },
        {
          title: 'How Caregiving & Women’s Health Drive Workforce Risk and Costs—and How Employers Must Respond',
          time: 'July 22, 1:00 PM - 1:55 PM ET',
          linkUrl: 'https://web.hr.com/5c316'
        },
        {
          title: 'Reduce Burnout and Improve Employee Retention Using Real-Time Insights',
          time: 'July 22, 2:00 PM - 2:30 PM ET',
          linkUrl: 'https://web.hr.com/yfkha'
        }
      ]
    },
    sponsors: [
      { name: 'Maven Clinic', imageUrl: 'https://media-cdn.hr.com/Emails/2026/160/maven-logo-160x60.jpg' },
      { name: 'Benefitbay', imageUrl: 'https://media-cdn.hr.com/Emails/2026/160/benefitbay-logo-160x60.jpg' },
      { name: 'Cleo Labs', imageUrl: 'https://media-cdn.hr.com/Emails/2026/160/cleo-logo-160x60.jpg' },
      { name: 'Wellify', imageUrl: 'https://media-cdn.hr.com/Emails/2026/160/wellify-logo-160x60.jpg' }
    ]
  });

  useEffect(() => {
    setIsCustomHtml(false);
  }, [data]);

  const updateData = (section: keyof VirtualEventData, key: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof VirtualEventData],
        [key]: value
      }
    }));
  };

  const updateSchedule = (key: string, value: any) => {
    setData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [key]: value
      }
    }));
  };

  const generateHtml = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${data.header.altText}</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f2f5;">
<table bgcolor="#f0f2f5" border="0" cellpadding="0" cellspacing="0" class="m_em_full_wrap" role="presentation" width="100%">
  <tbody>
    <tr>
      <td align="center" valign="top">
        <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="m_em_main_table" role="presentation" style="width:650px;table-layout:fixed;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07)" width="650">
          <tbody>
            <tr>
              <td align="center" class="m_em_aside10" valign="top">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="padding: 22px 20px 16px 20px; font-size: 11px; line-height: 16px; font-weight: 700; font-family: Roboto, Arial, sans-serif; color: #ffffff; letter-spacing: 2.5px; text-transform: uppercase; background-color: #f0493c;">
                        UPCOMING VIRTUAL EVENT
                      </td>
                    </tr>
                    <tr>
                      <td align="center" bgcolor="#ffffff" class="m_logo" style="padding:0px;background-color:#ffffff" valign="top" id="em-header">
                        <a data-cta="1" href="${data.header.imageLink}" rel="noreferrer" target="_blank" data-captcha="1">
                          <img alt="${data.header.altText}" src="${data.header.imageUrl}" style="max-width:640px;height:auto;display:block; margin-top:5px;">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="padding:24px 50px 10px 50px;color:#1a1a2e;font-family:'Roboto',Arial,sans-serif;font-size:17px;line-height:22px;font-weight:600" valign="top">
                        ${data.message.greeting}
                      </td>
                    </tr>
                    <tr>
                      <td align="left" class="m_em_aside20" style="padding:0 50px 8px 50px;color:#444b58;font-family:'Roboto',Arial,sans-serif;font-size:15px;line-height:24px" valign="top" id="em-message">
                       ${data.message.bodyHtml.replace(/\n\n/g, '<br><br>')}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:14px 30px;" align="center" width="200" id="em-button">
                        <a href="${data.message.signUpUrl}" data-captcha="1" data-cta="1">
                          <img alt="Sign Me Up" src="https://media-cdn.hr.com/Emails/2026/160/signup-button-blue.png" style="width: 200px; height: auto">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 20px; font-size: 13px; line-height: 1.4em; font-family: Roboto, Arial, sans-serif; color: #fff; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border-top: 2px solid #f5f5f5; background: #4D70C1;" id="em-schedule">
                        ${data.schedule.headerText}
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="padding:0 50px 0 50px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            ${data.schedule.sessions.map(session => `
                            <tr>
                              <td align="left" style="padding:14px 0 0; font-size:17px; line-height:1.5em; font-family:'Roboto', Arial, sans-serif;">
                                <a href="${session.linkUrl}" data-cta="1" style="text-decoration: none;">
                                  <strong style="color: #1a4f8a;">${session.title}</strong>
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size: 12px; line-height: 1.5em; font-family: Roboto, Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;">
                                <span style="display:inline-block; border-left:dotted #f0493c; padding:4px 10px; color:#f0493c; font-weight:500; border-radius:0 4px 4px 0;">
                                  ${session.time}
                                </span>
                              </td>
                            </tr>
                            `).join('')}
                            
                            <tr>
                              <td align="center" style="padding-top:10px; padding-bottom:2px; font-size:16px; line-height:17px; color:#0171ca; font-weight:500; font-family:Roboto,Arial,sans-serif">
                                <br>
                              </td>
                            </tr>
                            
                            ${data.sponsors.length > 0 ? `
                            <tr>
                              <td align="center" style="padding:20px; background: white;">
                                <img alt="Big Thanks to our Event Sponsors" src="https://media-cdn.hr.com/Emails/2026/160/sponsor-thanks-blue.png" style="width: 510px;">
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding:8px 30px 16px 30px; font-size:17px; line-height:24px; color:#555555; font-weight:400; font-family:'Roboto', Arial, sans-serif; text-align:center; border-radius:0 0 4px 4px; background: white;">
                                ${data.sponsors.map(sponsor => `
                                  <img alt="Sponsored by ${sponsor.name}" src="${sponsor.imageUrl}" style="margin-top: 10px; margin-bottom: 0px; width: 150px; height: auto;" title="Sponsored by ${sponsor.name}" width="90" id="em-sponsor">&nbsp; &nbsp;&nbsp;
                                `).join('')}
                               </td>
                            </tr>
                            ` : ''}
                            <tr>
                              <td align="center" bgcolor="#ffffff" style="font-size: 13px; line-height: 1.4em;
                                font-family: Roboto, Arial, sans-serif; color: #f0493c; font-weight: 700;
                                letter-spacing: 2px; text-transform: uppercase; border-bottom: 2px solid #f5f5f5;">
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:0 30px 0 30px;" align="center" width="200">
                                <br>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="width:110px" width="110">
                          <tbody>
                            <tr>
                              <td align="right" valign="top">
                                <img alt="HRCI 2026 Approved Provider" src="https://media-cdn.hr.com/Emails/images/hrci-2026-recertification-provider-201x207.png" style="display: block; max-width: 110px; max-height: 120px; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; color: rgb(52, 51, 51); font-weight: bold; padding-top: 10px; padding-left: 0px; border-width: 0px; border-style: solid; width: 90px; height: 90px;" width="90">
                                <br>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table align="right" border="0" cellpadding="0" cellspacing="0" style="width:425px" width="425">
                          <tbody>
                            <tr>
                              <td align="left" style="color:#555e6b; padding-right:20px; font-family:'Roboto',Arial,sans-serif;font-size:13px;line-height:18px;font-weight:400" valign="top">
                                <br>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="color:#555e6b; padding-right:20px; font-family:'Roboto',Arial,sans-serif;font-size:13px;line-height:18px;font-weight:400" valign="top">Credit information can be found on the registration page. Upon completion
                                of the live session, you will be emailed your credit, and we will place it in your
                                HR.com account.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" valign="top">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="width:110px" width="110">
                                  <tbody>
                                    <tr>
                                      <td align="right" style="padding-bottom: 20px" valign="top">
                                        <img alt="2025 SHRM Badge" src="https://media-cdn.hr.com/media.hr.com/shrm-recertification-provider-2025.png" style="width:90px; height: 90px;">
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table align="right" border="0" cellpadding="0" cellspacing="0" style="width:420px" width="420">
                                  <tbody>
                                    <tr>
                                      <td align="left" style="color:#555e6b;padding-bottom: 20px; padding-top: 20px; padding-right: 20px; font-family:'Roboto',Arial,sans-serif;font-size:13px;line-height:18px;font-weight:400" valign="top">
                                        HR.com is recognized by SHRM to offer Professional Development Credits (PDC) for
                                        SHRM-CP® or SHRM-SCP® recertification activities.
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
                    <tr>
                      <td style="background: linear-gradient(90deg, #EF4A3D, #FDB414, #94C83D, #4AC4D6, #5D94CE, #E51069);">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            <tr valign="middle"><td height="10"></td></tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table border="0" cellpadding="0" cellspacing="0" class="em_full_wrap" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" bgcolor="#f0f2f5" valign="top">
                        <table align="center" bgcolor="#f0f2f5" border="0" cellpadding="0" cellspacing="0" class="em_main_table" role="presentation" style="width:650px; table-layout:fixed;" width="650">
                          <tbody>
                            <tr>
                              <td align="center" class="em_padall" style="padding:0 0px 25px 0px;" valign="top">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" valign="top">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:650px;" width="650">
                                          <tbody>
                                            <tr>
                                              <td align="center" style="padding: 10px 0px 0px 0px;" valign="top">
                                                <table align="right" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:650px;" width="650">
                                                  <tbody>
                                                    <tr>
                                                      <td align="center" valign="top">
                                                        <table align="center" cellpadding="0" cellspacing="0" role="presentation" style="width:55px;" width="55">
                                                          <tbody>
                                                            <tr>
                                                              <td align="center" valign="middle"><a data-cta="0" data-hs-link-id="1" href="https://www.hr.com/" style="text-decoration:none;" target="_blank"><img alt="HR.com" border="0" height="56" src="https://media-cdn.hr.com/media.hr.com/Logo-Dark-New.png" style="display:block; font-family: Arial, sans-serif; font-size:16px; line-height:18px; color:#000000; font-weight:bold; border-width:0; margin: 10px;" width="130"> </a></td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td align="center" style="padding-top: 10px; padding-right: 5px; padding-bottom: 0; padding-left: 5px; font-size: 12px; line-height: 16px; color: #868080; font-family: Helvetica, Arial, sans-serif;">
                                                        HR.com Limited - 56 Malone Road, Jackson's Point, ON, Canada, L0E 1L0</td>
                                                    </tr>
                                                    <tr>
                                                      <td align="center" style="padding-top: 7px; padding-right: 5px; padding-bottom: 20px; padding-left: 5px; font-size: 12px; line-height: 16px; color: #868080; font-family: Helvetica, Arial, sans-serif;">
                                                        <a data-cta="0" href="https://www.hr.com/en/about_us/privacy_information/" style="text-decoration: none; color:#868080;" target="_blank"><span style="color:#868080;">Privacy Policy</span></a> &nbsp; | &nbsp; <a href="mailto:events@hr.com?subject=Contact Us: HR.com Virtual Events and Webcasts" style="text-decoration: none;  color: #868080;" data-cta="0" data-captcha="0"> <span style=" text-decoration: none;  color: #868080;" data-cta="0"> Contact Us</span></a>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td style="padding:0 0 40px 0; text-align:center; font-size:11px; line-height:19px; color:#868080; font-family:'Roboto', Arial, sans-serif;">
                                                        If you would like to change your subscription settings please access the <a data-cta="0" href="https://www.hr.com/en?t=/CustomCode/accsetting/lib/navigation&amp;mode=show&amp;tabid=3&amp;action=notifications" style="color:#5d95cf !important;" target="_blank"><span style="color:#2358C2;">subscription page</span></a> or if you no longer wish to<br> receive these email campaigns you may&nbsp;<a data-cta="0" href="https://www.hr.com/en?t=/CustomCode/hr/subscribe/sub.campaign.7&amp;cid1=__CUSTOMER_ID__&amp;cid2=1170172078066" style="color:#2358C2 !important;" target="_blank" data-captcha="1"><span style="color:#2358C2;">unsubscribe here</span></a>.<br><br> This email account is not monitored. Please do not reply to this email.</td>
                                                    </tr>
                                                  </tbody>
                                                </table>
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
                          </tbody>
                        </table>
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
  </tbody>
</table>
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
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-4">
           <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-gray-500 hover:text-gray-900">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <h1 className="text-lg font-bold text-gray-900">Virtual Event Editor</h1>
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

      <div className="flex flex-1 overflow-hidden">
        
        <div className="w-[450px] bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
          
          {renderSectionHeader('Header Image', 'header')}
          {expandedSection === 'header' && (
            <div className="p-4 space-y-4 bg-white border-b border-gray-200">
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Image URL</label>
                 <input type="text" value={data.header.imageUrl} onChange={e => updateData('header', 'imageUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Link URL</label>
                 <input type="text" value={data.header.imageLink} onChange={e => updateData('header', 'imageLink', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Alt Text</label>
                 <input type="text" value={data.header.altText} onChange={e => updateData('header', 'altText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
               </div>
            </div>
          )}

          {renderSectionHeader('Message', 'message')}
          {expandedSection === 'message' && (
            <div className="p-4 space-y-4 bg-white border-b border-gray-200">
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Greeting</label>
                 <input type="text" value={data.message.greeting} onChange={e => updateData('message', 'greeting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Body Text (HTML allowed)</label>
                 <AutoResizeTextarea value={data.message.bodyHtml} onChange={v => updateData('message', 'bodyHtml', v)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[120px]" />
               </div>
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Sign Me Up Link (Button URL)</label>
                 <input type="text" value={data.message.signUpUrl} onChange={e => updateData('message', 'signUpUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono" />
               </div>
            </div>
          )}

          {renderSectionHeader('Event Schedule', 'schedule')}
          {expandedSection === 'schedule' && (
            <div className="p-4 space-y-4 bg-white border-b border-gray-200">
               <div>
                 <label className="text-xs font-medium text-gray-700 block mb-1">Schedule Header</label>
                 <input type="text" value={data.schedule.headerText} onChange={e => updateSchedule('headerText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
               </div>
               <div className="space-y-4 pt-4 border-t border-gray-200">
                 <h4 className="text-sm font-bold text-gray-800">Sessions</h4>
                 {data.schedule.sessions.map((session, idx) => (
                   <div key={idx} className="bg-gray-50 border border-gray-200 p-3 rounded-lg space-y-3 relative">
                     <button onClick={() => {
                         const newSessions = data.schedule.sessions.filter((_, i) => i !== idx);
                         updateSchedule('sessions', newSessions);
                     }} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500">
                       <Trash2 className="w-4 h-4" />
                     </button>
                     <div>
                        <label className="text-xs font-medium text-gray-500 block mb-1">Title</label>
                        <input type="text" value={session.title} onChange={e => {
                          const newS = [...data.schedule.sessions]; newS[idx].title = e.target.value; updateSchedule('sessions', newS);
                        }} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-gray-500 block mb-1">Time</label>
                        <input type="text" value={session.time} onChange={e => {
                          const newS = [...data.schedule.sessions]; newS[idx].time = e.target.value; updateSchedule('sessions', newS);
                        }} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-gray-500 block mb-1">Link URL</label>
                        <input type="text" value={session.linkUrl} onChange={e => {
                          const newS = [...data.schedule.sessions]; newS[idx].linkUrl = e.target.value; updateSchedule('sessions', newS);
                        }} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                     </div>
                   </div>
                 ))}
                 <button onClick={() => {
                   const newSessions = [...data.schedule.sessions, { title: 'New Session', time: '12:00 PM', linkUrl: '' }];
                   updateSchedule('sessions', newSessions);
                 }} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center">
                   <Plus className="w-4 h-4 mr-1" /> Add Session
                 </button>
               </div>
            </div>
          )}

          {renderSectionHeader('Sponsors', 'sponsors')}
          {expandedSection === 'sponsors' && (
            <div className="p-4 space-y-4 bg-white border-b border-gray-200">
               {data.sponsors.map((sponsor, idx) => (
                 <div key={idx} className="bg-gray-50 border border-gray-200 p-3 rounded-lg space-y-3 relative">
                   <button onClick={() => {
                       const newSponsors = data.sponsors.filter((_, i) => i !== idx);
                       setData(prev => ({ ...prev, sponsors: newSponsors }));
                   }} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500">
                     <Trash2 className="w-4 h-4" />
                   </button>
                   <div>
                      <label className="text-xs font-medium text-gray-500 block mb-1">Name / Alt</label>
                      <input type="text" value={sponsor.name} onChange={e => {
                        const newS = [...data.sponsors]; newS[idx].name = e.target.value; setData(prev => ({ ...prev, sponsors: newS }));
                      }} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                   </div>
                   <div>
                      <label className="text-xs font-medium text-gray-500 block mb-1">Image URL</label>
                      <input type="text" value={sponsor.imageUrl} onChange={e => {
                        const newS = [...data.sponsors]; newS[idx].imageUrl = e.target.value; setData(prev => ({ ...prev, sponsors: newS }));
                      }} className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                   </div>
                 </div>
               ))}
               <button onClick={() => {
                 const newSponsors = [...data.sponsors, { name: 'New Sponsor', imageUrl: '' }];
                 setData(prev => ({ ...prev, sponsors: newSponsors }));
               }} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center">
                 <Plus className="w-4 h-4 mr-1" /> Add Sponsor
               </button>
            </div>
          )}

        </div>

        <div className="flex-1 overflow-auto p-8 flex justify-center items-start bg-gray-50/50 relative">
          
          {showSendModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Send Virtual Event Email</h2>
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
                       value={data.header.altText}
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
                        alert(`Virtual Event Email sent successfully to ${recipientEmail || 'all recipients'}!`);
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
