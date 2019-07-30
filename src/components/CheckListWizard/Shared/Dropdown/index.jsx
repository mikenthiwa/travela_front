import React, { Component } from 'react';
import PropTypes from 'prop-types';
import expandMore from './images/baseline-expand_more-24px.svg';
import expandLess from './images/baseline-expand_less-24px.svg';
import './index.scss';

class Dropdown extends Component {
  state = {
    selected: '',
    optionsOpen: false
  };

  selRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.closeOption, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.closeOption, false);
  }

  closeOption = e => {
    const { optionsOpen } = this.state;
    const isOutside = !this.selRef.current.contains(e.target);
    this.setState({
      optionsOpen: isOutside ? false : !optionsOpen,
    });
  };

  selectOption = item => {
    const { changeFunc } = this.props;
    this.setState({ selected: item.displayValue });
    changeFunc && changeFunc(item.value);
  };

  render() {
    const { selected, optionsOpen } = this.state;
    const { dropdownOptions } = this.props;
    const { options, placeHolder = 'select an option', selectAreaSyle, selectStyle, selectOptionContainerStyle } = dropdownOptions;
    return (
      <div className="dropdown-container">
        <div ref={this.selRef} className={`selected-area ${selectAreaSyle}`}>
          {selected.length ? (
            <p className={`selected ${selectStyle}`}>{selected}</p>
          ) : (
            <p className="selected-placeholder">{placeHolder}</p>
          )}
          {optionsOpen ? (
            <img className="drop-icon" src={expandLess} alt="expand_less" />
          ) : (
            <img className="drop-icon" src={expandMore} alt="expand_more" />
          )}
        </div>
        <div className={`select-option-container ${selectOptionContainerStyle}`}>
          {optionsOpen && (
            <div className="select-options">
              {options.map(item => (
                <button
                  type="button"
                  id={item.displayValue.toUpperCase()}
                  className="select-option-item"
                  key={Math.random() * 100000}
                  onClick={() => this.selectOption(item)}
                >
                  {item.displayValue}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  dropdownOptions: PropTypes.shape({options: PropTypes.array}).isRequired,
  changeFunc: PropTypes.func.isRequired,
};
  
export default Dropdown;
