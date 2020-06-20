import React from 'react';
import { shallow } from 'enzyme';
import RequesterRadio from '../RequesterRadio';

describe('Requester radio input type tests', () => {

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

  it('render <RequesterRadio />', () => {
    const wrapper = shallow(<RequesterRadio {...props} />);
    expect(wrapper.find('.radio-grid-wrapper')).toHaveLength(1);
  });

  it('handle the requestors response when a radio option is selected', () => {
    const wrapper = shallow(<RequesterRadio {...props} />);
    wrapper.find('.radio-option').first().simulate('click');
    wrapper.instance().handleCheckName(props.item.configuration.options[0].id);
    expect(props.item.response.selectedValue).toEqual('p0zGW1NWZ6');
    wrapper.instance().handleBehaviour(props.item.response.behaviour);
    expect(props.item.response.behaviour.type).toEqual('UPLOAD_DOCUMENT');
    expect(props.handleResponse).toBeCalled();
  });
});
