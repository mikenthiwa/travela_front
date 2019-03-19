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
    let defaultValues = {
      email: userDetail ? userDetail.email : '',
      roleName: role,
      department: '',
      departments: [],
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
    const { getAllUsersEmail } = this.props;
    getAllUsersEmail();
  }

  componentWillUnmount() {
    const { getRoleData } = this.props;
    this.handleCancel();
    getRoleData();
  }

  handleSubmit = event => {
    event.preventDefault();
    const { handleUpdateRole, updateUserCenter, userDetail, myTitle } = this.props;
    const { values } = this.state;
    const dataValue = {
      email: values.email,
      roleName: values.roleName,
      departments: values.departments
    };
    if (this.validate()) {
      let data = values;
      myTitle === 'Add User' ?
        handleUpdateRole(dataValue):
        updateUserCenter(userDetail.id, data);
    }
  };


  addDepartment = () => {
    const { values } = this.state; 
    if(values.departments.includes(values.department.trim())) {
      return toast.error('You have added that department already');
    }

    this.setState({
      values: {
        ...values,
        departments: values.departments.concat([values.department.trim()]),
        department: ''
      }
    },  this.validate
    );
  }

  removeDepartment = (i) => {
    const { values } = this.state;
    const array = values.departments;
    array.splice(i, 1);
    this.setState({ 
      values: {
        ...values,
        departments: array
      }
    }, this.validate
    );
  }

  handleCancel = () => {
    this.setState({ ...this.defaultState });
  };

  validate = field => {
    let { values, errors } = this.state;
    const { role } =  this.props;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;
    delete values.department;
    if (!values[field]) {
      errors[field] = 'This field is required';
      delete errors.department;
    } else {
      errors[field] = '';
    }
  
    hasBlankFields = Object.keys(values).some(key => !values[key]);
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });

    if(role === 'Budget Checker'  && values.departments.length < 1){
      this.setState({
        hasBlankFields:true
      });
    }
    return !hasBlankFields;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { updatingRole, role, centers, myTitle, allMails } = this.props;
    return (
      <FormContext targetForm={this} values={values} errors={errors} validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request">
          <PersonalDetailsFieldset
            values={values}
            roleName={role}
            centers={centers}
            addDepartment={this.addDepartment}
            hasBlankFields={hasBlankFields}
            removeDepartment={this.removeDepartment}
            myTitle={myTitle}
            allMails={allMails}
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
  centers: PropTypes.array.isRequired,
  myTitle: PropTypes.string.isRequired,
  updateUserCenter: PropTypes.func,
  role: PropTypes.string.isRequired,
  userDetail:  PropTypes.object,
  roleId: PropTypes.string.isRequired,
  getAllUsersEmail: PropTypes.func,
  allMails: PropTypes.array.isRequired,
};

NewUserRoleForm.defaultProps = {
  updatingRole: false,
  updateUserCenter: ()=> {},
  getAllUsersEmail: ()=> {},
  userDetail: {},
};

export default NewUserRoleForm;
