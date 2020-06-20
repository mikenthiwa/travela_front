import React from 'react';
import ContextMenu from '../ContextMenu';
import MenuItem from '../MenuItem';

const documentEvents = {

};

document.addEventListener = (event, callback) => {
  documentEvents[event] = callback;
};

const event = {
  preventDefault: jest.fn()
};

describe('<ContextMenu /> component', () => {

  let wrapper;
  const editCallback = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <ContextMenu>
        <MenuItem classNames="edit" onClick={editCallback}>
        Edit
        </MenuItem>
      </ContextMenu>);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should close the menu on click outside', () => {
    documentEvents['mousedown']({ target: document.createElement('p')});

    expect(wrapper.state().open).toBeFalsy();
  });

  it('should open the menu', () => {
    wrapper.find('.fa.on').simulate('click', event);

    expect(wrapper.state().open).toBeTruthy();
  });


  it('should close the menu when the component unmounts', () => {
    document.removeEventListener = jest.fn();
    wrapper.unmount();

    expect(document.removeEventListener).toHaveBeenCalled();
  });

  it('it should invoke the function when the menu item is clicked', () => {
    wrapper.find('li.edit').simulate('click', event);
    expect(editCallback).toHaveBeenCalled();
  });
});
