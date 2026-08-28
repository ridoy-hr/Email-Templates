const fs = require('fs');
const content = fs.readFileSync('/app/applet/make_files.cjs', 'utf8');

// I can just execute the script but mock fs.writeFileSync to only write generateEbulletinHtml.ts!
const mockFs = {
  ...fs,
  writeFileSync: (path, data) => {
    if (path.includes('generateEbulletinHtml.ts')) {
      fs.writeFileSync('/app/applet/src/generateEbulletinHtml.ts', data);
      console.log('Restored generateEbulletinHtml.ts');
    }
  },
  mkdirSync: () => {}
};

const vm = require('vm');
const script = new vm.Script(content);
const context = vm.createContext({
  require: (mod) => {
    if (mod === 'fs') return mockFs;
    if (mod === 'path') return require('path');
    return require(mod);
  },
  console,
  __dirname: '/app/applet'
});
script.runInContext(context);
