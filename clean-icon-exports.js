// This cleans up icon exports so that git history doesnt hold generated build code
const fs = require('fs');
const path = require('path');

const INDEX_FILE = path.join(__dirname, 'src', 'index.ts');

fs.readFile(INDEX_FILE, 'utf8', function (err) {
  if (err) {
    console.error('Error, could not find index file to cleanup.');
    return;
  }

  // Keep only the default export and type exports, remove all icon component exports
  const defaultExport = `export { default } from './FeatherIcon';`;
  const typeExports = `export type {
  FeatherIconName,
  FeatherIconProps,
  FeatherNamedIconProps,
} from './types';`;

  // Write the cleaned content
  const cleanedContent = `${defaultExport}\n${typeExports}\n`;

  fs.writeFile(INDEX_FILE, cleanedContent, function (writeErr) {
    if (writeErr) {
      console.error('Error, could not write index file during cleanup.');
    }
  });
});

// now remove entire src/IconComponents folder
fs.rmSync('src/IconComponents', { recursive: true, force: true });

console.log('Generated icon component cleanup complete.');
