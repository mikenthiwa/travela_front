import React from 'react';
import { shallow } from 'enzyme';
import DocumentsHeader from '../index';

const props = {
  openModal: jest.fn(),
};

describe('<DocumentsHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DocumentsHeader {...props} />);
    expect(wrapper.find('PageHeader').length).toBe(1);
  });

  it('should call openAddModal method', (done) => {
    const wrapper = shallow(<DocumentsHeader {...props} />);
    const openAddModalSpy = jest.spyOn(wrapper.instance(), 'openAddModal');
    wrapper.instance().openAddModal();
    expect(openAddModalSpy).toHaveBeenCalled();
    const { openModal } = props;
    expect(openModal).toBeCalledWith('add document');
    done();
  });
});
