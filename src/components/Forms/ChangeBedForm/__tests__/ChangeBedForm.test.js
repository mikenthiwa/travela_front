import React from 'react';
import ChangeBedForm from '../index';

describe('<ChangeBedForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  const props = {
    loadingBeds: false,
    loading: false,
    requesterName: '',
    bedChoices: [],
    handleRoomSubmit: jest.fn(),
    toggleChangeRoomModal: jest.fn(),
  };

  const setup = (passedProps) => {
    const componentProps = passedProps || props;
    return shallow(<ChangeBedForm {...componentProps} />);
  };
  
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly and display loader', () => {
    const newProps = { ...props };
    newProps.loading = true;
    const wrapper = setup(newProps);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the state when handleChangeReason is called', () => {
    const wrapper = setup();
    const event = {
      target: {
        value: 'reason',
        name: 'changeReason'
      }
    };
    wrapper.instance().handleChangeReason(event);
    expect(wrapper.state().values.changeReason).toBe(event.target.value);
  });

  it('should call handleRoomSubmit when button is clicked', () => {
    const wrapper = setup();
    const btn = wrapper.find('button').at(1);
    btn.simulate('click');
    expect(props.handleRoomSubmit).toHaveBeenCalled();
  });
});
