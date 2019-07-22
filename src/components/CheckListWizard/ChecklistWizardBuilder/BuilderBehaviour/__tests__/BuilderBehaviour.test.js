import React from 'react';
import { shallow } from 'enzyme';
import BuilderBehaviour from '../index';

const props = {
  order: 1,
  optionId: 1,
  updateBehaviour: jest.fn(),
};

describe('<BuilderBehaviour />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BuilderBehaviour {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle behaviour change: skip to another question', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange('skip to another question');
    wrapper.setState({noAction: true});
    expect(wrapper.onBehaviourChange).toBeCalled;

    const mockEvents2 = { target: { value: 2} };
    const input = wrapper.find('#numberToSkipTo');
    input.simulate('keyUp', mockEvents2);
    input.simulate('change', mockEvents2);
    expect(wrapper.handleInputBehaviour).toBeCalled;
    expect(wrapper.updateBehaviour).toBeCalled;
  });

  it('should handle behaviour change: upload a document', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange('upload a document');
    expect(wrapper.onBehaviourChange).toBeCalled;
  });

  it('should handle behaviour change: preview document', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange('preview document');
    wrapper.setState({noAction: true});
    expect(wrapper.onBehaviourChange).toBeCalled;

    const mockEvents2 = { target: { value: 'https://link.com'} };
    const input = wrapper.find('#documentToPreview');
    input.simulate('keyUp', mockEvents2);
    input.simulate('change', mockEvents2);
    expect(wrapper.handleInputBehaviour).toBeCalled;
    expect(wrapper.updateBehaviour).toBeCalled;
  });

  it('should handle behaviour change: notify an email address', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange('notify an email address');
    wrapper.setState({noAction: true});
    expect(wrapper.onBehaviourChange).toBeCalled;

    const mockEvents2 = { target: { value: 'ex. example@andela.com'} };
    const input = wrapper.find('#emailToSend');
    input.simulate('keyUp', mockEvents2);
    input.simulate('change', mockEvents2);
    expect(wrapper.handleInputBehaviour).toBeCalled;
    expect(wrapper.updateBehaviour).toBeCalled;
  });

  it('should handle behaviour change error: preview document', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange('preview document');
    wrapper.setState({noAction: true});
    expect(wrapper.onBehaviourChange).toBeCalled;

    const mockEvents2 = { target: { value: ''} };
    const input = wrapper.find('#documentToPreview');
    input.simulate('keyUp', mockEvents2);
    input.simulate('change', mockEvents2);
    expect(wrapper.handleInputBehaviour).toBeCalled;
    expect(wrapper.updateBehaviour).toBeCalled;
    
  });
  
  it('should handle behaviour change errors: email', () => {
    const wrapper = mount(<BuilderBehaviour {...props} />);
    wrapper.instance().handleBehaviourDropdownChange('notify an email address');
    wrapper.setState({noAction: true});
    expect(wrapper.onBehaviourChange).toBeCalled;

    const mockEvents2 = { target: { value: ''} };
    const input = wrapper.find('#emailToSend');
    input.simulate('keyUp', mockEvents2);
    input.simulate('change', mockEvents2);
    expect(wrapper.handleInputBehaviour).toBeCalled;
    expect(wrapper.updateBehaviour).toBeCalled;
  });
});
