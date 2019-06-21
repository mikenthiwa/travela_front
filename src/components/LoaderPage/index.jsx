import React, {Component} from 'react';
import {shuffle} from 'lodash';
import Images from '../../images/loaders';
import travela from '../../images/travela.svg';
import './loaderBody.scss';
import './loaderAnimation.scss';
import quotes from '../../helper/loaderQuotes';

class LoaderBody extends Component{

  state = { 
    imageIndex: 0,
    quote: '',
    images: shuffle(Object.values(Images))
  };
  
  componentDidMount () {
    this.changeImage();  
  }

  changeImage = ()=> {
    const { images } = this.state;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    this.setState(({ imageIndex })=> {
      const nextImageIndex = ++imageIndex % images.length;
      return { imageIndex: nextImageIndex, quote };
    });
  }
  
  render() {
    const { imageIndex, images, quote } = this.state;
    const Image = images[imageIndex];
    
    return(
      <div className="loader-page">
        <div className="pageOverlay">
          <div className="loader__title-text">
            <div>
              <img 
                src={travela} 
                alt="Travela Logo" 
                className="loader__center-logo" 
              />
            </div>
          </div>
          <div className="loaderBody">
            <div className="logo-loader">
              <Image />
            </div>
            <p className="loader__body-text">
              {quote}
            </p>
          </div>
        </div>
      </div>

    );
  }
}

export default LoaderBody;
