import React from 'react';
import HotelEstimateFieldset from '../HotelEstimateDetails';

const props = {
  values: {
    country: 'Rwanda',
    estimate: 1234
  },
  regionfield: ['country', 'filter-dropdown-select'],
  modalType: 'create hotel estimate',
  getCountryChoices: jest.fn(() => {})
};

const setup = props => shallow(<HotelEstimateFieldset {...props} />);

describe('<HotelEstimateFieldset />', () => {
  it('should render properly', () => {
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });

  it('should match snapshot', () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render error if input is invalid', () => {
    const newProps = {
      ...props,
      isValidAmount: false,
      isEmpty: false
    };
    const wrapper = setup(newProps);
    expect(wrapper.find('span.show-error').text()).toBe(
      'Amount should be a positive integer and not more than 1000'
    );
  });
});
