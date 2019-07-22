import React from 'react';
import { shallow } from 'enzyme';
import ChecklistWizardBuilder from '../index';

const props = {
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
  addNewChecklistItem: jest.fn(),
  handleItems: jest.fn(),
  addQuestion: jest.fn(),
  updateBehaviour: jest.fn(),
  deleteItem: jest.fn(),
  deleteQuestion: jest.fn(),
  updateNationality: jest.fn(),
  updateDestinations: jest.fn()
};

describe('<ChecklistWizardBuilder />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ChecklistWizardBuilder {...props} />);
    expect(wrapper.find('div'));
  });
});
