import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PendingApprovalsCard from '../PendingApprovalsCard';


describe('<PendingApprovalsCard />',() => {
  const wrapper = mount(
    <MemoryRouter>
      <PendingApprovalsCard />
    </MemoryRouter>
  );
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
