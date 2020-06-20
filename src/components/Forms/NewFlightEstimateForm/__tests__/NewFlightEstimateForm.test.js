import React from 'react';
import NewFlightEstimateForm from '../NewFlightEstimateForm';

describe('<NewFlightEstimateForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  const props = {
    loading: false,
    listAllFlightEstimates: {
      selectedEstimate: {
        id: 1,
        amount: 50,
        originRegion: null,
        destinationRegion: null,
        originCountry: 'France',
        destinationCountry: 'Germany'
      },
      isLoading: false,
      flightEstimates: [],
      updatedEstimate: {
        errors: 'error message'
      },
      error: {}
    },
    hasBlankFields: false,
    isValid: true,
    handleCreateFlightEstimate: jest.fn(() => {}),
    updateFlightEstimate: jest.fn(() => {}),
    closeModal: jest.fn(),
    modalType: 'create flight estimate',
    getCountryChoices: jest.fn(),
    travelRegion: [
      {
        region: 'EastAfrica'
      }
    ],
    history: {
      push: jest.fn()
    },
    errors: {
      editing: 'error message'
    }
  };

  beforeEach(() => {
    wrapper = mount(<NewFlightEstimateForm {...props} />);
    wrapper.setState({
      hasBlankFields: true,
      errors: {
        editing: 'error message'
      }
    });
    jest.resetAllMocks();
  });

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render two fieldsets', () => {
    const fieldsets = wrapper.find('fieldset');
    expect(fieldsets).toHaveLength(2);
  });

  it('should render the flight estimate fieldset', () => {
    const flightEstimateDetails = wrapper.find('fieldset .submit-area');
    expect(flightEstimateDetails).toHaveLength(1);
  });

  it('should render two buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(2);
  });

  it('should check that onSubmit is not called when form is empty', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should render the flight estimate amount input without validation error', () => {
    const estimateInput = wrapper.find('input[name="flightEstimate"]');
    const handleOnchange = jest.spyOn(wrapper.instance(), 'handleOnchange');
    wrapper.instance().forceUpdate();
    estimateInput.simulate('change', {
      target: { name: 'flightEstimate', value: '1000' }
    });
    expect(handleOnchange).toHaveBeenCalled();
    expect(wrapper.find('.input-group span.hide-error')).toHaveLength(1);
    expect(wrapper.instance().state.isValidAmount).toBe(true);
  });

  it('should render the flight estimate amount input with validation error', () => {
    const estimateInput = wrapper.find('input[name="flightEstimate"]');
    const handleOnchange = jest.spyOn(wrapper.instance(), 'handleOnchange');
    const handleShowEventError = jest.spyOn(
      wrapper.instance(),
      'handleShowEventError'
    );
    wrapper.instance().forceUpdate();
    estimateInput.simulate('change', {
      target: { name: 'flightEstimate', value: '-1000' }
    });
    expect(handleOnchange).toHaveBeenCalled();
    estimateInput.simulate('invalid', {
      target: { name: 'flightEstimate', value: '-1000' }
    });
    expect(handleShowEventError).toHaveBeenCalled();
    expect(wrapper.find('.input-group span.show-error')).toHaveLength(1);
    expect(wrapper.instance().state.isValidAmount).toBe(false);
  });

  it('should render the flight estimate amount input with validation error on `blur`', () => {
    const estimateInput = wrapper.find('input[name="flightEstimate"]');
    wrapper.instance().forceUpdate();
    estimateInput.simulate('blur', { target: { name: 'flightEstimate', value: '' } });
    expect(wrapper.find('.estimate-amount span.error').text()).toBe(
      'This field is required'
    );
  });

  it('should handle editing of a flight estimate', () => {
    const newProps = {
        ...props,
        editing: true,
        selectedEstimate: {
          id: 1,
          amount: 100,
          originRegion: null,
          destinationRegion: null,
          originCountry: "France",
          destinationCountry: "Germany"
        }
    };
    const wrapper = mount(<NewFlightEstimateForm {...newProps} />);
    const estimate = wrapper.find('input[name="flightEstimate"]');
    const changeValue = { target: { name: 'flightEstimate', value: '100' } };
    estimate.simulate('change', changeValue);
    const { flightEstimate: estimateValue } = wrapper.state('values');
    expect(estimateValue).toEqual('100');
  });

  it('should call component will receive props', () => {
    const wrapper = shallow(<NewFlightEstimateForm {...props} />);
    wrapper.setProps({ errors: { editing: "error message" } });
    expect(props.listAllFlightEstimates.updatedEstimate.errors).toBe("error message");
  });

  it('should have update flight estimate default props', () => {
    const result = NewFlightEstimateForm.defaultProps.updateFlightEstimate();
    expect(result).toBe(undefined);
  });

  it('should have history.push default props', () => {
    const result = NewFlightEstimateForm.defaultProps.history.push();
    expect(result).toBe(undefined);
  });

  it('should update values when origin options === Countries ', () => {
    const prop = {
      loading: false,
      listAllFlightEstimates: {
        selectedEstimate: {
            id: 1,
            amount: 50,
            originRegion: "East Africa",
            destinationRegion: "West Africa"
          },
      },
      handleCreateFlightEstimate: jest.fn(() => {}),
      travelRegion: [],
      closeModal: jest.fn(),
      updateFlightEstimate: jest.fn(),

    };
    const newProps = {
        ...prop,
        editing: true,
        selectedEstimate: {
          id: 1,
          amount: 100,
          originRegion: "East Africa",
          destinationRegion: "West Africa"
        }
    };
    const wrapper = mount(<NewFlightEstimateForm {...newProps} />);
    wrapper.setState({
      values: {
        flightEstimate: 300,
        origin:{option:'Countries', value:'France'},
        destination:{option:'Countries', value:'Germany'}
      }
    })
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.state('values').origin.option).toBe('Countries')
  });

  it('should set hasBlankFields to true', () => {
    const prop = {
      loading: false,
      listAllFlightEstimates: {
        selectedEstimate: {
          id: 1,
          amount: 50,
          originRegion: 'East Africa',
          destinationRegion: 'West Africa'
        },
        flightEstimates: [
          {
            id: 4,
            originRegion: null,
            destinationRegion: 'West Africa',
            originCountry: 'Anguilla',
            destinationCountry: null,
            createdBy: '2190',
            amount: 240,
            deletedAt: null,
            createdAt: '2019-07-11T06:37:31.183Z',
            updatedAt: '2019-07-11T06:37:31.183Z',
            creator: {
              fullName: 'Peace Acio',
              id: 42
            }
          },
          {
            id: 5,
            originRegion: null,
            destinationRegion: null,
            originCountry: 'Uganda',
            destinationCountry: 'Kenya',
            createdBy: '2190',
            amount: 400,
            deletedAt: null,
            createdAt: '2019-07-11T06:54:44.716Z',
            updatedAt: '2019-07-11T06:54:44.716Z',
            creator: {
              fullName: 'Peace Acio',
              id: 42
            }
          }
        ]
      },
      handleCreateFlightEstimate: jest.fn(() => {}),
      travelRegion: [],
      closeModal: jest.fn(),
      hasBlankFields: false
    };
    const newProps = {
      ...prop,
      editing: false,
      selectedEstimate: {
        id: 1,
        amount: 100,
        originRegion: 'East Africa',
        destinationRegion: 'West Africa'
      },
      hasBlankFields: true
    };
    const wrapper = mount(<NewFlightEstimateForm {...newProps} />);
    wrapper.setState({
      values: {
        flightEstimate: 300,
        origin: { value: 'East Africa' },
        destination: { value: 'East Africa' }
      },
      hasBlankFields: true
    });
    const estimate = wrapper.find('input[name="flightEstimate"]');
    const changeValue = { target: { name: 'flightEstimate', value: '100' } };
    estimate.simulate('change', changeValue);
    const { flightEstimate: estimateValue } = wrapper.state('values');
    expect(estimateValue).toEqual('100');
  });
});
