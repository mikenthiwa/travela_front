import React from 'react';
import { mount } from 'enzyme';
import TemplatesPagination from '../TemplatesPagination';

describe('<TemplatesPagination />', () => {
  const props = {
    currentPage: 2,
    pageCount: 6,
    onPageChange: jest.fn()
  };
  const wrapper = mount(<TemplatesPagination {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('toggles to the next page', () => {
    const nextButton = wrapper.find('#next-button');
    expect(nextButton.length).toEqual(1);
    nextButton.simulate('click');
    expect(props.onPageChange).toHaveBeenCalledWith('next');
  });

  it('toggles to previous page', () => {
    const previousButton = wrapper.find('#previous-button');
    expect(previousButton.length).toEqual(1);
    previousButton.simulate('click');
    expect(props.onPageChange).toHaveBeenCalledWith('previous');
  });
});
