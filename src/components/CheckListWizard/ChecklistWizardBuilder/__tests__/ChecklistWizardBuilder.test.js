import React from 'react';
import { shallow } from 'enzyme';
import ChecklistWizardBuilder from '../index';

const props = {
  items: [
    {
      order: 1,
      prompt: 'Do you have a valid visa?',
      type: 'radio',
      configuration: {
        options: [
          {
            id: 1,
            name: 'Yes',
            behaviour: {
              name: 'upload a document',
              payload: 'UPLOAD_DOCUMENT',
            }
          },
        ]
      }
    },  
  ],
  addNewChecklistItem: jest.fn(),
  handleItems: jest.fn(),
  addQuestion: jest.fn(),
  updateBehaviour: jest.fn(),
  deleteItem: jest.fn(),
  deleteQuestion: jest.fn(),
  updateNationality: jest.fn(),
  updateDestinations: jest.fn()
};

jest.mock('react-beautiful-dnd', () => {
  const Component = ({ children }) => (<div>{children({ innerRef: jest.fn(), droppableProps: {} })}</div>);
  const Component2 = ({ children }) => (<div>{children({ innerRef: jest.fn(), draggableProps: {} }, { isDragging: false })}</div>);

  return {
    Droppable: Component,
    Draggable: Component2,
  };
});


describe('<ChecklistWizardBuilder />', () => {
  it('should render correctly', () => {
    const wrapper = mount(<ChecklistWizardBuilder {...props} />);
    expect(wrapper.find('div'));
  });

  it('should call addNewChecklistItem on button click', () => {
    const wrapper = shallow(<ChecklistWizardBuilder {...props} />);
    wrapper.find('button').at(0).simulate('click', props.items);
    expect(props.addNewChecklistItem).toHaveBeenCalled();
  });
});
