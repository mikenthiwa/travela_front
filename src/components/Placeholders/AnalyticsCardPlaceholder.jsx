import React, {Component} from 'react';
import ContentLoader from 'react-content-loader';

class AnalyticsCardPlaceholder extends Component {

  state = {
    width: 400,
    height: 250
  };

  card = React.createRef();

  componentDidMount() {
    this.reSize();
  }

  getContainer = () => this.card.current;

  reSize = () => {
    const parent = this.getContainer();
    parent && this.setState({
      width: parent.clientWidth,
      height: parent.clientHeight
    });
  };

  render() {
    const {width, height} = this.state;
    return (
      <div className="analytics-card" ref={this.card}>
        <ContentLoader
          speed={1.5}
          height={height}
          width={width}
          primaryColor="#dfdfdf"
          secondaryColor="#ffffff"
          preserveAspectRatio="none"
          {...this.props}
        >
          <rect x="-0.49" y="33.69" rx="3" ry="3" width="294.49" height="14.58" />
          <rect x="3.63" y="78.61" rx="0" ry="0" width="386.85" height="192.31" />
          <rect x="205.72" y="17.61" rx="0" ry="0" width="0" height="0" />
        </ContentLoader>
      </div>
    );
  }
}

export default AnalyticsCardPlaceholder;
