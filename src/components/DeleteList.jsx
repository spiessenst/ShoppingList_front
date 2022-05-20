import axios from "axios";

const DeleteList = ({ shoppingListId }) => {
  async function handleClick() {
    console.log(shoppingListId);
    await fetch(`https://wdev2.be/fs_thomass/shoppinglist/v1/list`, {
      method: "DELETE",
      body: JSON.stringify({
        shoppinglist_id: parseInt(shoppingListId),
      }),
    });
    
  }
  return (
    <button className="btn_delete" onClick={handleClick}>
      Verwijder lijst
    </button>
  );
};

export default DeleteList;
