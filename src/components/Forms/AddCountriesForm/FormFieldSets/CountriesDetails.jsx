import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import inputLabels from '../../FormsMetadata/AddCountriesForm/inputLabels';
import dropdownSelectOptions from '../../FormsMetadata/AddCountriesForm/dropDownSelectionOptions';
import './CountriesDetails.scss';

class AddCountryFields extends Component {
  displayInput() {
    const { addItem, allCountries, values } = this.props;
    dropdownSelectOptions.item = allCountries;
    const formMetadata = {
      inputLabels,
      dropdownSelectOptions
    };
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    return (
      <div className="size_in countries_size_in">
        <div className="add_dept">
          {renderInput('item', 'filter-dropdown-select', {
            className: 'department_dropdown',
            size: '',
            label: 'Country'
          })}
        </div>
        <button
          type="button"
          onClick={addItem}
          disabled={values.item.trim().length < 1}
          className={
            values.item.trim().length > 1 ? 'add_button' : 'disable_button'
          }
        >
          Add
        </button>
      </div>
    );
  }

  renderAddedCountries() {
    const { values, removeItem } = this.props;
    return (
      <div className="">
        <table
          className="mdl-js-data-table table__requests"
          style={{ backgroundColor: 'white' }}
        >
          {values.countries.map((list, i) => (
            <tbody
              key={Math.floor(Math.random() * 5000 + 1)}
              className="table__body"
            >
              <tr
                className="table__row"
                style={{ backgroundColor: '#F8F8F8' }}
              >
                <td
                  className="mdl-data-table__cell--non-numeric table__data"
                  style={{
                    textTransform: 'capitalize',
                    borderLeft: 'none'
                  }}
                >
                  {list}
                </td>
                <td style={{ borderRight: 'none' }}>
                  <i
                    role="button"
                    className="remove_department"
                    id="remove"
                    onKeyDown={this.handleKeyDown}
                    tabIndex="0"
                    onClick={() => removeItem(i)}
                  >
                    X
                  </i>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
  render() {
    return (
      <fieldset className="personal-details">
        {this.displayInput()}
        {this.renderAddedCountries()}

      </fieldset>
    );
  }
}

const values = PropTypes.object;
const allCountries = PropTypes.array;
const addItem = PropTypes.func;
const removeItem = PropTypes.func;
AddCountryFields.propTypes = {
  values: values,
  removeItem: removeItem,
  addItem: addItem,
  allCountries: allCountries.isRequired
};

AddCountryFields.defaultProps = {
  removeItem: () => {},
  addItem: () => {},
  values: {}
};

export default AddCountryFields;
