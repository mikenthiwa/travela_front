import React from 'react';
import { shallow } from 'enzyme';
import RadioButton from '../index';

const props = {
  name: 'lamp',
  value:  '20',
  id: '0o3',
  defaultChecked: false
};

describe('<RadioButton />', ()=> {
  it('should render correctly', () =>{
    const wrapper = shallow(<RadioButton {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
