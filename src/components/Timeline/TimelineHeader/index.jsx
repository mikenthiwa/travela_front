import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import ArrowIcon from './ArrowIcon';
import {timelineViewTypeChoices} from '../settings';
import dropdownIcon from '../../../images/icons/dropdown_inactive.svg';
import activeDropdownIcon from '../../../images/icons/dropdown_active.svg';
import './TimelineHeader.scss';

class TimelineHeader extends PureComponent {

  static propTypes = {
    currentTimelineViewType: PropTypes.string,
    selectedTimeDisplay: PropTypes.string,
    showChoices: PropTypes.bool,
    onNavigateTime: PropTypes.func.isRequired,
    changeTimelineViewType: PropTypes.func.isRequired,
    toggleChoices: PropTypes.func.isRequired,
    goToToday: PropTypes.func
  }

  static defaultProps = {
    currentTimelineViewType: 'month',
    showChoices: false,
    selectedTimeDisplay: '',
    goToToday: ()=>{}
  }

  handleItemBlur = () => {
    const {toggleChoices, showChoices} = this.props;
    if (showChoices)
      toggleChoices();
  }

  getChangePeriodHandler = (type) => {
    return () => {
      const {onNavigateTime} = this.props;
      onNavigateTime(type);
    };
  }

  getChangeViewTypeHandler = (choice) => {
    const {changeTimelineViewType} = this.props;
    return () => changeTimelineViewType(choice.value);
  }

  generateViewTypeChoices = () => {
    const {showChoices} = this.props;
    const status = showChoices
      ? 'active'
      : 'inactive';
    return (
      <div className={`timeline-view-choices choices-${status}`}>
        {
          timelineViewTypeChoices.map(choice => (
            <div
              key={choice.value}
              onClick={this.getChangeViewTypeHandler(choice)}
              role="presentation"
              className={`timeline-view-choice ${choice.value}`}
            >
              {choice.label}
            </div>
          ))
        }
      </div>
    );
  }

  renderViewTypeChoicesSelector = () => {
    const {toggleChoices, currentTimelineViewType} = this.props;
    return (
      <div
        className="timeline-view-type-selector selector"
        onKeyUp={()=>{}}
        onFocus={toggleChoices}
        onBlur={this.handleItemBlur}
        tabIndex="0"
        role="menu"
      >
        <span className="timeline-view-type value">
          {currentTimelineViewType}
        </span>
        <ArrowIcon
          iconClass="view-type-selector dropdown-icon"
          iconSrc={dropdownIcon}
        />
        {this.generateViewTypeChoices()}
      </div>
    );
  }

  renderTimelinePeriodNavigator = () => {
    const {selectedTimeDisplay, goToToday} = this.props;
    return (
      <div className="timeline-period-selector selector">
        <span className="timeline-period value">
          {selectedTimeDisplay}
        </span>
        <div className="timeline-navigator">
          <ArrowIcon
            iconClass="timeline-navigator--previous"
            iconSrc={activeDropdownIcon}
            onClickIcon={this.getChangePeriodHandler('decrement')}
          />
          <ArrowIcon
            iconClass="timeline-navigator--next"
            iconSrc={activeDropdownIcon}
            onClickIcon={this.getChangePeriodHandler('increment')}
          />
        </div>
        <div
          className="go-to-today"
          role="button"
          onKeyUp={()=>{}}
          onFocus={()=>{}}
          tabIndex="-1"
          onClick={goToToday}
        >
          Today
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="timeline__body__header">
        {this.renderTimelinePeriodNavigator()}
        {this.renderViewTypeChoicesSelector()}
      </div>
    );
  }
}

export default TimelineHeader;
