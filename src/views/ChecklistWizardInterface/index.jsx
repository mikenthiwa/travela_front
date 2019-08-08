import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RoutedChecklistConfigurationsHeader from '../../components/CheckListWizard/ChecklistConfigurationsHeader';
import CheckListWizardStartPage from '../../components/CheckListWizard/CheckListWizardStartPage';
import ChecklistConfigurations from '../../components/CheckListWizard/ChecklistConfigurations';
import Preloader from '../../components/Preloader/Preloader';
import { getAllDynamicChecklists } from '../../redux/actionCreator/checklistWizardActions';

export class ChecklistWizard extends Component {
  componentDidMount() {
    const { getAllDynamicChecklists } = this.props;
    getAllDynamicChecklists();
  }

  render() {
    const {fullName, checklists, isLoading} = this.props;
    const configFound = checklists.length > 0;
    return (
      <div>
        {isLoading && <Preloader spinnerClass="loader" />}
        <RoutedChecklistConfigurationsHeader configFound={configFound} />
        {configFound && !isLoading && <ChecklistConfigurations checklists={checklists} />}
        {!configFound && !isLoading && <CheckListWizardStartPage fullName={fullName} />}
      </div>
    );
  }
}

ChecklistWizard.propTypes = {
  fullName: PropTypes.string.isRequired,
  getAllDynamicChecklists: PropTypes.func.isRequired,
  checklists: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = ({user, checklistWizard}) => {
  return {
    fullName: user.currentUser.fullName,
    checklists: checklistWizard.checklists,
    isLoading: checklistWizard.loading
  };
};

const mapDispatchToProps = {
  getAllDynamicChecklists
};

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistWizard);
