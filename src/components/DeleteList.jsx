import { Link } from "react-router-dom";

const DeleteList = ({ shoppingListId }) => {
  async function handleClick() {
    await fetch(`https://wdev2.be/fs_thomass/shoppinglist/v1/list`, {
      method: "DELETE",
      body: JSON.stringify({
        shoppinglist_id: parseInt(shoppingListId),
      }),
    });
  }
  return (
    <Link to="/">
      <button className="btn_delete" onClick={handleClick}>
        Verwijder lijst
      </button>
    </Link>
  );
};

export default DeleteList;
