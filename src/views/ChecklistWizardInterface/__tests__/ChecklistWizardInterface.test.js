import React from 'react';
import { mount, shallow } from 'enzyme';
import { ChecklistWizard, mapStateToProps } from '../index';
import RoutedChecklistConfigurationsHeader from '../../../components/CheckListWizard/ChecklistConfigurationsHeader';
import CheckListWizardStartPage from '../../../components/CheckListWizard/CheckListWizardStartPage';

const props = {
  checklistWizard : {
    checklists: [{}],
    deletedChecklists: [{}],
    fullName: 'jude afam',
    isDeleting: false,
    isRestoring: false,
    isLoading: false
  },
  deletedChecklists: [{ name: 'deleted checklist' }],
  deleteChecklist: jest.fn(),
  restoreChecklist: jest.fn(),
  restoreAllChecklists: jest.fn(),
  restoreSingleChecklist: jest.fn(),
  checkListWizard: { checklists: [{}]},
  fullName: 'jude afam',
  user: { currentUser: { fullName: 'jude afam' }},
  getAllDynamicChecklists: jest.fn(),
  getDeletedChecklists: jest.fn(),
  mapStateToProps: jest.fn(),
  checklists: [],
  isDeleting: false,
  isRestoring: false,
  isLoading: false
}
describe('tests for the checklist wizard interface', () => {

  it('should render the component', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    expect(wrapper.find(RoutedChecklistConfigurationsHeader)).toHaveLength(1);
  });

  it('should render the start page if there is no checklist', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    expect(wrapper.find(CheckListWizardStartPage)).toHaveLength(1);
  });

  it('returns the reducer passed to it', () => {
    const result = mapStateToProps(props);
    expect(result).toHaveProperty('checklists');
  });
});
