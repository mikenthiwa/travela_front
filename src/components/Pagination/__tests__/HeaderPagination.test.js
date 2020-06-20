import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import HeaderPagination from '../HeaderPagination';

const props = {
  getRequestsWithLimit: sinon.spy(() => Promise.resolve())
};

describe('<HeaderPagination />', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<HeaderPagination {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the `getRequestsWithLimit` method when a limit is selected', () => {
    const wrapper = mount(<HeaderPagination {...props} />);
    const { getRequestsWithLimit } = props;
    const limit = wrapper.find('.dropdown__list__item').first();
    limit.simulate('click');
    expect(getRequestsWithLimit.called).toEqual(true);
    expect(getRequestsWithLimit.calledWith(10)).toEqual(true);
  });
});
