
export const generateEbulletinHtml = (data: any) => {

const sectionRenderers: Record<string, () => string> = {
  news: () => data.sections?.news?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- HR IN THE NEWS SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#ef4444" style="background-color: #ef4444; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">${data.sections.news.sectionTitle}</span>
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
                                                                     ${data.sections.news.items.map((item: any, i: number) => `
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                                                                         <tr>
                                                                             <td style="padding-bottom: 8px;">
                                                                                 <a href="${item.url}"
                                                                                     target="_blank"
                                                                                     style="text-decoration: none; color: #1e3a5f; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 1.4em;">
                                                                                     ${item.title}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                         <tr>
                                                                             <td style="padding-bottom: 6px; font-family: 'Inter', Arial, sans-serif; font-size: 12px; line-height: 1.5em; color: #64748b;">
                                                                                 ${item.note}
                                                                             </td>
                                                                         </tr>
                                                                         <tr>
                                                                             <td style="padding-bottom: ${i < data.sections.news.items.length - 1 ? '16px' : '0'};">
                                                                                 <a href="${item.url}"
                                                                                     target="_blank"
                                                                                     style="text-decoration: none; color: #6366f1; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                                     &#128214; Read More
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                     ${i < data.sections.news.items.length - 1 ? `
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                                                                         <tr>
                                                                             <td style="border-top: 1px solid #e2e8f0; font-size: 0; line-height: 0; padding-bottom: 16px;">&nbsp;</td>
                                                                         </tr>
                                                                     </table>
                                                                     ` : ''}
                                                                     `).join('')}
                                                                 </td>
                                                                 <td width="300" valign="middle" align="center" style="padding-left: 20px; width: 300px;">
                                                                     <a href="${data.sections.news.adUrl}" target="_blank">
                                                                         <img src="${data.sections.news.adImage}"
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
` : '',
  event: () => data.sections?.event?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- FEATURED EVENT SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#ef4444" style="background-color: #ef4444; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">${data.sections.event.sectionTitle}</span>
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
                                                                     <img src="${data.sections.event.image}"
                                                                         alt=""
                                                                         width="150"
                                                                         style="width: 150px; border-radius: 8px; margin-bottom: 14px; background-color: #ffffff;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#ef4444" style="background-color: #ef4444; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="${data.sections.event.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     ${data.sections.event.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 8px 0; font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 700; color: #ef4444; letter-spacing: 1px; text-transform: uppercase;">${data.sections.event.dateStr}</p>
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="${data.sections.event.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             ${data.sections.event.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         ${data.sections.event.desc}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
` : '',
  report: () => data.sections?.report?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- FEATURED REPORT SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #f8fafc; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#1e3a5f" style="background-color: #1e3a5f; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">${data.sections.report.sectionTitle}</span>
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
                                                                     <img src="${data.sections.report.image}"
                                                                         alt=""
                                                                         width="150"
                                                                         style="width: 150px; border-radius: 8px; margin-bottom: 14px;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#1e3a5f" style="background-color: #1e3a5f; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="${data.sections.report.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     ${data.sections.report.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="${data.sections.report.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             ${data.sections.report.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         ${data.sections.report.desc}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
` : '',
  survey: () => data.sections?.survey?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- SPOTLIGHT SURVEY SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="center" valign="top" style="padding: 0 28px 28px 28px; background-color: #ffffff;">
                                                     <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #1e1b4b; border-radius: 12px;">
                                                         <tbody>
                                                             <tr>
                                                                 <td valign="middle" style="padding: 24px 20px 24px 24px; text-align: left;">
                                                                     <p style="margin: 0 0 8px 0; font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 700; color: #a5b4fc; letter-spacing: 2px; text-transform: uppercase;">${data.sections.survey.tag}</p>
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 17px; font-weight: 800; line-height: 1.3em;">
                                                                         <a href="${data.sections.survey.url}"
                                                                             style="text-decoration: none; color: #ffffff;">
                                                                             ${data.sections.survey.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0 0 16px 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.5em; color: #c7d2fe;">
                                                                         ${data.sections.survey.desc}
                                                                     </p>
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td bgcolor="#6366f1" style="background-color: #6366f1; padding: 9px 20px; border-radius: 20px;">
                                                                                 <a href="${data.sections.survey.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     ${data.sections.survey.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td width="120" valign="middle" align="center" style="padding: 24px 24px 24px 0; width: 120px;">
                                                                     <img src="${data.sections.survey.image}"
                                                                         alt=""
                                                                         width="100"
                                                                         style="width: 100px; height: auto;">
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
` : '',
  research: () => data.sections?.research?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- HR RESEARCH INSTITUTE SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #f8fafc; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#1e3a5f" style="background-color: #1e3a5f; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">${data.sections.research.sectionTitle}</span>
                                                             </td>
                                                             ${data.sections.research.linkText ? `
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="${data.sections.research.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #1e3a5f; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     ${data.sections.research.linkText}
                                                                 </a>
                                                             </td>` : ''}
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
                                                                     <img src="${data.sections.research.image}"
                                                                         alt=""
                                                                         width="200"
                                                                         style="width: 200px; border-radius: 8px; margin-bottom: 14px;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#1e3a5f" style="background-color: #1e3a5f; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="${data.sections.research.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     ${data.sections.research.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="${data.sections.research.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             ${data.sections.research.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         ${data.sections.research.desc}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
` : '',
  aihub: () => data.sections?.aihub?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- HR & AI HUB SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#6366f1" style="background-color: #6366f1; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">${data.sections.aihub.sectionTitle}</span>
                                                             </td>
                                                             ${data.sections.aihub.linkText ? `
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="${data.sections.aihub.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #6366f1; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     ${data.sections.aihub.linkText}
                                                                 </a>
                                                             </td>` : ''}
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
                                                                     <img src="${data.sections.aihub.image}"
                                                                         alt=""
                                                                         width="200"
                                                                         style="width: 200px; border-radius: 8px; margin-bottom: 14px;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#6366f1" style="background-color: #6366f1; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="${data.sections.aihub.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     ${data.sections.aihub.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="${data.sections.aihub.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             ${data.sections.aihub.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         ${data.sections.aihub.desc}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
` : '',
  awards: () => data.sections?.awards?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- AWARDS SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #f8fafc; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#f59e0b" style="background-color: #f59e0b; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">${data.sections.awards.sectionTitle}</span>
                                                             </td>
                                                             ${data.sections.awards.linkText ? `
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="${data.sections.awards.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #f59e0b; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     ${data.sections.awards.linkText}
                                                                 </a>
                                                             </td>` : ''}
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
                                                                     <img src="${data.sections.awards.image}"
                                                                         alt=""
                                                                         width="150"
                                                                         style="width: 150px;">
                                                                 </td>
                                                                 <td valign="middle" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 8px 0; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 1px;">${data.sections.awards.tag}</p>
                                                                     <div style="margin-top: 0;">
                                                                         <p style="margin: 0 0 4px 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; color: #475569; font-weight: 600;">${data.sections.awards.category}</p>
                                                                         <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 800; color: #1e3a5f; line-height: 1.2em;">${data.sections.awards.winner}</p>
                                                                     </div>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
` : '',
  podcast: () => data.sections?.podcast?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- PODCAST SPOTLIGHT SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#0f766e" style="background-color: #0f766e; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">${data.sections.podcast.sectionTitle}</span>
                                                             </td>
                                                             ${data.sections.podcast.linkText ? `
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="${data.sections.podcast.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #0f766e; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     ${data.sections.podcast.linkText}
                                                                 </a>
                                                             </td>` : ''}
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
                                                                     <img src="${data.sections.podcast.image}"
                                                                         alt=""
                                                                         width="200"
                                                                         style="width: 200px; border-radius: 8px; margin-bottom: 14px;">
                                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                                         <tr>
                                                                             <td align="center" bgcolor="#0f766e" style="background-color: #0f766e; padding: 8px 16px; border-radius: 20px;">
                                                                                 <a href="${data.sections.podcast.url}"
                                                                                     target="_blank"
                                                                                     style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; white-space: nowrap;">
                                                                                     ${data.sections.podcast.btnText}
                                                                                 </a>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                                 <td valign="top" style="padding: 20px 20px 20px 16px; text-align: left;">
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.4em;">
                                                                         <a href="${data.sections.podcast.url}"
                                                                             target="_blank"
                                                                             style="text-decoration: none; color: #1e3a5f;">
                                                                             ${data.sections.podcast.title}
                                                                         </a>
                                                                     </p>
                                                                     <p style="margin: 0 0 10px 0; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6em; color: #475569;">
                                                                         ${data.sections.podcast.desc}
                                                                     </p>
                                                                     <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: #0f766e; font-weight: 700;">
                                                                         ${data.sections.podcast.guest}
                                                                     </p>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
` : '',
  webcasts: () => data.sections?.webcasts?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- FEATURED WEBCASTS SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #f8fafc; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#f0493c" style="background-color: #f0493c; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">${data.sections.webcasts.sectionTitle}</span>
                                                             </td>
                                                             ${data.sections.webcasts.linkText ? `
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="${data.sections.webcasts.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #f0493c; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     ${data.sections.webcasts.linkText}
                                                                 </a>
                                                             </td>` : ''}
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             ${data.sections.webcasts.items.map((item: any, i: number) => `
                                             <tr>
                                                 <td align="center" valign="top" style="padding: ${i === 0 ? '16px' : '0'} 28px 8px 28px; background-color: #f8fafc;">
                                                     <a href="${item.url}" target="_blank" style="text-decoration: none; display: block; color: inherit;">
                                                         <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #ffffff; border-radius: 10px;">
                                                             <tbody>
                                                                 <tr>
                                                                     <td valign="top" style="padding: 16px 16px 16px 20px; text-align: left;">
                                                                         <p style="margin: 0 0 4px 0; font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 700; color: #ef4444; letter-spacing: 1px; text-transform: uppercase;">${item.date}</p>
                                                                         <p style="margin: 0 0 6px 0; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 1.4em; color: #1e3a5f;">
                                                                             ${item.title}
                                                                         </p>
                                                                         <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 12px; line-height: 1.5em; color: #64748b;">
                                                                             ${item.desc}
                                                                         </p>
                                                                     </td>
                                                                     <td width="120" valign="middle" align="center" style="width: 120px; padding-right: 16px;">
                                                                         <img src="${item.image}"
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
                                             `).join('')}
                                             <tr>
                                                 <td style="background-color: #f8fafc; height: 20px; font-size: 0; line-height: 0;">&nbsp;</td>
                                             </tr>
` : '',
  virtual: () => data.sections?.virtual?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- UPCOMING VIRTUAL EVENTS SECTION -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="left" valign="top" style="padding: 28px 28px 0 28px; background-color: #ffffff; text-align: left;">
                                                     <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                         <tr>
                                                             <td bgcolor="#6366f1" style="background-color: #6366f1; padding: 4px 14px; border-radius: 4px;">
                                                                 <span style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">${data.sections.virtual.sectionTitle}</span>
                                                             </td>
                                                             ${data.sections.virtual.linkText ? `
                                                             <td style="padding-left: 14px; vertical-align: middle;">
                                                                 <a href="${data.sections.virtual.linkUrl}"
                                                                     target="_blank"
                                                                     style="text-decoration: none; color: #6366f1; font-family: 'Inter', Arial, sans-serif; font-size: 12px; font-weight: 700;">
                                                                     ${data.sections.virtual.linkText}
                                                                 </a>
                                                             </td>` : ''}
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             ${data.sections.virtual.items.map((item: any, i: number) => `
                                             <tr>
                                                 <td align="center" valign="top" style="padding: ${i === 0 ? '16px' : '0'} 28px 8px 28px; background-color: #ffffff;">
                                                     <a href="${item.url}" target="_blank" style="text-decoration: none; display: block; color: inherit;">
                                                         <table role="presentation" width="544" border="0" cellspacing="0" cellpadding="0" style="width: 544px; background-color: #f8fafc; border-radius: 10px;">
                                                             <tbody>
                                                                 <tr>
                                                                     <td width="110" valign="top" align="center" style="padding: 16px 0 16px 16px; width: 110px;">
                                                                         <img src="${item.image}"
                                                                             alt=""
                                                                             width="100"
                                                                             style="width: 100px; height: auto; border-radius: 8px;">
                                                                     </td>
                                                                     <td valign="top" style="padding: 16px 16px 16px 12px; text-align: left;">
                                                                         <p style="margin: 0 0 4px 0; font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 700; color: #6366f1; letter-spacing: 1px; text-transform: uppercase;">${item.date}</p>
                                                                         <p style="margin: 0 0 6px 0; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 1.4em; color: #1e3a5f;">
                                                                             ${item.title}
                                                                         </p>
                                                                         <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 12px; line-height: 1.5em; color: #64748b;">
                                                                             ${item.desc}
                                                                         </p>
                                                                     </td>
                                                                 </tr>
                                                             </tbody>
                                                         </table>
                                                     </a>
                                                 </td>
                                             </tr>
                                             `).join('')}
                                             <tr>
                                                 <td style="background-color: #ffffff; height: 20px; font-size: 0; line-height: 0;">&nbsp;</td>
                                             </tr>
` : '',
  bottomAd: () => data.sections?.bottomAd?.enabled ? `
                                             <!-- ============================================ -->
                                             <!-- BOTTOM AD -->
                                             <!-- ============================================ -->
                                             <tr>
                                                 <td align="center" style="padding: 0 28px 28px 28px; background-color: #ffffff; text-align: center;">
                                                     <a href="${data.sections.bottomAd.adUrl}" target="_blank">
                                                         <img src="${data.sections.bottomAd.adImage}"
                                                             alt=""
                                                             width="300"
                                                             style="width: 300px; margin: 0 auto; border-radius: 12px;">
                                                     </a>
                                                 </td>
                                             </tr>
` : ''
};

const renderSections = () => {
  const order = data.sectionOrder || ['news', 'event', 'report', 'survey', 'research', 'aihub', 'awards', 'podcast', 'webcasts', 'virtual', 'bottomAd'];
  return order.map((section: string) => sectionRenderers[section] ? sectionRenderers[section]() : '').join('\n');
};

  return `<!DOCTYPE html>
<html lang="en">

<head>
    <title>${data.title} - ${data.formattedDate}</title>

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
                                                                 <p style="margin: 0 0 6px 0; font-family: 'Inter', Arial, sans-serif; font-size: 34px; line-height: 34px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">${data.title}</p>
                                                                 <p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 600; color: #f0493c; letter-spacing: 2px; text-transform: uppercase;">${data.formattedDate}</p>
                                                            </td>

                                                            <!-- Volume pill badge -->
                                                            <td align="right" valign="middle" style="padding: 24px 28px 24px 0; text-align: right;">
                                                                <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="right">
                                                                    <tr>
                                                                        <td style="padding: 5px 14px; border-radius: 20px;">
                                                                            <span style="font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 700; color: #ffffff; white-space: nowrap;">${data.badge}</span>
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
${renderSections()}
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
 </html>`;
};
