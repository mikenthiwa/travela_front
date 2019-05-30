import React from 'react';
import Modal from '../Modal';

const EventQueue = function() {
  this.events = {};
  this.add = (event, callback) => {
    this.events[event] = [...this.getListeners(event), callback];
  };

  this.getListeners = (event) => {
    return this.events[event] || [];
  };

  this.removeListener = (event, callback) => {
    const list = this.getListeners(event);
    const index = list.indexOf(callback);
    if( index > 0){
      list.splice(index, 1);
    }
    this.events[event] = list;
  };

  this.fire = (type, event) => {
    this.getListeners(type).forEach(callback => callback(event));
  };
};

const eventQueue = new EventQueue();
document.addEventListener = jest.fn((event, callback) => {
  eventQueue.add(event, callback);
});

document.removeEventListener = jest.fn((event, callback) => {
  eventQueue.removeListener(event, callback);
});

describe('<Modal />', () => {
  let props, click, wrapper;

  beforeEach(() => {
    click = jest.fn();
    props = {
      title: 'test modal',
      visibility: 'visible',
      closeModal: jest.fn(),
      closeDeleteModal: jest.fn(),
      requestId: '34uoj31OJ'
    };
    wrapper = mount(
      <Modal {...props}>
        <div>
          Test content
        </div>
      </Modal>
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('prevents closing modal on clicking modal body', () => {
    const stopPropagation = jest.fn();
    const modal = wrapper.find('div.modal').simulate('click', {
      stopPropagation
    });
    expect(stopPropagation).toHaveBeenCalled();
  });

  it('should hide modal on escape clicked', () => {
    const event = { key : 'Escape'};
    eventQueue.fire('keydown', event);

    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should release the keydown listener on unmount', () => {
    wrapper.unmount();
    expect(document.removeEventListener).toHaveBeenCalled();
  });

  it('should set the state upon receiving the visibility prop', () => {
    window.setTimeout = jest.fn((callback, time) => {
      callback();
    });
    wrapper.setProps({ visibility: 'invisible'});
    expect(window.setTimeout.mock.calls[0][1]).toEqual(200);
    expect(wrapper.state().showing).toEqual(false);
  });
});
