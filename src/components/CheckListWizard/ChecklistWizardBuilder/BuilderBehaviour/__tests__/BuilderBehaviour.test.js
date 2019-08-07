import React from 'react';
import { shallow, mount } from 'enzyme';
import BuilderBehaviour from '../index';
import * as actions from '../behaviourActions';
import getBehaviours from '../BehaviourPool';

const props = {
  behaviour: {},
  updateBehaviour: jest.fn(),
};

describe('<BuilderBehaviour />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BuilderBehaviour {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle behaviour change: skip to another question', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange(actions.SKIP_QUESTION);
    expect(wrapper.props.updateBehaviour).toBeCalled;
    
    wrapper.setProps({...props, behaviour: { type: actions.SKIP_QUESTION, payload: '' } });
    const mockEvents2 = { target: { value: 2} };
    const input = wrapper.find('#numberToSkipTo');
    input.simulate('change', mockEvents2);
    expect(wrapper.props.updateBehaviour).toBeCalled;
  });

  it('should handle behaviour change: upload a document', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange(actions.UPLOAD_DOCUMENT);
    expect(wrapper.onBehaviourChange).toBeCalled;

    wrapper.setProps({...props, behaviour: { type: actions.UPLOAD_DOCUMENT } });
    expect(wrapper.find('input')).toHaveLength(0);

  });

  it('should handle behaviour change: notify an email address', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange(actions.NOTIFY_EMAIL);
    expect(wrapper.props.updateBehaviour).toBeCalled;

    wrapper.setProps({...props, behaviour: { type: actions.NOTIFY_EMAIL, payload: '' } });
    const mockEvents2 = { target: { value: 'example@andela.com'} };
    const input = wrapper.find('#emailToSend');
    input.simulate('change', mockEvents2);
    wrapper.setProps({...props, behaviour: { type: actions.SKIP_QUESTION, payload: '' } });
    expect(wrapper.props.updateBehaviour).toBeCalled;
  });
  
  it('should handle behaviour change errors: email', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange(actions.NOTIFY_EMAIL);
    expect(wrapper.props.updateBehaviour).toBeCalled;

    wrapper.setProps({...props, behaviour: { type: actions.NOTIFY_EMAIL, payload: '' } });
    const mockEvents2 = { target: { value: ''} };
    const input = wrapper.find('#emailToSend');
    input.simulate('change', mockEvents2);
    expect(wrapper.props.updateBehaviour).toBeCalled;
  });

  it('should return an empty object for an invalid behaviour type', () => {
    const behaviour = getBehaviours('invalid', 'payload');
    expect(behaviour).toEqual({});
  });

  it('should handle behaviour change: preview document', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange(actions.PREVIEW_DOCUMENT);
    wrapper.setProps({...props, behaviour: { type: actions.PREVIEW_DOCUMENT } });
    expect(wrapper.onBehaviourChange).toBeCalled;
    expect(wrapper.updateBehaviour).toBeCalled;
  });
});
