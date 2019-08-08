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
  handleSkipToQuestion: jest.fn()
};
const props2 = {
  nationality: { name: 'Nigerians' },
  destinations: [{ name: 'USA'}, {name: 'Brazil'}],
  items: [
    {
      id: 1,
      order: 2,
      prompt: 'Do you have a valid visa?',
      type: 'checkbox',
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
      },
      behaviour: {
        payload: 2,
        type: 'SKIP_QUESTION'
      }
    },  
  ],
  handleSkipToQuestion: jest.fn()
};

describe('<ChecklistWizardPreview />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ChecklistWizardPreview {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle all selected checkbox', () => {
    const wrapper = shallow(<ChecklistWizardPreview {...props} />);
    wrapper.setState({disabledQuestions: [{items: 'checkbox', checked: true}]});
    expect(wrapper.instance().toBeCalled);
  });
  it('should handle remove selected checkbox', () => {
    const wrapper = shallow(<ChecklistWizardPreview {...props2} />);
    wrapper.instance().handleSkipToQuestion(1, true);
    expect(wrapper.state('disabledQuestions')).toEqual([1]);
    wrapper.instance().handleSkipToQuestion(1, false);
    expect(wrapper.state('disabledQuestions')).toEqual([]);
  });
});
