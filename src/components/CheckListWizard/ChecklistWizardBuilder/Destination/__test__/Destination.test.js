import React from 'react';
import { shallow } from 'enzyme';
import Destination from '../index';

const props = {
  updateDestinations: jest.fn(),
  destinations: [{checked: true, name: 'Nigeria'}]
};

describe('<Destination />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Destination {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle toggle function: add', () => {
    const wrapper = shallow(<Destination {...props} />);
    wrapper.setState({selectedCountries: [{name: 'Nigeria', checked: false}]});
    const event = { target: { value: 'Nigeria'}};
    expect(wrapper.instance().onToggle(event));
  });


  it('should handle toggle function: remove', () => {
    const wrapper = shallow(<Destination {...props} />);
    wrapper.setState({selectedCountries: [{name: 'Nigeria', checked: true}]});
    const event = { target: { value: 'Nigeria'}};
    expect(wrapper.instance().onToggle(event));
  });

  it('should handle remove selected function', () => {
    const wrapper = shallow(<Destination {...props} />);
    wrapper.setState({selectedCountries: [{name: 'Nigeria', checked: true}]});
    expect(wrapper.instance().removeSelected('Nigeria'));
  });

  it('should handle remove all seslected function', () => {
    const wrapper = shallow(<Destination {...props} />);
    wrapper.setState({selectedCountries: [{name: 'Nigeria', checked: true}]});
    expect(wrapper.instance().removeAllSelected());
  });

  it('should handle onSearch function', () => {
    const wrapper = shallow(<Destination {...props} />);
    const event = { target: { value: 'Nig'}};
    wrapper.setState({selectedCountries: [{name: 'Nigeria', checked: true}]});
    expect(wrapper.instance().onSearch(event));
  });

  it('should handle showDropdown function', () => {
    const wrapper = mount(<Destination {...props} />);
    const mockEvents = { target: { value: 'Nig'}};
    const btn = wrapper.find('.dest-delete-containter');
    btn.simulate('click', mockEvents);
    expect(wrapper.showDropDown).toBeCalled;
    expect(wrapper.instance().showDropDown(mockEvents));
    wrapper.setState({dropDown: true});
    wrapper.setProps({ destinations: [{name: 'Nigeria', checked: false}]});
    wrapper.unmount();
  });


  it('should remove counry x icon click', () => {
    const wrapper = shallow(<Destination {...props} />);
    const mockEvents = jest.fn();
    wrapper.setState({selectedCountries: [{name: 'Nigeria', checked: true}]});
    const btn = wrapper.find('button#NIGERIA-remove');
    btn.simulate('click', mockEvents);
    expect(wrapper.removeSelected).toBeCalled;
  });
});
