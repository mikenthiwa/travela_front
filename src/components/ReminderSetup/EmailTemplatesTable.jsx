import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import TemplatesMenu from './TemplatesMenu';
import RequestPlaceholder from '../Placeholders/RequestsPlaceholder';

export const TemplatesTableHead = () => (
  <thead>
    <tr>
      <th className="mdl-data-table__cell--non-numeric table__head">Template Name</th>
      <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left"><span /></th>
      <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">Created By</th>
      <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left"><span /></th>
      <th className="mdl-data-table__cell--non-numeric table__head">Created On</th>
      <th className="mdl-data-table__cell--non-numeric table__head" />
    </tr>
  </thead>
);

export const AlertIcon = (visible) => visible?<i className="tiny material-icons">error</i>:'';

export const TemplatesTableRow = ({ template, templateName, createdBy, createdOn, isDeleted, onClick, setItemToDisable }) => (
  <tr className={`table__rows ${isDeleted?'off':''}`}>
    <td className={`mdl-data-table__cell--non-numeric table__data ${isDeleted?'':'readiness__cell-name'}`}>
      <span
        className="template-name"
        onClick={onClick}
        role="presentation"
      >
        {templateName}
      </span>
      {AlertIcon(isDeleted, template, setItemToDisable)}
    </td>
    <td className="mdl-data-table__cell--non-numeric table__data"><span /></td>
    <td className="mdl-data-table__cell--non-numeric table__data">{createdBy}</td>
    <td className="mdl-data-table__cell--non-numeric table__data"><span /></td>
    <td className="mdl-data-table__cell--non-numeric table__data">
      {moment(new Date(createdOn)).format('DD-MM-YYYY')}
    </td>
    <td className="table__data">
      <TemplatesMenu disableEnable={isDeleted} template={template} setItemToDisable={setItemToDisable} />
    </td>
  </tr>
);


export const TemplatesTableBody = ({ templates, openModal, fetchOneTemplate, setItemToDisable }) => {

  const handleClick = (id) => {
    openModal(true, 'template details');
    fetchOneTemplate(id);
  };

  return(
    <tbody className="table__body">
      {
        templates.map(template => {
          return (
            <TemplatesTableRow
              key={template.id}
              template={template}
              templateName={template.name}
              createdBy={template.creator.fullName}
              createdOn={template.createdAt}
              isDeleted={template.disabled}
              onClick={() => handleClick(template.id)}
              setItemToDisable={setItemToDisable}
            />
          );
        })
      }
    </tbody>
  );
};

export const EmailTemplatesTable = ({ templates , openModal, fetchOneTemplate, setItemToDisable}) => (
  <div className="list-templates">
    <div className="table__container">
      <table className="mdl-data-table mdl-js-data-table readiness-table">
        <TemplatesTableHead />
        <TemplatesTableBody
          templates={templates}
          openModal={openModal}
          fetchOneTemplate={fetchOneTemplate}
          setItemToDisable={setItemToDisable}
        />
      </table>
    </div>
  </div>
);

EmailTemplatesTable.propTypes = {
  templates: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  fetchOneTemplate: PropTypes.func.isRequired,
  setItemToDisable: PropTypes.func.isRequired,
};

TemplatesTableBody.propTypes = {
  templates: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  fetchOneTemplate: PropTypes.func.isRequired,
  setItemToDisable: PropTypes.func.isRequired,
};

TemplatesTableRow.propTypes = {
  templateName: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  template: PropTypes.object.isRequired,
  setItemToDisable: PropTypes.func.isRequired,
};

export default withLoading(EmailTemplatesTable, RequestPlaceholder);
