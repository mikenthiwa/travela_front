import React from 'react';
import { shallow } from 'enzyme';
import ChecklistDetails from '../ChecklistDetails';

describe ('ChecklistDetails Test Suite', () => {
  const props = {
    checklist: {
      config: [
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
    },
    handleSkipToQuestion: jest.fn()
       
  };
  const props2 = {
    checklist: {
      config: [
        {
          id: 1,
          order: 2,
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
        {
          id: 2,
          order: 3,
          prompt: 'Do you have a valid visa?',
          type: 'radio',
          configuration: {
            options: [
              {
                id: 2,
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
    },
    handleSkipToQuestion: jest.fn()
  };
  const wrapper = shallow(<ChecklistDetails {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
  it('should handle remove selected checkbox', () => {
    const wrapper = shallow(<ChecklistDetails {...props2} />);
    wrapper.instance().handleSkipToQuestion(1, true);
    expect(wrapper.state('config')[1].isDisabled).toBe(true);
    wrapper.instance().handleSkipToQuestion(1, false);
    expect(wrapper.state('config')[1].isDisabled).toBe(false);
  });

});
