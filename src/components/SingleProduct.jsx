const SingleProduct = ({
  item: { product_id, product_name, qty, checked },
  handleIncrement,
  handleDecrement,
  handleDelete,
  handleCheck,
}) => {
  return (
    <li className="products__item" data-id={product_id} key={product_id}>
      <span> {product_name}</span>
      <div className="products__item__controls">
        <div className="products__item__controls__left">
          <button data-id={product_id} data-qty={qty} onClick={handleDecrement}>
            -
          </button>
          {qty}
          <button data-id={product_id} data-qty={qty} onClick={handleIncrement}>
            +
          </button>
        </div>
        <div className="products__item__controls__right">
          <button
            className={!parseInt(checked) ? "check" : "check check--on"}
            data-id={product_id}
            onClick={handleCheck}
          />
          <button
            className="delete"
            data-id={product_id}
            onClick={handleDelete}
          />
        </div>
      </div>
    </li>
  );
};

export default SingleProduct;
