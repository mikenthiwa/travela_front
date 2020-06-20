import React from 'react';
import AddCountryForm from '../AddCountriesForm';
import AddCountryFields from '../FormFieldSets/CountriesDetails';

describe('< AddCountryForm/>', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  const props = {
    regionId: '1001',
    handleAddCountries: jest.fn(() => {}),
    isLoading: false,
    addingCountries: false,
    countries: [],
    errors: '',
    meta: { pageCount: 1, currentPage: 1 },
    addItem: jest.fn(() => {}),
    removeItem: jest.fn(() => {}),
    fetchCountries: jest.fn(() => {}),
    values: {
      countries: [],
      item: ''
    },
    closeModal: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(<AddCountryForm {...props} />);
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a fieldset', () => {
    const fieldsets = wrapper.find('fieldset');
    expect(fieldsets).toHaveLength(2);
  });

  it('renders the country details fieldset', () => {
    const countryDetails = wrapper.find('fieldset.personal-details');
    expect(countryDetails).toHaveLength(1);
  });

  it('should clear the form when the component unmounts', () => {
    const componentWillUnmount = jest.spyOn(
      wrapper.instance(),
      'componentWillUnmount'
    );
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  it('should add countries to region', () => {
    const wrapper = mount(<AddCountryForm {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'Nigeria' } });
    wrapper.find('.add_button').simulate('click');
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(props.handleAddCountries).toHaveBeenCalledTimes(1);
    expect(props.handleAddCountries).toHaveBeenCalledWith(
      '1001',
      {'countries': ['Nigeria']}
    );
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('should  call addItem function', () => {
    const wrapper = mount(<AddCountryForm {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'addItem');
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'Nigeria' } });
    wrapper.find('.add_button').simulate('click');
    expect(spy).toHaveBeenCalled();
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('should  call removeItem function', () => {
    const wrapper = mount(<AddCountryForm {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'removeItem');
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'Nigeria' } });
    wrapper.find('.add_button').simulate('click');
    wrapper.find('#remove').simulate('click');
    expect(spy).toHaveBeenCalled();
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('should  call handleCancel function', () => {
    const wrapper = mount(<AddCountryForm {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleCancel');
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'Nigeria' } });
    wrapper.find('.add_button').simulate('click');
    wrapper.find('#cancel').simulate('click');
    expect(spy).toHaveBeenCalled();
    jest.resetAllMocks();
    wrapper.unmount();
  });

  describe('<AddCountryFields />', () => {
    const props = {
      values: {
        item: '',
        countries: []
      },
      addItem: jest.fn(),
      removeItem: jest.fn(),
      allCountries: [
        'Kenya',
        'Uganda',
        'Tanzania',
        'Nigeria',
        'Rwanda',
        'Congo'
      ]
    };

    beforeEach(() => {
      wrapper = shallow(<AddCountryFields {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
