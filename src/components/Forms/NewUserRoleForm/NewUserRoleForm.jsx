import React, { PureComponent } from 'react';
import toast from 'toastr';
import { PropTypes } from 'prop-types';
import { FormContext } from '../FormsAPI';
import PersonalDetailsFieldset from './FormFieldsets/PersonalDetails';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';

class NewUserRoleForm extends PureComponent {
  constructor(props) {
    super(props);
    const { role, userDetail, roleId } = this.props;
    const editUserRole = role === 'Budget Checker' ? (userDetail.budgetCheckerDepartments || []).map(dept => dept.name) :
      (userDetail.centers || []).map(center => center.location) ;

    let defaultValues = {
      email: (userDetail || {}).email,
      roleName: role,
      item: '',
      items: editUserRole,
      roleId,
    };
    this.defaultState = {
      values: defaultValues,
      errors: {},
      hasBlankFields: true
    };
    this.state = { ...this.defaultState };
  }

  componentDidMount() {
    const { getAllUsersEmail, getAllDepartment, fetchCenters } = this.props;
    getAllUsersEmail();
    getAllDepartment();
    fetchCenters();
  }

  componentWillUnmount() {
    const { getRoleData } = this.props;
    this.handleCancel();
    getRoleData();
  }

  handleSubmit = event => {
    event.preventDefault();
    const { handleUpdateRole, updateBudgetChecker, myTitle, role, updateUserCenter } = this.props;
    const { values } = this.state;
    let dataValue = {
      email: values.email,
      roleName: values.roleName,
    };
    role === 'Budget Checker' ?
      dataValue = { ...dataValue, departments: values.items }:
      values.items.length < 1 ?
        dataValue :
        dataValue = { ...dataValue, center: values.items };

    if (this.validate()) {
      myTitle === 'Add User' ?
        handleUpdateRole(dataValue) :
        myTitle === 'Edit Budget Checker User' ?
          updateBudgetChecker({email: dataValue.email, departments: values.items}):
          updateUserCenter(dataValue);
    }
  };

  addItem = () => {
    const { values } = this.state;
    const testPattern = new RegExp(`^${values.item.trim()}$`, 'i');
    if (values.items.find(value => testPattern.test(value))) {
      return toast.error('You have added that item already');
    }

    this.setState({
      values: {
        ...values,
        items: values.items.concat([values.item.trim()]),
        item: ''
      }
    },  this.validate
    );
  }

  removeItem = (i) => {
    const { values } = this.state;
    const array = values.items;
    array.splice(i, 1);
    this.setState({
      values: {
        ...values,
        items: array
      }
    }, this.validate
    );
  }

  handleCancel = () => {
    const { closeModal } = this.props;
    this.setState({ ...this.defaultState });
    closeModal();
  };

  validate = field => {
    let { values, errors } = this.state;
    const { role } = this.props;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;
    delete values.item;
    if (!values[field]) {
      errors[field] = 'This field is required';
      delete errors.item;
    } else {
      errors[field] = '';
    }

    hasBlankFields = Object.keys(values).some(key => !values[key]);
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });

    if (['Budget Checker', 'Travel Administrator' ].includes(role) &&
        values.items.length < 1 ) {
      this.setState({
        hasBlankFields: true
      });
    }

    return !hasBlankFields;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { updatingRole, role, centers, myTitle, allMails, departments} = this.props;
    return (
      <FormContext targetForm={this} values={values} errors={errors} validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request">
          <PersonalDetailsFieldset
            values={values}
            roleName={role}
            centers={centers}
            addItem={this.addItem}
            hasBlankFields={hasBlankFields}
            removeItem={this.removeItem}
            myTitle={myTitle}
            allMails={allMails}
            departments={departments}
          />
          <SubmitArea
            onCancel={this.handleCancel}
            loading={updatingRole}
            hasBlankFields={hasBlankFields}
            send="Submit"
          />
        </form>
      </FormContext>
    );
  }
}

NewUserRoleForm.propTypes = {
  handleUpdateRole: PropTypes.func.isRequired,
  updatingRole: PropTypes.bool,
  getRoleData: PropTypes.func.isRequired,
  centers: PropTypes.array,
  myTitle: PropTypes.string.isRequired,
  updateBudgetChecker: PropTypes.func,
  role: PropTypes.string.isRequired,
  userDetail: PropTypes.object,
  roleId: PropTypes.string.isRequired,
  getAllUsersEmail: PropTypes.func,
  allMails: PropTypes.array.isRequired,
  getAllDepartment: PropTypes.func,
  fetchCenters: PropTypes.func,
  departments: PropTypes.array,
  closeModal: PropTypes.func.isRequired,
  updateUserCenter: PropTypes.func,
};

NewUserRoleForm.defaultProps = {
  updatingRole: false,
  getAllUsersEmail: () => { },
  updateBudgetChecker: ()=> {},
  userDetail: {},
  getAllDepartment: () => { },
  fetchCenters: () => {},
  departments: [],
  centers: [],
  updateUserCenter: () => {},
};

export default NewUserRoleForm;
