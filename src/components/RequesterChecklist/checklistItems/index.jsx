import React from 'react';
import PropTypes from 'prop-types';
import PreviewImage from '../../CheckListWizard/ChecklistWizardPreview/PreviewImage';
import PreviewVideo from '../../CheckListWizard/ChecklistWizardPreview/PreviewVideo';
import RequesterViewCheckbox from './PreviewCheckbox/index';
import PreviewScale from './RequesterScale';
import RequestDropdown from './RequesterDropdown';
import RequesterRadio from './RequesterRadio/RequesterRadio';

const CheckListMap = new Map([
  ['checkbox', RequesterViewCheckbox],
  ['image', PreviewImage],
  ['video', PreviewVideo],
  ['scale', PreviewScale],
  ['radio', RequesterRadio],
  ['dropdown', RequestDropdown],
]);

const ChecklistItems = ({ config, handleResponse }) => {

  const Component = CheckListMap.get(config.type);

  return (
    <Component
      item={config}
      handleResponse={handleResponse}
    />
  );
};

ChecklistItems.propTypes = {
  config: PropTypes.object.isRequired,
  handleResponse: PropTypes.func.isRequired,
};

export default ChecklistItems;
