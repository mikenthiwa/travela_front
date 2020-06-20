import React from 'react';
import { PropTypes } from 'prop-types';

const DropdownOptions = (props) => {
  const { items, handleClick, getDropdownStatus, dropDownRef, handleScroll, loading } = props;
  const choiceList = items
    .map((item) => (
      <li id="choice" key={item.value || item}>
        <div
          id="choice"
          onClick={()=>handleClick(item.value || item)}
          onKeyPress={()=>{}}
          role="button"
          tabIndex="0"
        >
          {item.label || item}
        </div>
      </li>
    ));
  return (
    <ul ref={dropDownRef} onScroll={handleScroll} className={`select-menu select-menu--${getDropdownStatus()}`}>
      {choiceList}
      {loading && '...loading'}
    </ul>
  );
};

DropdownOptions.propTypes = {
  items: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  getDropdownStatus: PropTypes.func.isRequired,
  dropDownRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  handleScroll: PropTypes.func,
  loading: PropTypes.bool,
};

DropdownOptions.defaultProps = {
  dropDownRef: null,
  handleScroll: () => {},
  loading: false,
};

export default DropdownOptions;
