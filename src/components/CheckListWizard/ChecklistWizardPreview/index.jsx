import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewChecklistItem from './PreviewChecklistItem';
import './index.scss';

class ChecklistWizardPreview extends Component {
  render() {
    const { items, nationality, destinations } = this.props;
    return (
      <div className="checklist-wizard-preview checklist-wizard-col">
        <div className="preview-item-header">
          <p className="preview-header">Preview the Checklist</p>
          <p>
            {`Applicable to ${nationality.name} travelling to `}
            <span className="coutries-blue">{`${destinations.length} countries`}</span>
          </p>
        </div>
        {items.map(item => (<PreviewChecklistItem key={item.order} type={item.type} order={item.order} prompt={item.prompt} configuration={item.configuration} />))}
      </div>
    );
  }
}


ChecklistWizardPreview.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  nationality: PropTypes.objectOf(PropTypes.string).isRequired,
  destinations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChecklistWizardPreview;
