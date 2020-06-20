import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import ListEmailTemplates from '../ListEmailTemplates';
import listOfTemplates from '../../../views/ReminderSetup/__mocks__/ReminderSetup';

describe('<ListEmailTemplates />', () => {
  const {templates, pagination} = listOfTemplates;
  const props = {
    id: null,
    history: {
      push: jest.fn()
    },
    fetchTemplates: jest.fn(),
    fetchOneTemplate: jest.fn(),
    setItemToDisable: jest.fn(),
    disableEnable: false,
    listEmailTemplatesReducer: {
      pagination: {
        pageCount: 3,
        currentPage: 3
      },
      templates: [{
        id: 1,
        name: '',
        creator : {
          fullName: ''
        },
        createdAt: '2019-01-21T07:33:26.123Z',
        updatedAt: '2019-01-21T07:33:26.123Z',
        deletedAt: null,
        disabled: true,
      }]
    },
    location: {},
    openModal: jest.fn()
  };
  const wrapper =  mount(<MemoryRouter><ListEmailTemplates {...props} /></MemoryRouter>);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the onclick function', ()=>{
    wrapper.find('span.template-name').first().simulate('click');
    expect(props.openModal).toHaveBeenCalled();
  });

  it('calls onPageChange function', () => {
    wrapper.find('#next-button').simulate('click');
    expect(props.fetchTemplates).toHaveBeenCalled();
  });

  it('should display a loader while the table content is being fetched', () =>{
    const wrapper = mount(
      <ListEmailTemplates
        {...{ ...props, isLoading: true }}
      />
    );
    const reminderTemplateTableLoader = wrapper.find('ReminderTemplatePlaceholder');
    const reminderTemplateTable = wrapper.find('EmailTemplatesTable');
    expect(reminderTemplateTableLoader).toHaveLength(1);
    expect(reminderTemplateTable).toHaveLength(0);
  });
});

