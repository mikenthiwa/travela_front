import React from 'react';
import ErrorBoundaryImage from '../ErrorBoundaryImage';

describe('ErrorBoundaryImage', () => {
  const wrapper = mount(<ErrorBoundaryImage />);

  it('should display a walking person', () => {
    expect(wrapper.find('.person').length).toEqual(1);
  });
});
