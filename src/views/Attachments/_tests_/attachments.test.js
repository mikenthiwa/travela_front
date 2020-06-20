/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import FileAttachments from '../index';

const submissions = [
  {
    destinationName: 'Lagos, Nigeria',
    checklist: [
      {
        requiresFiles: true,
        submissions: [{ value: { fileName: 'Visa.png', url: 'www.com' } }]
      }
    ],
    tripId: 'wiWm8Nu2i8'
  },
  {
    destinationName: 'Nairobi, Kenya',
    checklist: [
      {
        requiresFiles: true,
        submissions: [{ value: { fileName: 'Visa.pdf', url: 'www.gmail' } }]
      }
    ],
    tripId: 'rOHLTQ7HwL',
    fileName: 'Visa.png',
    url: 'www.com'
  },
  {
    destinationName: 'New York, United States',
    checklist: [
      {
        requiresFiles: true,
        submissions: [{ value: { fileName: 'Visa.png', url: 'cloudinary' } }]
      }
    ],
    tripId: 'e5rUWSzpkE',
    fileName: 'Visa.png',
    url: 'www.com'
  }
];

const props = {
  downloadAttachments: jest.fn(),
  submissions,
  requestId: ''
};

const initialState = {
  attachments: { submissions, isFetching: false }
};
const mockStore = configureStore();
const store = mockStore(initialState);
let wrapper;

describe('Test suite for Attachments Component', () => {
  it('calls ComponentDidMount', () => {
    wrapper = shallow(
      <Provider store={store}>
        <FileAttachments {...props} store={store} />
      </Provider>
    );
    const attachments = wrapper
      .dive()
      .dive()
      .dive();
    expect(attachments.find('div.all-attachments').length).toBe(1);
  });

  it('should render the connected component correctly', () => {
    wrapper = shallow(
      <Provider store={store}>
        <FileAttachments {...props} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should handleDownloadAttachments', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { id: 'cloudinary', name: 'Visa.pdf' }
    };
    wrapper = mount(
      <Provider store={store}>
        <FileAttachments store={store} {...props} />
      </Provider>
    );
    wrapper.setState({ submissions });
    const shallowWrapper = wrapper.find('.download-btn');
    shallowWrapper.find('#cloudinary').first().simulate('click', event);
    expect(shallowWrapper.length).toBe(3);
  });
});
