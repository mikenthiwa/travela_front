import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import VideoCaption from '../../images/video-caption.png';

const VideoPreview = ({item}) => {
  return (
    <div className="react-player-div">
      {
        item.videoURL ?
          (
            <ReactPlayer
              url={item.videoURL}
              className="react-player"
              width="100%"
              height="100%"
              playing={false}
              controls
            />
          ) : <img src={VideoCaption} alt="videoCaption" className="video-caption" />
      }
    </div>
  );
};

VideoPreview.propTypes = {
  item: PropTypes.object.isRequired
};

export default VideoPreview;
