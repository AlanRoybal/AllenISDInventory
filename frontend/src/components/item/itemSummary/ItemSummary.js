import React, { useEffect } from "react";
import "./ItemSummary.scss";
import { BsCart4 } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
    CALC_CATEGORY,
    selectCategory,
} from "../../../redux/features/item/itemSlice";

// Icons
const itemIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const ItemSummary = ({ items }) => {
    const dispatch = useDispatch();
    const category = useSelector(selectCategory);

    useEffect(() => {
        dispatch(CALC_CATEGORY(items));
      }, [dispatch, items]);

      return (
        <div className="item-summary">
          <h3 className="--mt">Inventory Stats</h3>
          <div className="info-summary">
            <InfoBox
              icon={itemIcon}
              title={"Total Items"}
              count={items.length}
              bgColor="card1"
            />
            <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
        </div>
    </div>
  );
};

export default ItemSummary;