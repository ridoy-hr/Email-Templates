const fs = require('fs');
const content = fs.readFileSync('/app/applet/src/generateEbulletinHtml.ts', 'utf8');

const regex = /\$\{data\.sections\?\.(.*?)\?\.enabled \? \`([\s\S]*?)\` : ''\}/g;

let match;
let generators = {};
while ((match = regex.exec(content)) !== null) {
  generators[match[1]] = match[2];
}

console.log(Object.keys(generators));

let newContent = content.replace(regex, '');

// Since replacing removed all of them, they were sequential. We just need to insert the generator map and the join logic at the place of the first match.
const firstMatchIndex = content.indexOf('${data.sections?.news?.enabled ? `');

let before = content.substring(0, firstMatchIndex);
let after = content.substring(content.indexOf('` : \'\'}', content.lastIndexOf('${data.sections?.')) + 7);

let mapCode = `
const sectionRenderers: Record<string, () => string> = {
  news: () => data.sections?.news?.enabled ? \`${generators['news']}\` : '',
  event: () => data.sections?.event?.enabled ? \`${generators['event']}\` : '',
  report: () => data.sections?.report?.enabled ? \`${generators['report']}\` : '',
  survey: () => data.sections?.survey?.enabled ? \`${generators['survey']}\` : '',
  research: () => data.sections?.research?.enabled ? \`${generators['research']}\` : '',
  aihub: () => data.sections?.aihub?.enabled ? \`${generators['aihub']}\` : '',
  awards: () => data.sections?.awards?.enabled ? \`${generators['awards']}\` : '',
  podcast: () => data.sections?.podcast?.enabled ? \`${generators['podcast']}\` : '',
  webcasts: () => data.sections?.webcasts?.enabled ? \`${generators['webcasts']}\` : '',
  virtual: () => data.sections?.virtual?.enabled ? \`${generators['virtual']}\` : '',
  bottomAd: () => data.sections?.bottomAd?.enabled ? \`${generators['bottomAd']}\` : ''
};

const renderSections = () => {
  const order = data.sectionOrder || ['news', 'event', 'report', 'survey', 'research', 'aihub', 'awards', 'podcast', 'webcasts', 'virtual', 'bottomAd'];
  return order.map((section: string) => sectionRenderers[section] ? sectionRenderers[section]() : '').join('');
};
`;

const finalContent = before + '${renderSections()}' + after;
const finalContentWithMap = finalContent.replace('export const generateEbulletinHtml = (data: any) => {', 'export const generateEbulletinHtml = (data: any) => {\n' + mapCode);

fs.writeFileSync('/app/applet/src/generateEbulletinHtml.ts', finalContentWithMap);
console.log('Done!');
