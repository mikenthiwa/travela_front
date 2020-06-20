import React from 'react';
import RestoreChecklistItem from '..';

describe('Renders',() => {
  let wrapper;
  const props = {
    shouldOpen: true,
    closeModal: jest.fn(),
    restoreChecklistItem: jest.fn(),
    handleInputChange: jest.fn(),
    itemName: 'Passport'
  };
  beforeEach(() => {
    wrapper = mount( <RestoreChecklistItem {...props}
    />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
