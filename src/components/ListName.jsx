import axios from "axios";

export const ListName = ({ listName, setListName, shoppingListId }) => {
  async function handleBlur(e) {
    await axios
      .patch(`https://wdev2.be/fs_thomass/shoppinglist/v1/list`, {
        shoppinglist_id: shoppingListId,
        shoppinglist_name: document.querySelector(".listName").innerHTML,
      })

      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <p
      className="listName"
      contentEditable={true}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
    >
      {listName}
    </p>
  );
};
