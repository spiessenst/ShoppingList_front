import Department from "./Department";

const Departments = ({ departments, setDepartment }) => {
  return (
    <ul className="departments">
      {departments &&
        departments.map((department) => (
          <Department
            key={department.department_id}
            department={department}
            setDepartment={setDepartment}
          />
        ))}
    </ul>
  );
};

export default Departments;
