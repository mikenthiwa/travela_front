import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsPagination from '../AnalyticsPagination';

const props = {
  pagination: {
    pageCount: 2,
    currentPage: 1,
    dataCount: 5,
    limit: 3,
    nextPage: 2,
    prevPage: 0
  },
  handlePagination: jest.fn()
};
describe('Analytics Pagination', () => {
  const { pagination, handlePagination } = props;
  it('should render travel calendar', () => {
    const wrapper = shallow(<AnalyticsPagination pagination={pagination} handlePagination={handlePagination} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render disabled Previous button when prevPage is 0', () => {
    const { pagination, handlePagination } = props;
    pagination.prevPage = 0;
    const wrapper = shallow(<AnalyticsPagination pagination={pagination} handlePagination={handlePagination} />);
    expect(wrapper.find('#Previous').props()).toHaveProperty('className', 'pg--button button-disabled');
  });
  it('should render disabled Next button when currentPage === pageCount', () => {
    const { pagination, handlePagination } = props;
    pagination.currentPage = 2;
    const wrapper = shallow(<AnalyticsPagination pagination={pagination} handlePagination={handlePagination} />);
    expect(wrapper.find('#Next').props()).toHaveProperty('className', 'pg--button button-disabled');
  });
  it('should render Showing page 1 of 1 page when pageCount is 1', () => {
    pagination.currentPage = 1;
    pagination.pageCount = 1;
    const wrapper = shallow(<AnalyticsPagination pagination={pagination} handlePagination={handlePagination} />);
    expect(wrapper.find('.pg--text').text()).toEqual('Showing page 1 of 1 page');
  });
  describe('When prevPage > 0', () => {
    pagination.prevPage = 1;
    const wrapper = shallow(<AnalyticsPagination pagination={pagination} handlePagination={handlePagination} />);
    it('should render enabled Previous button', () => {
      expect(wrapper.find('#Previous').props()).toHaveProperty('className', 'pg--button false');
    });
    it('should call handlePagination when Previous button is clicked', () => {
      wrapper.find('#Previous').simulate('click', { target: { id: 'Previous' , classList: { contains: jest.fn(() => false )}}});
      expect(handlePagination).toHaveBeenCalledWith('Previous');
    });
  });
  describe('When nextPage < pageCount', () => {
    const wrapper = shallow(<AnalyticsPagination pagination={pagination} handlePagination={handlePagination} />);
    it('should render enabled Next button', () => {
      expect(wrapper.find('#Next').props()).toHaveProperty('className', 'pg--button false');
    });
    it('should call handlePagination when Next button is clicked', () => {
      wrapper.find('#Next').simulate('click', { target: { id: 'Next' , classList: { contains: jest.fn(() => false )}}});
      expect(handlePagination).toHaveBeenCalledWith('Next');
    });
  });
});
