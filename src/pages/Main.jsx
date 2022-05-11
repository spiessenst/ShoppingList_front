import { Link } from "react-router-dom";
const Main = () => {
  return (
    <>
      <div className="select">
        <Link to="/AddProduct">
          <div className="select__new">
            <p>Nieuwe lijst</p>
          </div>
        </Link>
        <div className="select__old">
          <p>Vorige lijsten</p>
        </div>
      </div>
    </>
  );
};

export default Main;
