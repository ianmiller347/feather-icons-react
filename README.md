# Feather Icons React

[![npm](https://img.shields.io/npm/v/feather-icons-react.svg)](https://www.npmjs.com/package/feather-icons-react)

`npm install --save feather-icons-react`

This package lets you use [Feather Icons](https://feathericons.com/) as a React Component.
Feather Icons is an svg font library by Cole Bemis.

### Example usage:
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
class ToggleIconContainer extends Component {
  constructor() {
    super();

    this.state = {
      icon: 'x'
    };
  }

  toggleIcon = (icon) => {
    this.setState({
      icon
    });
  }

  render() {
    const { icon } = this.state;

    return (
      <div>
        <FeatherIcon icon={icon} />
        <ul>
          <li>
            <button onClick={() => this.toggleIcon('x')}>
              Make the Icon an X
            </button>
          </li>
          <li>
            <button onClick={() => this.toggleIcon('anchor')}>
              Make the Icon an Anchor
            </button>
          </li>
          <li>
            <button onClick={() => this.toggleIcon('box')}>
              Make the Icon a box
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
```


The icons are all square, based on a 24x24 grid.


The full list of icon names can be referenced at: [feathericons.com](https://feathericons.com/)
