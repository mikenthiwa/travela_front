import React from 'react';
import { shallow } from 'enzyme';
import DocumentTableMenu from '../index';
import documentsMockData from '../../../mockData/documentsMockData';

describe('DocumentTableMenu Component', () => {
  let props = {
    document: {
      id: '1',
      name: 'Passport',
      cloudinary_url: 'https://image.jpg',
      createdAt: '2018-08-16 12:11:52.181+01',
      updatedAt: '2018-08-16 12:11:52.181+01',
    },
    editDocument: jest.fn(),
    toggleMenu: jest.fn(),
    menuOpen: { open: true, id: '1' },
    openModal: jest.fn(),
    setItemToDelete: () =>jest.fn(),
  };
  it ('should render the component', (done) => {
    const wrapper = shallow(<DocumentTableMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
    done();
  });

  it ('should handle button click', (done) => {
    const wrapper = mount(<DocumentTableMenu {...props} />);
    const renameBtn = wrapper.find('#docRenameBtn');
    const cancelBtn = wrapper.find('.table__menu-list-item.cancel');
    const ellipsis = wrapper.find('.fa-ellipsis-v');
    const handleOpenRenameModalSpy = jest
      .spyOn(wrapper.instance(), 'handleOpenRenameModal');

    expect(renameBtn.length).toBe(1);
    expect(cancelBtn.length).toBe(1);
    expect(ellipsis.length).toBe(1);
    renameBtn.simulate('click');
    wrapper.instance().handleOpenRenameModal();
    expect(handleOpenRenameModalSpy).toHaveBeenCalled();
    cancelBtn.simulate('click');
    expect(props.toggleMenu).toHaveBeenCalledTimes(1);
    ellipsis.simulate('click');
    expect(props.toggleMenu).toHaveBeenCalledTimes(2);
    done();
  });

  it ('should handle download button click', (done) => {
    const wrapper = mount(<DocumentTableMenu {...props} />);
    const downloadBtn = wrapper.find('#docDownloadBtn');
    const cancelBtn = wrapper.find('.table__menu-list-item.cancel');
    const deleteBtn = wrapper.find('#deleteBtn');
    deleteBtn.simulate('click');
    const ellipsis = wrapper.find('.fa-ellipsis-v');
    const handleOpenDownloadModalSpy = jest
      .spyOn(wrapper.instance(), 'handleOpenDownloadModal');

    expect(downloadBtn.length).toBe(1);
    expect(cancelBtn.length).toBe(1);
    expect(ellipsis.length).toBe(1);
    downloadBtn.simulate('click');
    wrapper.instance().handleOpenDownloadModal();
    expect(handleOpenDownloadModalSpy).toHaveBeenCalled();
    cancelBtn.simulate('click');
    expect(props.toggleMenu).toHaveBeenCalledTimes(4);
    ellipsis.simulate('click');
    expect(props.toggleMenu).toHaveBeenCalledTimes(5);
    done();
  });
});
