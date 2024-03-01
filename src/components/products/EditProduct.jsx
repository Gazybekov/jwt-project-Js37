import React, { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContextProvider";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const { categories, getCategories, getOneProduct, oneProduct, editProduct } =
    useProducts();
  useEffect(() => {
    getCategories();
    getOneProduct(id);
  }, []);
  useEffect(() => {
    if (oneProduct) {
      setTitle(oneProduct.title);
      setDesciption(oneProduct.description);
      setPrice(oneProduct.price);
      setCategory(oneProduct.category);
    }
  }, [oneProduct]);
  const [title, setTitle] = useState("");
  const [desciption, setDesciption] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const handleCLick = () => {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", desciption);
    newProduct.append("price", price);
    newProduct.append("image", img);
    newProduct.append("category", category);
    editProduct(id, newProduct);
  };
  return (
    <div>
      <h2>Edit Product</h2>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDesciption(e.target.value)}
        value={desciption}
      />
      <input
        type="text"
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <input
        type="file"
        placeholder="img"
        onChange={(e) => setImg(e.target.files[0])}
        accept="image/"
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option>Choose category</option>
        {categories.map((elem) => (
          <option value={elem.id} key={elem.id}>
            {elem.title}
          </option>
        ))}
      </select>
      <button onClick={handleCLick}>Save</button>
    </div>
  );
};

export default EditProduct;
