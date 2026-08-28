import * as templates from './templates';

export const generateResearchSurveyHtml = (data: any) => {
  let html = (templates as any)[`survey_${data.templateId}`];

  if (!html) return '';

  // 1. Preheader
  html = html.replace(
    /Take 7 minutes to help shape the future of recruitment technologies — (your\s*insights matter!|Your\s*insights matter!)/g,
    data.preheaderText || ''
  );

  // 2. Category / Badge
  html = html.replace(
    /Talent Acquisition/g,
    data.category || ''
  );

  // 3. Hero Heading
  html = html.replace(
    /How do your recruitment technologies enhance talent\s*acquisition\?/g,
    data.heroHeading || ''
  );

  // 4. CTA Link
  html = html.replace(
    /https:\/\/web\.hr\.com\/coaxx/g,
    data.ctaUrl || '#'
  );

  // 5. CTA Text
  html = html.replace(
    /Take the Survey|Take the 7-Minute Survey/g,
    data.ctaText || ''
  );

  // 6. Hero Image
  if (data.heroImage) {
    html = html.replace(
      /https:\/\/public-cdn\.hr\.com\/remoteimages\/website-images\/emailer-images\/survey[a-zA-Z0-9\-\.]+\.(jpg|png)/g,
      data.heroImage
    );
  }

  // 7. Body Content
  let processedBody = data.bodyContent || '';
  processedBody = processedBody.replace(/<a([^>]*)>/gi, (match, attrs) => {
    if (!attrs.includes('style=')) {
      return `<a${attrs} style="color: #2563eb; text-decoration: underline;">`;
    }
    return match;
  });

  // Replace everything inside the body-container up to the signature
  html = html.replace(
    /(<td[^>]*class="body-container"[^>]*>)\s*<p[\s\S]*?(?=<p class="signature")/i,
    `$1\n          ${processedBody}\n\n          `
  );

  // 11. Signature Content
  if (data.signatureContentHtml !== undefined) {
    let processedSig = data.signatureContentHtml || '';
    processedSig = processedSig.replace(/<a([^>]*)>/gi, (match, attrs) => {
      if (!attrs.includes('style=')) {
        return `<a${attrs} style="color: #2563eb; text-decoration: underline;">`;
      }
      return match;
    });

    html = html.replace(
      /<p[^>]*class="signature"[^>]*>[\s\S]*?<\/p>/i,
      `<p class="signature" style="margin: 0; font-size: 12px">${processedSig}</p>`
    );
  } else {
    // Fallback if signatureContentHtml is missing
    html = html.replace(
      /<strong>Sue Kelley<\/strong>/g,
      `<strong>${data.signatureName || ''}</strong>`
    );
    html = html.replace(
      /Product Manager, HR Research Institute/g,
      data.signatureTitle || ''
    );
    html = html.replace(
      /research@hr\.com/g,
      data.signatureEmail || ''
    );
  }

  // 14. PS Content
  if (data.psContentHtml !== undefined) {
    let processedPs = data.psContentHtml || '';
    processedPs = processedPs.replace(/<a([^>]*)>/gi, (match, attrs) => {
      if (!attrs.includes('style=')) {
        return `<a${attrs} style="color: #232288; text-decoration: underline;">`;
      }
      return match;
    });

    html = html.replace(
      /(<p[^>]*background:\s*#f8f8ff[^>]*>)[\s\S]*?(<\/p>)/i,
      `$1${processedPs}$2`
    );
  }

  // Hide signature if empty
  const hasSigContent = data.signatureContentHtml && data.signatureContentHtml.replace(/<[^>]*>/g, '').trim().length > 0;
  if (data.signatureContentHtml !== undefined) {
    if (!hasSigContent) {
      html = html.replace(/<p[^>]*class="signature"[^>]*>[\s\S]*?<\/p>/i, '');
    }
  } else if (!data.signatureName && !data.signatureTitle && !data.signatureEmail) {
    html = html.replace(/<p[^>]*class="signature"[^>]*>[\s\S]*?<\/p>/i, '');
  }

  // Hide PS block if empty
  const hasPsContent = data.psContentHtml && data.psContentHtml.replace(/<[^>]*>/g, '').trim().length > 0;
  if (!hasPsContent) {
    html = html.replace(/<tr>\s*<td[^>]*>\s*<p[^>]*background:\s*#f8f8ff[\s\S]*?<\/p>\s*<\/td>\s*<\/tr>/i, '');
  }

  // Hide CTA block if empty
  if (!data.ctaText) {
    html = html.replace(/<table[^>]*class="x_btn-table"[^>]*>[\s\S]*?<\/table>/i, '');
    html = html.replace(/<table[^>]*class="button"[^>]*>[\s\S]*?<\/table>/i, '');
    // Some templates use a specific button structure:
    html = html.replace(/<table[^>]*class="?button"?[^>]*>[\s\S]*?<\/table>/ig, '');
  }

  // Hide Hero Image block if empty
  if (!data.heroImage) {
    // If it's a 60/40 template, hide the 40% column
    html = html.replace(/<td[^>]*class="column hide-mobile"[^>]*width="40%"[^>]*>[\s\S]*?<\/td>/i, '');
    // If it's a full width hero, hide the row
    html = html.replace(/<tr>\s*<td[^>]*>\s*<img[^>]*alt="Survey illustration[^>]*>[\s\S]*?<\/td>\s*<\/tr>/i, '');
  }

  return html;
};
