import React from 'react';
import ResidencePlaceholder from '../ResidencePlaceholder';


describe('<ResidencePlaceholder />', () => {
  const wrapper = shallow(<ResidencePlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<ResidencePlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });
});
