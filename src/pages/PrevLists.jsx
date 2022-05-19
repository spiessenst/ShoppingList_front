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
  }, []);
  function handleClick(e) {
    setshoppingListId(e.target.dataset.id);
    
    setListName(
      Lists.filter((list) => list.shoppinglist_id == e.target.dataset.id)[0]
        .shoppinglist_name
    );
   // console.log(e.target.dataset.id);
  }
  return (
    <ul>
      {Lists &&
        Lists.map((list) => (
          <Link key={list.shoppinglist_id} to="/AddProduct">
            <li data-id={list.shoppinglist_id} onClick={handleClick}>
              {list.shoppinglist_name}
            </li>
          </Link>
        ))}
    </ul>
  );
};

export default PrevLists;
