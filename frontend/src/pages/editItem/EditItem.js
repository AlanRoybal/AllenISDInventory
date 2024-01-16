import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ItemForm from "../../components/item/itemForm/ItemForm";
import {
  getItem,
  getItems,
  selectIsLoading,
  selectItem,
  updateItem,
} from "../../redux/features/item/itemSlice";

const EditItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const itemEdit = useSelector(selectItem);

  const [item, setItem] = useState(itemEdit);

  useEffect(() => {
    dispatch(getItem(id));
  }, [dispatch, id]);

  useEffect(() => {
    setItem(itemEdit);

  }, [itemEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const saveItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("barcode", item?.barcode);
    formData.append("name", item?.name);

    formData.append("category", item?.category);

    console.log(...formData);

    await dispatch(updateItem({ id, formData }));
    await dispatch(getItems());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Item</h3>
      <ItemForm
        item={item}     
        handleInputChange={handleInputChange}
        saveItem={saveItem}
      />
    </div>
  );
};

export default EditItem;