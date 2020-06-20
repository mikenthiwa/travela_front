import React from 'react';
import { shallow } from 'enzyme';
import SkipToAnotherQuestion from '../SkipToAnotherQuestion';


const props = {
  handleSkipToQuestion: jest.fn(),
  behaviour: {
    type: 'SKIP_QUESTION',
    payload: 1
  }
};

describe('<SkipToAnotherQuestion />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SkipToAnotherQuestion {...props} />);
    expect(wrapper.find('.skipQuestion'));
  });


  it('should call handleSkipToQuestion', () => {
    const wrapper = shallow(<SkipToAnotherQuestion {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.handleSkipToQuestion).toHaveBeenCalledWith(1);
  });
});
