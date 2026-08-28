import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Plus, Trash2, Eye, Code, GripVertical } from 'lucide-react';
import { AutoResizeTextarea } from './components/AutoResizeTextarea';

interface OnDemandWebcastData {
  greeting: string;
  introParagraph1: string;
  introParagraph2: string;
  webcasts: {
    title: string;
    url: string;
    sponsorImg: string;
    sponsorAlt: string;
  }[];
}

export function WebcastEditorOnDemand({ onBack }: { onBack: () => void }) {
  const [isSending, setIsSending] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [codeContent, setCodeContent] = useState('');
  const [isCustomHtml, setIsCustomHtml] = useState(false);

  const [data, setData] = useState<OnDemandWebcastData>({
    greeting: "Hello __FIRST_NAME__,",
    introParagraph1: "At HR.com, we are committed to educating and inspiring HR professionals and helping them build meaningful and impactful careers. We understand that you may not have time in your busy day to attend our great webcast sessions live. That's why we offer OnDemand access to our members.",
    introParagraph2: "Stay on top of the latest HR practices, technologies, and trends — and earn HRCI and SHRM credits at the same time. Below is a list of encore webcasts you may have recently missed.",
    webcasts: [
      {
        title: "A Faster Workday for the Frontline: Transform Your Hiring Process with Paradox",
        url: "https://web.hr.com/3v8lb",
        sponsorImg: "https://public-cdn.hr.com/system/app/media/rs/2025/12/25/mjl9fb0q/120.jpg",
        sponsorAlt: "Workday"
      },
      {
        title: "Your Workforce's Key to Financial Wellness? Pay Literacy!",
        url: "https://web.hr.com/2cka5",
        sponsorImg: "https://public-cdn.hr.com/system/app/media/rs/2026/1/13/mkd66mrx/120.jpg",
        sponsorAlt: "Paycom"
      },
      {
        title: "Control Costs, Manage Pharmacy and Strengthen Your Strategy",
        url: "https://web.hr.com/pqdt",
        sponsorImg: "https://public-cdn.hr.com/system/app/media/rs/2020/3/4/k7dhbena/120.jpg",
        sponsorAlt: "Gallagher"
      }
    ]
  });

  const generateHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>HR.com OnDemand Webcasts</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; background-color: #ffffff; font-family: 'Roboto', Arial, sans-serif; }
    img { border: 0; display: block; height: auto; }
    a { color: inherit; }
    .wrapper { width: 650px !important; max-width: 650px; }
    .full-width { width: 100% !important; }
    .mobile-hide { display: table-cell; }
    .pill-cell { width: 32%; padding-right: 8px; }
    .pill-cell-last { width: 36%; }
    .credit-cell { width: 48%; }
    .credit-spacer { width: 4%; }
    .upgrade-btn { padding-left: 16px; white-space: nowrap; }
    .card-title-cell { padding-right: 16px; }
    .card-sponsor { width: 86px; border-left: 1px solid #f1f5f9; padding-left: 16px; }
    @media only screen and (max-width:600px) {
      .wrapper, table[class="wrapper"] { width: 100% !important; max-width: 100% !important; }
      .outer-pad { padding-top: 20px !important; padding-left: 20px !important; padding-right: 20px !important; }
      .outer-pad2 { padding: 14px 20px !important; }
      .header-logo-row td { display: block !important; width: 100% !important; }
      .header-logo-row .logo-cell { padding-bottom: 10px; }
      .header-logo-row .pill-right { text-align: left !important; padding-top: 20px !important; }
      .headline { font-size: 34px !important; }
      .pills-row { display: block !important; }
      .pill-cell { vertical-align: top; }
      .pill-cell-last { display: block !important; width: 100% !important; }
      .greeting-bar { padding: 14px 20px !important; }
      .cards-outer { padding: 14px 20px 6px !important; }
      .card-row { display: block !important; text-align: center !important; }
      .card-title-cell { display: block !important; width: 100% !important; padding-right: 0 !important; margin-bottom: 12px; }
      .card-sponsor { display: block !important; width: 100% !important; border-left: 0 !important; border-top: 1px solid #f1f5f9 !important; padding-left: 0 !important; padding-top: 12px !important; text-align: left !important; }
      .card-sponsor p { text-align: left !important; }
      .browse-outer { padding: 10px 20px 4px !important; }
      .browse-btn { padding: 0 20px 16px !important; }
      .upgrade-wrap { padding: 0 20px 16px !important; }
      .upgrade-inner { padding: 16px 18px !important; }
      .upgrade-row { display: block !important; }
      .upgrade-text { display: block !important; width: 100% !important; margin-bottom: 14px; }
      .upgrade-btn { display: block !important; width: 100% !important; padding-left: 0 !important; text-align: center !important; white-space: normal !important; }
      .upgrade-btn a { display: block !important; text-align: center !important; }
      .credits-outer { padding: 14px 20px !important; }
      .credits-row { display: block !important; }
      .credit-cell { display: block !important; width: 100% !important; margin-bottom: 10px; }
      .credit-spacer { display: none !important; }
      .footer-pad { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:'Roboto',Arial,sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff;">
    <tr>
      <td align="center">
        <table class="wrapper" border="0" cellpadding="0" cellspacing="0" width="650" style="max-width:650px;background-color:#ffffff;">
          <tr>
            <td style="background: linear-gradient(90deg, #EF4A3D, #FDB414, #94C83D, #4AC4D6, #5D94CE, #E51069);">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr valign="middle"><td height="5"></td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#0f172a;padding:0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="outer-pad" style="padding:22px 36px 0;">
                    <table class="header-logo-row" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td class="logo-cell" valign="middle">
                          <a href="https://www.hr.com" target="_blank" style="text-decoration:none;">
                            <img src="https://media-cdn.hr.com/media.hr.com/email_images/hrcom_maximizinghumanpotential_trnsprnt_white_logo.png" alt="HR.com" width="100" style="display:block;height:auto;border:0;">
                          </a>
                        </td>
                        <td class="pill-right" align="right" valign="middle">
                          <a href="https://www.hr.com/en?t=/webcasts/archived" target="_blank" style="text-decoration:none;">
                            <span style="display:inline-block;background:#FDB414;color:#0f172a;font-family:'Roboto',Arial,sans-serif;font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;padding:5px 14px;border-radius:2px;">▶&nbsp;On-Demand Webcasts</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="outer-pad" style="padding:28px 36px 0;">
                    <p class="headline" style="margin:0 0 14px 0;font-size:38px;font-weight:900;color:#ffffff;line-height:1.15;letter-spacing:-1px;font-family:'Roboto',Arial,sans-serif;">
                      Couldn't make it live?<br><span style="color:#FDB414;">We saved your seat.</span>
                    </p>
                  </td>
                </tr>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="outer-pad" style="padding:22px 36px 28px;">
                    <table class="pills-row" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td class="pill-cell" width="32%" style="padding-right:8px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.07);border-radius:6px;">
                            <tr>
                              <td style="padding:12px 16px;">
                                <p style="margin:0 0 1px 0;font-size:15px;font-weight:900;color:#FDB414;font-family:'Roboto',Arial,sans-serif;line-height:1;">HRCI</p>
                                <p style="margin:0;font-size:10px;font-weight:400;color:#ffffff;font-family:'Roboto',Arial,sans-serif;letter-spacing:0.5px;">Approved Provider</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td class="pill-cell" width="32%" style="padding-right:8px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.07);border-radius:6px;">
                            <tr>
                              <td style="padding:12px 16px;">
                                <p style="margin:0 0 1px 0;font-size:15px;font-weight:900;color:#FDB414;font-family:'Roboto',Arial,sans-serif;line-height:1;">SHRM</p>
                                <p style="margin:0;font-size:10px;font-weight:400;color:#ffffff;font-family:'Roboto',Arial,sans-serif;letter-spacing:0.5px;">PDC Credits</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td class="pill-cell-last" width="36%">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:rgba(253,180,20,0.12);border:1px solid rgba(253,180,20,0.3);border-radius:6px;">
                            <tr>
                              <td style="padding:12px 16px;">
                                <p style="margin:0 0 1px 0;font-size:15px;font-weight:900;color:#FDB414;font-family:'Roboto',Arial,sans-serif;line-height:1;">${data.webcasts.length} Sessions</p>
                                <p style="margin:0;font-size:10px;font-weight:400;color:#ffffff;font-family:'Roboto',Arial,sans-serif;letter-spacing:0.5px;">Available on demand now</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="greeting-bar outer-pad" style="background:#f8fafc;border-top:3px solid #FDB414;border-bottom:1px solid #e2e8f0;padding:18px 36px;">
              <p style="margin:15px 0 10px 0;font-size:13px;color:#0f172a;font-weight:700;font-family:'Roboto',Arial,sans-serif;">${data.greeting}</p>
              <p style="margin:0 0 10px 0;font-size:13px;color:#64748b;line-height:1.75;font-family:'Roboto',Arial,sans-serif;">${data.introParagraph1.replace(/\n/g, '<br>')}</p>
              <p style="margin:0 0 10px 0;font-size:13px;color:#64748b;line-height:1.75;font-family:'Roboto',Arial,sans-serif;">${data.introParagraph2.replace(/\n/g, '<br>')}</p>
            </td>
          </tr>
          <tr>
            <td class="cards-outer" style="background:#ffffff;padding:22px 36px 10px;">
              ${data.webcasts.map((webcast, idx) => `
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;border-radius:8px;border:1px solid #e2e8f0;">
                <tr>
                  <td style="background:#ffffff;padding:18px 18px 16px;border-radius:8px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr class="card-row" valign="middle">
                        <td class="card-title-cell" style="padding-right:16px;">
                          <p style="margin:0 0 12px 0;font-size:17px;font-weight:900;color:#0f172a;line-height:1.35;font-family:'Roboto',Arial,sans-serif;">${webcast.title}</p>
                          <a href="${webcast.url}" target="_blank" data-cta="1" data-captcha="1" style="display:inline-block;text-decoration:none;background:#FDB414;color:#0f172a;font-family:'Roboto',Arial,sans-serif;font-size:11px;font-weight:700;padding:8px 20px;border-radius:4px;letter-spacing:0.5px;">▶&nbsp;Watch Now</a>
                        </td>
                        <td class="card-sponsor" width="86" valign="middle" align="center" style="border-left:1px solid #f1f5f9;padding-left:16px;">
                          ${webcast.sponsorImg ? `<img src="${webcast.sponsorImg}" alt="${webcast.sponsorAlt}" title="Sponsored by ${webcast.sponsorAlt}" width="80" style="display:block;height:auto;border:0;margin:0 auto;">` : ''}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>`).join('')}
            </td>
          </tr>
          <tr>
            <td class="browse-outer" align="center" style="padding:14px 36px 6px;background:#ffffff;">
              <p style="margin:0 0 12px 0;font-size:13px;font-weight:700;color:#0f172a;font-family:'Roboto',Arial,sans-serif;text-align:center;">
                <a href="https://www.hr.com/en?t=/webcasts/archived" target="_blank" style="color:#0f172a;text-decoration:underline;font-family:'Roboto',Arial,sans-serif;">Looking For More OnDemand Educational Webcasts?</a>
              </p>
            </td>
          </tr>
          <tr>
            <td class="browse-btn" align="center" style="padding:0 36px 22px;background:#ffffff;">
              <a href="https://www.hr.com/en?t=/webcasts/archived" target="_blank" style="display:inline-block;text-decoration:none;background:#f1f5f9;color:#475569;font-family:'Roboto',Arial,sans-serif;font-size:12px;font-weight:700;padding:11px 28px;border-radius:4px;letter-spacing:0.3px;">Browse All OnDemand Webcasts →</a>
            </td>
          </tr>
          <tr>
            <td class="upgrade-wrap" style="padding:0 36px 22px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="upgrade-inner" style="background:#0f172a;border-radius:8px;padding:20px 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr class="upgrade-row" valign="middle">
                        <td class="upgrade-text">
                          <p style="margin:0 0 3px 0;font-size:15px;font-weight:900;color:#ffffff;font-family:'Roboto',Arial,sans-serif;">Want to earn even more credits?</p>
                          <p style="margin:0;font-size:12px;color:#ffffff;font-family:'Roboto',Arial,sans-serif;font-weight:300;">Upgrade to our Recertification Membership to earn unlimited credits!</p>
                        </td>
                        <td class="upgrade-btn" align="right" style="padding-left:16px;white-space:nowrap;">
                          <a href="https://www.hr.com/en/certifications/recertification/" target="_blank" style="display:inline-block;text-decoration:none;background:#FDB414;color:#0f172a;font-family:'Roboto',Arial,sans-serif;font-size:11px;font-weight:700;padding:10px 22px;border-radius:4px;letter-spacing:0.5px;">Upgrade Now</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="credits-outer" style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:18px 36px; text-align: center;">
              <p style="margin:0 0 12px 0;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2.5px;color:#94a3b8;font-family:'Roboto',Arial,sans-serif;">Continuing Education Credits</p>
              <table class="credits-row" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr valign="top">
                  <td class="credit-cell" width="48%">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;">
                      <tr>
                        <td align="center" style="padding:12px 12px 6px 12px;">
                          <img src="https://media-cdn.hr.com/2026HRCIRecertificationProviderSealNEW_V2.jpg" alt="HRCI" width="60" style="display:block;height:auto;border:0;">
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 12px 12px 12px; text-align:center;">
                          <strong style="display:block;font-size:12px;font-weight:700;color:#0f172a;font-family:'Roboto',Arial,sans-serif;margin-bottom:3px;">HRCI Credits</strong>
                          <span style="font-size:10px;color:#64748b;line-height:1.5;font-family:'Roboto',Arial,sans-serif;">Webcasts listed above met the criteria for credits toward aPHR®, aPHRi™, PHR®, PHRca®, SPHR®, GPHR®, PHRi™ or SPHRi™ recertification. Credit information can be found on the registration page.</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="credit-spacer" width="4%"></td>
                  <td class="credit-cell" width="48%">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;">
                      <tr>
                        <td align="center" style="padding:12px 12px 6px 12px;">
                          <img src="https://media-cdn.hr.com/media.hr.com/shrm-recertification-provider-2025.png" alt="SHRM" width="60" style="display:block;height:auto;border:0;">
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 12px 12px 12px; text-align:center;">
                          <strong style="display:block;font-size:12px;font-weight:700;color:#0f172a;font-family:'Roboto',Arial,sans-serif;margin-bottom:3px;">SHRM Credits</strong>
                          <span style="font-size:10px;color:#64748b;line-height:1.5;font-family:'Roboto',Arial,sans-serif;">HR.com is recognized by SHRM to offer Professional Development Credits (PDC) for SHRM-CP® or SHRM-SCP® recertification activities.</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background: linear-gradient(90deg, #EF4A3D, #FDB414, #94C83D, #4AC4D6, #5D94CE, #E51069);">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr valign="middle"><td height="5"></td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="footer-pad" style="background:#0f172a;padding:24px 36px;text-align:center;">
              <a href="https://www.hr.com" target="_blank" style="text-decoration:none;"><img src="https://media-cdn.hr.com/media.hr.com/email_images/hrcom_maximizinghumanpotential_trnsprnt_white_logo.png" alt="HR.com" width="105" style="display:block;height:auto;margin:0 auto 12px;border:0;"></a>
              <p style="margin:0 0 8px 0;font-size:11px;color:#ffffff;font-family:'Roboto',Arial,sans-serif;line-height:1.6;">HR.com Limited - 56 Malone Road, Jackson's Point, ON, Canada, L0E 1L0</p>
              <p style="margin:0 0 10px 0;">
                <a href="https://www.hr.com/en/about_us/privacy_information/" target="_blank" style="font-size:11px;color:#ffffff;text-decoration:none;font-family:'Roboto',Arial,sans-serif;">Privacy Policy</a>
                <span style="color:#ffffff;padding:0 8px;">|</span>
                <a href="mailto:events@hr.com?subject=Contact Us: HR.com Virtual Events and Webcasts" target="_blank" style="font-size:11px;color:#ffffff;text-decoration:none;font-family:'Roboto',Arial,sans-serif;">Contact Us</a>
              </p>
              <p style="margin:0;font-size:10px;color:#ffffff;line-height:1.6;font-family:'Roboto',Arial,sans-serif;">If you would like to change your subscription settings please access the <a href="https://www.hr.com/en?t=/CustomCode/accsetting/lib/navigation&mode=show&tabid=3&action=notifications" target="_blank" style="color:#ffffff;text-decoration:underline;font-family:'Roboto',Arial,sans-serif;">subscription page</a>.</p>
              <p style="margin:0;font-size:10px;color:#ffffff;line-height:1.6;font-family:'Roboto',Arial,sans-serif;">or if you no longer wish to receive these email campaigns you may <a href="https://www.hr.com/en?t=/CustomCode/hr/subscribe/sub.campaign.7&cid1=__CUSTOMER_ID__&cid2=1170172078066" target="_blank" style="color:#ffffff;text-decoration:underline;font-family:'Roboto',Arial,sans-serif;">unsubscribe here</a>.</p>
              <p style="margin-bottom:10px;font-size:10px;color:#ffffff;line-height:1.6;font-family:'Roboto',Arial,sans-serif;">This email account is not monitored. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  };

  useEffect(() => {
    setIsCustomHtml(false);
  }, [data]);

  const addWebcast = () => {
    setData({
      ...data,
      webcasts: [
        ...data.webcasts,
        {
          title: "New On-Demand Webcast Title",
          url: "https://web.hr.com/",
          sponsorImg: "https://public-cdn.hr.com/system/app/media/rs/2026/1/13/mkd66mrx/120.jpg",
          sponsorAlt: "Sponsor Name"
        }
      ]
    });
  };

  const updateWebcast = (index: number, field: keyof typeof data.webcasts[0], value: string) => {
    const newWebcasts = [...data.webcasts];
    newWebcasts[index] = { ...newWebcasts[index], [field]: value };
    setData({ ...data, webcasts: newWebcasts });
  };

  const removeWebcast = (index: number) => {
    const newWebcasts = data.webcasts.filter((_, i) => i !== index);
    setData({ ...data, webcasts: newWebcasts });
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] w-full">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">On-Demand Webcasts Email</h1>
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
              <label className="text-sm font-medium text-gray-700 block mb-1">Greeting</label>
              <input
                type="text"
                value={data.greeting}
                onChange={(e) => setData({ ...data, greeting: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Intro Paragraph 1</label>
              <AutoResizeTextarea
                value={data.introParagraph1}
                onChange={(val) => setData({ ...data, introParagraph1: val })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Intro Paragraph 2</label>
              <AutoResizeTextarea
                value={data.introParagraph2}
                onChange={(val) => setData({ ...data, introParagraph2: val })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b85c] focus:ring-1 focus:ring-[#00b85c] text-sm"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <label className="text-sm font-bold text-gray-900 block">Webcasts ({data.webcasts.length})</label>
                <button 
                  onClick={addWebcast}
                  className="text-xs font-semibold text-[#00b85c] flex items-center hover:text-[#00964b]"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Webcast
                </button>
              </div>

              {data.webcasts.map((webcast, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 p-3 rounded-lg space-y-3 relative group">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="text-xs font-bold text-gray-500">Webcast #{idx + 1}</span>
                    <button 
                      onClick={() => removeWebcast(idx)} 
                      className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                      title="Remove Webcast"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Title</label>
                    <AutoResizeTextarea
                      value={webcast.title}
                      onChange={(val) => updateWebcast(idx, 'title', val)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">URL (Link)</label>
                    <input
                      type="text"
                      value={webcast.url}
                      onChange={(e) => updateWebcast(idx, 'url', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-gray-500 block mb-1">Sponsor Image URL</label>
                      <input
                        type="text"
                        value={webcast.sponsorImg}
                        onChange={(e) => updateWebcast(idx, 'sponsorImg', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 block mb-1">Sponsor Alt Text</label>
                      <input
                        type="text"
                        value={webcast.sponsorAlt}
                        onChange={(e) => updateWebcast(idx, 'sponsorAlt', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                        placeholder="e.g. Workday"
                      />
                    </div>
                  </div>

                  {webcast.sponsorImg && (
                    <div className="flex items-center space-x-2 bg-white p-1 rounded border border-gray-200 justify-center">
                      <span className="text-[10px] text-gray-400">Logo preview:</span>
                      <img src={webcast.sponsorImg} alt="" className="h-6 object-contain max-w-[120px]" />
                    </div>
                  )}
                </div>
              ))}
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
                      value="HR.com On-Demand Educational Webcasts"
                      disabled
                      className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg text-sm truncate"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowSendModal(false)} 
                    className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setIsSending(true);
                      setTimeout(() => {
                        setIsSending(false);
                        setShowSendModal(false);
                        alert(`On-Demand Webcasts Email sent successfully to ${recipientEmail || 'all recipients'}!`);
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
