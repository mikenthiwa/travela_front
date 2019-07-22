import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountryList from 'countries-list';
import DeleteIcon from '../../Shared/deleteIcon';
import './index.scss';

const countries = [];
Object.values(CountryList.countries).map(item =>
  countries.push({ ...item, checked: false })
);

class Destination extends Component {
  state = {
    countries: countries,

    filteredState: countries,

    selectedCountries: [],

    country: '',

    dropDown: false
  };

  destinationDropDown = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.showDropDown, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.showDropDown, false);
  }

  onToggle = ({ target }) => {
    const { updateDestinations } = this.props;
    const { filteredState, selectedCountries } = this.state;
    const item = filteredState.find(item => item.name === target.value);
    item.checked = !item.checked;

    const newState = filteredState.filter(item => item.name !== target.value);

    let newSelectedCountries = selectedCountries;

    if (item.checked) {
      newSelectedCountries.push(item);
    }

    if (!item.checked) {
      newSelectedCountries = selectedCountries.filter(item => item.checked);
    }

    this.setState({
      filteredState: [item, ...newState],
      selectedCountries: [...newSelectedCountries]
    });
    updateDestinations(newSelectedCountries);

  };

  removeSelected = name => {
    const { updateDestinations } = this.props;
    const { selectedCountries } = this.state;

    const itemClicked = selectedCountries.find(item => item.name === name);
    itemClicked.checked = false;

    const newSelectedState = selectedCountries.filter(
      item => item.name !== name
    );

    this.setState({
      selectedCountries: [...newSelectedState]
    });
    updateDestinations(newSelectedState);
  };

  removeAllSelected = () => {
    const { selectedCountries } = this.state;
    const { updateDestinations } = this.props;
    selectedCountries.forEach(item => (item.checked = false));
    this.setState({ selectedCountries: [] });
    updateDestinations([]);
  };

  onSearch = ({ target }) => {
    const { countries } = this.state;
    const newState = countries.filter(item =>
      item.name.toLowerCase().includes(target.value.toLowerCase())
    );

    this.setState({ country: target.value, filteredState: [...newState] });
  };

  showDropDown = e => {
    this.setState({ dropDown: this.destinationDropDown.current.contains(e.target)});
  };

  render() {
    const { country, filteredState, selectedCountries, dropDown } = this.state;
    return (
      <div className="dest-container">
        <p>Travelling To</p>
        <div className="dest-delete-containter">
          <div ref={this.destinationDropDown} className="dest-input-countries-container">
          
            <div className="dest-input-container">
              <div className="dest-input">
                {selectedCountries.length ? selectedCountries.map(item => (
                  <div key={item.name} className="sel-country">
                    <div className="country-item">
                      {item.name}
                    </div>
                    <button
                      type="button"
                      id={`${item.name.toUpperCase()}-remove`}
                      onClick={() => this.removeSelected(item.name)}
                      className="remove-country"
                    >
                  x
                    </button>
                  </div>
                )): <div className="select-placeholder">Select destinations</div>}
              </div>
              <button type="button" onClick={this.showDropDown} className="caret">
                {dropDown ? <i className="material-icons">expand_less</i> : <i className="material-icons">expand_more</i>}
              </button>
            </div>
            <div>
              {dropDown && (
                <div className="dest-countries-container">
                  <div className="dest-filter">
                    <input
                      type="text"
                      placeholder="Search country"
                      value={country}
                      className="dest-filter-input"
                      onChange={this.onSearch}
                    />
                  </div>
                  <div className="dest-countries">
                    {filteredState.map(item => (
                      <label htmlFor={item.name.toUpperCase()} key={item.name} className="dest-checkbox">
                        <input
                          checked={item.checked}
                          name="dest"
                          type="checkbox"
                          id={item.name.toUpperCase()}
                          value={item.name}
                          className="dest-checkbox-item"
                          onChange={this.onToggle}
                        />
                        <span className={item.checked ? 'checked-country' : 'unchecked-country'}>{item.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="remove-all-selected-container">
            {selectedCountries.length ? (
              <DeleteIcon id="destinaton-del-icon" onClick={this.removeAllSelected} />
            ) : null}
          </div>

        </div>
      </div>
    );
  }
}

Destination.propTypes = {
  updateDestinations: PropTypes.func.isRequired,
};

export default Destination;
