import React from 'react';
import { shallow } from 'enzyme';
import SkipToAnotherQuestion from '../SkipToAnotherQuestion';


const props = {
  handleSkipToQuestion: jest.fn(),
  payload: '1'
};


describe('<SkipToAnotherQuestion />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SkipToAnotherQuestion {...props} />);
    expect(wrapper.find('div'));
  });


  it('should call handleSkipToQuestion - no question is passed', () => {
    const wrapper = shallow(<SkipToAnotherQuestion {...props} />);
    wrapper.find('button').simulate('click', 1);
    expect(props.handleSkipToQuestion).toHaveBeenCalled();
  });

  it('should call handleSkipToQuestion', () => {
    const wrapper = shallow(<SkipToAnotherQuestion {...props} />);
    wrapper.find('button').simulate('click', 3);
    expect(props.handleSkipToQuestion).toHaveBeenCalled();
  });
});
