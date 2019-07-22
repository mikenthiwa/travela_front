import React from 'react';
import { shallow } from 'enzyme';
import Nationality from '../index';

const props = {
  updateNationality: jest.fn(),
};

describe('<Nationality />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Nationality {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle select country function', () => {
    const wrapper = shallow(<Nationality {...props} />);
    wrapper.instance().selectCountry('Nigeria', '9jaFlag');
    expect(wrapper.state('selected')).toEqual({name: 'Nigeria', emoji: '9jaFlag'});
    expect(wrapper.updateNationality).toBeCalled;
  });

  it('should handle onSearch function', () => {
    const wrapper = shallow(<Nationality {...props} />);
    const event = { target: { value: 'Nig'}};
    expect(wrapper.instance().onSearch(event));
  });

  it('should handle showDropdown function', () => {
    const wrapper = mount(<Nationality {...props} />);
    const mockEvents = { target: { value: 'Nig'}};
    const btn = wrapper.find('.select-input-delete-container');
    btn.simulate('click', mockEvents);
    expect(wrapper.showDropdown).toBeCalled;
    expect(wrapper.instance().showDropdown(mockEvents));
    wrapper.unmount();
  });

  it('should handle remove seslected function', () => {
    const wrapper = shallow(<Nationality {...props} />);
    expect(wrapper.instance().removeSelected());
  });

  it('should handle prompt button click', () => {
    const wrapper = shallow(<Nationality {...props} />);
    const mockEvents = { target: { value: '.select-options'} };
    wrapper.setState({dropdown: true});
    const btn = wrapper.find('button#NIGER');
    btn.simulate('click', mockEvents);
    expect(wrapper.selectCountry).toBeCalled;
  });
});
