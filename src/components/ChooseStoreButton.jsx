import { Link } from "react-router-dom";

const ChooseStoreButton = () => {
  return (
    <Link to="/ChooseStore">
      <div className="choosebutton">Kies Winkel</div>
    </Link>
  );
};

export default ChooseStoreButton;
