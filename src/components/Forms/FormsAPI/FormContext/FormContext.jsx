import React, { Component} from 'react';
import { PropTypes } from 'prop-types';


export const RealFormContext = React.createContext({
  errors: {},
  values: {},
  targetForm: null,
  validatorName: 'validate'
});

class FormContext extends Component {

  formContext = React.createRef();

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

  render() {
    const { children } = this.props;
    return  (
      <RealFormContext.Provider value={{...this.props}}>
        {
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              ref: this.formContext
            });
          })
        }
      </RealFormContext.Provider>
    );
  }
}


const children = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.array
]);


FormContext.propTypes = {
  children: children.isRequired
};

FormContext.defaultProps = {
};

export default FormContext;
