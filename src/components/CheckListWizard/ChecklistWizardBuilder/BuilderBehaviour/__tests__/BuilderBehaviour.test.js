import React from 'react';
import { shallow, mount } from 'enzyme';
import BuilderBehaviour from '../index';
import * as actions from '../behaviourActions';
import getBehaviours from '../BehaviourPool';
import DocumentUpload from '../DocumentUpload';
import NotifyEmailBehaviour from '../NotifyEmailBehaviour';

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
    const wrapper = shallow(<BuilderBehaviour {...props} documentTypes={[{ id: 'id', name: 'type'}]} />);
    wrapper.instance().handleBehaviourDropdownChange(actions.UPLOAD_DOCUMENT);
    expect(wrapper.onBehaviourChange).toBeCalled;

    wrapper.setProps({...props, behaviour: { type: actions.UPLOAD_DOCUMENT } });
    expect(wrapper.find(DocumentUpload)).toHaveLength(1);

  });

  it('should handle behaviour change: notify an email address', () => {
    const wrapper = shallow(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange(actions.NOTIFY_EMAIL);
    expect(wrapper.onBehaviourChange).toBeCalled;
    wrapper.setProps({...props, behaviour: { type: actions.NOTIFY_EMAIL, } });
    expect(wrapper.find(NotifyEmailBehaviour)).toHaveLength(1);
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
