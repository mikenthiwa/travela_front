import React, { Component, Fragment } from 'react';
import Tab from './Tab';
import '../Forms/NewRequestForm/TravelCosts/TravelCosts.scss';

class TabView extends Component {
  state = {
    current: 0
  };

  componentWillReceiveProps = nextProps => {
    const { current } = this.state;
    const { currentTab: newCurrent } = nextProps;
    if (current != newCurrent) {
      this.setState({ current: newCurrent });
    }
  };

  changeTab = index => {
    const { handleTabChange, tabs } = this.props;
    this.setState({ current: index });
    handleTabChange && handleTabChange(index);
  };

  render() {
    const { tabs, children } = this.props;
    const { current } = this.state;
    return (
      <Fragment>
        <div className="travel-cost-header-container">
          {tabs
            ? tabs.map((tab, index) => (
              <Tab
                key={`Tab ${index + 1}`}
                {...tab}
                onClick={() => this.changeTab(index)}
                active={index === current}
              />
            ))
            : ''}
        </div>
        <div className="line" />
        <div className="travel-cost-body-container">{children[current]}</div>
      </Fragment>
    );
  }
}

export default TabView;
