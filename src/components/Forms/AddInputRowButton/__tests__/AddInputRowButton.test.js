import React from 'react';
import AddInputRowButton from '..';

describe('<AddInputRowButton />', () => {
  const props = {
    text: 'Add a new input row',
    addRowHandler: () => {},
    wrapperClassName: 'input-row-class',
    buttonClassName: 'button-class'
  };
  const wrapper = shallow(<AddInputRowButton {...props} />);

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
