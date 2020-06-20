import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageHeader from '../../../components/PageHeader';
import '../TravelReadinessDocuments.scss';
import TravelReadinessDetailsTable from './UserTravelReadinessDetailsTable';
import Button from '../../../components/buttons/Buttons';
import { fetchUserReadinessDocuments } from '../../../redux/actionCreator/travelReadinessDocumentsActions';
import { openModal, closeModal } from '../../../redux/actionCreator/modalActions';

class UserTravelReadinessDetails extends Component {
  state = {
    activeDocument: 'passport',
    documentId: '',
  };

  componentDidMount() {
    const { fetchUserData, match: { params: { userId } } } = this.props;
    fetchUserData(userId);
  }

  toggleDocumentTab = (type) => {
    this.setState({
      activeDocument: type
    });
  }

  showDocumentDetail = (documentId, type) => {
    const { openModal } = this.props;
    this.setState({
      documentId,
      activeDocument: type
    });
    openModal(true, 'document details');
  }

  render() {
    const { activeDocument, documentId } = this.state;
    const { userReadiness, isLoading, shouldOpen, modalType, closeModal, location } = this.props;
    const { fullName, travelDocuments } = userReadiness;
    const otherCount = Object.keys(travelDocuments).filter(type => !['passport', 'visa'].includes(type))
      .reduce((prev, curr) => (prev + travelDocuments[curr].length), 0);
    return (
      <Fragment>
        <div className={isLoading ? 'readiness-header' : ''}>
          {
            !isLoading && (
              <div className="request-panel-header">
                <PageHeader
                  addLink
                  title={fullName}
                  iconLink="/trip-planner/travel-readiness"
                />
                <div className="open-requests">
                  <div className="button-group">
                    <Button
                      className="document-button"
                      showBadge
                      badge={travelDocuments.passport && travelDocuments.passport.length}
                      text="Passports"
                      onClick={() => this.toggleDocumentTab('passport')}
                      buttonClass={`bg-btn bg-btn--with-badge ${activeDocument === 'passport' ? 'bg-btn--active' : ''}`}
                      badgeClass={activeDocument === 'passport' ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
                    />
                    <Button
                      showBadge
                      badge={travelDocuments.visa && travelDocuments.visa.length}
                      text="Visas"
                      onClick={() => this.toggleDocumentTab('visa')}
                      buttonClass={`bg-btn bg-btn--with-badge ${activeDocument === 'visa' ? 'bg-btn--active' : ''}`}
                      badgeClass={activeDocument === 'visa' ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
                    />
                    <Button
                      showBadge
                      badge={otherCount}
                      text="Others"
                      onClick={() => this.toggleDocumentTab('other')}
                      buttonClass={`bg-btn bg-btn--with-badge ${activeDocument === 'other' ? 'bg-btn--active' : ''}`}
                      badgeClass={activeDocument === 'other' ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
                    />
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <TravelReadinessDetailsTable
          activeDocument={activeDocument}
          closeModal={closeModal}
          documentId={documentId}
          handleShowDocument={this.showDocumentDetail}
          isLoading={isLoading}
          location={location}
          modalType={modalType}
          viewType="verifier"
          shouldOpen={shouldOpen}
          userData={userReadiness}
          travelDocuments={travelDocuments}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ travelReadinessDocuments, modal }) => ({
  userReadiness: travelReadinessDocuments.userReadiness,
  isLoading: travelReadinessDocuments.isLoading,
  ...modal.modal,
});

const mapDispatchToProps = {
  fetchUserData: fetchUserReadinessDocuments,
  closeModal,
  openModal,
};

UserTravelReadinessDetails.propTypes = {
  fetchUserData: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userReadiness: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  location: PropTypes.object,
};

UserTravelReadinessDetails.defaultProps = {
  modalType: '',
  location: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTravelReadinessDetails);
