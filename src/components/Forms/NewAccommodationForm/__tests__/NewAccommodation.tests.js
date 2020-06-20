import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import NewAccommodation from '../NewAccommodation';

describe('<NewAccommodation />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  class AutocompleteServiceMock {
    addListener(place_changed, callback) {
      callback(this.getPlace(), 'OK');
    }
    getPlace = () => {
      const components = {
        address_components: [
          { long_name: 'Las Vegas', short_name: 'Las Vegas', types: Array(2) },
          {
            long_name: 'Clark County',
            short_name: 'Clark County',
            types: ['country', 'political']
          },
          { long_name: 'Nevada', short_name: 'NV', types: Array(2) },
          { long_name: 'United States', short_name: 'US', types: Array(2) }
        ]
      };
      return components;
    };
  }
  window.url = 'http://www.goo.com';
  window.google = {
    maps: {
      places: {
        Autocomplete: AutocompleteServiceMock
      }
    }
  };

  const props = {
    createAccommodation: jest.fn(() => {}),
    fetchAccommodation: jest.fn(() => {}),
    savingAccommodation: jest.fn(),
    closeModal: jest.fn(),
    editAccommodation: jest.fn(),
    initFetchTimelineData: jest.fn(),
    guestHouse: {
      rooms: [
        {
          roomName: 'victoria',
          roomType: 'ensuite',
          bedCount: 1
        }
      ],
      houseName: 'Qwetu',
      location: 'Nairobi, Kenya',
      bathRooms: 2,
      image: 'image.com'
    },
    modalType: ''
  };

  global.FileReader = function(spy, fakeData) {
    this.fakeData = fakeData;
    this.spy = spy;
  };

  FileReader.prototype.readAsDataURL = function(file) {
    this.result = this.fakeData;
  };

  process.env.REACT_APP_CITY = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD-fvLImnNbTfYV3Pd1nJuK7NbzZJNr4ug&libraries=places';

  beforeEach(() => {
    wrapper = mount(<NewAccommodation {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should clear the form when the component unmounts', () => {
    const componentWillUnmount = jest.spyOn(
      wrapper.instance(),
      'componentWillUnmount'
    );
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  it('call event when Location is picked', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        }
      }
    };
    sinon.spy(shallowWrapper.instance(), 'handleLocation');
    shallowWrapper.instance().handleLocation(event);
    expect(shallowWrapper.instance().handleLocation.calledOnce).toEqual(true);
  });

  it('call event when input is picked', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'roomName-0'
      }
    };
    shallowWrapper.setState({
      parentIds: 0,
      rooms: [
        {
          roomName: 'Amsterdam North Holland'
        }
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'handleInputChange');
    shallowWrapper.instance().handleInputChange(event);
    expect(shallowWrapper.instance().handleInputChange.calledOnce).toEqual(
      true
    );
  });

  it('call event when input is picked', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'bedCount-0'
      }
    };
    shallowWrapper.setState({
      parentIds: 0,
      rooms: [
        {
          roomName: 'Amsterdam North Holland',
          bedCount: '2'
        }
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'handleInputChange');
    shallowWrapper.instance().handleInputChange(event);
    expect(shallowWrapper.instance().handleInputChange.calledOnce).toEqual(
      true
    );
  });

  it('call event when input is picked', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'bedCount-0'
      }
    };
    shallowWrapper.setState({
      parentIds: 0,
      rooms: []
    });
    sinon.spy(shallowWrapper.instance(), 'handleInputChange');
    shallowWrapper.instance().handleInputChange(event);
    expect(shallowWrapper.instance().handleInputChange.calledOnce).toEqual(
      true
    );
  });

  it('call event when drop down is selected', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const data = {
      name: 'roomType-0',
      parentid: 0
    };
    const choice = 'dance';
    sinon.spy(shallowWrapper.instance(), 'handleDropDown');
    shallowWrapper.instance().handleDropDown(data, choice);
    expect(shallowWrapper.instance().handleDropDown.calledOnce).toEqual(true);
  });

  it('call event when drop down is selected', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const data = {
      name: 'roomName-0',
      parentid: 0
    };
    const choice = 'dance';
    shallowWrapper.setState({
      rooms: [{}]
    });
    sinon.spy(shallowWrapper.instance(), 'handleDropDown');
    shallowWrapper.instance().handleDropDown(data, choice);
    expect(shallowWrapper.instance().handleDropDown.calledOnce).toEqual(true);
  });

  it('validates input on blur', () => {
    wrapper.find('input[name="roomName-0"]').simulate('blur');
    wrapper.update();
    expect(wrapper.state().errors['roomName-0']).toBe('This field is required');
  });

  it('validates form before sending data', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should remove room when cancel button is click', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    shallowWrapper.setState({
      rooms: [
        {
          roomName: 'lol',
          roomType: 'leke',
          bedCount: 1
        },
        {
          roomName: 'lol',
          roomType: 'leke',
          bedCount: 1
        },
        {
          roomName: 'lol',
          roomType: 'leke',
          bedCount: 1
        }
      ],
      documentId: 2
    });
    sinon.spy(shallowWrapper.instance(), 'removeRoom');
    shallowWrapper.instance().removeRoom(2);
    expect(shallowWrapper.instance().removeRoom.calledOnce).toEqual(true);
  });

  it('should submit guest house details ', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    shallowWrapper.setState({
      values: {
        houseName: 'lol',
        location: 'lol',
        bathRooms: '1',
        image: 'lol',
        preview: 'lol'
      },
      rooms: [],
      documentId: 1,
      hasBlankFields: true
    });
    const event = {
      preventDefault: jest.fn()
    };
    sinon.spy(shallowWrapper.instance(), 'handleInputSubmit');
    shallowWrapper.instance().handleInputSubmit(event);
    expect(shallowWrapper.instance().handleInputSubmit.calledOnce).toEqual(
      true
    );
  });

  it('should update state when a room is added and when it\'s removed', () => {
    expect.assertions(7);
    wrapper.instance().addRoomOnClick();
    wrapper.instance().addRoomOnClick();
    expect(wrapper.instance().state.values['roomName-1']).toBe('');
    expect(wrapper.instance().state.values['roomName-2']).toBe('');
    expect(wrapper.instance().state.documentId).toBe(3);
    wrapper.instance().removeRoom(1);
    expect(wrapper.instance().state.documentId).toBe(2);
    expect(wrapper.instance().state.values['roomName-1']).toBe('');
    expect(wrapper.instance().state.values['roomName-4']).toBe(undefined);
    expect(wrapper.instance().state.rooms).toHaveLength(2);
  });

  it('should handle Image Change', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: [
          {
            name: '57f556259d75538-a-nw-p.jpg',
            lastModified: 1517684494000,
            lastModifiedDate:
              'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)',
            webkitRelativePath: '',
            size: 212919
          }
        ]
      }
    };
    sinon.spy(shallowWrapper.instance(), 'handleImageChange');
    shallowWrapper.instance().handleImageChange(event);
    expect(shallowWrapper.instance().handleImageChange.calledOnce).toEqual(
      true
    );
  });

  it('should call handleEditFormCancel', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleEditFormCancel');
    wrapper.instance().handleEditFormCancel();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call populateRoomsDefaultStateValues', () => {
    const newProps = {...props, modalType: 'edit accommodation'};
    wrapper = shallow(
      <NewAccommodation
        {...newProps}
      />
    );
    expect(wrapper.instance().state.values['roomName-0']).toBe('victoria');
  });
});
