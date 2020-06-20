import React from 'react';
import {mount} from 'enzyme';
import VideoPreview from '../';

describe('React player', () => {
  it('plays video with provided URL', () => {
    let props = {
      item: {
        videoURL: 'https://www.youtube.com/watch?v=-6mp75Tx9Q8'
      }
    }
    mount(<VideoPreview {...props} />);
  });
})
