import React from 'react';
import PropTypes from 'prop-types';

const personal = (props) =>{
  const { color } = props;
  return (
    <svg width="13" className="request__tab-icon" height="14" viewBox="0 0 13 14" xmlns="http://www.w3.org/2000/svg">
      <g id="Web-App" fill="none" fillRule="evenodd">
        <g
          id="Create-Request-&gt;-1-Personal-Info" transform="translate(-392 -224)"
          fill={color} fillRule="nonzero">
          <g id="top" transform="translate(300 185)">
            <g id="Group-3">
              <g id="Icon" transform="translate(92 39)">
                <path
                  d="M13,14 C13,10.3090909 10.9473684,7.21212121 8.125,6.36363636 C9.19407895,5.76969697 9.92105263,4.70909091 9.92105263,3.39393939 C9.92105263,1.52727273 8.38157895,0 6.5,0 C4.61842105,0 3.07894737,1.52727273 3.07894737,3.39393939 C3.07894737,4.66666667 3.80592105,5.76969697 4.875,6.36363636 C2.05263158,7.25454545 0,10.3090909 0,14 L13,14 Z"
                  id="Path" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

personal.propTypes ={
  color: PropTypes.string.isRequired
};

export default personal;
