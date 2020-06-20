import React from 'react';
import NoEmailReminder from '../NoEmailReminder';

describe('NoEmailReminder', () => {
  it('should render NoEmailReminder', function () {

    const wrapper = mount(
      <NoEmailReminder />
    );
    const NoEmail = wrapper.find('no-email-icon');
    expect(NoEmail).toBeTruthy();
  });
});
