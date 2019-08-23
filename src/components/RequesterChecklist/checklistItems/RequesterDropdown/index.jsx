import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './RequesterDropdown';
import '../../../CheckListWizard/ChecklistWizardPreview/PreviewDropdown/index.scss';
import ChecklistBehaviour from '../../ChecklistBehaviour/ChecklistBehaviour';

class PreviewDropdown extends Component {

  handleOptionSelect = (option) => {
    const { handleResponse, item: { id } } = this.props;
    return () => {
      handleResponse({ id, selectedValue: option.id, behaviour: option.behaviour });
    };
  }

  handleBehaviour = (behaviour) => {
    const { handleResponse, item: { response } } = this.props;
    handleResponse({ ...response, behaviour });
  }

  render() {
    const { item } = this.props;
    const selectedValue = item.response && item.response.selectedValue;
    
    return (
      <Fragment>
        <Dropdown
          options={item.configuration.options}
          handleOptionSelect={this.handleOptionSelect}
          selectedValue={selectedValue || ''}
        />
        {item.response && item.response.behaviour && (
          <ChecklistBehaviour
            behaviour={item.response.behaviour}
            handleBehaviour={this.handleBehaviour}
          />)
        }
      </Fragment>  
    );
  }
}

PreviewDropdown.propTypes = {
  item: PropTypes.object.isRequired,
  handleResponse: PropTypes.func.isRequired,
};

export default PreviewDropdown;
