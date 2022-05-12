import { Link } from "react-router-dom";

const ChooseStore = ({ stores, setStoreId }) => {
  function handleClick(e) {
    setStoreId(e.target.dataset.id);
  }
  return stores.map((store) => (
    <ul>
      <Link key={store.store_id} to="/AddProduct">
        <li key={store.store_id} data-id={store.store_id} onClick={handleClick}>
          {store.store_name}
        </li>
      </Link>
    </ul>
  ));
};

export default ChooseStore;
