import React from 'react';
import { shallow } from 'enzyme';
import UplaodDocument from '../UploadDocument';

const props = {
  behaviour: {
    type: 'UPLOAD_DOCUMENT'
  },
};

describe('<UplaodDocument />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UplaodDocument {...props} />);
    expect(wrapper.find('div'));
  });
});
