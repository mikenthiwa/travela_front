import DepartmentHelper from '../departmentsHelper';

describe('TEST DepartmentHelpers() FUNCTION', () => {
  it('should run setDepartmentDropdownOptions method', () => {
    const departments = [
      { id: 2, parentId: null, text: 'Operations', parentName: null },
      { id: 1, parentId: 2, text: 'Facilities', parentName: 'Operations' },
    ];

    const response = DepartmentHelper.setDepartmentDropdownOptions(departments);

    console.log(response);
    expect(response).toEqual([
      {
        'items': ['Facilities'],
        'name': 'Operations'
      }
    ]);
  });
});
