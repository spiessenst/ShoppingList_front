import axios from "axios";
import { useState, useEffect } from "react";
import Add from "../components/Add";
import List from "../components/List";
import Departments from "../components/Departments";
import ChooseStoreButton from "../components/ChooseStoreButton";
import { ListName } from "../components/ListName";
import DeleteList from "../components/DeleteList";

const AddProduct = ({
  stores,
  setStoreId,
  storeId,
  shoppingListId,
  list,
  setList,
  listName,
  setListName,
  newList,
}) => {
  const [products, setProducts] = useState([]);
  const [newproduct, setNewProduct] = useState("");
  const [product, setProduct] = useState("");
  const [storeName, setStoreName] = useState("");
  const [showDepartments, setShowDepartments] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState();

  useEffect(
    () => () => {
      renderList();
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        //staat het al in de lijst ?
        const listfind = list.find(
          (listitem) => listitem.product_id == product.id
        );
        //als het niet in de lijst staat voeg toe
        !listfind &&
          product.id != null &&
          (await axios
            .post(`https://wdev2.be/fs_thomass/shoppinglist/v1/listproduct`, {
              shoppinglist_id: shoppingListId,
              product_id: product.id,
              store_id: storeId,
            })
            .catch(function (error) {
              console.log(error);
            }));
        renderList();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [product]);

  useEffect(() => {
    (async () => {
      // is het een nieuw product laat de deparments lijst zien en voeg toe
      newproduct && setShowDepartments(true);
      try {
        if (department) {
          await axios
            // product toevoegen bij productenlijst
            .post(`https://wdev2.be/fs_thomass/shoppinglist/v1/product`, {
              product_name: newproduct.toLowerCase(),
              department_id: department,
            })
            .then(({ data }) =>
              axios.post(
                //product aan lijst toevoegen
                `https://wdev2.be/fs_thomass/shoppinglist/v1/listproduct`,
                {
                  shoppinglist_id: shoppingListId,
                  product_id: data[0].product_id,
                  store_id: storeId,
                }
              )
            )
            .catch(function (error) {
              console.log(error);
            });

          setNewProduct("");
          setDepartment();
          setShowDepartments(false);
          renderList();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [newproduct, department]);

  useEffect(() => {
    (async () => {
      try {
        //haal de producten op
        const url = `https://wdev2.be/fs_thomass/shoppinglist/v1/products`;
        const { data } = await axios(url);
        setProducts(data);
        renderList();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [newproduct, storeId]);

  useEffect(() => {
    (async () => {
      try {
        //haal departments op
        const url = `https://wdev2.be/fs_thomass/shoppinglist/v1/departments`;
        const { data } = await axios(url);
        setDepartments(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function renderList() {
    try {
      //render de juiste lijst voor de geselecteerde winkel
      const url = `https://wdev2.be/fs_thomass/shoppinglist/v1/list/${shoppingListId}/${storeId}`;
      const { data } = await axios(url);
      if (data == null) {
        setList([]);
      } else {
        data && data != null && setList(data.items);
        data && data != null && setStoreName(data.store.store_name);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleIncrement(e) {
    await axios
      // qty +
      .put(`https://wdev2.be/fs_thomass/shoppinglist/v1/listproduct`, {
        shoppinglist_id: shoppingListId,
        store_id: storeId,
        product_id: e.target.dataset.id,
        qty: parseInt(e.target.dataset.qty) + 1,
      })

      .catch(function (error) {
        console.log(error);
      });
    renderList();
  }

  async function handleDecrement(e) {
    e.target.dataset.qty > 1 &&
      //qty -
      (await axios
        .put(`https://wdev2.be/fs_thomass/shoppinglist/v1/listproduct`, {
          shoppinglist_id: shoppingListId,
          store_id: storeId,
          product_id: e.target.dataset.id,
          qty: parseInt(e.target.dataset.qty) - 1,
        })

        .catch(function (error) {
          console.log(error);
        }));
    renderList();
  }

  async function handleDelete(e) {
    //delete product van de lijst
    await fetch(`https://wdev2.be/fs_thomass/shoppinglist/v1/listproduct`, {
      method: "DELETE",
      body: JSON.stringify({
        shoppinglist_id: shoppingListId,
        product_id: parseInt(e.target.dataset.id),
      }),
    });

    renderList();
    setList([]);
  }

  async function handleCheck(e) {
    let checked;
    // checked
    if (
      list.filter((item) => item.product_id == e.target.dataset.id)[0]
        .checked == 0
    ) {
      checked = 1;
    } else {
      checked = 0;
    }

    await axios
      .patch(`https://wdev2.be/fs_thomass/shoppinglist/v1/listproduct`, {
        shoppinglist_id: shoppingListId,
        store_id: storeId,
        product_id: e.target.dataset.id,
        checked,
      })

      .catch(function (error) {
        console.log(error);
      });
    renderList();
  }
  return (
    <>
      <ChooseStoreButton
        stores={stores}
        setStoreId={setStoreId}
        storeName={storeName}
      />

      <ListName
        listName={listName}
        setListName={setListName}
        shoppingListId={shoppingListId}
      />
      <Add
        products={products}
        setProduct={setProduct}
        setNewProduct={setNewProduct}
      />

      {showDepartments && (
        <Departments departments={departments} setDepartment={setDepartment} />
      )}

      <List
        list={list}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleDelete={handleDelete}
        handleCheck={handleCheck}
      />

      <DeleteList shoppingListId={shoppingListId} />
    </>
  );
};

export default AddProduct;
