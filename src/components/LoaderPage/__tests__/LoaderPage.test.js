
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import LoaderBody from '..';


describe('<LoaderBody />', () => {
  let wrapper;
  beforeEach(() => {
    Object.defineProperty(window, 'clearTimeout', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });

    wrapper = mount(
      <LoaderBody />
    );
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
 
  it('should always render before data is fetched',() => {
    expect(wrapper.find('.pageOverlay').length).toBe(1);
    expect(wrapper.find('.loader__title-text div')).toHaveLength(1);
    expect(wrapper.find('p.loader__body-text')).toHaveLength(1);
  });

  it('changeImage works as expected', () => {
    expect(wrapper.instance().state.imageIndex).toEqual(1);

    wrapper.instance().changeImage();

    expect(wrapper.instance().state.imageIndex).toEqual(2);
  });
});
