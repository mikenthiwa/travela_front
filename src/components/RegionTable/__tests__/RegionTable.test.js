import React from 'react';
import { shallow } from 'enzyme';
import { RegionTable } from '../index';

const props = {
  regions: [
    {
      'id': 1002,
      'region': 'West Africa',
      'description': 'Nigeria',
    },
    {
      'id': 1001,
      'region': 'East Africa',
      'description': 'Kenya, Uganda and Rwanda',
    }
  ],
};

const wrapper = shallow(<RegionTable {...props} />);

describe('RegionTable ', () => {
  it('should render the table with regions', () => {
    expect(wrapper.find('table.mdl-data-table').length).toBe(1);
    expect(wrapper.find('.table__row').length).toBe(2);
  });

  it('should render a div when there are regions', () => {
    wrapper.setProps({ regions: [] });
    expect(wrapper.find('table.mdl-data-table').length).toBe(0);
    expect(wrapper.find('div.table__requests--empty').length).toBe(1);
  });
});
