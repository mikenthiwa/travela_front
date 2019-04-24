import React from 'react';
import TravelStipendFieldset from '../TravelStipendDetails';

const props = {
  values: {
    centers: [{
      location: 'Nairobi, Kenya'},
    {
      location: 'Kigali, Rwanda'
    }],
    stipend: 1234
  },
  modalType: 'create travel stipend',
  getCountryChoices: jest.fn(() =>{}),
};

const setup = (props) => shallow(<TravelStipendFieldset {...props} />);

describe('<TravelStipendFieldset />', () => {
  it('should render properly', () => {
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });

  it('should match snapshot', () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const newProps = {
      ...props,
      isValidAmount: false,
      isEmpty: false,
    };
    const wrapper = setup(newProps);
    expect(wrapper.find('span.show-error').text())
      .toBe('Amount should be a positive integer and not more than 1000');
  });

});
