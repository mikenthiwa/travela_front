import React from 'react';
import ArrowIcon from '../ArrowIcon';

const props = {
  iconClass : 'test-class',
  iconSrc : 'testIconSrc'
};

describe('<ArrowIcon />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ArrowIcon {...props} />
    );
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
