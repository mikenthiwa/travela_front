import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import selectDropDownIcon from '../../images/icons/form_select_dropdown.svg';
import './LocationDropDown.scss';

class LocationDropDown extends PureComponent {
  state = {
    dropDown: false,
    location: 'All Locations',
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.urlLocation.search  === '') return {location: 'All Locations'};
    return null;
  }

  handleDropDown = (e) => {
    e.preventDefault;
    const {dropDown} = this.state;
    this.setState({ dropDown: !dropDown});
  }

  selectDropDown = (e, center) => {
    e.preventDefault;
    const { getCenter } = this.props;
    this.setState({ location: center });
    getCenter(center);
    localStorage.setItem('center', center);
  }
  
  render() {
    let { dropDown, location } = this.state;
    const { centers, urlLocation } = this.props;
    const newCenter = centers.slice();
    const showDropDown = ['/requests/my-verifications', '/dashboard', '/trip-planner/checklists'];
    const { pathname } = urlLocation;
    location !== 'All Locations' ?  newCenter.push('All Locations') : null;
    return (
      <div>
        {
          showDropDown.includes(pathname) ?
            (
              <div className="mdl-search locationbar__location">

                <div className="locationbar__location-box">
                  <div className="location_circle" />
                  <div className="location_circle_inner" />
                </div>
      
                <div 
                  className="locationbar__location-box" 
                  role="presentation"
                  onKeyDown={this.keyPress}
                  onClick={this.handleDropDown}>
                  <div className="location_line" />

                  <div className="dropDown">
                    <input
                      id="search"
                      className="dropBtn"
                      type="text"
                      disabled
                      placeholder={location}
                    />
                    <img 
                      src={selectDropDownIcon} 
                      alt="icn" 
                      className="locationbar__location-icon" />
                    <ul className="dropDown-content" style={{ display: dropDown ? 'block': null }}>
                      {
                        newCenter.map((center) => 
                          (
                            <li
                              className="content dropDown-hover" 
                              onKeyDown={this.keyPress}
                              role="presentation"
                              onClick={e => this.selectDropDown(e, center)} 
                              key={center}>
                              {center}
                            </li>)
                        )
                      }
                    </ul>
                  </div>
                </div>
              </div>
            ): null
        }
      </div>
    );
  }
}

LocationDropDown.propTypes = {
  centers:  PropTypes.array.isRequired,
  urlLocation: PropTypes.shape({}).isRequired,
  getCenter: PropTypes.func.isRequired,
};
export default LocationDropDown;
