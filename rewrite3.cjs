const fs = require('fs');
const content = fs.readFileSync('/app/applet/src/generateEbulletinHtml.ts', 'utf8');

const sections = [
  'news', 'event', 'report', 'survey', 'research', 'aihub', 'awards', 'podcast', 'webcasts', 'virtual', 'bottomAd'
];

let generators = {};
let previousIndex = content.indexOf('${data.sections?.news?.enabled ? `');

const firstMatchIndex = previousIndex;
let before = content.substring(0, firstMatchIndex);

for (let i = 0; i < sections.length; i++) {
  const currentSection = sections[i];
  const nextSection = i < sections.length - 1 ? sections[i+1] : null;
  
  let endIndex;
  if (nextSection) {
    endIndex = content.indexOf(`\${data.sections?.${nextSection}?.enabled ? \``);
  } else {
    // For bottomAd, find the ` : ''}` or the exact end
    let searchStr = "` : ''}";
    let possibleEnd = content.indexOf(searchStr, previousIndex);
    // Find the LAST possibleEnd before </tbody>
    let limit = content.indexOf('                                        </tbody>', previousIndex);
    while (content.indexOf(searchStr, possibleEnd + 1) !== -1 && content.indexOf(searchStr, possibleEnd + 1) < limit) {
        possibleEnd = content.indexOf(searchStr, possibleEnd + 1);
    }
    endIndex = possibleEnd + searchStr.length;
  }
  
  let block = content.substring(previousIndex, endIndex).trim();
  if (block.startsWith('${')) block = block.substring(2);
  if (block.endsWith('}')) block = block.substring(0, block.length - 1);
  
  generators[currentSection] = block;
  
  previousIndex = endIndex;
}

let after = content.substring(previousIndex);

let mapCode = `
const sectionRenderers: Record<string, () => string> = {
  news: () => ${generators['news']},
  event: () => ${generators['event']},
  report: () => ${generators['report']},
  survey: () => ${generators['survey']},
  research: () => ${generators['research']},
  aihub: () => ${generators['aihub']},
  awards: () => ${generators['awards']},
  podcast: () => ${generators['podcast']},
  webcasts: () => ${generators['webcasts']},
  virtual: () => ${generators['virtual']},
  bottomAd: () => ${generators['bottomAd']}
};

const renderSections = () => {
  const order = data.sectionOrder || ['news', 'event', 'report', 'survey', 'research', 'aihub', 'awards', 'podcast', 'webcasts', 'virtual', 'bottomAd'];
  return order.map((section: string) => sectionRenderers[section] ? sectionRenderers[section]() : '').join('\\n');
};
`;

const finalContent = before + '${renderSections()}' + after;
const finalContentWithMap = finalContent.replace('export const generateEbulletinHtml = (data: any) => {', 'export const generateEbulletinHtml = (data: any) => {\n' + mapCode);

fs.writeFileSync('/app/applet/src/generateEbulletinHtml.ts', finalContentWithMap);
console.log("Done!");
