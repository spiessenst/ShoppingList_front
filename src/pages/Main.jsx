import { Link } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../js/functions";
const Main = ({ setshoppingListId, setList, setListName }) => {
  async function handleClick() {
    try {
      await axios
        .post(`https://wdev2.be/fs_thomass/shoppinglist/v1/list`, {
          shoppinglist_name: "Mijn nieuwe lijst " + formatDate(new Date()),
        })
        .then(({ data }) => {
          setListName(data[0].shoppinglist_name);
          setshoppingListId(data[0].shoppinglist_id);
        })
        .finally(() => {
          setList([]);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="select">
        <Link to="/AddProduct" onClick={handleClick}>
          <div className="select__new">
            <p>Nieuwe lijst</p>
          </div>
        </Link>
        <Link to="/PrevLists">
          <div className="select__old">
            <p>Vorige lijsten</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Main;
