import React,{Component} from 'react';
import {PropTypes} from 'prop-types';
import DropdownOptions from './DropdownOptions';

export default class filterDropdownSelect extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      dropdownClass: '',
    };

    /* It is important to bind the function on the 
      next line in order for removeEventListener to work
      on line 25 */
    this.hideOptions = this.hideOptions.bind(this);
  }

  componentDidMount(){
    document.addEventListener('click', this.hideOptions);
    this.dataValue();
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.hideOptions);
  }

  // presents the matching options on the dropdown and their onClick events
  //and limits them to five options
  getSelectOptions(choices) {
    let filteredChoices = [null, null];
    const {role} = this.state;
    if (role){
      filteredChoices = choices.filter(
        (eachChoice => eachChoice.toLowerCase().includes(role.toLowerCase())));
      let choiceLength = filteredChoices.length;
      if ( choiceLength > 5 ){
        filteredChoices.splice(5, choiceLength - 5);
      }
      return(
        <DropdownOptions
          items={filteredChoices}
          handleClick={this.handleClickOnOption}
          getDropdownStatus={this.getDropdownStatus}
        />
      );
    }
  }
    
  hideOptions = () => {
    this.setState({dropdownClass: 'novisibility'});
  }

  dataValue = () => {
    const { value } = this.props;
    this.setState({
      role: value
    });
  }

  //function called after one dropdown option is clicked
  handleClickOnOption = (choice) => {
    const { onChange } = this.props;
    onChange(choice);
    this.setState({ role: choice});
    this.handleToggleDropdown();
  }

  // method that changes the state of the dropdown from active(open) to inactive and viceversa
  handleToggleDropdown = (e) => {
    const {dropdownOpen} = this.state;
    this.setState(() => ({
      dropdownOpen: !dropdownOpen,
      dropdownClass: 'novisibility',
    }));
  }

  getPropsObject = () => {
    const { className, error } = this.props;
    const _props = { ...this.props };
    ['labelNote'].map(
      item => delete _props[item]
    );
    const props = {
      ..._props,
      className: `input select ${error ? 'error' : 'This field is required'} ${
        className ? className : ''
      }`
    };
    return props;
  };

  // get status of the dropdown: active/inactive
  getDropdownStatus = () => {
    const {dropdownOpen} = this.state;
    const dropdownStatus = dropdownOpen? 'active': 'inactive';
    return dropdownStatus;
  };

  changeText = (e) => {
    const {onChange, name} = this.props;
    switch(name){
    case 'email':
    case 'from':
      onChange(e.target.value);
      if(e.target.value.length> 4){    
        this.setState({[e.target.name]:  e.target.value});
        this.setState(() => ({dropdownClass: 'select-dropdown'}));  
        break;
      }
      this.setState({[e.target.name]:  ''});
      break;
      
    default :
      onChange(e.target.value);
      this.setState({[e.target.name]:  e.target.value});
      this.setState(() => ({dropdownClass: 'select-dropdown'}));
    }
    
  };

  render(){
    const {choices, size, value} = this.props;
    
    const {role, dropdownClass, manager} = this.state;
    const options = this.getSelectOptions(choices);
    const attributes = this.getPropsObject();
    /* Next line deletes error key and value, else DOM element will throw an
    error since error is not a valid HTML attribute */
    delete attributes.error;
    return (
      <div style={{position:'relative'}}>
        <div className="value" style={{width: size}}>
          <input
            {...attributes}
            className="occupationInput"
            autoComplete="off"
            name="role"
            type="text"
            value={value || ''}
            onChange={this.changeText}
          />
          {role || manager ? (
            <div className={dropdownClass || 'hide'}>
              { options }
            </div>
          ): null}
        </div>
      </div>
    );
  }
}



filterDropdownSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  size:  PropTypes.string.isRequired,
};

filterDropdownSelect.defaultProps = {
  choices: [],
  value: ''
};
