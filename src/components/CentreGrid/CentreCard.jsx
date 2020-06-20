import React, { PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FemaleIcon from '../../images/icons/Female-grey.svg';
import MaleIcon from '../../images/icons/Male-grey.svg';
import UnisexIcon from '../../images/icons/Unisex-grey.svg';
import Button from '../buttons/Buttons';
import bedIcon from '../../images/icons/accomodation-grey.svg';
import bathroomIcon from '../../images/icons/hot_tub_24px.svg';
import defaultImage from '../../images/default-image.jpg';
import Utils from '../../helper/Utils';
import './CentreCard.scss';

class CentreCard extends PureComponent {

  static propTypes = {
    cardImage: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    countryFlagImage: PropTypes.string.isRequired,
    guestHouseName: PropTypes.string.isRequired,
    guestHouseLocation: PropTypes.string.isRequired,
    beds: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    guesthouseId: PropTypes.string.isRequired,
    disabledGuestHouse: PropTypes.object.isRequired,
    handleOnRestore: PropTypes.func,
    guestHouse: PropTypes.object.isRequired
  };
  static defaultProps = {
    handleOnRestore: () => null
  }
  

  genderPolicy = {
    Unisex: UnisexIcon,
    Female: FemaleIcon,
    Male: MaleIcon
  }
  
  handleClick(e) {
    e.preventDefault();
  }
  
  renderCentreFacilities(icon, facility, facilityNumber) {
    return (
      <div className="centre__icon-container">
        <img src={icon} alt={`${facility} number`} className="centre__icon" />
        <span className="centre__facility-number">{facilityNumber}</span>
        {Utils.formatWord(facility, facilityNumber)}
      </div>
    );
  }

  renderCentreImage(image, imageAlt) {
    return (
      <div className="mdl-card__media centre-card__image">
        <img
          src={image}
          alt={imageAlt}
          className="centre__image"
          onError={(e) => e.target.src = defaultImage} />
      </div>
    );
  }

  renderCentreFlag(guestHouseLocation, flagImage) {
    return (
      <div
        className="centre__flag"
        style={{backgroundImage: `url(${flagImage})`}}
        alt={`${guestHouseLocation} flag`}
      />
    );
  }

  renderCentreInfo(houseName, location) {
    return (
      <div>
        <p className="centre__name">
          {houseName}
        </p>
        <span className="centre__location">{location}</span>
      </div>
    );
  }

  renderRestoreButton() {
    const { handleOnRestore, guesthouseId } = this.props;
    return (
      <Button
        buttonClass="restore-acc-btn"
        onClick={() => handleOnRestore(guesthouseId)}
        text="Restore"
      />
    );
  }

  render() {
    const { cardImage, imageAlt, countryFlagImage, guestHouseName, guestHouseLocation, beds,
      bathrooms, guesthouseId, disabledGuestHouse, guestHouse } = this.props;
    return (
      <div className={disabledGuestHouse.id ? 
        'mdl-cell mdl-cell--4 mdl-card centre-card-disabled' 
        : 'mdl-cell mdl-cell--4 mdl-card centre-card'}>
        <Link
          to={`/residence/manage/guest-houses/${guesthouseId}`} 
          onClick={disabledGuestHouse.id ? this.handleClick : ()=>null}
          id="thisGuesthouseLink"
        >
          { this.renderCentreImage(cardImage, imageAlt)}
          { disabledGuestHouse.id ? this.renderRestoreButton() : '' }
          <div className="mdl-card__supporting-text centre-info">
            <div className="centre-info__container">
              {this.renderCentreFlag(guestHouseLocation, countryFlagImage)}
              {this.renderCentreInfo(guestHouseName, guestHouseLocation)}
            </div>
          </div>
          <div className="mdl-card__actions centre__description">
            <div className="centre__horizontal-line" />
            <div className="centre__facility">
              {this.renderCentreFacilities(bedIcon, 'Bed', beds)}
              <img src={`${this.genderPolicy[guestHouse.genderPolicy]}`} alt={guestHouse.genderPolicy} title={guestHouse.genderPolicy} />
              {this.renderCentreFacilities(bathroomIcon, 'Bathroom', bathrooms)}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default CentreCard;
