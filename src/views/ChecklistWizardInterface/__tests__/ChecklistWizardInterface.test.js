import React from 'react';
import { mount, shallow } from 'enzyme';
import {ChecklistWizard} from '../index';
import RoutedChecklistConfigurationsHeader from '../../../components/CheckListWizard/ChecklistConfigurationsHeader';
import CheckListWizardStartPage from '../../../components/CheckListWizard/CheckListWizardStartPage';

describe('tests for the checklist wizard interface', () => {
  it('should render the component', () => {
    const props = {
      fullName: 'Jude Afam',
      getAllDynamicChecklists: jest.fn(),
      checklists: [],
      isLoading: false
    };

    const wrapper = shallow(<ChecklistWizard {...props} />);
    expect(wrapper.find(RoutedChecklistConfigurationsHeader)).toHaveLength(1);
  });

  it('should render the start page if there is no checklist', () => {
    const props = {
      fullName: 'Jude Afam',
      getAllDynamicChecklists: jest.fn(),
      checklists: [],
      isLoading: false
    };

    const wrapper = shallow(<ChecklistWizard {...props} />);
    expect(wrapper.find(CheckListWizardStartPage)).toHaveLength(1);
  });
});
