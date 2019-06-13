import React, { Component} from 'react';
import { PropTypes } from 'prop-types';

class FormContext extends Component {

  formContext = React.createRef();

  static childContextTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    targetForm: PropTypes.object.isRequired,
    validatorName: PropTypes.string
  };


  getChildContext() {
    const { errors, values, targetForm, validatorName } = this.props;
    return this.childContext({errors, values, targetForm, validatorName});
  }

  componentDidMount= () => {
    const { current } = this.formContext;
    if( current ){
      let input = current.querySelectorAll(
        'input:not([type="file"]):not(:disabled)'
      );
      if( input && input[0] ){
        input[0].autofocus = true;
        input[0].focus();
      }
    }
  };

  childContext = (args) => {
    return args;
  };

  render() {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        ref: this.formContext
      });
    });
  }
}


const  errors = PropTypes.object;
const values = PropTypes.object;
const  targetForm = PropTypes.object;
const validatorName = PropTypes.string;
const children = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.array
]);


FormContext.propTypes = {
  values: values,
  errors: errors,
  targetForm: targetForm,
  validatorName: validatorName,
  children: children.isRequired
};

FormContext.defaultProps = {
  validatorName: 'validate',
  values: {},
  errors: {},
  targetForm: {},
};

export default FormContext;
