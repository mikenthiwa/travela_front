import React, { Component } from 'react';
import InputRenderer from '../../FormsAPI';
import inputLabels from '../../FormsMetadata/NewChecklistForm/inputLabels';
import './newChecklistForm.scss';

export default class ChecklistFieldSet extends Component {
  render() {
    const formMetadata = {
      inputLabels
    };
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
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
