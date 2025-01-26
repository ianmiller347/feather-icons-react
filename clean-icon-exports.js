// This cleans up icon exports so that git history doesnt hold generated build code
const fs = require('fs');

const indexFile = 'src/index.js';

fs.readFile(indexFile, 'utf8', function (err, data) {
  if (err) {
    console.error('Error, could not find index file to cleanup.');
  }
  // remove all lines from src/index.js except for the first one (the default export)
  const firstLine = data.split('\n')[0];
  const expectedContents = `export { default } from './FeatherIcon';`;
  // safe fallback in case double build got triggered and previous cleanup step failed
  const dataToWrite = firstLine.includes(expectedContents)
    ? firstLine
    : expectedContents;
  fs.writeFile(indexFile, `${dataToWrite}\n`, function (err, data) {
    if (err) {
      console.error('Error, could not write index file during cleanup.');
    }
  });
});

// now remove entire src/IconComponents folder
fs.rmSync('src/IconComponents', { recursive: true, force: true });

console.log('Generated icon component cleanup complete.');
