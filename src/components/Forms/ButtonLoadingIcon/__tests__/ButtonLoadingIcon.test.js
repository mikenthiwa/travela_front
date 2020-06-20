import React from 'react';
import ButtonLoadingIcon from '..';

describe('<ButtonLoadingIcon />', () => {
  const props = {
    loading: true,
    buttonText: 'Save',
    isLoading: true
  };
  const wrapper = shallow(<ButtonLoadingIcon {...props} />);

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
