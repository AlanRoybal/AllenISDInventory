import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./ItemForm.scss";

const ItemForm = ({
  item,
  handleInputChange,
  handleImageChange,
  saveItem,
}) => {
  return (
    <div className="add-item">
      <Card cardClass={"card"}>
        <form onSubmit={saveItem}>
          <label>Barcode:</label>
          <input
            type="text"
            placeholder="Item Barcode"
            name="barcode"
            value={item?.barcode}
            onChange={handleInputChange}
          />

          <label>Item Name:</label>
          <input
            type="text"
            placeholder="Item name"
            name="name"
            value={item?.name}
            onChange={handleInputChange}
          />

          <label>Item Location/User:</label>
          <input
            type="text"
            placeholder="Item Category"
            name="category"
            value={item?.category}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Item
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ItemForm;