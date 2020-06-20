import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader';
import './HelpHeader.scss';

class HelpHeader extends PureComponent {

  render() {
    return (
      <div className="help-panel-header">
        <PageHeader
          title="TRAVEL POLICY DOCUMENTS"
        />
      </div>
    );
  }
}

export default HelpHeader;
