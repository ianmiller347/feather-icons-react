// This is a simple node script to make named exports available for consumers.
// This allows for: import { NamedIcon } from 'feather-icons-react';
// this file is run at build time and generates React components.
// it does not get included in the published npm package
const fs = require('fs');

const iconsText = fs.readFileSync('src/icons.json');
const iconsJson = JSON.parse(iconsText);

const dashCasetoTitleCase = (inputString) =>
  inputString
    .toLowerCase()
    .replace(/(?:^|[\s-/])\w/g, (match) => match.toUpperCase())
    .replace(/-/g, '');

// component file function
const createComponent = ({
  iconName,
  iconMarkup,
  iconKey,
}) => `import React from 'react';
const ${iconName} = ({
  size = 24,
  className = '',
  fill = 'none',
  ...otherProps
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={\`feather feather-${iconKey} \${className}\`}
      {...otherProps}
    ><g>${iconMarkup}</g>
    </svg>
  );
};
export default ${iconName};
`;

// creates obj of { iconMarkup, iconName }
const iconNames = Object.keys(iconsJson).map((iconKey) => {
  const iconMarkup = iconsJson[iconKey];
  const iconName = dashCasetoTitleCase(iconKey);
  return {
    iconMarkup,
    iconName,
    iconKey,
  };
});

// make the subdirectory for icon components
fs.mkdir('build/IconComponents', { recursive: true }, (err) => {
  if (err) throw err;
});

let exportList = '';

iconNames.forEach((icon) => {
  const { iconName } = icon;
  fs.writeFile(
    `build/IconComponents/${iconName}.js`,
    createComponent(icon),
    (err) => {
      if (err) throw err;
    }
  );
  exportList += `export { default as ${iconName} } from './${iconName}';`;
});

fs.writeFile('build/IconComponents/index.js', exportList, (err) => {
  if (err) throw err;
});

const exportAllIcons = `
export * from './IconComponents';
`;
// assuming index file is already created, now export all icon components
fs.appendFile('build/index.js', exportAllIcons, function (err) {
  if (err) throw err;
  console.log('Finished building and creating feather icon components!');
});
