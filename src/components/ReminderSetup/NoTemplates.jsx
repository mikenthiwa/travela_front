import React from 'react';
import  * as PropTypes from 'prop-types';
import Icon from '../../images/no-document.svg';
import './templates.scss';

const text = 'No email templates have been created to remind travellers when their travel documents are about to expire';
const NoTemplates = ({message}) => (
  <div className={`no-templates list-templates ${message === text ? 'no-email-templates' : ''}`}>
    <div className="content">
      <img src={Icon} alt="" />
      <p>
        {message || 'No email templates have been created to remind travellers when their travel documents are about to expire'}
      </p>
    </div>
  </div>
);

NoTemplates.propTypes  = {
  message: PropTypes.string
};

NoTemplates.defaultProps = {
  message: 'No email templates have been created to remind travellers when their travel documents are about to expire'
};
export default NoTemplates;
