import React from 'react';
import { shallow, mount } from 'enzyme';
import BuilderImage from '..';

describe ('Builder image tests', () => {
  const props = {
    item: {
      id: 'kjlkd',
      name: 'awesome',
      behaviour: {},
    },
    handleItems: jest.fn(),
  };

  it('renders <BuilderImage />', () => {
    const wrapper = shallow(<BuilderImage {...props} />);
    
    expect(wrapper).toMatchSnapshot;
    expect(wrapper.find('.builder.image.wrapper').length).toEqual(1);
  });

  it('displays URL input when url button is clicked', () => {
    const wrapper = mount(<BuilderImage {...props} />);

    expect(wrapper.find('.option-button.url').length).toEqual(1);

    wrapper.find('.option-button.url').first().simulate('click');

    expect(wrapper.state().showUrlInput).toBe(true);

    expect(wrapper.find('.checklist.builder.image.url-input').length).toEqual(1);

    expect(wrapper.find('.builder-delete-icon').length).toEqual(1);

    wrapper.find('.builder-delete-icon').first().simulate('click');

    expect(wrapper.state().showUrlInput).toBe(false);
  });

  it('handles image upload', () => {
    const wrapper = mount(<BuilderImage {...props} />);

    global.FileReader = jest.fn().mockImplementation(() => {
      return {
        readAsDataURL: () => 0,
        result: 'fakeImageUrl',
        set onloadend (callback) {
          callback();
        }
      };
    });

    const event = {
      preventDefault: () => 0,
      target: {
        files: [{
          lastModified: Date.now(),
          lastModifiedDate: new Date(),
          name: 'testfile.jpg',
          size: 100948,
          type: 'image/jpeg'
        }]
      }
    };

    wrapper.instance().handleImageUpload(event);
    wrapper.update();

    expect(wrapper.find('.checklist.builder.image.upload-name').length).toEqual(0);

  });

  it('handles URL input', () => {
    const wrapper = mount(<BuilderImage {...props} />);

    expect(wrapper.find('.option-button.url').length).toEqual(1);

    wrapper.find('.option-button.url').first().simulate('click');

    expect(wrapper.state().showUrlInput).toBe(true);

    expect(wrapper.find('.checklist.builder.image.url-input').length).toEqual(1);

    props.handleItems.mockClear();

    wrapper.find('.image-upload-url-input').first().simulate('change', { target: { value: 'some' } } );

    expect(wrapper.props().handleItems).toHaveBeenCalledTimes(1);
  });

  it('resets state when input clears', () => {
    const wrapper = mount(<BuilderImage {...props} />);

    expect(wrapper.find('.option-button.url').length).toEqual(1);

    wrapper.find('.option-button.url').first().simulate('click');

    expect(wrapper.state().showUrlInput).toBe(true);

    expect(wrapper.find('.checklist.builder.image.url-input').length).toEqual(1);

    wrapper.setProps({ ...props, item: { ...props.item, imageURL: 'some' } });

    wrapper.setProps({ ...props, item: { ...props.item, imageURL: '' } });

    expect(wrapper.state().showUrlInput).toBe(false);
  });
});
