import React from 'react';
import { shallow } from 'enzyme';
import RequestApproval from '../RequestApproval';

const props = {
  requestData: {
    status: 'Approved',
    manager: 'Onyx',
    approverImage:'http://this.travela.img',
    timeApproved: new Date()
  }
};

describe('RequestApproval component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RequestApproval {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the RequestApproval component as expected', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(4);
    expect(wrapper.find('ImageLink').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});
