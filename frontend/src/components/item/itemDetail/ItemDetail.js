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
                <h4>
              <span className="badge">Name: </span> &nbsp; {item.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {item.sku}
            </p>
            <p>
              <b>&rarr; Location/User : </b> {item.category}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.description),
              }}
            ></div>
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