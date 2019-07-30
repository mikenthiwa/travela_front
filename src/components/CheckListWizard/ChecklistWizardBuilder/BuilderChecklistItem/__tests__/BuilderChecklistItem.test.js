/* eslint-disable react/prop-types */
import React from 'react';
import { shallow, mount } from 'enzyme';
import BuilderChecklistItem from '../index';

const dndProps = { isDragging: false };

jest.mock('react-beautiful-dnd', () => {
  const Component = ({ children }) => (<div>{children({ innerRef: jest.fn(), draggableProps: {} }, { isDragging: false })}</div>);
  return {
    Draggable: Component
  };
});

const props = {
  id: 1,
  order: 1,
  type: 'radio',
  prompt: 'Do you hava a valid visa?',
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
  },
  item: {
    id: 1,
  },
  handleItems: jest.fn(),
  addQuestion: jest.fn(),
  updateBehaviour: jest.fn(),
  deleteItem: jest.fn(),
  deleteQuestion: jest.fn(),
};

describe('<BuilderChecklistItem />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BuilderChecklistItem {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle prompt input onChange', () => {
    const wrapper = mount(<BuilderChecklistItem {...props} />);
    const mockEvents = { target: { value: 'Passport?'} };
    const promptInput = wrapper.find('#prompt-input');
    promptInput.simulate('change', mockEvents);
    expect(wrapper.handleItems).toBeCalled;
  });

  it('should handle itemType onChange', () => {
    const wrapper = mount(<BuilderChecklistItem {...props} />);
    wrapper.instance().handleItemType('radio');
    expect(wrapper.handleItems).toBeCalled;
  });

  it('should handle delete icon onChange', () => {
    const wrapper = mount(<BuilderChecklistItem {...props} />);
    const mockEvents = { target: { value: 'Passport?'} };
    const deleteIcon = wrapper.find('button#prompt-del-icon');
    deleteIcon.simulate('click', mockEvents);
    expect(wrapper.deleteItem).toBeCalled;
  });

  it('should change icon on drag start', () => {
    const wrapper = mount(<BuilderChecklistItem {...props} />);
    expect(wrapper.find('.drag-indicator-icon')).toHaveLength(1);
  });

  it('should animate question number container on order change', () => {
    const wrapper = mount(<BuilderChecklistItem {...props} />);
    const newProps = { ...props, item: { id: 2 } };
    wrapper.setProps(newProps);
    expect(wrapper.find('.order-number')).toHaveLength(1);
  });
});
