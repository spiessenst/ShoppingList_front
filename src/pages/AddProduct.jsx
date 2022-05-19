import axios from "axios";
import { useState, useEffect } from "react";
import Add from "../components/Add";
import List from "../components/List";
import Departments from "../components/Departments";
import ChooseStoreButton from "../components/ChooseStoreButton";
import { ListName } from "../components/ListName";

const AddProduct = ({
  stores,
  setStoreId,
  storeId,
  shoppingListId,
  list,
  setList,
  listName,
  setListName,
}) => {
  const [products, setProducts] = useState([]);
  //const [shoppingListId, setshoppingListId] = useState(1);
  // const [stores, setStores] = (useState = []);
  //  const [storeId, setStoreId] = useState(1);
  const [newproduct, setNewProduct] = useState("");
  const [product, setProduct] = useState("");

  const [showDepartments, setShowDepartments] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await axios
  //         .post(`https://wdev2.be/fs_thomass/shoppinglist/v1/list`, {
  //           shoppinglist_name: "Mijn nieuwe lijst " + Date(),
  //         })
  //         .then(({ data }) => {
  //           setshoppingListId(data[0].shoppinglist_id);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const listfind = list.find(
          (listitem) => listitem.product_id == product.id
        );

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
      newproduct && setShowDepartments(true);
      try {
        if (department) {
          await axios
            .post(`https://wdev2.be/fs_thomass/shoppinglist/v1/product`, {
              product_name: newproduct.toLowerCase(),
              department_id: department,
            })
            .then(({ data }) =>
              axios.post(
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
      const url = `https://wdev2.be/fs_thomass/shoppinglist/v1/list/${shoppingListId}/${storeId}`;
      const { data } = await axios(url);
      if (data == null) {
        setList([]);
      }
      data && setList(data.items);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleIncrement(e) {
    await axios
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
      <ChooseStoreButton stores={stores} setStoreId={setStoreId} />

      <ListName listName={listName} />
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
    </>
  );
};

export default AddProduct;
