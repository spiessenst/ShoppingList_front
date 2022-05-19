import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logo from "./components/Logo";
import Main from "./pages/Main";
import ChooseStore from "./pages/ChooseStore";
import AddProduct from "./pages/AddProduct";
import { useState, useEffect } from "react";
import axios from "axios";
import PrevLists from "./pages/PrevLists";
const App = () => {
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState(1);
  const [shoppingListId, setshoppingListId] = useState(1);
  
  const [Lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const url = `https://wdev2.be/fs_thomass/shoppinglist/v1/stores`;
        const { data } = await axios(url);

        setStores(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Router>
      <div className="container">
        <Logo />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                setshoppingListId={setshoppingListId}
                setList={setList}
                setListName={setListName}
              />
            }
          ></Route>
          <Route
            path="/AddProduct"
            element={
              <AddProduct
                setStoreId={setStoreId}
                stores={stores}
                storeId={storeId}
                shoppingListId={shoppingListId}
                list={list}
                setList={setList}
                listName={listName}
                setListName={setListName}
              />
            }
          ></Route>
          <Route
            path="/ChooseStore"
            element={
              <ChooseStore
                setStoreId={setStoreId}
                stores={stores}
                storeId={storeId}
              />
            }
          ></Route>
          <Route
            path="/PrevLists"
            element={
              <PrevLists
                Lists={Lists}
                setLists={setLists}
                setshoppingListId={setshoppingListId}
                setListName={setListName}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
