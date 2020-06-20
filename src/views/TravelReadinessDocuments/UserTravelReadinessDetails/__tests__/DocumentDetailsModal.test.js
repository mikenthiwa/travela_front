import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MutationObserver from 'mutation-observer';
import ConnectedDocumentDetailsModal, { DocumentDetailsModal, TravelDocumentField } from '../DocumentDetailsModal';
import { initialState } from '../../../../redux/reducers/travelReadinessDocuments';
import users from '../../__mocks__/users';
import NotFound from '../../../ErrorPages';

global.MutationObserver = MutationObserver;
window.document.getSelection = () => {};

const document = {
  id: 'uOIg8s3ZC',
  type: 'passport',
  data: {
    name: 'adfadfad',
    expiryDate: '02/14/2019',
    dateOfBirth: '02/01/2001',
    dateOfIssue: '02/01/2019',
    nationality: 'asdfas',
    placeOfIssue: 'asdfasdfasd',
    cloudinaryUrl: 'http://res.cloudinary.com/skybound/image/upload/s--MrSXoXRJ-' +
      '-/v1549871565/frontend_upload/Screenshot_2019-01-11_at_07.49.41_vlode0.png',
    passportNumber: 'asdfasdf'
  },
  isVerified: false,
  createdAt: '2019-02-11T07:52:47.956Z',
  updatedAt: '2019-02-11T09:55:46.685Z',
  deletedAt: null,
  userId: '-LTMfmwvXO0D9BQ8fXgl'
};

const defaultState = {
  travelReadinessDocuments: {
    ...initialState,
    users,
    userReadiness: users[0],
  },
  comments: {
    comment: '',
    comments: [],
  },
  modal: {
    modal: {
      shouldOpen: false,
      modalType: 'test modal',
    }
  },
  auth: {
    user: {
      UserInfo: {
        picture: 'http://mockpicture.in'
      }
    }
  },
  user: {
    getCurrentUserRole: ['Requester']
  }
};


const props = {
  userData: {
    fullName: 'Zlatan Ibile',
    occupation: 'Software Developer',
    picture: 'https://lh3.googleusercontent.com/' +
      '-GndNwsNM0HI/AAAAAAAAAAI/AAAAAAAAAAc/0kPTNBhCkXU/photo.jpg?sz=50'
  },
  user: {
    picture: 'http://pix.els',
    id: '-LBMwfvmCERSFGfylyg'
  },
  fetchingDocument: false,
  downloadDocument: jest.fn(),
  document,
  fetchDocumentDetails: jest.fn(),
  documentId: 'xifslke',
  documentType: 'passport',
  verifyDocument: jest.fn(),
  getCurrentUserRole: ['Requester'],
  updatingDocument: false
};

describe('DocumentDetailsModal', () => {
  it('should render the NotFound component if document is not found', () => {
    const store = configureStore()(defaultState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedDocumentDetailsModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(NotFound).length).toBe(1);
  });

  it('should render the Passport Details without crashing', () => {
    const wrapper = shallow(<DocumentDetailsModal {...props} />);
    expect(wrapper.find(TravelDocumentField).length).toBe(6);
    wrapper.unmount();
  });

  it('should render the Visa Details without crashing', () => {
    const updatedProps = {
      ...props,
      documentType: 'visa'
    };
    const wrapper = shallow(<DocumentDetailsModal {...updatedProps} />);
    expect(wrapper.find(TravelDocumentField).length).toBe(5);
  });

  it('should render the Visa Details without crashing when document is verified', () => {
    const updatedProps = {
      ...props,
      documentType: 'visa',
      document: {
        isVerified: true,
        data: {
          id: 'ckls',
          isVerified: true,
        }
      }
    };
    const wrapper = shallow(<DocumentDetailsModal {...updatedProps} />);
    expect(wrapper.find(TravelDocumentField).length).toBe(5);
  });

  it('should simulate open verify modal', () => {
    const updatedProps = {
      ...props,
      user: {
        id: '-LBMwfvmCERSFGfylygF4k3'
      },
      getCurrentUserRole: ['Travel Administrator']
    };

    const wrapper = shallow(<DocumentDetailsModal {...updatedProps} />);
    const handleConfirmModalMock = jest.spyOn(wrapper.instance(), 'handleConfirmModal');
    const verifyButton = wrapper.find('button#verify_button');
    verifyButton.simulate('click');
    expect(wrapper.instance().state.modalInvisible).toBe(false);
    expect(handleConfirmModalMock).toBeCalled();

  });

  it('should simulate document verified', () =>{
    const updatedState = {
      ...defaultState,
      travelReadinessDocuments : {
        ...defaultState.travelReadinessDocuments,
        document
      },
      user: {
        getCurrentUserRole: ['Travel Administrator']
      }
    };
    const updatedProps = {
      ...props,
      user: {
        id: '-LBMwfvmCERSFGfylygF4k3'
      }
    };
    const store = configureStore()(updatedState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedDocumentDetailsModal {...updatedProps} />
        </MemoryRouter>
      </Provider>);
    const verifyDocumentDetailsMock = jest.spyOn(wrapper.find(DocumentDetailsModal)
      .instance(), 'verifyDocumentDetails');
    const verifyButton = wrapper.find('button#verify_button');
    verifyButton.simulate('click');
    const modalVerifyButton = wrapper.find('button#Verify');
    modalVerifyButton.simulate('click');
    expect(verifyDocumentDetailsMock).toHaveBeenCalled();
  });

  it('should render the Visa Details without crashing when user is an admin and document is verified', () => {
    const updatedProps = {
      ...props,
      getCurrentUserRole: ['Travel Administrator'],
      document: {
        isVerified: true,
        data: {
          id: 'ckls',
          isVerified: true,
        }
      }
    };
    const wrapper = shallow(<DocumentDetailsModal {...updatedProps} />);
    expect(wrapper.find(TravelDocumentField).length).toBe(6);
  });

  it('should render doc status when current user is owner; verify button otherwise', () => {
    const wrapper = shallow(<DocumentDetailsModal {...props} />);
    const verifyBtn = wrapper.find('.status__verify');
    expect(verifyBtn.text()).toContain('Pending');
    wrapper.setProps({
      ...props,
      user: {
        id: '-LBMwfvmCERSFGfylygF4k3'
      },
      getCurrentUserRole: ['Travel Administrator']
    });
    expect(wrapper.find('ButtonLoadingIcon').props().buttonText).toContain('Verify');
  });

  describe('TravelDocumentField', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<TravelDocumentField label="Column" value="The value" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
