import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getItem } from "../../../redux/features/item/itemSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ItemDetail.scss";
import DOMPurify from "dompurify";

const ItemDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { item, isLoading, isError, message } = useSelector(
    (state) => state.item
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getItem(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="item-detail">
      <h3 className="--mt">Item Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {item && (
          <div className="detail">
            <h4>
              <span className="badge">Barcode: </span> &nbsp; {item.barcode}
            </h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {item.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {item.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {item.category}
            </p>
            <hr />
            <code className="--color-dark">
              Created on: {item.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {item.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ItemDetail;