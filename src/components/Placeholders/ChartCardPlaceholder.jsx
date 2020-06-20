import React, {Component} from 'react';
import ContentLoader from 'react-content-loader';

class ChartCardPlaceholder extends Component {
  state = {
    height: 350,
    width: 400
  };

  chart = React.createRef();


  componentDidMount() {
    this.reSize();
  }

  getParent = () => this.chart.current;

  reSize = () => {
    const parent = this.getParent();
    parent && this.setState({
      height: parent.clientHeight,
      width: parent.clientWidth
    });
  };

  render() {
    const { height, width } = this.state;
    return (
      <div className="analytics-card" ref={this.chart}>
        <ContentLoader
          height={350 || height}
          width={width}
          speed={1.5}
          primaryColor="#dfdfdf"
          secondaryColor="#ffffff"
          {...this.props}
        >
          <rect x="-0.49" y="33.69" rx="3" ry="3" width="294.49" height="14.58" />
          <circle cx="195.52" cy="177.25" r="70.77" />
          <rect x="236.63" y="82.61" rx="0" ry="0" width="108" height="11.04" />
          <rect x="274.63" y="187.61" rx="0" ry="0" width="93.96" height="10.44" />
          <rect x="41.63" y="225.61" rx="0" ry="0" width="88.56" height="9.84" />
          <rect x="21.21" y="117.61" rx="0" ry="0" width="95.04" height="11.04" />
        </ContentLoader>
      </div>
    );
  }
}

export default ChartCardPlaceholder;
