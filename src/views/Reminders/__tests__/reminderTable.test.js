import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import reminderData from '../../../redux/__mocks__/emailReminderConditionMockData';
import ReminderTable from '../ReminderTable';


const props = {
  createdAt: '10-12-2016',
  conditionName: 'Passport Completion Email',
  user: {
    fullName: 'Olamide Danso'
  },
  activeDocument: 'passport',
  documentType: 'passport',
  setItemToDisable: jest.fn(),
  getSingleReminder: jest.fn(),
  handleViewReminderClick: jest.fn(),
  disabled: false,
  reminders: [
    {
      reasons: [],
      id: 1,
      conditionName: 'Passport Completion Email',
      disabled: false,
      user: {fullName: 'Olamide Danso'},
      documentType: 'Visa',
      createdAt: '10-12-2016'
    }
  ],
  history: {
    push: jest.fn()
  },
  disableEnable: false,
  singleReminder: {
    data: {
      conditionName: 'Visa Expiry',
      reminders: [
        {
          frequency: '2 Weeks',
          id: 1,
        }
      ]
    }
  },
  isLoading: false
};

describe('render reminder table', () => {
  it('should render reminder table', () => {

    const wrapper = mount(
      <BrowserRouter>
        <ReminderTable
          {...props}
          reminders={reminderData}
        />
      </BrowserRouter>
    );
    const table = wrapper.find('table');
    expect(table.length).toEqual(1);
  });

  it('should render table rows to allow data', () => {
    const wrapper = mount(
      <BrowserRouter>
        <ReminderTable {...props} reminders={reminderData} />
      </BrowserRouter>
    );
    const details = wrapper.find('.table__rows');
    expect(details.length).toBe(2);
  });

  it('should call setItemToDisable function when the disabled icon is clicked', () => {
    const newProps = {
      ...props,
      disabled: true
    };
    const wrapper = mount(
      <BrowserRouter>
        <ReminderTable {...{...newProps, reminders: reminderData}} />
      </BrowserRouter>
    );

    const event = { target: { preventDefault: jest.fn() } };
    const icon = wrapper.find('.tiny');

    icon.simulate('click', event);
    expect(props.setItemToDisable).toHaveBeenCalled();
  });

  describe('<ReminderDetails />', ()=> {
    it('should display reminder details on the modal when \'conditionName\' clicked', () =>{
      const newProps = {
        ...props,
        disabled: false
      };
      const wrapper = mount(
        <BrowserRouter>
          <ReminderTable {...{...newProps, reminders: reminderData}} />
        </BrowserRouter>
      );
      const reminderTable = wrapper.find('ReminderTable');
      const handleViewReminderClick = jest.spyOn(reminderTable.instance(), 'handleViewReminderClick');

      wrapper.instance().forceUpdate();

      const detail = wrapper.find('.table__rows .reminder__condition-name').at(0);
      detail.simulate('click');
      expect(handleViewReminderClick).toHaveBeenCalled();

      const reminderItems = wrapper.find('ReminderItem');
      expect(reminderItems).toHaveLength(1);
    });

    it('should close modal when cancel button is clicked', () =>{
      const newProps = {
        ...props,
        disabled: false
      };
      const wrapper = mount(
        <BrowserRouter>
          <ReminderTable {...{...newProps, reminders: reminderData}} />
        </BrowserRouter>
      );

      const reminderTable = wrapper.find('ReminderTable');
      const handleViewReminderClick = jest.spyOn(reminderTable.instance(), 'handleViewReminderClick');

      wrapper.instance().forceUpdate();

      const openModal = wrapper.find('.table__rows .reminder__condition-name').at(0);
      openModal.simulate('click');
      expect(handleViewReminderClick).toHaveBeenCalled();

      const handleCloseModal = jest.spyOn(reminderTable.instance(), 'handleCloseModal');
      wrapper.instance().forceUpdate();
      const cancelButton = wrapper.find('.table__rows #cancel').at(0);

      cancelButton.simulate('click');
      const reminderItems = wrapper.find('ReminderItem');
      expect(handleCloseModal).toHaveBeenCalled();
      expect(reminderItems).toHaveLength(0);
    });

    it('should display a loader while the table content is being fetched', () =>{
      const newProps = {
        ...props,
        disabled: false,
        isLoading: true
      };
      const wrapper = mount(
        <BrowserRouter>
          <ReminderTable {...{...newProps, reminders: reminderData}} />
        </BrowserRouter>
      );

      const reminderTableLoader = wrapper.find('ReminderPlaceHolder');
      const reminderTable = wrapper.find('ReminderTable');
      expect(reminderTableLoader).toHaveLength(1);
      expect(reminderTable).toHaveLength(0);
    });

    it('should remove a loader when the table content is fetched', () =>{
      const newProps = {
        ...props,
        disabled: false,
        isLoading: false
      };
      const wrapper = mount(
        <BrowserRouter>
          <ReminderTable {...{...newProps, reminders: reminderData}} />
        </BrowserRouter>
      );

      const reminderTableLoader = wrapper.find('ReminderPlaceHolder');
      const reminderTable = wrapper.find('ReminderTable');
      expect(reminderTableLoader).toHaveLength(0);
      expect(reminderTable).toHaveLength(1);
    });
  });

});
