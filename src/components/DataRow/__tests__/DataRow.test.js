import React from 'react';
import { shallow, mount } from 'enzyme';
import DataRow from '../index';

const props = {
  item: {
    id: 'f4wevad',
    destination: 'Nairobi',
    duration: '3 days',
    status: 'Verified'
  },
  history: {
    push: jest.fn()
  }
};

describe('<DataRow />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DataRow {...props} />);
    expect(wrapper.find('.data-row').length).toBe(1);
  });
});

describe('ID click on DataRow', () => {

  it('should call handleclick funcition when request id is clicked', () => {

    const wrapper = mount(<DataRow {...props} />);

    const mockEvents = { preventDefault: jest.fn() };
    const requestButton = wrapper.find('.data-row__button-no-style');
    requestButton.simulate('click', mockEvents);
    expect(wrapper.props.history).toBeCalled;
    expect(wrapper.handleOpenRequest).toBeCalled;
  });
});
