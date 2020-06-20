import React from 'react';
import PropTypes from 'prop-types';
import image from '../../images/errorBoundary.svg';
import './Animation.scss';

const Animation = ({ children = '', attributeName }) => {
  return (
    <animate
      attributeName={attributeName}
      values={children}
      keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.825; 1"
      dur="1s"
      repeatCount="indefinite"
    />
  );
};

const Person = ({ stroke, strokeWidth}) => {
  return (
    <div className="person">
      <svg width="360" height="520" viewBox="0 0 360 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path stroke={stroke} strokeWidth={strokeWidth}>
          <Animation>
            M 130 55 C 130 55, 140 140, 107 270; M 130 90 C 130 90, 140 150, 110 300;
            M 130 130 C 130 130, 140 190, 100 330; M 130 85 C 130 85, 140 190, 110 305;
            M 130 85 C 130 85, 140 190, 100 280; M 130 85 C 130 85, 140 190, 105 300;
            M 130 90 C 130 90, 140 150, 110 335; M 130 90 C 130 90, 140 150, 110 300;
            M 130 55 C 130 55, 140 140, 107 270;
          </Animation>
        </path>
        <path className="leftHand" stroke={stroke} strokeWidth={strokeWidth}>
          <Animation>
            M 130 120 C 130 120, 50 170 , 115 260; M 130 150 C 130 150, 20 190, 80 280;
            M 130 190 C 130 190, 20 200, 50 310; M 130 170 C 130 170, 80 230, 120 325;
            M 130 130 C 130 130, 80 280, 210 215; M 130 150 C 130 150, 150 300, 235 185;
            M 130 170 C 130 170, 170 340 , 230 200; M 140 130 C 140 130, 110 200 , 120 300;
            M 130 120 C 130 120, 50 170 , 115 260;
          </Animation>
        </path>
        <path className="rightHand" stroke={stroke} strokeWidth={strokeWidth}>
          <Animation>
            M 140 105 C 120 105, 100 260 , 200 210; M 130 150 C 130 150, 160 330 , 220 180;
            M 130 190 C 130 190, 170 350 , 230 190; M 130 170 C 130 170, 70 250 , 150 320;
            M 130 130 C 130 130, 40 190 , 100 290; M 130 160 C 130 160, 30 170 , 75 275;
            M 130 180 C 130 180, 30 200 , 45 305; M 140 140 C 140 140, 100 200 , 125 310;
            M 140 105 C 120 105, 100 260 , 200 210;
          </Animation>
        </path>
        <path className="leftLeg" stroke={stroke} strokeWidth={strokeWidth}>
          <Animation>
            M 107 265 C 107 265, 250 320, 130 355 l 15 35; M 110 300 C 110 300, 160 400, 160 460 l 40 -20;
            M 100 330 C 100 330, 170 400, 130 480 l 30 0; M 110 300 C 110 300, 120 400, 80 475 l 35 0;
            M 100 280 C 100 280, 90 360, 40 435 l 35 40; M 106 295 C 106 295, 90 400, 25 450 l 30 30;
            M 110 320 C 110 320, 130 420, 50 400 l 0 40; M 110 295 C 110 295, 190 370, 100 370 l 10 35;
            M 107 265 C 107 265, 250 320, 130 355 l 15 35;
          </Animation>
        </path>
        <path className="rightLeg" stroke={stroke} strokeWidth={strokeWidth}>
          <Animation>
            M 107 265 C 107 265, 95 360, 40 440 l 27 30; M 110 300 C 110 300, 90 400, 25 450 l 30 40;
            M 100 325 C 100 325, 100 400, 40 400 l 0 40; M 110 300 C 110 300, 190 400, 75 370 l 0 35;
            M 100 280 C 100 280, 250 350, 125 380 l 20 35; M 106 295 C 106 295, 170 400, 160 460 l 40 -20;
            M 106 320 C 106 320, 170 370, 130 480 l 40 0; M 110 295 C 110 295, 115 370, 90 470 l 40 0;
            M 107 265 C 107 265, 95 360, 40 440 l 27 30;
          </Animation>
        </path>
        <ellipse className="head" cx="130" cy="55" rx="30" ry="55" fill={stroke}>
          <Animation attributeName="cy">
            55; 70; 110; 85; 65; 75; 110; 70; 55;
          </Animation>
        </ellipse>
        <ellipse cx="130" cy="480" rx="100" ry="15" fill="#3359DB" fillOpacity="0.12" />
      </svg>
    </div>
  );
};


const ErrorBoundaryImage = () => {
  return (
    <div className="error-boundary-image">
      <Person />
      <img src={image} alt="" />
    </div>
  );
};


Person.propTypes = {
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string
};

Person.defaultProps = {
  stroke: '#3359DB',
  strokeWidth: '10'
};

Animation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
  attributeName: PropTypes.string
};

Animation.defaultProps = {
  attributeName: 'd'
};

export default ErrorBoundaryImage;
