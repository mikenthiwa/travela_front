import React from 'react';
import { mount } from 'enzyme';
import NoTemplates from '../NoTemplates';

describe('<NoTemplates />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<NoTemplates />);
    expect(wrapper.find('.no-templates').length).toEqual(1);
  });
});
