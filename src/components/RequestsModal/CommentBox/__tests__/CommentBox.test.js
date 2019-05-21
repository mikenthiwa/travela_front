import React from 'react';
import { shallow } from 'enzyme';
import toast from 'toastr';
import { CommentBox } from '../CommentBox';

describe('Render CommentBox component', () => {
  const props = {
    createComment: jest.fn(),
    handleEditComment: jest.fn(),
    editComment: jest.fn(),
    handleNoEdit: jest.fn(),
    handleSubmit: () => {},
    event: {
      preventDefault: jest.fn().mockImplementation()
    }
  };
  const handleComment = jest.fn();
  const event = {
    target: {
      editorContainer: {
        style: {
          border: ''
        }
      }
    }
  };
  toast.success = jest.fn();
  const wrapper = shallow(<CommentBox {...props} />);
  const wrapperInstance = wrapper.instance();

  const handles = handle => {
    const spy = jest.spyOn(wrapper.instance(), handle);
    expect(spy).toHaveBeenCalledTimes(0);
    return spy;
  };

  const exepectCall = (spy, border) => {
    expect(event.target.editorContainer.style.border).toBe(border);
    expect(spy).toHaveBeenCalledTimes(1);
  };

  // make our assertions and what we expect to happen

  it('should match snapshot', () => {
    const wrapper = shallow(<CommentBox {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the CommentBox as expected', () => {
    const wrapper = shallow(<CommentBox {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('it should return comment box content as expected', () => {
    const event = {
      target: {
        innerText: 'We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along',
        innerHTML: 'We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along'
      }
    };
    const wrapper = shallow(<CommentBox {...props} />);
    let { text } = wrapper.instance().state;
    expect(text).toEqual('');
    wrapper.instance().handleKeyUp(event);

    text = wrapper.instance().state.text;
    expect(text).toEqual('We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along');

    wrapper.instance().handleKeyUp(event);
    text = wrapper.instance().state.text;
    expect(text).toEqual('We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along');
  });

  it('it should handle onfocus as expected', () => {
    const spy = handles('handleFocus');
    wrapperInstance.handleFocus(event);
    exepectCall(spy, '1px solid blue');
  });

  it('it should handle onblur as expected', () => {
    const spy = handles('handleBlur');
    wrapperInstance.handleBlur(event);
    exepectCall(spy, '1px solid #E4E4E4');
  });

  it('should not submit if state is empty', () => {
    const event = { preventDefault: jest.fn(), value: 'VALUE' };
    const wrapper = shallow(<CommentBox {...props} />);
    const button = wrapper.find('#post-submit').at(0);
    button.simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should submit comment', () => {

    const event = { preventDefault: jest.fn(), value: 'VALUE' };

    const wrapper = shallow(<CommentBox {...props} />);
    wrapper.state().text = 'We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along';
    const button = wrapper.find('#post-submit').at(0);
    button.simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should submit comment on a new request', () => {
    const event = { preventDefault: jest.fn(), value: 'VALUE' };
    const wrapper = shallow(<CommentBox {...props} handleComment={handleComment} />);
    wrapper.state().text = 'We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along';
    wrapper.state().newRequest = true;
    const button = wrapper.find('#post-submit').at(0);
    button.simulate('click', event);
    expect(handleComment).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
    expect(wrapper.state().text).toEqual('');
    toast.success.mockReset();
  });

  it('should handle handleChange', () => {
    const spy = handles('handleChange');
    wrapperInstance.handleChange('We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should submit edited comment', () => {
    const event = { preventDefault: jest.fn(), value: 'VALUE' };
    const wrapper = shallow(<CommentBox {...props} />);
    wrapper.setProps({
      comment: 'We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along'
    });
    wrapper.setState({ submitReady: true });
    const button = wrapper.find('.edit-buttons');
    button.simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should handle submit when comment has not been edited', () => {
    localStorage.setItem('comment', 'We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along');
    const event = { preventDefault: jest.fn(), value: 'VALUE' };
    const wrapper = shallow(<CommentBox {...props} />);
    wrapper.setProps({
      comment: 'We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along'
    });
    wrapper.setState({ submitReady: true, text: 'We are travelling to google office california google.com @oluebube.egbuna@andela.com is tagging along' });
    const button = wrapper.find('.edit-buttons');
    button.simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalled();
    localStorage.removeItem('comment');
  });

  it('should display a loader while saving a comment', () => {
    const event = { preventDefault: jest.fn(), value: 'VALUE' };
    const wrapper = shallow(<CommentBox
      {...props} createComment={() => {
        wrapper.setProps({creatingComment: true});
      }} />);
    wrapper.setState({ submitReady: true, text: 'Can you clarify why' });
    const button = wrapper.find('#post-submit');
    button.simulate('click', event);

    expect(wrapper.find('ButtonLoadingIcon[buttonText="Post"]').props().isLoading).toBeTruthy();
  });
});
