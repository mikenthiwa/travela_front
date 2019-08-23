import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import PreviewBehaviour from '../PreviewBehaviour';
import './index.scss';

class PreviewDropdown extends Component {
  state = {
    behaviour: {},
    showBehaviour: false
  }
  handleCheckName = (behaviour) => {
    this.setState({ behaviour, showBehaviour: !!behaviour});
  }

  render() {
    const { item: { configuration, prompt } } = this.props;
    const { behaviour, showBehaviour } = this.state;
    
    return (
      <div>
        <div>
          <div>
            <Dropdown   
              prompt={prompt} 
              configuration={configuration} 
              handleCheckName={this.handleCheckName}
            />
          </div>
          {showBehaviour && (
            <PreviewBehaviour 
              behaviour={behaviour || {}} 
            />)}
        </div>
      </div>
    );
  }
}

PreviewDropdown.propTypes = {
  item: PropTypes.object.isRequired
};

export default PreviewDropdown;
