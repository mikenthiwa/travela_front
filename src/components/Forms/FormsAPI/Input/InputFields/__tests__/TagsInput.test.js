import React from 'react';
import { shallow, mount } from 'enzyme';
import TagsInput, {KeyCodes as Keys} from '../TagsInput';

describe('<TagsInput> input field', () => {
  let wrapper;
  const props = {
    handleDelete: jest.fn(),
    handleAddition: jest.fn(),
    handleInputBlur: jest.fn(),
  };

  const KeyCodes = {
    BACKSPACE: 8,
    ...Keys
  };

  const tag = { id: 'Some value', text: 'Some value'};

  beforeEach(() => {
    wrapper = mount(<TagsInput {...props} />);
    jest.resetAllMocks();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<TagsInput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should add a tag to the tag list',  () =>{
    wrapper.find('input').simulate('change', { target: { value: tag.text}});
    wrapper.find('input').simulate('keydown', { keyCode: 13});

    expect(wrapper.state('tags')).toEqual([tag]);
    expect(props.handleAddition).toHaveBeenCalledWith([tag.text]);
    expect(props.handleInputBlur).toHaveBeenCalledTimes(0);
  });

  it('should delete a tag from the tag list', () => {
    const values = ['gitaumoses4@gmail.com', 'moses.gitau@andela.com'];
    values.forEach(value => {
      wrapper.find('input').simulate('change', { target: { value }});
      wrapper.find('input').simulate('keydown', { keyCode: KeyCodes.ENTER});
    });

    wrapper.find('input').simulate('keydown', { keyCode: KeyCodes.BACKSPACE});
    wrapper.find('input').simulate('keyup', { keyCode: KeyCodes.BACKSPACE});
    expect(props.handleDelete).toHaveBeenCalledWith(['gitaumoses4@gmail.com']);
  });

  it('should add a tag to the tag list on blur', () => {
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('change', { target: { value: tag.text}});
    wrapper.find('input').simulate('blur', { target: { value: tag.text}});

    expect(wrapper.state('tags')).toEqual([tag]);
    expect(props.handleInputBlur).toHaveBeenCalledTimes(1);
  });

  it('should not add a tag on blur if the input is empty', () => {
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('change', { target: { value: tag.text}});
    wrapper.find('input').simulate('blur', { target: { value: ''}});

    expect(wrapper.state('tags')).toEqual([]);
    expect(props.handleInputBlur).toHaveBeenCalledTimes(1);
  });

  it('should not add more tags if max is reached', () => {
    wrapper.setProps({max: 5});

    const values = ['moses','moffat','victor','david','samuel','amara','chisom'];
    values.forEach(value => {
      wrapper.find('input').simulate('change', { target: { value }});
      wrapper.find('input').simulate('keydown', { keyCode: KeyCodes.ENTER});
    });

    expect(wrapper.state('tags')).toHaveLength(5);
  });
});
