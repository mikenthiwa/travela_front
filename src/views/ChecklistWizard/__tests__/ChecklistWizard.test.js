import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChecklistWizard, mapStateToProps } from '..';


const props = {
  checklistWizard : {
    nationality: { 
      name: '', 
      emoji: ''
    },
    destinations: [],
    items: [
      {
        order: 1,
        prompt: '',
        type: '',
        behaviour: {},
        configuration: {
          options: [
            {
              id: 1,
              name: '',
              behaviour: {}
            },
          ]
        }
      },
    ],
  },
  handleAddChecklistItem: jest.fn(),
  handleChecklistItems: jest.fn(),
  addChecklistQuestion: jest.fn(),
  deleteChecklistItems: jest.fn(),
  deleteChecklistQuestion: jest.fn(),
  updateChecklistBehaviour: jest.fn(),
  updateChecklistNationality: jest.fn(),
  updateChecklistDestination: jest.fn(),
  createDynamicChecklist: jest.fn(),
  mapStateToProps: jest.fn()
}


describe('<ChecklistWizard />', () => {
  const mockStore = configureStore();
  const store = mockStore('nukuknkun');

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ChecklistWizard {...props} 
          />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });


  it('should handle update nationality', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().updateNationality('nigeria', '9jaflag');
    expect(props.updateChecklistNationality).toHaveBeenCalledTimes(1);
  });


  it('should handle update destination', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().updateDestinations(['USA', 'Brazil', 'Japan']);
    expect(props.updateChecklistDestination).toHaveBeenCalledTimes(1);
  });


  it('should handle new checklist', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().addNewChecklistItem();
    expect(props.handleAddChecklistItem).toHaveBeenCalledTimes(1);
  });

  it('should add new question', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().addQuestion(1);
    expect(props.addChecklistQuestion).toHaveBeenCalledTimes(1);
  });

  it('should update behaviour', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().updateBehaviour({}, 1, 1, 'name');
    expect(props.updateChecklistBehaviour).toHaveBeenCalledTimes(1);
  });

  it('should update checkbox behaviour', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().updateBehaviour({}, 1, 1, 'name', 'checkbox');
    expect(props.updateChecklistBehaviour).toHaveBeenCalled();
  });

  it('should delete question', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().deleteQuestion(1, 1);
    expect(props.deleteChecklistQuestion).toHaveBeenCalledTimes(1);
  });

  it('should handle item', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    const event = { target: { value: 'radio'}};
    wrapper.instance().handleItems(event, 1, 'type');
    expect(props.handleChecklistItems).toHaveBeenCalledTimes(1);
  });
  
  it('should delete item', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().deleteItem(1);
    expect(props.deleteChecklistItems).toHaveBeenCalledTimes(1);
  });

  it('should create a checklist', () => {
    const wrapper = shallow(<ChecklistWizard {...props} />);
    wrapper.instance().postChecklist();
    expect(props.createDynamicChecklist).toHaveBeenCalledTimes(1);
  });
});
