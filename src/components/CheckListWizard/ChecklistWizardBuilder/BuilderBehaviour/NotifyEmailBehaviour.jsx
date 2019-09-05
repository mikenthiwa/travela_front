import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Modal from '../../../modal/Modal';
import Helper from '../BuilderOptions/helper';

const schema = yup.object({
  recipient: yup.string().email('Recipient must be a valid email').required('Recipient is required'),
  template: yup.string().min(25, 'Template must be more than 25 characters').required('Template is required'),
});

class NotifyEmailBehaviour extends Component {
    
  state = {
    recipient: '',
    template: '',
    errors: null,
    touched: [],
    shouldOpen: false,
  }

  componentDidMount () {
    this.resetState();
    this.validate();
  }

  
  toggleModal = () => {
    const { shouldOpen } = this.state;
    this.setState({ shouldOpen: !shouldOpen });
  };

  
  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.validate);
  }
  
  handleCreateTemplate = () => {
    const { recipient, template } = this.state;
    const { behaviour, handleBehaviour } = this.props;
    
    handleBehaviour({ ...behaviour, payload: { ...behaviour.payload, recipient, template } });
    
    this.toggleModal();
  }

  handleTouched = (e) => {
    const { touched } = this.state;
    this.setState({ touched: [...touched, e.target.name] });
  }
  
  isErrored = (name) => {
    const { errors, touched } = this.state;
    return touched.includes(name) && errors && errors[name];
  }
  
  resetState() {
    const { behaviour: { payload: { recipient, template } } } = this.props;
    this.setState({
      recipient: recipient || '',
      template: template || '',
      touched: [],
      shouldOpen: false,
    });
  }

  validate() {
    const { recipient, template } = this.state;
    try {
      schema.validateSync({ recipient, template }, { abortEarly: false });
      this.setState({ errors: null });
    } catch (error) {
      const errors = error.inner.reduce((prev, curr) => ({ ...prev, [curr.path]: curr.message }), {});
      this.setState({ errors });
    }
  }

  renderTemplateModal = () => {
    const { recipient, template, errors, shouldOpen } = this.state;
    return (
      <Modal
        customModalStyles="notification-email"
        closeModal={this.toggleModal} width="500px"
        visibility={shouldOpen ? 'visible' : 'invisible'}
        title={`${recipient ? 'Edit' : 'Create'} Template`}
      >
        <div className="email-template-modal-wrapper">
          <div className="template-inputs-wrapper">
            <input
              type="email"
              id="emailToSend"
              name="recipient"
              className="email-template-input recipient"
              placeholder="ex. example@andela.com"
              value={recipient}
              onChange={this.handleChange}
              onKeyDown={Helper.disableInputUndoActions}
              onBlur={this.handleTouched}
            />
            {this.isErrored('recipient') && <span className="input-error">{errors['recipient']}</span>}
          </div>
          <div className="template-inputs-wrapper">
            <textarea
              name="template"
              className="email-template-input template"
              placeholder="Your message here"
              value={template}
              onChange={this.handleChange}
              onKeyDown={Helper.disableInputUndoActions}
              onBlur={this.handleTouched}
            />
            {this.isErrored('template') && <span className="input-error">{errors['template']}</span>}
          </div>
          <div className="email-template-button-wrapper">
            <button
              className="email-template-button"
              type="button"
              disabled={!!errors}
              onClick={this.handleCreateTemplate}
            >
            Create
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  render() {
    const { recipient } = this.state;
    return (
      <div className="email-template-behaviour">
        {this.renderTemplateModal()}
        <button
          type="button"
          onClick={this.toggleModal}
          className="create-email-template-button"
        >
          {`${recipient ? 'Edit' : 'Create'} Template`}
        </button>
      </div>
    );
  }
}

NotifyEmailBehaviour.propTypes = {
  behaviour: PropTypes.object.isRequired,
  handleBehaviour: PropTypes.func.isRequired,
};

export default NotifyEmailBehaviour;
