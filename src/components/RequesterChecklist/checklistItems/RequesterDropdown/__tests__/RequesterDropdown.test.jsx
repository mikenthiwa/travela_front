import React from 'react';
import { shallow, mount } from 'enzyme';
import RequesterDropdown from '..';
import Dropdown from '../RequesterDropdown';

describe('Requester Dropdown Tests', () => {
  const props = {
    item: {
      id: 'bcbbcg67',
      configuration: {
        options: [
          {
            id: 'p0zGW1NWZ6',
            name: 'Yes',
            behaviour: {
              type: 'UPLOAD_DOCUMENT',
              payload: 'yellow fever document'
            }
          },
          {
            id: '2kzgtmtz-',
            name: 'No',
            behaviour: {
              type: 'NOTIFY_EMAIL',
              payload: 'jude.afam@andela.com'
            }
          }
        ]
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
      }
    },
    handleResponse: jest.fn(),
    handleBehaviour: jest.fn(),
  };

  const props2 = {
    options: [
      {
        id: 'p0zGW1NWZ6',
        name: 'Yes',
        behaviour: {
          type: 'UPLOAD_DOCUMENT',
          payload: 'yellow fever document'
        }
      },
      {
        id: '2kzgtmtz-',
        name: 'No',
        behaviour: {
          type: 'NOTIFY_EMAIL',
          payload: 'jude.afam@andela.com'
        }
      }
    ],
    selectedValue: '2kzgtmtz-'
  };

  it('should render the dropdown', () => {
    const wrapper = shallow(<Dropdown {...props2} />);
    wrapper.setState({open: false});
    wrapper.find('input').first().simulate('click');
    expect(wrapper.state('open')).toBe(true);
    wrapper.unmount();
  });

  it('handle click outside', () => {
    const wrapper = shallow(<Dropdown {...props2} />);
    const event = { target: {name: ''} };
    wrapper.setState({open: true});
    wrapper.instance().handleClickOutside(event);
    expect(wrapper.state('open')).toBe(true);
  });

  it('should handle option select', () => {
    const wrapper = shallow(<RequesterDropdown {...props} />);
    expect(wrapper.find(Dropdown).length).toEqual(1);
    wrapper.instance().handleOptionSelect(props.item.configuration.options[0].id)();
    expect(props.handleResponse).toHaveBeenCalled();
  });

  it('should handle behaviour', () => {
    const wrapper = shallow(<RequesterDropdown {...props} />);
    wrapper.instance().handleBehaviour(props.item.response.behaviour);
    expect(props.handleResponse).toHaveBeenCalled();
  });

});

