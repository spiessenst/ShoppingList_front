import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const PrevLists = ({ Lists, setshoppingListId, setLists, setListName }) => {
  useEffect(() => {
    (async () => {
      try {
        const url = `https://wdev2.be/fs_thomass/shoppinglist/v1/lists`;
        const { data } = await axios(url);
        setLists(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [Lists]);
  function handleClick(e) {
    setshoppingListId(e.target.dataset.id);

    setListName(
      Lists.filter((list) => list.shoppinglist_id == e.target.dataset.id)[0]
        .shoppinglist_name
    );
  }
  return (
    <ul className="lists">
      {Lists &&
        Lists.map((list) => (
          <Link key={list.shoppinglist_id} to="/AddProduct">
            <li
              className="lists__item"
              data-id={list.shoppinglist_id}
              onClick={handleClick}
            >
              <span>
                {list.shoppinglist_name} {list.shoppinglist_id}
              </span>
            </li>
          </Link>
        ))}
    </ul>
  );
};

export default PrevLists;
