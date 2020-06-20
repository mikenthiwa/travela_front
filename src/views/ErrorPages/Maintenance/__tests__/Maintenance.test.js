import React from 'react';
import Maintenance from '../Maintenance';


describe('<Maintenance />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Maintenance />
    );
  });
  it('should always render when the server is on maintenance mode',() => {
    expect(wrapper.find('.pageOverlay').length).toBe(1);
    expect(wrapper.find('.maintenance__title-text p')).toHaveLength(1);
    expect(wrapper.find('p.maintenance__body-text').at(0).text()).toBe('Thank you for your patience as our engineers work quickly to resolve this issue. In the meantime, please reach out to your  local travel team for help related to your travel process.');
  });
});
