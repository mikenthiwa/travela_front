import React from 'react';
import DeleteRequestForm from '../DeleteRequestForm';

describe('Renders',() => {
  let wrapper;
  
  const props = {
    shouldOpen: true,
    closeModal: jest.fn(),
    deleteChecklistItem: jest.fn(),
    handleInputChange: jest.fn(),
    itemName: 'Passport'
  };
  beforeEach(() => {
    wrapper = mount( <DeleteRequestForm {...props}
    />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
