import { inputLabels, dropdownSelectOptions } from '../index';

describe('OtherDocumentMetaData', () => {
  const inputLabelTest = {
    name: {
      label: 'Name'
    },
    parentDepartment: {
      label: 'Parent Department'
    },
  };

  const dropdownSelectOptionTest = {
    'parentDepartment': []
  };

  it('renders returns other document input label', () => {
    expect(inputLabels).toMatchObject(inputLabelTest);
    expect(dropdownSelectOptions).toMatchObject(dropdownSelectOptionTest);
  });
});
