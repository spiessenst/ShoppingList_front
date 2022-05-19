import { Link } from "react-router-dom";

const ChooseStoreButton = ({ storeName }) => {
  return (
    <Link to="/ChooseStore">
      <div className="choosebutton">
        {!storeName ? "Kies winkel" : `Geselecteerde winkel is: ${storeName}`}
      </div>
    </Link>
  );
};

export default ChooseStoreButton;
