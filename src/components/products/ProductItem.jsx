import React from "react";
import { useProducts } from "../../context/ProductContextProvider";

const ProductItem = ({ elem }) => {
  const { deleteProduct } = useProducts();
  console.log(elem);
  return (
    <div>
      Title: {elem.title}
      Price: {elem.price}
      Category: {elem.category.title}
      Description: {elem.description}
      <img width={150} src={elem.image} alt="" />
      {elem.is_author ? (
        <>
          <button onClick={() => deleteProduct(elem.id)}>Delete</button>
          <button>Edit</button>
        </>
      ) : null}
    </div>
  );
};

export default ProductItem;
