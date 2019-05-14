import React from 'react';
import { shallow, mount } from 'enzyme';
import DashboardHeader from '..';


const props = {
  downloadCsv: jest.fn(),
  context: {
    state: {
      center: 'Kenya'
    }
  }
};


const wrapper = mount(<DashboardHeader {...props} />);

describe('<DashboardHeader />', () => {
  it('should download csv when download btn is clicked', () => {
    const button = wrapper.find('#download');
    button.simulate('click');
    expect(props.downloadCsv).toHaveBeenCalled();
  });

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
