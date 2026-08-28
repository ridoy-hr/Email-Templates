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
  
  const startPattern = `\\$\\{data\\.sections\\?\\.${currentSection}\\?\\.enabled \\? \\\``;
  
  let endIndex;
  if (nextSection) {
    endIndex = content.indexOf(`\${data.sections?.${nextSection}?.enabled ? \``);
  } else {
    // For bottomAd, we find the end of the white body container
    endIndex = content.indexOf('                                        </tbody>', previousIndex);
  }
  
  const block = content.substring(previousIndex, endIndex);
  
  // The block looks like `${data.sections?.news?.enabled ? \` ... \` : ''}`
  // But there might be trailing whitespace before the next section.
  
  // We want to extract just the HTML part, or we can just keep the whole ternary!
  // If we just keep the whole ternary:
  generators[currentSection] = block;
  
  previousIndex = endIndex;
}

let after = content.substring(previousIndex);

let mapCode = `
const sectionRenderers: Record<string, () => string> = {
  news: () => \`${generators['news'].replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`,
  event: () => \`${generators['event'].replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`
};
// wait, this is getting complex again...
`;

console.log("Success! News length:", generators['news'].length);
console.log("BottomAd length:", generators['bottomAd'].length);

