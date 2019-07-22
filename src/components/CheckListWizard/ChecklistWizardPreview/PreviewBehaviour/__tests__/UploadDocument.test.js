import React from 'react';
import { shallow } from 'enzyme';
import UplaodDocument from '../UploadDocument';

const props = {
  behaviourName: 'Upload Document',
};

describe('<UplaodDocument />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UplaodDocument {...props} />);
    expect(wrapper.find('div'));
  });
});
