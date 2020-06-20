import React from 'react';
import { shallow } from 'enzyme';
import withLoading from '../withLoading';
import { Table } from '../../Table/index';
import Preloader from '../../Preloader/Preloader';
import { submissionInfo } from '../../../mockData/checklistSubmissionMockData';

const props = {
  isLoading: true,
  editRequest: jest.fn(),
  deleteRequest: jest.fn(),
  openModal: jest.fn(),
  history: {},
  location: {},
  travelChecklists: {},
  showTravelChecklist: jest.fn(),
  submissionInfo
};

describe('withLoading', () => {
  it('renders Preloader when component is loading', () => {
    const WithLoadingComponent = withLoading(Table);
    const wrapper = shallow(<WithLoadingComponent {...props} />);
    expect(wrapper.find('Preloader').length).toBe(1);
    expect(wrapper.find('Table').length).toBe(0);
  });

  it('does not render Preloader when the component is done loading', () => {
    const WithLoadingComponent = withLoading(Table);
    const wrapper = shallow(<WithLoadingComponent {...{...props, isLoading: false}} />);
    expect(wrapper.find('Preloader').length).toBe(0);
    expect(wrapper.find('Table').length).toBe(1);
  });
});
