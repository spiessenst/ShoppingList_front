const Department = ({
  department: { department_id, department_name },
  setDepartment,
}) => {
  function handleClick(e) {
    setDepartment(e.target.dataset.id);
  }
  return (
    <li
      className="departments__item"
      data-id={department_id}
      key={department_id}
      onClick={handleClick}
    >
      {department_name}
    </li>
  );
};

export default Department;
