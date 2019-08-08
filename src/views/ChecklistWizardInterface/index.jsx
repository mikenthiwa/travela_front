import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RoutedChecklistConfigurationsHeader from '../../components/CheckListWizard/ChecklistConfigurationsHeader';
import CheckListWizardStartPage from '../../components/CheckListWizard/CheckListWizardStartPage';
import { ChecklistConfigurations } from '../../components/CheckListWizard/ChecklistConfigurations';
import Preloader from '../../components/Preloader/Preloader';
import { getAllDynamicChecklists,
  deleteChecklist,
  getDeletedChecklists,
  restoreSingleChecklist,
  restoreAllChecklists,
} from '../../redux/actionCreator/travelChecklistWizardActions';

export class ChecklistWizard extends Component {
  async componentDidMount() {
    const { getAllDynamicChecklists, getDeletedChecklists } = this.props;
    await getAllDynamicChecklists();
    await getDeletedChecklists();
  }

  render() {
    const {
      fullName,
      checklists,
      isLoading,
      isDeleting,
      isRestoring,
      deleteChecklist,
      deletedChecklists,
      restoreSingleChecklist,
      restoreAllChecklists
    } = this.props;

    const configFound = checklists.length > 0;
    return (
      <div>
        {isLoading && <Preloader spinnerClass="loader" />}
        <RoutedChecklistConfigurationsHeader configFound={configFound} />
        {configFound && !isLoading && (
          <ChecklistConfigurations
            checklists={checklists}
            deletedChecklists={deletedChecklists}
            deleteChecklist={deleteChecklist}
            restoreChecklist={restoreSingleChecklist}
            restoreAllChecklists={restoreAllChecklists}
            isDeleting={isDeleting}
            isRestoring={isRestoring}
          />
        )
        }
        {!configFound && !isLoading && <CheckListWizardStartPage fullName={fullName} />}
      </div>
    );
  }
}

ChecklistWizard.propTypes = {
  fullName: PropTypes.string.isRequired,
  getAllDynamicChecklists: PropTypes.func.isRequired,
  checklists: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isRestoring: PropTypes.bool.isRequired,
  deletedChecklists: PropTypes.array.isRequired,
  deleteChecklist: PropTypes.func.isRequired,
  restoreSingleChecklist: PropTypes.func.isRequired,
  restoreAllChecklists: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ user, checklistWizard }) => {
  return {
    fullName: user.currentUser.fullName,
    checklists: checklistWizard.checklists,
    deletedChecklists: checklistWizard.deletedChecklists,
    isLoading: checklistWizard.loading,
    isDeleting: checklistWizard.isDeleting,
    isRestoring: checklistWizard.isRestoring,
  };
};

const mapDispatchToProps = {
  getAllDynamicChecklists,
  deleteChecklist,
  getDeletedChecklists,
  restoreSingleChecklist,
  restoreAllChecklists,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistWizard);
