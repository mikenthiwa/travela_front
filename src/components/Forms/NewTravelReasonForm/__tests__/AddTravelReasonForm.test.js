import React from 'react';
import toast from 'toastr';
import moxios from 'moxios';
import AddTravelReason from '../index';


const props = {
  errors: {},
  createNewTravelReason: jest.fn(),
  closeModal: jest.fn(),
  travelReason: {},
  isLoading: false
};

toast.error = jest.fn();
const event = {
  preventDefault: jest.fn(),
};

describe('<AddTravelReason />', () => {
  const wrapper = mount(<AddTravelReason {...props} />);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    toast.error.mockReset();
  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles submit', () => {
    wrapper.find('.new-request').simulate('submit', event);
    moxios.wait(() => {
      expect(props.createTravelReason).toHaveBeenCalled();
    });
  });

  it('should validate title over 18 characters', () => {
    const wrapped = shallow(<AddTravelReason {...props} />);

    const inputWrapper = wrapped.instance();

    inputWrapper.state = {
      ...inputWrapper.state,
      values: {
        title: '12345663644737382833478'
      }
    };

    inputWrapper.validateLength('title');
    moxios.wait(() => {
      expect(inputWrapper.validateField('title')).toHaveBeenCalled();
    });
  });

  it('should validate title less than 18 characters', () => {
    const wrapped = shallow(<AddTravelReason {...props} />);

    const inputWrapper = wrapped.instance();

    inputWrapper.state = {
      ...inputWrapper.state,
      values: {
        title: '12345678'
      }
    };

    inputWrapper.validateLength('title');
    moxios.wait(() => {
      expect(inputWrapper.validateField('title')).toHaveBeenCalled();
    });
  });

  it('should validate title ==== 0', () => {
    const wrapped = shallow(<AddTravelReason {...props} />);

    const inputWrapper = wrapped.instance();

    inputWrapper.state = {
      ...inputWrapper.state,
      values: {
        title: ''
      }
    };

    inputWrapper.validateLength('title');
    moxios.wait(() => {
      expect(inputWrapper.validateField('title')).toHaveBeenCalled();
    });
  });

  it('should validate description', () => {
    const wrapped = shallow(<AddTravelReason {...props} />);

    const inputWrapper = wrapped.instance();

    inputWrapper.state = {
      ...inputWrapper.state,
      values: {
        description: '1hjkhdfs;iugfiufgdsfigfjgsigfiujfmghfiugugfijdsgfiesgf7wg7e234567890poiuyttrrewqasddffghjkkl09987642135890lopikjgfd12456789876543213456789087654321234567'
      }
    };

    inputWrapper.validateLength('description');
    moxios.wait(() => {
      expect(inputWrapper.validateField('description')).toHaveBeenCalled();
    });
  });

  it('should validate description when over 140 characters', () => {
    const wrapped = shallow(<AddTravelReason {...props} />);

    const inputWrapper = wrapped.instance();

    inputWrapper.validateLength('description');
    moxios.wait(() => {
      expect(inputWrapper.validateField('description')).toHaveBeenCalled();
    });
  });

  it('should handle default validation case', () => {
    const wrapped = shallow(<AddTravelReason {...props} />);

    const inputWrapper = wrapped.instance();

    inputWrapper.validateLength('');
    moxios.wait(() => {
      expect(inputWrapper.validateField('')).toHaveBeenCalled();
    });
  });

  it('closes modal on cancel', () => {
    expect(wrapper.find('#cancel').length).toEqual(1);
    wrapper.find('#cancel').simulate('click', event);
    expect(props.closeModal).toHaveBeenCalled();
  });

});
