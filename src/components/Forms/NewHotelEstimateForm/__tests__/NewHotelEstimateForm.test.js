import React from 'react';
import NewHotelEstimateForm from '../NewHotelEstimateForm';

describe('<NewHotelEstimateForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  const props = {
    loading: false,
    hotelEstimates: {
      isLoading: false,
      estimates: [
        {
          amount: 100,
          country: 'United Kingdom'
        }
      ]
    },
    hasBlankFields: false,
    user: {
      UserInfo: {
        id: '-LJNw1BsT0LP_E4l2peP',
        name: 'Andrew'
      }
    },
    userData: {
      id: '2',
      fullName: 'Andrew Hinga',
      name: 'Andrew Hinga',
      email: 'andrew.hinga@andela.com',
      userId: '-LJNw1BsT0LP_E4l2peP',
      passportName: 'Andrew Hinga',
      department: 'Fellows',
      occupation: 'Software Developer',
      manager: 'Andrew',
      gender: 'Male',
      createdAt: '2018-09-14T12:48:11.266Z',
      updatedAt: '2018-09-16T07:53:48.835Z',
      roleId: 401938
    },
    userDataUpdate: [],
    handleCreateHotelEstimate: jest.fn(() => {}),
    closeModal: jest.fn(),
    choices: ['Uganda', 'Kenya'],
    modalType: 'create hotel estimate',
    getCountryChoices: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(<NewHotelEstimateForm {...props} />);
    wrapper.setState({
      hasBlankFields: true,
      errors: { country: '' }
    });
    jest.resetAllMocks();
  });

  it('should call function hasBlankFields', () => {
    const inputField = wrapper.find('.estimate-location').at(0);
    inputField.simulate('change', {
      target: { name: 'country', value: 'ken' }
    });
    expect(wrapper.instance().getCountryChoices());
    const { country: countrErrors } = wrapper.state('errors');
    expect(countrErrors).toEqual('');
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders two fieldsets', () => {
    const fieldsets = wrapper.find('fieldset');
    expect(fieldsets).toHaveLength(2);
  });

  it('renders the hotel estimate fieldset', () => {
    const hotelEstimateDetails = wrapper.find('fieldset .submit-area');
    expect(hotelEstimateDetails).toHaveLength(1);
  });

  it('renders two buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(2);
  });

  it('checks that onSubmit is not called when form is empty', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('renders the hotel estimate amount input without validation error', () => {
    const estimateInput = wrapper.find('input[name="estimate"]');
    const handleOnchange = jest.spyOn(wrapper.instance(), 'handleOnchange');

    wrapper.instance().forceUpdate();

    estimateInput.simulate('change', {
      target: { name: 'estimate', value: '1000' }
    });
    expect(handleOnchange).toHaveBeenCalled();
    expect(wrapper.find('.input-group span.hide-error')).toHaveLength(1);
    expect(wrapper.instance().state.isValidAmount).toBe(true);
  });

  it('renders the hotel estimate amount input with validation error', () => {
    const estimateInput = wrapper.find('input[name="estimate"]');
    const handleOnchange = jest.spyOn(wrapper.instance(), 'handleOnchange');
    const handleShowEventError = jest.spyOn(
      wrapper.instance(),
      'handleShowEventError'
    );

    wrapper.instance().forceUpdate();

    estimateInput.simulate('change', {
      target: { name: 'estimate', value: '-1000' }
    });
    expect(handleOnchange).toHaveBeenCalled();
    estimateInput.simulate('invalid', {
      target: { name: 'estimate', value: '-1000' }
    });
    expect(handleShowEventError).toHaveBeenCalled();
    expect(wrapper.find('.input-group span.show-error')).toHaveLength(1);
    expect(wrapper.instance().state.isValidAmount).toBe(false);
  });

  it('renders the hotel estimate amount input with validation error on `blur`', () => {
    const estimateInput = wrapper.find('input[name="estimate"]');

    wrapper.instance().forceUpdate();

    estimateInput.simulate('blur', { target: { name: 'estimate', value: '' } });
    expect(wrapper.find('.estimate-amount span.error').text()).toBe(
      'This field is required'
    );
  });
});
