import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import ItemForm from "../../components/item/itemForm/ItemForm";
import {
  createItem,
  selectIsLoading,
} from "../../redux/features/item/itemSlice";

const initialState = {
  barcode: "",
  name: "",
  category: "",
};

const AddItem = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const { barcode, name, category } = item;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };


  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("barcode", barcode);
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);

    console.log(...formData);

    await dispatch(createItem(formData));

    setItem(initialState);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Item</h3>
      <ItemForm
        item={item}
        handleInputChange={handleInputChange}
        saveItem={saveItem}
      />
    </div>
  );
};

export default AddItem;