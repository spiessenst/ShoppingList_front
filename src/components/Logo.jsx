import logo from "../public/img/logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="ShopRoute" className="logo__brand" />
      </Link>
    </div>
  );
};

export default Logo;
