# Feather Icons React

[![npm](https://img.shields.io/npm/v/feather-icons-react.svg)](https://www.npmjs.com/package/feather-icons-react)

`npm install --save feather-icons-react`

This package lets you use [Feather Icons](https://feathericons.com/) as a React Component.
Feather Icons is an svg font library by Cole Bemis.

### Example usage:
```
import FeatherIcon from 'feather-icons-react';
<FeatherIcon icon="close" />
```

**Setting a size:**

Size can be passed as either string or number.

e.g.: `<FeatherIcon icon="copy" size="24" />` or `<... size={24} />`

Sizes can always be easily overridden by CSS.

#### Dynamically change icons
**Search Bar Container example:**
```
export default const SearchBar = ({ currentIcon, onChange, onClick }) => {
  return (
    <div className='search-bar-container'>
      <input type='text' onChange={onChange} />
      <button className='search-bar__button' onClick={onClick}>
        <FontIcon icon={currentIcon} className='button--icon' />
      </button>
    </div>
  );
};

class SearchBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingSuggestions: false
    };
  }

  toggleSuggestions = () => {
    this.setState({
      showingSuggestions: !this.state.showingSuggestions
    });
  }

  performSearch = (e) => {
    this.props.dispatch(searchFromInput(e.target.value));
  }

  render() {
    const { showingSuggestions } = this.state;
    const { suggestionsList } = this.props;
    const currentClass = (showingSuggestions) ? 'search' : 'x ';

    return (
      <SearchBar
        onChange={this.toggleSuggestions}
        currentIcon={currentClass}
        onClick={this.performSearch} />
    );
  }
}
```


The icons are all square, based on a 24x24 grid.


The full list of icon names can be referenced at: [feathericons.com](https://feathericons.com/)
