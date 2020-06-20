import React from 'react';
import { mount } from 'enzyme';
import {UserChecklist} from '..';

describe ('UserChecklist Test Suite', () => {
  const props = {
    id: 'jdjjfkfk',
    isLoading: false,
    fullName: 'Jude Afam',
    checklists: [{
      id: 'jjdd',
      config: []
    },{
      id: 'jjjk',
      config: []
    }
    ],
    trips: [],
    isSaving: false,
    closeModal: jest.fn(),
    isSubmitted: false,
    completionCount: 100,
    location: {
      pathname: '/new-requests/4WD6f5YaJ/checklists'
    },
    fetchChecklistSubmission: jest.fn(),
    updateChecklistSubmission: jest.fn(),
    postChecklistSubmission: jest.fn(),
    openModal: jest.fn(),
    shouldOpen: false
  };

  const wrapper = mount(<UserChecklist {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should submit checklist', () => {
    wrapper.instance().handleSubmitChecklist();
    wrapper.instance().postSubmission();
    expect(props.closeModal).toBeCalled();
  });

  it('should update checklist', () => {
    wrapper.instance().updateChecklistSubmission();
    expect(props.updateChecklistSubmission).toBeCalled();
  });

  it('should click next button and open submit modal', () => {
    wrapper.instance().onNextButtonClick();
    wrapper.instance().onTabChange(2);
    wrapper.find('.bg-btn').at(1).simulate('click');
    expect(props.openModal).toHaveBeenCalled();
  });

  it('should click the back button', () => {
    wrapper.find('.bg-btn').first().simulate('click');
    wrapper.instance().onTabChange(1);
    expect(wrapper.state('tabIndex')).toBe(1);
  });
});
