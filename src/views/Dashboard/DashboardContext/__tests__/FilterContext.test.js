import React from 'react';
import FilterContext from '../FilterContext';

const props = {
  children: [],
  user: {
    location: 'Lagos, Nigeria'
  },
  history: {
    location:{
      search: ''
    }
  }
};

const props2 = {
  children: [],
  user: {
    location: 'Lagos, Nigeria'
  },
  history: {
    location:{
      search: '?page=1&center=Rwanda'
    }
  }
};

describe('<FilterContext />', () => {
  const wrapper = shallow(<FilterContext {...props} />);
  const wrapper2 = shallow(<FilterContext {...props2} />);
  it('should render without crashing', () => {
    wrapper.instance().setState = jest.fn();
    const input = {start: '2018-12-02', end: '2018-12-10'};
    wrapper.instance().handleFilter(input);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().setState).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().setState).toHaveBeenCalledWith({ range: input});
    localStorage.clear();
  });
  it('should use All Locations if search is null', () => {
    expect(wrapper.state('center')).toEqual('All Locations');
  });
  it('should return center if search is not null', () => {
    expect(wrapper2.state('center')).toEqual('Rwanda');
  });
});
