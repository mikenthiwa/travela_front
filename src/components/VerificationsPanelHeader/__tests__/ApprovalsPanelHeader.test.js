import React from 'react';
import ApprovalsPanelHeader from '../index';

it('should render approvals header correctly', () => {
  const wrapper =  shallow(
    <ApprovalsPanelHeader
      url="/status=open"
      fetchApprovals={()=>{}}
      getApprovalsWithLimit={()=>{}}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
