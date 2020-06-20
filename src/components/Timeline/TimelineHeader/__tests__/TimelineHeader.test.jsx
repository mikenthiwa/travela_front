import React from 'react';
import TimelineHeader from '..';


const props = {
  currentTimelineViewType: 'month',
  selectedTimeDisplay: 'January 2018',
  showChoices: false,
  onNavigateTime: jest.fn(),
  changeTimelineViewType: jest.fn(),
  toggleChoices: jest.fn(),
  goToToday: jest.fn(),
};

describe('<TimelineHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <TimelineHeader {...props} />
    );
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('closes the choices dropdown on blur when it\'s open', () => {
    expect.assertions(2);
    const viewTypeDropdownButton = wrapper.find('.timeline-view-type-selector');
    const blurHandler = viewTypeDropdownButton.prop('onBlur');
    // when closed
    blurHandler();
    expect(props.toggleChoices).toHaveBeenCalledTimes(0);
    // when open
    wrapper.setProps({showChoices: true});
    blurHandler();
    expect(props.toggleChoices).toHaveBeenCalledTimes(1);
  });

  it('calls the changeTimelineViewType handler with correct argument(s)', () => {
    expect.assertions(2);
    const timelineWeekChoice = wrapper.find('.timeline-view-choice.week');
    const onChangeViewType = timelineWeekChoice.prop('onClick');
    onChangeViewType();
    expect(props.changeTimelineViewType).toHaveBeenCalledTimes(1);
    expect(props.changeTimelineViewType).toHaveBeenCalledWith('week');
  });

  it('calls the navigate time handler with correct argument(s)', () => {
    expect.assertions(2);
    // find the ArrowIcon component whose iconClass prop ends with "next"
    const nextPeriodComponent = wrapper.find('ArrowIcon[iconClass$="next"]');
    // dive to render the actual button and get it by it's className
    const nextPeriodButton = nextPeriodComponent
      .dive()
      .find('.timeline-navigator--next');
    // simulate a click
    const onChangePeriod = nextPeriodButton.prop('onClick');
    onChangePeriod();
    expect(props.onNavigateTime).toHaveBeenCalledTimes(1);
    expect(props.onNavigateTime).toHaveBeenCalledWith('increment');
  });

  it('calls go to today handler on click go-to-today', () => {
    const goToTodayButton = wrapper.find('.go-to-today');
    const clickListener = goToTodayButton.prop('onClick');
    clickListener();
    expect(props.goToToday).toHaveBeenCalledTimes(1);
  });
});
