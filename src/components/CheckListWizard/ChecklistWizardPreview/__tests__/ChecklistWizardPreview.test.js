import React from 'react';
import { shallow } from 'enzyme';
import ChecklistWizardPreview from '../index';

const props = {
  nationality: { name: 'Nigerians' },
  destinations: [{ name: 'USA'}, {name: 'Brazil'}],
  items: [
    {
      order: 1,
      prompt: 'Do you have a valid visa?',
      type: 'radio',
      configuration: {
        options: [
          {
            id: 1,
            name: 'Yes',
            behaviour: {
              name: 'upload a document',
              payload: 'UPLOAD_DOCUMENT',
            }
          },
        ]
      }
    },  
  ],
};

describe('<ChecklistWizardPreview />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ChecklistWizardPreview {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
