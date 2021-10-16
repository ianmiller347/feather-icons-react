# Feather Icons React

[![npm](https://img.shields.io/npm/v/feather-icons-react.svg)](https://www.npmjs.com/package/feather-icons-react)

`yarn add feather-icons-react`

This package lets you use [Feather Icons](https://feathericons.com/) as a React Component.
Feather Icons is an svg font library by Cole Bemis.

* [Usage](#usage)
* [Contributing](#contributing)

## Usage
```javascript
import FeatherIcon from 'feather-icons-react';
<FeatherIcon icon="close" />
```

**Setting a size:**

Size can be passed as either string or number.

e.g.: `<FeatherIcon icon="copy" size="24" />` or `<... size={24} />`

Sizes can always be easily overridden by CSS.

**Setting fill and other properties**

Fill defaults to none, but can be passed as a React prop

`<FeatherIcon icon="heart" fill="red" />`

Addtionally, you can add any other SVG tag properties, and they will pass through.

**Setting colors**

Use CSS. The icons default to use currentColor. This is equivalent to whatever text color is being used in the icon's container. 

#### Dynamically change icons
**Toggle icon example:**
```javascript
const ToggleIconContainer = () => {
  const [icon, setIcon] = useState('x');

  return (
    <div>
      <FeatherIcon icon={icon} />
      <ul>
        <li>
          <button onClick={() => setIcon('x')}>
            Make the Icon an X
          </button>
        </li>
        <li>
          <button onClick={() => setIcon('anchor')}>
            Make the Icon an Anchor
          </button>
        </li>
        <li>
          <button onClick={() => setIcon('box')}>
            Make the Icon a box
          </button>
        </li>
      </ul>
    </div>
  );
};
```


The icons are all square, based on a 24x24 grid.


The full list of icon names can be referenced at: [feathericons.com](https://feathericons.com/)


## Contributing
To build the bundled assets for consumption
`yarn build`

### Updating the icons
If you found a missing icon, it is pretty easy to generate a new icons.json and get a PR up so this package stays in sync with the latest feather icons. 
Go into your desired project directory (ideally one directory above where you have feather-icons-react saved)
1. `git clone https://github.com/feathericons/feather.git`
2. `cd feather && npx install`
3. `npx babel-node bin/build-icons-json.js`
4. `cp dist/icons.json ../feather-icons-react/src/icons.json`
5. Now open the file you just copied. Format the file, try to avoid entire green so the diff looks neat in the PR.

Alternatively, you can simply copy just the lines from the JSON file you know are missing. This is easier if you're just adding one new icon.

### TODO
- Update this package to have a demo and some tests on icon rendering.
- Automatically generate new icons via script.
  - could copy build-icons-json script from feather-icons
