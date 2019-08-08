import React from 'react';
import { shallow } from 'enzyme';
import ChecklistItems from '../ChecklistItems';
import PreviewImage from '../../CheckListWizard/ChecklistWizardPreview/PreviewImage';
import PreviewVideo from '../../CheckListWizard/ChecklistWizardPreview/PreviewVideo';

describe ('ChecklistItems Test Suite', () => {
  const props = {
    config:  {
      type: 'image',
      order: 1,
      prompt: 'Do you have a passport',
      behaviour: {},
      configuration: {
        options: [
          {
            id: 1,
            name: '',
            behaviour: {}
          }
        ]
      },
    }
  };

  const wrapper = shallow(<ChecklistItems {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should render image input type', () => {
    props.config.type = 'image';
    const wrapper = shallow(<ChecklistItems {...props} />);
    expect(wrapper.find(PreviewImage).length).toEqual(1);
  });

  it('should render video input type', () => {
    props.config.type = 'video';
    const wrapper = shallow(<ChecklistItems {...props} />);
    expect(wrapper.find(PreviewVideo).length).toEqual(1);
  });

  it('should render scale checklist type', () => {
    props.config.type = 'scale';
    const wrapper = shallow(<ChecklistItems {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: default', () => {
    props.config.type = '';
    const wrapper = shallow(<ChecklistItems {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render dropdown checklist type', () => {
    props.config.type = 'dropdown';
    const wrapper = shallow(<ChecklistItems {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render checkbox checklist type', () => {
    props.config.type = 'checkbox';
    const wrapper = shallow(<ChecklistItems {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render radio checklist type', () => {
    props.config.type = 'radio';
    const wrapper = shallow(<ChecklistItems {...props} />);
    expect(wrapper.find('div'));
  });
});
