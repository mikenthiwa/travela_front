import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../images/delete-icon.svg';
import './index.scss';

const DeleteIcon = ({onClick, id}) => (
  <button id={id} className="builder-delete-icon" onClick={onClick} type="button">
    <img src={deleteIcon} alt="delete-icon" />
  </button>
);

DeleteIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default DeleteIcon;
