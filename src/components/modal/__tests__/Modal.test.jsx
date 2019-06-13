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

const props = (overrides = {}) => ({
  title: 'test modal',
  visibility: 'visible',
  closeModal: jest.fn(),
  closeDeleteModal: jest.fn(),
  requestId: '34uoj31OJ',
  ...overrides
});
describe('<Modal />', () => {
  let click, wrapper, currentProps = props();

  beforeEach(() => {
    click = jest.fn();
    wrapper = mount(
      <Modal {...currentProps}>
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

    expect(currentProps.closeModal).toHaveBeenCalled();
  });

  it('should release the keydown listener on unmount', () => {
    wrapper.unmount();
    expect(document.removeEventListener).toHaveBeenCalled();
  });

  describe('Modal Animations', () => {
    let callback;
    beforeEach(() => {
      wrapper = mount(
        <Modal {...props({visibility: 'invisible'})}>
          <div>
            Modal Content
          </div>
        </Modal>
      );
      jest.resetAllMocks();


      window.setTimeout = jest.fn((func) => {
        callback = func;
      });
    });

    it('should show a fade in animation', () => {
      wrapper.setProps({ visibility: 'visible'});

      expect(window.setTimeout.mock.calls[0][1]).toEqual(0);
      expect(wrapper.find('Overlay').props().className).toContain('invisible');
      expect(wrapper.find('div.modal').props().className).toContain('invisible');
      expect(wrapper.find('.modal-content').length).toEqual(1);

      callback();
      wrapper.update();

      expect(wrapper.find('Overlay').props().className).toEqual('visible ');
      expect(wrapper.find('div.modal').props().className).toContain('visible');
    });

    it('should show a fade out animation', () => {
      wrapper.setProps({ visibility: 'visible'});
      callback();

      wrapper.setProps({ visibility: 'invisible'});

      expect(window.setTimeout.mock.calls[1][1]).toEqual(200);
      expect(wrapper.find('Overlay').props().className).toContain('invisible');
      expect(wrapper.find('div.modal').props().className).toContain('invisible');
    });
  });
});
