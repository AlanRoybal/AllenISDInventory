import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./itemList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_ITEMS,
  selectFilteredItems,
} from "../../../redux/features/item/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteItem,
  getItems,
} from "../../../redux/features/item/itemSlice";
import { Link } from "react-router-dom";

const ItemList = ({ items, isLoading }) => {
    const [search, setSearch] = useState("");
    const filteredItems = useSelector(selectFilteredItems);
  
    const dispatch = useDispatch();
  
    const shortenText = (text, n) => {
      if (text.length > n) {
        const shortenedText = text.substring(0, n).concat("...");
        return shortenedText;
      }
      return text;
    };

    const delItem = async (id) => {
        console.log(id);
        await dispatch(deleteItem(id));
        await dispatch(getItems());
      };

      const confirmDelete = (id) => {
        confirmAlert({
          title: "Delete Item",
          message: "Are you sure you want to delete this item.",
          buttons: [
            {
              label: "Delete",
              onClick: () => delItem(id),
            },
            {
              label: "Cancel",
              // onClick: () => alert('Click No')
            },
          ],
        });
      };

       //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };
  //   End Pagination
  useEffect(() => {
    dispatch(FILTER_ITEMS({ items, search }));
  }, [items, search, dispatch]);

  return (
    <div className="item-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && items.length === 0 ? (
            <p>-- No item found, please add an item...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Barcode</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item, index) => {
                  const { _id, barcode, name, category } = item;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{barcode}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/item-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-item/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                            />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ItemList;