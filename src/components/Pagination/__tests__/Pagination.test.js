import React from 'react';
import sinon from 'sinon';
import Pagination from '../Pagination';

const props = {
  currentPage: 2,
  pageCount: 4,
  onPageChange: sinon.spy(),
};

const wrapper = mount(<Pagination {...props} />);
const { onPageChange } = props;

describe('<Pagination />', () => {
  afterEach(() => {
    onPageChange.resetHistory();
  });

  it('should render the Pagination component successfully', () => {
    expect(wrapper.find('.pagination').length).toBe(1);
    expect(wrapper.find('.pagination__button').length).toBe(2);
    expect(wrapper.find('#current-page').text()).toEqual('2');
    expect(wrapper.find('#page-count').text()).toEqual('4');
  });

  it('should disable the previous button when current page is 1', () => {
    wrapper.setProps({currentPage: 1});
    const previousButton = wrapper.find('#previous-button');
    const nextButton = wrapper.find('#next-button');
    expect(previousButton.props().disabled).toEqual(true);
    expect(nextButton.props().disabled).toEqual(false);
  });

  it('should disable the next button when current page is equal to the page count', () => {
    wrapper.setProps({currentPage: 4});
    const previousButton = wrapper.find('#previous-button');
    const nextButton = wrapper.find('#next-button');
    expect(nextButton.props().disabled).toEqual(true);
    expect(previousButton.props().disabled).toEqual(false);
  });

  it('should call the onPageChange method when the previous button is clicked', () => {
    wrapper.setProps({currentPage: 3});
    const previousButton = wrapper.find('#previous-button');
    previousButton.simulate('click');
    expect(onPageChange.calledOnce).toEqual(true);
    expect(onPageChange.calledWith(2)).toEqual(true);
  });

  it('should call the onPageChange method when the next button is clicked', () => {
    const nextButton = wrapper.find('#next-button');
    nextButton.simulate('click');
    expect(onPageChange.calledOnce).toEqual(true);
    expect(onPageChange.calledWith(4)).toEqual(true);
  });
});
