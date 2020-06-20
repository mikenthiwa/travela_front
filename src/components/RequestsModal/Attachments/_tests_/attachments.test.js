import React from 'react';
import path from 'path';
import { shallow, mount } from 'enzyme';
import Attachments from '../Attachments';

const props = {
  fileSubmissions: [
    {
      destinationName: 'Lagos, Nigeria',
      checklist: [],
      tripId: 'wiWm8Nu2i8',
      fileName: 'visa.png',
      url: 'www.com'
    },
    {
      destinationName: 'Nairobi, Kenya',
      checklist: [],
      tripId: 'rOHLTQ7HwL',
      fileName: 'passport.pdf',
      url: 'www.com'
    },
    {
      destinationName: 'New York, United States',
      checklist: [],
      tripId: 'e5rUWSzpkE',
      fileName: 'ticket.png',
      url: 'www.com'
    }
  ],
  isFetching: true,
  handleDownload: jest.fn(),
  renderThumbnail: jest.fn()
};

describe('<Attachments />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Attachments {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles renderDownload types', () => {
    global.path = path;
    const newProps = {
      ...props,
      isFetching: false
    };
    wrapper = shallow(<Attachments {...newProps} />);
    expect(wrapper.find('.rectangle-copy').length).toBe(3);
  });
});
