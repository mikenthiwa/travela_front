import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { DocumentDetailsAttachment } from '../DocumentDetailsAttachment';

const props = {
  downloadDocument: jest.fn(),
  isFetching: true,
  documentData: {
    'id': 'b9gnYkdzG',
    'type': 'passport',
    'data': {
      'country': 'Kenya',
      'entryType': 'H-2A',
      'expiryDate': '06-01-2018',
      'dateOfIssue': '02-01-2018',
      'cloudinaryUrl': 'https://res.cloudinary.com/ined/image/upload/v1538568663/Logo_blue_2x.png'
    },
    'isVerified': false,
    'createdAt': '2019-01-04T11:11:52.181Z',
    'updatedAt': '2019-01-16T11:11:52.181Z',
  },
};

const state = {
  user: 'Dohn Joe'
};

describe('DocumentDetailsAttachment', () => {
  it('renders a document attachment', () => {
    const wrapper = shallow(<DocumentDetailsAttachment {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles document download', () => {
    const store = configureStore()(state)
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <DocumentDetailsAttachment {...props} />
        </MemoryRouter>
      </Provider>
    );

    const component = wrapper.find('DocumentDetailsAttachment').instance();

    const spy = jest.spyOn(component, 'handleDownloadDocument');
    component.forceUpdate();

    const button = wrapper.find('.download-btn');

    button.simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
