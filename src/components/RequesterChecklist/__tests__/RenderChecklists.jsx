import React from 'react';
import { shallow } from 'enzyme';
import RenderChecklists from '../RenderChecklists';

describe ('RenderChecklist Test Suite', () => {
  const props = {
    checklists: [],
  }

  const wrapper = shallow(<RenderChecklists {...props} />)
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.length).toBe(1);
    });
    it('should render correctly when tabIndex exists', () => {
      wrapper.setState({tabIndex: 1});
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly when showFlightdetails is true', () => {
      wrapper.setState({showFlightDetails: true});
      expect(wrapper).toMatchSnapshot();
    });
    it('should handle tab changes when tab is hit', () => {
      const mockHandleTabClick = jest.fn();
      wrapper.setState({tabIndex: 1, showFlightDetails: false});
      wrapper.instance().onTabClick = mockHandleTabClick;
      wrapper.find('.checklist-tab-section').simulate('click');
      expect(mockHandleTabClick).toHaveBeenCalledTimes(0);
    })
})