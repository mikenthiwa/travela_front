import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import CentreCard from '../CentreCard';

const props = {
  cardImage: 'https:someimage.png',
  imageAlt: 'an image',
  countryFlagImage: 'https://countryimage.png',
  guestHouseName: 'Guest House',
  guestHouseLocation: 'Kigali, Rwanda',
  beds: 5,
  bathrooms: 4,
  handleOnRestore: jest.fn(),
  guesthouseId: 'guest-house-1',
  disabledGuestHouse: {
    id: 'guest-house-1',
  },
  guestHouse: {
    genderPolicy: 'male'
  }
};

describe('<CentreCard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CentreCard {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('displays the correct data', () => {
    expect(wrapper.find('.centre__name').text()).toEqual('Guest House');
    expect(wrapper.find('.centre__location').text()).toEqual('Kigali, Rwanda');
    expect(wrapper.find('.centre__name').text()).toEqual('Guest House');
    expect(wrapper.find('.centre__icon-container').at(0).text()).toEqual('5Beds');
    expect(wrapper.find('.centre__icon-container').at(1).text()).toEqual('4Bathrooms');
  });

  it('renders the correct image', () => {
    expect(wrapper.find('.centre__image').prop('src')).toEqual('https:someimage.png');
    expect(wrapper.find('.centre__flag').prop('style')).toEqual({
      backgroundImage: 'url(https://countryimage.png)'
    });
    expect(wrapper.find('.centre__flag').prop('alt')).toEqual('Kigali, Rwanda flag');
  });

  it('should call preventDefault when the button is clicked', () => {
    const newProps = {
      ...props,
      disabledGuestHouse: {}
    };

    const mockedEvent = { preventDefault: jest.fn() };
    wrapper = shallow(<CentreCard {...newProps} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleClick');

    const link = wrapper.find('#thisGuesthouseLink');
    link.simulate('click', mockedEvent);
    expect(instance.handleClick).toBeCalled;
  });

  it('should call handleOnRestore when the button is clicked', () => {
    wrapper = mount(
      <Router>
        <CentreCard {...props} />
      </Router>
    );
    const { handleOnRestore } = props;
    const button = wrapper.find('.restore-acc-btn');
    button.simulate('click');
    expect(handleOnRestore).toBeCalled;
  });
});
