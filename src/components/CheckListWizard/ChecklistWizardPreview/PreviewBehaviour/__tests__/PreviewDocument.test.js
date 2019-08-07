import React from 'react';
import { shallow } from 'enzyme';
import PreviewDocument from '../PreviewDocument'


const props = {
  behaviour: {},
  onDocumentLoadSuccess: jest.fn(),
  numPages: 50,
  pageNumber: 1,
  nextPage: jest.fn(),
  previousPage: jest.fn()
};

describe('<PreviewDocument />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<PreviewDocument {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle on document load success', () => {
    const wrapper = shallow(<PreviewDocument {...props} />);
    const instance = wrapper.instance();
    instance.onDocumentLoadSuccess(props.numPages);
    expect(instance.onDocumentLoadSuccess).toBeCalled;
  });

  it('should handle going to the next page', () => {
    const wrapper = shallow(<PreviewDocument {...props} />);
    const instance = wrapper.instance();
    instance.nextPage();
    expect(instance.nextPage).toBeCalled;
  });

  it('should handle going to the next page: current pages less than total', () => {
    const wrapper = shallow(<PreviewDocument {...props} />);
    wrapper.setState({
      numPages: 5,
      pageNumber: 3
    });
    const instance = wrapper.instance();
    instance.nextPage();
    expect(instance.nextPage).toBeCalled;
  });

  it('should handle going back to the previous page', () => {
    const wrapper = shallow(<PreviewDocument {...props} />);
    const instance = wrapper.instance();
    instance.previousPage();
    expect(instance.previousPage).toBeCalled;
  })

  it('should handle going back to the previous page: previous page less than total', () => {
    const wrapper = shallow(<PreviewDocument {...props} />);
    wrapper.setState({
      numPages: 5,
      pageNumber: 3
    });
    const instance = wrapper.instance();
    instance.previousPage();
    expect(instance.previousPage).toBeCalled;
  })
});
