import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextLink from '../../components/TextLink/TextLink';
import fileSymbol from '../../images/file.svg';
import './helpLink.scss';
import PageHeader from '../../components/PageHeader';
import Modal from '../../components/modal/Modal';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import AddHelpResourceForm from '../../components/Forms/AddHelpResourceForm';
import {
  addResource,
  fetchResources
} from '../../redux/actionCreator/helpResourceActions';



class HelperPage extends Component {
  state = {
    headTitle: 'Add Resource',
    linkDetail: null
  }

  componentDidMount() {
    const { fetchResources } = this.props;
    fetchResources();
  }

  handleAddResource = () => {
    const { openModal } = this.props;
    this.setState({headTitle: 'Add Resource', linkDetail: null});
    openModal(true, 'new model');
  }

  renderTravelPolicyForm() {
    const { headTitle, linkDetail } = this.state;
    const { helpResourceErrors, closeModal, shouldOpen, modalType,
      addResource, isAddingResource, isLoading } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="modal--add-user" width="480px"
        visibility={shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'}
        title={headTitle}>
        <AddHelpResourceForm
          addResource={addResource}
          errors={helpResourceErrors}
          closeModal={closeModal}
          addingRegion={isAddingResource}
          linkDetail={linkDetail}
          myTitle={headTitle}
        />
      </Modal>
    );
  }
  
  renderLinks(documentLink, text) {
    return (
      <Fragment>
        <TextLink
          imageSrc={fileSymbol}
          symbolClass="login-symbol__file"
          textLinkClass="login-page__link"
          textClass="login-page__link-text"
          altText="File Symbol"
          text={text}
          link={documentLink} />
      </Fragment>
    );
  }

  renderTravelPolicyDocuments() {
    const { helpResources } = this.props;

    const resources = helpResources.map((helpResource) => {
      return(
        <div key={helpResource.id}>
          <div className="policy-document">
            <div className="item-name">
              {this.renderLinks(helpResource.title, helpResource.link)}
            </div>
          </div>
        </div>
      );
    });
    return resources;
  }

  render() {
    const { roles } = this.props;
    const canAddResource = ['Super Administrator', 'Travel Administrator']
      .find(role => roles.includes(role));
    return (
      <Fragment>
        <div>
          <PageHeader
            title="TRAVEL POLICY DOCUMENTS"
            actionBtn={canAddResource ? 'Add Resource' : ''}
            actionBtnClickHandler={this.handleAddResource}
          /> 
          <div className="header-body-margin" />
          {this.renderTravelPolicyForm()}
          {this.renderTravelPolicyDocuments()}
        </div>
      </Fragment>
      
    );
  }
}

export const mapStateToProps = ({modal, user, helpResources: { resources }}) => ({
  ...modal.modal,
  helpResources: resources,
  roles: user.getCurrentUserRole
});

HelperPage.propTypes = {
  openModal: PropTypes.func.isRequired,
  helpResources: PropTypes.array,
  closeModal: PropTypes.func.isRequired,
  fetchResources: PropTypes.func.isRequired,
  helpResourceErrors: PropTypes.string,
  addResource: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  isAddingResource: PropTypes.bool,
  roles: PropTypes.array
};

HelperPage.defaultProps = {
  isLoading: false,
  helpResourceErrors: '',
  modalType: '',
  isAddingResource: false,
  helpResources:[],
  roles: []
};

const actionCreators = {
  openModal,
  closeModal,
  addResource,
  fetchResources
};

export default connect(mapStateToProps, actionCreators)(HelperPage);
