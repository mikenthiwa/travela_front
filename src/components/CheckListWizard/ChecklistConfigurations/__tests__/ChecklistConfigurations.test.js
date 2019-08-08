import React from 'react';
import {mount, shallow} from 'enzyme';
import ChecklistConfigurations from '../index';
import checklistData from '../../../../mockData/checklistWizardMockData';

const props = {
  checklists: checklistData,
};

describe('Tests for Checklist Configurations', () => {
  it('should render the component', () => {
    const wrapper = mount(<ChecklistConfigurations {...props} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.checklist-card')).toHaveLength(10);
  });

  it('should search for configurations', () => {
    const wrapper = mount(<ChecklistConfigurations {...props} />);
    const search = wrapper.find('.input-field');
    search.simulate('change', { target: { value: 'ug' } });
    expect(wrapper.find('.checklist-card')).toHaveLength(6);
  });

  it('should visit the next page', () => {
    const wrapper = mount(<ChecklistConfigurations {...props} />);
    const nextBtn = wrapper.find('.pagination__button').last();
    nextBtn.simulate('click');
    expect(wrapper.find('.checklist-card')).toHaveLength(2);
  });

  it('should visit the previous page', () => {
    const wrapper = mount(<ChecklistConfigurations {...props} />);
    const nextBtn = wrapper.find('.pagination__button').first();
    nextBtn.simulate('click');
    expect(wrapper.find('.checklist-card')).toHaveLength(10);
  });

  it('should format the destination countries', () => {
    const countries = [
      {country: {country: 'Nigeria'}},
      {country: {country: 'Kenya'}},
      {country: {country: 'Ghana'}},
    ];
    const wrapper = mount(<ChecklistConfigurations {...props} />);
    wrapper.find('.subtitle-text').first().simulate('mouseenter');
    const expected = wrapper.instance().formatDestinations(countries);
    expect(expected).toBe('Nigeria, Kenya and Ghana');
  });
});
