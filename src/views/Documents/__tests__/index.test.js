import React from 'react';
import { shallow } from 'enzyme';
import { Documents, mapStateToProps } from '../index';
import DocumentsHeader from '../../../components/DocumentsHeader';

describe('<Documents />', () => {
  const props = {
    openModal: jest.fn(),
    closeModal: jest.fn(),
    fetchDocuments: jest.fn(),
    deleteDocument: jest.fn(),
    shouldOpen: false,
    modalType: '',
    isLoading: false,
    isUpdating: false,
    isUploading: false,
    editDocument: jest.fn(),
    createDocument: jest.fn(),
    documentOnEdit: {
      id: '1',
      name: 'Passport',
      cloudinary_public_id: 'e93h236FvT',
      cloudinary_url: 'https://image.jpg',
      userId: '-LMgZQKq6MXAj_41iRWi',
      createdAt: '2018-08-16 12:11:52.181+01',
      updatedAt: '2018-08-16 12:11:52.181+01',
    },
    updateDocumentOnEdit: jest.fn(),
    removeDocumentFromEdit: jest.fn(),
    updateDocument: jest.fn(),
    downloadDocuments: jest.fn(),
    
    documents: [
      {
        id: '1',
        name: 'Passport',
        cloudinary_public_id: 'e93h236FvT',
        cloudinary_url: 'https://image.jpg',
        userId: '-LMgZQKq6MXAj_41iRWi',
        createdAt: '2018-08-16 12:11:52.181+01',
        updatedAt: '2018-08-16 12:11:52.181+01',
      },
      {
        id: '2',
        name: 'Visa',
        cloudinary_public_id: 'e93h236FvT',
        cloudinary_url: 'https://image.url',
        userId: '-LMgZQKq6MXAj_41iRWi',
        createdAt: '2018-08-16 12:11:52.181+01',
        updatedAt: '2018-08-16 12:11:52.181+01',
      }
    ],
  };

  it('should render correctly with documents', () => {
    const wrapper = shallow(<Documents {...props} />);
    expect(wrapper.find('DocumentTable').length).toBe(1);
  });

  it('should render Document Header correctly', () => {
    const wrapper = shallow(<Documents {...props} />);
    expect(wrapper.find(DocumentsHeader).length).toBe(1);   
  });

  it('should render correctly without documents', () => {
    const currentProps = { ...props, documents: [] };
    const wrapper = shallow(<Documents {...currentProps} />);
    expect(wrapper.find('DocumentTable').length).toBe(0);
  });
  it('should render submit area', () => {
    const currentProps = { ...props, documents: [] };
    const wrapper = shallow(<Documents {...currentProps} />);
    expect(wrapper.find('button').length).toBe(4);
  });

  it('should render correctly when fetching documents', () => {
    const currentProps = { ...props, documents: [], isLoading: true };
    const wrapper = shallow(<Documents {...currentProps} />);
    expect(wrapper.find('Preloader').length).toBe(1);
  });

  it('should call `toggleMenu method', (done) => {
    const document = {
      id: '1',
      name: 'Passport',
      cloudinary_public_id: 'e93h236FvT',
      cloudinary_url: 'https://image.jpg',
      userId: '-LMgZQKq6MXAj_41iRWi',
      createdAt: '2018-08-16 12:11:52.181+01',
      updatedAt: '2018-08-16 12:11:52.181+01',
    };
    const wrapper = shallow(<Documents {...props} />);
    wrapper.instance().state = {
      menuOpen: { open: true, id: 1 },
      documentToDownlod: ''
    };
    const toggleMenuSpy = jest.spyOn(wrapper.instance(), 'toggleMenu');
    wrapper.instance().toggleMenu(document);
    expect(toggleMenuSpy).toHaveBeenCalled();

    done();
  });

  it('should call `toggleMenu method', (done) => {
    const document = {
      name: 'Passport',
      cloudinary_public_id: 'e93h236FvT',
      cloudinary_url: 'https://image.jpg',
      userId: '-LMgZQKq6MXAj_41iRWi',
      createdAt: '2018-08-16 12:11:52.181+01',
      updatedAt: '2018-08-16 12:11:52.181+01',
    };

    const wrapper = shallow(<Documents {...props} />);
    wrapper.instance().state = {
      menuOpen: { open: true, id: 1 },
      documentToDownlod: ''
    };
    const toggleMenuSpy = jest.spyOn(wrapper.instance(), 'toggleMenu');
    wrapper.instance().toggleMenu(document);
    expect(toggleMenuSpy).toHaveBeenCalled();

    done();
  });

  it('should call `handleInputChange method', (done) => {
    const event = {
      target: { value: 'Travel stipend' }
    };

    const wrapper = shallow(<Documents {...props} />);
    const handleInputChangeSpy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    wrapper.instance().handleInputChange(event);
    expect(handleInputChangeSpy).toHaveBeenCalled();

    done();
  });


  it('should call `handleCloseEditModal method', (done) => {
    const wrapper = shallow(<Documents {...props} />);
    wrapper.instance().state = { menuOpen: { open: true, id: null },  documentToDownlod: '' };
    const handleCloseEditModalSpy = jest.spyOn(wrapper.instance(), 'handleCloseEditModal');
    wrapper.instance().handleCloseEditModal();
    expect(handleCloseEditModalSpy).toHaveBeenCalled();

    done();
  });

  it('should call `handleRenameDocument method', (done) => {
    const wrapper = shallow(<Documents {...props} />);
    const handleRenameDocumentSpy = jest.spyOn(wrapper.instance(), 'handleRenameDocument');
    wrapper.instance().handleRenameDocument();
    expect(handleRenameDocumentSpy).toHaveBeenCalled();

    done();
  });

  it('should call `handleOpenModal method', (done) => {
    const wrapper = shallow(<Documents {...props} />);
    wrapper.instance().state = { menuOpen: { open: false, id: null }, documentToDownlod: '' };
    const handleOpenModalSpy = jest.spyOn(wrapper.instance(), 'handleOpenModal');
    wrapper.instance().handleOpenModal();
    expect(handleOpenModalSpy).toHaveBeenCalled();
    done();
  });

  it('should call `handleOpenModal method', (done) => {
    const wrapper = shallow(<Documents {...props} />);
    wrapper.instance().state = { menuOpen: { open: false, id: null }, documentToDownlod: '' };
    const handleOpenModalSpy = jest.spyOn(wrapper.instance(), 'openAddModal');
    wrapper.instance().openAddModal();
    expect(handleOpenModalSpy).toHaveBeenCalled();
    done();
  });
  it('should call `handleDownloadDocuments method', (done) => {
    const wrapper = shallow(<Documents {...props} />);
    wrapper.instance().state = {  documentToDownlod: '' };
    const handleDownloadDocumentsSpy = jest.spyOn(wrapper.instance(), 'handleDownloadDocuments');
    wrapper.instance().handleDownloadDocuments();
    expect(handleDownloadDocumentsSpy).toHaveBeenCalled();
    done();
  });
  it('should call setItemToDelete', () => {
    const wrapper = shallow(<Documents {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'setItemToDelete');
    wrapper.instance().setItemToDelete(1, 'visa')();
    expect(spy).toHaveBeenCalledTimes(1);
    const { openModal } = props;
    expect(openModal).toBeCalledWith(true, 'delete document');
    expect(wrapper.state('documentId')).toBe(1);
  });
  it('should call deleteUserDocument', () => {
    const wrapper = shallow(<Documents {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'deleteUserDocument');
    wrapper.instance().deleteUserDocument();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should call handleCloseModal', () => {
    const wrapper = shallow(<Documents {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleCloseModal');
    wrapper.instance().handleCloseModal();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should call toggleMenu', () => {
    const wrapper = shallow(<Documents {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'toggleMenu');
    wrapper.instance().toggleMenu({
      id: 1
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state('menuOpen')).toEqual({ open: true, id: 1 });
    wrapper.instance().toggleMenu({
      id: null
    });
    expect(wrapper.state('menuOpen')).toEqual({ open: false, id: null });
  });

  test('should correctly map state to props', () => {
    const mapper = mapStateToProps({
      modal: { modal: ['add document']},
      documents: { documents: ['user documents'] },
      user: { getUserData: ['user data'] },
    });
    expect(mapper.documents).toEqual(['user documents']);
  });

  it('should render documents editmodal', (done) => {
    const currentProps = { ...props, modalType: 'rename document' };
    const wrapper = mount(<Documents {...currentProps} />);
    const toggleIcons = wrapper.find('#toggleIcon');
    const toggleMenuSpy = jest.spyOn(wrapper.instance(), 'toggleMenu');
    expect(toggleIcons.length).toBe(2);
    done();
  });
  describe('textValidator',() => {
    it('should return true when a non string is passed as an argument',() => {
      const wrapper = shallow(<Documents {...props} />);
      const resultValue = wrapper.instance().textValidator('    ');
      expect(resultValue).toBe(true);
    });
  });
});
