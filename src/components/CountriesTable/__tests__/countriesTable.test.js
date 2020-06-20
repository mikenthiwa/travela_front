import React from 'react';
import { shallow } from 'enzyme';
import { CountryTable } from '../index';

const props = {
  countries: [
    {
      id: 12,
      regionId: 1001,
      country: 'Nigeria',
      createdAt: '2019-05-21:08:04',
      updatedAt: '2019-05-21:08:04'

    },
    {
      id: 13,
      regionId: 1001,
      country: 'Uganda',
      createdAt: '2019-05-21:08:04',
      updatedAt: '2019-05-21:08:04'
    }
  ]
};

const wrapper = shallow(<CountryTable {...props} />);

describe('CountryTable ', () => {
  it('should render a table with all countries', () => {
    expect(wrapper.find('table.mdl-data-table').length).toBe(1);
    expect(wrapper.find('.table__row').length).toBe(2);
  });

  it('should render a div with a message when there are no countries', () => {
    wrapper.setProps({ countries: [] });
    expect(wrapper.find('table.mdl-data-table').length).toBe(0);
    expect(wrapper.find('div.table__requests--empty').length).toBe(1);
  });
});
