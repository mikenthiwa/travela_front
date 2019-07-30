import * as behaviourTypes from '../../ChecklistWizardBuilder/BuilderBehaviour/behaviourActions';

const itemTypeDropdownMetaData = {
  options : [
    { value: 'radio', displayValue: 'Radio(e.g. Yes or No)' },
    { value: 'checkbox', displayValue: 'Checkboxes(e.g. Options 1 and 2)' },
    { value: 'dropdown', displayValue: 'Dropdown(i.e. Options in a dropdown)' },
    { value: 'image', displayValue: 'Image' },
    { value: 'video', displayValue: 'Video' },
    { value: 'scale', displayValue: 'Scale(e.g. On a scale of 1-5)' }
  ],
  placeHolder : 'Select an item type',
  selectOptionContainerStyle: 'item-type-options-container'
};

const behaviourTypeDropdownMetaData = {
  options : [
    { value: behaviourTypes.UPLOAD_DOCUMENT, displayValue: 'Upload a document' },
    { value: behaviourTypes.SKIP_QUESTION, displayValue: 'Skip to another question' },
    { value: behaviourTypes.PREVIEW_DOCUMENT, displayValue: 'Preview Document' },
    { value: behaviourTypes.NOTIFY_EMAIL, displayValue: 'Notify an Email Address' },
  ],
  placeHolder : 'Select a behaviour',
  selectAreaSyle: 'behaviour-input',
  selectStyle: 'behaviour-selected',

};

export default {
  itemTypeDropdownMetaData,
  behaviourTypeDropdownMetaData,
};
