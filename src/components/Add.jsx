import { DatalistInput } from "react-datalist-input";
import { useState, useCallback } from "react";

function Add({ products, setProduct, setNewProduct }) {
  const [item, setItem] = useState({});
  const [value, setValue] = useState("");
  const items = products.map(({ product_id, product_name, department_id }) => ({
    id: product_id,
    value: product_name,
    department_id,
  }));

  function HandleOnClick(e) {
    e.preventDefault();

    item && setProduct(item);

    if (item.value == undefined) {
      setNewProduct(value);
    }

    setValue("");
    setItem({});
  }

  const onSelect = useCallback((selectedItem) => {
    setItem(selectedItem);
  }, []);

  return (
    <div className="add-product">
      <DatalistInput
        placeholder="Zoek een product"
        value={item.value}
        onChange={(e) => setValue(e.target.value)}
        onSelect={onSelect}
        items={items}
        inputProps={{
          required: true,
        }}
      />
      <button onClick={HandleOnClick} />
    </div>
  );
}

export default Add;
