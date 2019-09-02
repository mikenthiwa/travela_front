const DepartmentHelper = (() => {
  const setDepartmentDropdownOptions = (departments) => {
    let optionsArray = [];
    departments.map((department) => {
      if (department.parentId === null) {
        const departmentCheck = optionsArray.find((each) => {
          return department.text === each.name;
        });

        departmentCheck ? null : optionsArray.push({name: department.text, items: []});
      } else {
        const parentDepartment = optionsArray.find((each) => {
          return each.name.toLowerCase() === department.parentName.toLowerCase();
        });

        parentDepartment ? parentDepartment.items.push(department.text):
          optionsArray[optionsArray.push({name: department.parentName, items: []}) - 1].items.push(department.text);
      }
    });

    return optionsArray;
  };

  return {
    setDepartmentDropdownOptions
  };
})();

export default DepartmentHelper;
