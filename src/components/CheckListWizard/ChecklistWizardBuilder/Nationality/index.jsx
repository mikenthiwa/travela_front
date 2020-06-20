import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountryList from 'countries-list';
import DeleteIcon from '../../Shared/deleteIcon';
import './index.scss';

const countries = [];
Object.values(CountryList.countries).map(item =>
  countries.push({ ...item, checked: false })
);
class Nationality extends Component {
  state = {
    dropdown: false,

    countries: countries,

    filteredState: countries,

    country: '',

    selected: {
      name: '',
      emoji: ''
    }
  };

  dropDown = React.createRef();

  originDropdown = React.createRef();

  inputRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.showDropdown, false);
  }

  componentDidUpdate() {
    const { dropdown } = this.state;
    dropdown && this.inputRef.current.focus();
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.showDropdown, false);
  }

  selectCountry = (name, emoji) => {
    const { updateNationality } = this.props;
    this.setState({ selected: { name, emoji }, dropdown: false });
    updateNationality(name, emoji);
  };

  onSearch = ({ target }) => {
    const { countries } = this.state;
    const newState = countries.filter(item =>
      item.name.toLowerCase().includes(target.value.toLowerCase())
    );

    this.setState({ country: target.value, filteredState: [...newState] });
  };

  showDropdown = e => {
    const { dropdown } = this.state;
    if (dropdown && this.originDropdown.current.contains(e.target)) { return; }
    const isOutside = !this.dropDown.current.contains(e.target);
    this.setState({
      dropdown: isOutside ? false : !dropdown,
    });
  };


  removeSelected = () => {
    const { updateNationality } = this.props;
    const data = {name: '', emoji: ''};
    this.setState({selected: data});
    updateNationality(data.name, data.emoji);
  }

  render() {
    const { selected, dropdown, country, filteredState } = this.state;
    const { nationality } = this.props;
    return (
      <div className="select-countries-container">
        <p>Select Nationality</p>
        <div className="select-input-delete-container">
          <div className="select-input-options-container">
            {nationality.name.length ? (
              <div ref={this.dropDown} className="select-input-area">
                <div className="selected-country-item">
                  <div className="country-name">{nationality.name}</div>
                  <div>{nationality.emoji}</div>
                </div>
                <button type="button" className="caret">
                  {dropdown ? <i className="material-icons">expand_less</i> : <i className="material-icons">expand_more</i>}
                </button>
              </div>
            ) : (
              <div ref={this.dropDown} className="select-input-area">
                <div className="select-placeholder">Select a country</div>
                <button type="button" className="caret">
                  {dropdown ? <i className="material-icons">expand_less</i> : <i className="material-icons">expand_more</i>}
                </button>
              </div>
            )}
            {dropdown && (
              <div ref={this.originDropdown} className="country-options-container">
                <div className="dest-filter">
                  <input
                    ref={this.inputRef}
                    type="text"
                    placeholder="Search country"
                    value={country}
                    className="dest-filter-input"
                    onChange={this.onSearch}
                  />
                </div>
                {filteredState.map(item => (
                  <button
                    id={item.name.toUpperCase()}
                    type="button"
                    onClick={() => this.selectCountry(item.name, item.emoji)}
                    className="select-options"
                    key={item.name}
                  >
                    <div className="country-name">{item.name}</div>
                    <div className="country-flag">{item.emoji}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="delete-icon-container">
            {nationality.name.length ? <DeleteIcon id="nationality-del-icon" onClick={this.removeSelected} />  : null}
          </div>
        </div>

      </div>
    );
  }
}


Nationality.propTypes = {
  updateNationality: PropTypes.func.isRequired,
  nationality: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Nationality;
