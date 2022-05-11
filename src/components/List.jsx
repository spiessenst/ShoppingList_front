import SingleProduct from "./SingleProduct";

const List = ({
  list,
  handleIncrement,
  handleDecrement,
  handleDelete,
  handleCheck,
}) => {
  return (
    <ul className="products__list">
      {list &&
        list.map((item) => (
          <SingleProduct
            key={item.product_id}
            item={item}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        ))}
    </ul>
  );
};

export default List;
