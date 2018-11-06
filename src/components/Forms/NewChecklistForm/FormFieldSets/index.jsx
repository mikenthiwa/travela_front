import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewChecklistForm';
import './newChecklistForm.scss';

export default class ChecklistFieldSet extends Component {
  render() {
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    const { handleCheckboxChange } = this.props;
    return (
      <fieldset className="add-checklist">
        <div className="input-group">
          {renderInput('itemName', 'text')}
          <div className="input-group">
            {renderInput('label', 'text',
              { placeholder: 'Link label',
                required: false,
                className: 'link-label-field'
              })
            }
            <span className="link-fields-divider">-</span>
            {renderInput('link', 'text',
              { placeholder: 'Link address',
                required: false,
                className: 'link-address-field'
              })
            }
          </div>
          {renderInput('requiresFiles', 'checkbox', {required: false})}
        </div>
      </fieldset>
    );
  }
}

ChecklistFieldSet.propTypes = {
  handleCheckboxChange: PropTypes.func
};

ChecklistFieldSet.defaultProps = {
  handleCheckboxChange: () => {}
};
