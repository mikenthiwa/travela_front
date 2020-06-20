import React, {Fragment, PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import countryUtils from '../../helper/countryUtils';
import withLoading from '../Hoc/withLoading';
import CentreCard from './CentreCard';

import './CentreGrid.scss';
import ResidencePlaceholder from '../Placeholders/ResidencePlaceholder';


export class CentreGrid extends PureComponent {
  getBedCount(rooms) {
    const bedCount = rooms.reduce((room, value) => room + value.bedCount, 0);
    return bedCount;
  }

  renderNoGuestHouse(guestHouses) {
    if(guestHouses && guestHouses.length === 0) {
      return (
        <div className="table__requests--empty">
          No accommodation centres at the moment
        </div>
      );
    }
  }

  renderError(error) {
    return (
      <div className="table__requests--error">
        {error}
      </div>
    );
  }

  renderGuesthouses(guestHouses) {
    if (guestHouses && guestHouses.length > 0) {
      return (
        <div className="mdl-grid accommodation-grid">
          { guestHouses.map(guestHouse => (
            <CentreCard
              key={guestHouse.id}
              guestHouse={guestHouse}
              guesthouseId={guestHouse.id}
              cardImage={guestHouse.imageUrl}
              imageAlt={`${guestHouse.houseName} image`}
              countryFlagImage={countryUtils.getCountryFlagUrl(guestHouse.location)}
              guestHouseName={guestHouse.houseName}
              guestHouseLocation={guestHouse.location}
              beds={this.getBedCount(guestHouse.rooms)}
              bathrooms={guestHouse.bathRooms}
              disabledGuestHouse={{}}
            />))
          }
        </div>
      );
    }
  }

  renderDisabledGuesthouses(disabledGuestHouses) {
    const { handleOnRestore } = this.props;
    if (disabledGuestHouses && disabledGuestHouses.length > 0) {
      return (
        <div>
          <hr />
          <div className="disabled-title">DISABLED GUESTHOUSES</div>
          <div className="mdl-grid disabled-accommodation">
            { disabledGuestHouses.map(disabledGuestHouse => (
              <CentreCard
                key={disabledGuestHouse.id}
                guestHouse={disabledGuestHouse}
                guesthouseId={disabledGuestHouse.id}
                cardImage={disabledGuestHouse.imageUrl}
                imageAlt={`${disabledGuestHouse.houseName} image`}
                countryFlagImage={countryUtils.getCountryFlagUrl(disabledGuestHouse.location)}
                guestHouseName={disabledGuestHouse.houseName}
                guestHouseLocation={disabledGuestHouse.location}
                beds={this.getBedCount(disabledGuestHouse.rooms)}
                bathrooms={disabledGuestHouse.bathRooms}
                disabledGuestHouse={disabledGuestHouse}
                handleOnRestore={handleOnRestore}
              />
            ))
            }
          </div>
        </div>
      );
    }
  }

  render() {
    const { guestHouses, error, disabledGuestHouses } = this.props;
    return(
      <Fragment>
        { this.renderNoGuestHouse(guestHouses) }
        { this.renderGuesthouses(guestHouses) }
        { this.renderDisabledGuesthouses(disabledGuestHouses) }
        { error && this.renderError(error) }
      </Fragment>
    );
  }
}

CentreGrid.propTypes = {
  guestHouses:  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    houseName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rooms: PropTypes.array.isRequired,
    bathRooms: PropTypes.number.isRequired
  })),
  error: PropTypes.string,
  disabledGuestHouses: PropTypes.array,
  handleOnRestore: PropTypes.func.isRequired
};

CentreGrid.defaultProps = {
  guestHouses: [],
  disabledGuestHouses: [],
  error: '',
};

export default withLoading(CentreGrid, ResidencePlaceholder);
