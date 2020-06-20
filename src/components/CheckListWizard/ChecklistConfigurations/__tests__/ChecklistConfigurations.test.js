import React from 'react';
import {mount, shallow} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { ChecklistConfigurations } from '../index';
import checklistData from '../../../../mockData/checklistWizardMockData';

const props = {
  checklists: checklistData,
  deletedChecklists: [{ id: 1, createdBy: 'bukunmi' }],
  deleteChecklist: jest.fn(),
  restoreChecklist: jest.fn(),
  restoreAllChecklists: jest.fn(),
  isDeleting: false,
  isRestoring: false,
};

describe('Tests for Checklist Configurations', () => {
  it('should render the component', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.checklist-card')).toHaveLength(10);
  });

  it('should search for configurations', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const search = wrapper.find('.input-field');
    search.simulate('change', { target: { value: 'ug' } });
    expect(wrapper.find('.checklist-card')).toHaveLength(6);
  });

  it('should visit the next page', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const nextBtn = wrapper.find('.pagination__button').last();
    nextBtn.simulate('click');
    expect(wrapper.find('.checklist-card')).toHaveLength(2);
  });

  it('should visit the previous page', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const nextBtn = wrapper.find('.pagination__button').first();
    nextBtn.simulate('click');
    expect(wrapper.find('.checklist-card')).toHaveLength(10);
  });

  it('should format the destination countries', () => {
    const countries = [
      {country: {country: 'Nigeria'}},
      {country: {country: 'Kenya'}},
      {country: {country: 'Ghana'}},
    ];
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    wrapper.find('.subtitle-text').first().simulate('mouseenter');
    const expected = wrapper.find(ChecklistConfigurations).instance().formatDestinations(countries);
    expect(expected).toBe('Nigeria, Kenya and Ghana');
  });

  it('should call showExtraDestination', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const instance = wrapper.find(ChecklistConfigurations).instance();
    instance.showExtraDestination('Nigeria');
    expect(instance.state.hover).toEqual({name: 'Nigeria'});
  });

  it('should call removeExtraDestination', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const instance = wrapper.find(ChecklistConfigurations).instance();
    instance.removeExtraDestination();
    expect(instance.state.hover).toEqual({name: ''});
  });

  it('should call toggleDeleteModal', () => {
    const e = { target: { id: 1 }};
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const instance = wrapper.find(ChecklistConfigurations).instance();
    instance.toggleDeleteModal(e);
    expect(instance.state.showDeleteModal).toEqual(true);
    expect(instance.state.checklistId).toEqual(1);
  });

  it('should call deleteChecklist', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const instance = wrapper.find(ChecklistConfigurations).instance();
    instance.deleteChecklist();
    expect(props.deleteChecklist).toHaveBeenCalled();
    expect(instance.state.showDeleteModal).toEqual(false);
  });

  it('should call toggleRestoreModal', () => {
    const e = { target: { id: 1 }};
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const instance = wrapper.find(ChecklistConfigurations).instance();
    instance.toggleRestoreModal(e);
    expect(instance.state.showRestoreModal).toEqual(true);
    expect(instance.state.restoreAll).toEqual(false);
    expect(instance.state.checklistId).toEqual(1);
  });

  it('should call toggleRestoreAllChecklistModal', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const instance = wrapper.find(ChecklistConfigurations).instance();
    instance.toggleRestoreAllChecklistModal();
    expect(instance.state.showRestoreModal).toEqual(true);
    expect(instance.state.restoreAll).toEqual(true);
  });

  it('should call restoreAChecklist', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const instance = wrapper.find(ChecklistConfigurations).instance();
    instance.restoreAChecklist();
    expect(props.restoreChecklist).toHaveBeenCalled();
    expect(instance.state.showRestoreModal).toEqual(false);
  });

  it('should call restoreAllChecklists', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} /></MemoryRouter>);
    const instance = wrapper.find(ChecklistConfigurations).instance();
    instance.restoreAllChecklists();
    expect(props.restoreAllChecklists).toHaveBeenCalled();
    expect(instance.state.showRestoreModal).toEqual(false);
  });

  it('should find div that displays when there is no deleted checklist', () => {
    const wrapper = mount(<MemoryRouter><ChecklistConfigurations {...props} deletedChecklists={[]} /></MemoryRouter>);
    expect(wrapper.find('.no-checklist')).toHaveLength(1);
  });
});
