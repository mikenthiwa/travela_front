import React from 'react';
import { mount } from 'enzyme';
import StipendRow from '../StipendRow';

describe('<TemplateDetailsForm />', () => {
  const props = {
    location: 'Lagos',
    duration: '2',
    subTotal: 100,
    dailyRate: 1,
    centerExists: true
  };

  it('renders without crashing', () => {
    const wrapper = mount(<StipendRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a travel stipend row for Lagos center', () => {
    const wrapper = mount(<StipendRow {...props} />);
    expect(wrapper.find('.item').at(0).text()).toBe('Lagos');
    expect(wrapper.find('.item').at(1).text()).toBe('$ 1');
    expect(wrapper.find('.item').at(2).text()).toBe('2 days');
    expect(wrapper.find('.item').at(3).text()).toBe('$ 100');
  });

  it('should render a travel stipend row for Nairobi center', () => {
    const newProps = {
      ...props,
      location: 'Nairobi'
    };
    const wrapper = mount(<StipendRow {...newProps} />);
    expect(wrapper.find('.item').at(0).text()).toBe('Nairobi');
    expect(wrapper.find('.item').at(1).text()).toBe('$ 1');
    expect(wrapper.find('.item').at(2).text()).toBe('2 days');
    expect(wrapper.find('.item').at(3).text()).toBe('$ 100');
  });

  it('should render a travel stipend row for a Non Andelan Center', () => {
    const newProps = {
      ...props,
      location: 'UK',
      centerExists: false
    };
    const wrapper = mount(<StipendRow {...newProps} />);
    expect(wrapper.find('.item').at(0).text()).toBe('UK');
    expect(wrapper.find('.item').at(1).text()).toBe('$ 1');
    expect(wrapper.find('.item').at(2).text()).toBe('2 days');
    expect(wrapper.find('.item').at(3).text()).toBe('N/A');
  });
});
