import React from 'react';
import { shallow } from 'enzyme';
import PreviewCheckbox from '..';
import Checkbox from '../Checkbox';
import PreviewRadioConfiguration from '../../PreviewRadio/PreviewRadioConfiguration';

const propsCondition1 = {
  prompt: 'Do you have a visa?',
  configuration: { options: [{ behaviour: { name: 'upload a document', action: { payload: ' '} } }] },
  itemBehaviour: { name: 'upload a document', action: { payload: 2 }},
  handleSkipToQuestion: jest.fn(),
};

const propsCondition2 = {
  prompt: 'Do you have a visa?',
  order: 1,
  configuration: { options: [{ order: 1, behaviour: { name: 'upload a document', action: { payload: ' '} } }] },
  itemBehaviour: { name: 'skip to another question', action: { payload: 2 }},
  handleSkipToQuestion: jest.fn(),
};

const props = {
  order: 1,
  options: { behaviour: 'upload a document' },
  prompt: 'Do you have a passport?',
  handleCheckbox: jest.fn(),
};

const setup = props => {
  return mount(<PreviewCheckbox {...props} />);
};

const setup2 = props => {
  return shallow(
    <Checkbox {...props} />
  );
};

describe('<PreviewCheckbox />', () => {
  let wrapper;
  let wrapper2;
  let condWrapper2;
  beforeEach(() => {
    wrapper = setup(propsCondition2);
    wrapper2 = setup2(props);
  });

  it('renders PreviewCheckbox correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the PreviewCheckbox component properly', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders Checkbox component correctly', () => {
    expect(wrapper2).toMatchSnapshot();
  });

  it('renders Checkbox component properly', () => {
    expect(wrapper2.length).toBe(1);
  });

  it('should call handleCheckbox function when checkbox is checked', () => {
    const event = { preventDefault: jest.fn(), target: { checked: true } };
    jest.spyOn(wrapper.instance(), 'handleCheckbox');
    wrapper.find('input').simulate('change', event);
    expect(event.target.checked).toEqual(true);
    expect(wrapper.state('isChecked')).toEqual(1);
  });

  it('should call handleCheckbox function when checkbox is unchecked', () => {
    const event = { target: { checked: false } };
    jest.spyOn(wrapper.instance(), 'handleCheckbox');
    wrapper.find('input').simulate('change', event);
    expect(event.target.checked).toEqual(false);
  });

  it('should call handleQuestionToSkip', () => {
    const event = { target: { checked: true } };
    jest.spyOn(wrapper.instance(), 'handleCheckbox');
    wrapper.find('input').simulate('change', event);
    wrapper.find('button').simulate('click', 1);
  });


  it('should render upload a document behaviour in PreviewRadioConfiguration', () => {
    const wrapper3 = mount(<PreviewRadioConfiguration behaviourName="upload a document" />);
    expect(wrapper3.find('input').length).toBe(1);
  });

  it('should render preview document behaviour in PreviewRadioConfiguration', () => {
    const wrapper3 = shallow(<PreviewRadioConfiguration behaviourName="preview document" />);
    expect(wrapper3.find('div').length).toBe(1);
  });

  it('should render notify an email address behaviour in PreviewRadioConfiguration', () => {
    const wrapper3 = shallow(<PreviewRadioConfiguration behaviourName="notify an email address" />);
    expect(wrapper3.find('div').length).toBe(1);
  });

  it('should render notify an email address behaviour in PreviewRadioConfiguration', () => {
    const wrapper3 = shallow(<PreviewRadioConfiguration behaviourName="" />);
    expect(wrapper3.find('div').contains('No Behaviour'));
  });

  it('should render PreviewRadioConfiguration', () => {
    const event = { preventDefault: jest.fn(), target: { checked: true } };
    jest.spyOn(wrapper.instance(), 'handleCheckbox');
    condWrapper2 = setup(propsCondition1);
    condWrapper2.find('input').simulate('change', event);
    expect(condWrapper2.find(PreviewRadioConfiguration).length).toEqual(1);
  });
});
