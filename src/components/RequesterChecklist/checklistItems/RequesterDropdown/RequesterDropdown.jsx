import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../CheckListWizard/ChecklistWizardPreview/PreviewDropdown/index.scss';
import selectDropdownIcon from '../../../../images/icons/form_select_dropdown.svg';

class Dropdown extends Component {

  state = { open: false }

  container = React.createRef();
  input = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        open: false
      });
    }
  };

  handleClick = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleOptionSelect = (option) => {
    const { handleOptionSelect } = this.props;
    const { open } = this.state;
    return () => this.setState({ open: !open }, handleOptionSelect(option));
  }

  render() {
    const { options, selectedValue } = this.props;
    const selectedOption = options.find(({ id }) => id === selectedValue) || {};
    const { open } = this.state;

    return (
      <div className="dropdown-input-wrapper">
        <div ref={this.container} className="style-container">
          <input
            className="input"
            type="text"
            onClick={this.handleClick}
            value={selectedOption.name || ''}
            readOnly="readOnly"
            placeholder="select an option"
          />
          <img 
            src={selectDropdownIcon} 
            alt="icn" 
            onClick={this.handleClick} 
            role="presentation" 
          />
          {open && (
            <div className="dropdown">
              {options.map((option) => (
                <ul 
                  key={option.id}
                  role="presentation"
                  onClick={this.handleOptionSelect(option)}
                > 
                  <li>
                    {option.name}
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  handleOptionSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default Dropdown;
