import React from 'react';
import { shallow } from 'enzyme';
import Preloader from '../Preloader';

let wrapper;
describe('Preloader', () => {
  it('renders correctly', () => {
    wrapper = shallow(<Preloader />);
    expect(wrapper).toMatchSnapshot();
  });
});
