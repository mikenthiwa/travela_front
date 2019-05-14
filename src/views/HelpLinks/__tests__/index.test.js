import React from 'react';
import HelperPage from '../index';
import HelpHeader from '../../../components/HelpHeader';
import TextLink from '../../../components/TextLink/TextLink';

const props = {
    travelIntranet: 'https://sites.google.com/andela.com/travel-intranet/home?authuser=0',
    andelaPolicy: 'https://docs.google.com/document/d/1ZqJ3OAF-7NfJAgkzMBdiMoTrsftTWJp9tNhV8eOe1d8/edit',
    IntranetTitle :'Travel Intranet',
    AndelaTitle: 'Andela Policy'
  };

const wrapper = mount(<HelperPage {...props} />);

describe('HelperPage', () => {
  it('should render Help Page correctly', () => {
    expect(wrapper.find(TextLink).length).toBe(2);
  });

  it('should render Help Page Header correctly', () => {
    expect(wrapper.find(HelpHeader).length).toBe(1);   
  });

});
