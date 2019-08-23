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
    response: {
      id: 'bcbbcg67',
      selectedValue: 'p0zGW1NWZ6',
      behaviour: {
        document: {
          data: {
            imageName: 'image.png'
          }
        },
        payload: 'passport',
        type: 'UPLOAD_DOCUMENT'
      }
    },
    handleSkipToQuestion: jest.fn(),
    handleResponse: jest.fn(),
  };

  const wrapper = shallow(<ChecklistDetails {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should handle checklist response', () => {
    const wrapper = shallow(<ChecklistDetails {...props2} />);
    wrapper.instance().handleChecklistResponse(props2.response);
    expect(props2.handleResponse).toBeCalled();
  });

});
