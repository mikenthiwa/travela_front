import React from 'react';
import { shallow } from 'enzyme';
import ChecklistWizard from '../index';



describe('<ChecklistWizard />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ChecklistWizard />);
    expect(wrapper.find('div'));
  });


  it('should handle update nationality', () => {
    const wrapper = shallow(<ChecklistWizard />);
    wrapper.instance().updateNationality('nigeria', '9jaflag');
    expect(wrapper.state('nationality')).toEqual({name: 'nigeria', emoji: '9jaflag'});
  });


  it('should handle update destination', () => {
    const wrapper = shallow(<ChecklistWizard />);
    wrapper.instance().updateDestinations(['USA', 'Brazil', 'Japan']);
    expect(wrapper.state('destinations')).toEqual(['USA', 'Brazil', 'Japan']);
  });


  it('should handle new checklist', () => {
    const wrapper = shallow(<ChecklistWizard />);
    wrapper.instance().addNewChecklistItem();
    expect(wrapper.state('items').length).toEqual(2);
  });

  it('should add new question', () => {
    const wrapper = shallow(<ChecklistWizard />);
    expect(wrapper.instance().addQuestion(1));
  });

  it('should delete question', () => {
    const wrapper = shallow(<ChecklistWizard />);
    expect(wrapper.instance().deleteQuestion(1, 1));
  });

  it('should update behaviour', () => {
    const wrapper = shallow(<ChecklistWizard />);
    expect(wrapper.instance().updateBehaviour({}, 1, 1, 'name'));
  });

  it('should handle item', () => {
    const wrapper = shallow(<ChecklistWizard />);
    const event = { target: { value: 'radio'}};
    expect(wrapper.instance().handleItems(event, 1, 'type'));
  });

  it('should delete item', () => {
    const wrapper = shallow(<ChecklistWizard />);
    expect(wrapper.instance().deleteItem(1));
  });
});
