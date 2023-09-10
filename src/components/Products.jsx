import React from "react";
import Card from "./Card";
import { useItemState } from "./Context";
import Pages from "./Pages";
import SortIcon from "@mui/icons-material/Sort";
import { useState, useEffect } from "react";
function Products() {
  const { pageState, pageDispatch } = useItemState();
  const [show, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [allSelect, setAllSelect] = useState([0, 0, 0]);
  useEffect(() => {
    console.log("calling");
    sortProducts();
  }, [pageState.sort]);
  function reset() {
    fetch(`https://dummyjson.com/products?limit=100&skip=0`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        pageDispatch({
          type: "SET_DATA",
          payload: {
            data: data.products,
            total: data.total,
            currPData: data.products.slice(0, 12),
          },
        });
      });
  }
  const handleCheckboxChange = (i) => {
    allSelect[i] = 0;
    reset();
    pageDispatch({
      type: "ON",
      index: i,
      payload: [...pageState.sort],
    });
  };
  function sortProducts() {
    let sortedData = [...pageState.data];
    if (pageState.sort[0] && allSelect[0]) {
      sortedData = sortedData.sort((a, b) => {
        return pageState.sort[0].highToLow == 2
          ? b.price - a.price
          : a.price - b.price;
      });
    }
    if (pageState.sort[1] && allSelect[1]) {
      sortedData = sortedData.sort((a, b) => {
        return pageState.sort[1].highToLow == 2
          ? b.rating - a.rating
          : a.rating - b.rating;
      });
    }
    if (pageState.sort[2] && allSelect[2]) {
      sortedData = sortedData.sort((a, b) => {
        return pageState.sort[2].highToLow == 2
          ? b.stock - a.stock
          : a.stock - b.stock;
      });
    }

    pageDispatch({
      type: "SET_DATA",
      payload: {
        data: sortedData,
        total: pageState.total,
        currPData: sortedData.slice(0, 12),
      },
    });

    return sortedData;
  }

  return (
    <>
      {pageState.data.length > 0 ? (
        <div className="product">
          <div className="prImage">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonBusiness/BVD_B2C/Hero/Banner1_3000x1200_1707._CB600339417_.jpg"
              alt="image"
            />
          </div>
          <div className="sortSection">
            <button
              className="sort"
              onClick={(e) => {
                setShow((prev) => {
                  const flag = !prev;
                  if (!flag) {
                    pageDispatch({
                      type: "SORT",
                      payload: [
                        { check: false, highToLow: 0 },
                        { check: false, highToLow: 0 },
                        { check: false, highToLow: 0 },
                      ],
                    });
                    reset();
                  }
                  return flag;
                });
              }}
            >
              <SortIcon />
              <span>sort by</span>
            </button>
            {show ? (
              <div className="Alloptions">
                <div className="Sortoptions opt0">
                  <label>
                    <input
                      type="radio"
                      name="sortOption"
                      checked={pageState.sort[0].check}
                      onChange={() => handleCheckboxChange(0)}
                    />
                    by Price
                  </label>
                  {pageState.sort[0].check ? (
                    <div className="dropdown">
                      {/* Dropdown content for Checkbox 1 */}
                      <select
                        value={allSelect[0]}
                        onChange={(e) => {
                          setAllSelect((prev) => {
                            const arr = [...prev];
                            arr[0] = e.target.value;
                            console.log(arr[0]);
                            return arr;
                          });
                          const newSort = [...pageState.sort];
                          const option = newSort[0];
                          option["highToLow"] = parseInt(e.target.value);
                          console.log(newSort[0]);
                          pageDispatch({
                            type: "SORT",
                            payload: newSort,
                          });
                        }}
                      >
                        {" "}
                        <option key={-1} value={0}>
                          Select
                        </option>
                        <option key={0} value={1}>
                          low-to-high
                        </option>
                        <option key={1} value={2}>
                          high-to-low
                        </option>
                      </select>
                    </div>
                  ) : null}
                </div>

                <div className="Sortoptions opt1">
                  <label>
                    <input
                      type="radio"
                      name="sortOption"
                      checked={pageState.sort[1].check}
                      onChange={() => handleCheckboxChange(1)}
                    />
                    by Rating
                  </label>
                  {pageState.sort[1].check ? (
                    <div className="dropdown">
                      {/* Dropdown content for Checkbox 1 */}
                      <select
                        value={allSelect[1]}
                        onChange={(e) => {
                          setAllSelect((prev) => {
                            const arr = [...prev];
                            arr[1] = e.target.value;
                            return arr;
                          });
                          const newSort = [...pageState.sort];
                          const option = newSort[1];
                          option["highToLow"] = parseInt(e.target.value);

                          pageDispatch({
                            type: "SORT",
                            payload: newSort,
                          });
                        }}
                      >
                        <option key={-1} value={0}>
                          Select
                        </option>
                        <option key={1} value={1}>
                          low-to-high
                        </option>
                        <option key={2} value={2}>
                          high-to-low
                        </option>
                      </select>
                    </div>
                  ) : null}
                </div>

                <div className="Sortoptions opt2">
                  <label>
                    <input
                      type="radio"
                      name="sortOption"
                      checked={pageState.sort[2].check}
                      onChange={() => handleCheckboxChange(2)}
                    />
                    By Storage
                  </label>
                  {pageState.sort[2].check ? (
                    <div className="dropdown">
                      {/* Dropdown content for Checkbox 1 */}
                      <select
                        value={allSelect[2]}
                        onChange={(e) => {
                          setAllSelect((prev) => {
                            const arr = [...prev];
                            arr[2] = e.target.value;
                            return arr;
                          });
                          const newSort = [...pageState.sort];
                          const option = newSort[2];
                          option["highToLow"] = parseInt(e.target.value);
                          pageDispatch({
                            type: "SORT",
                            payload: newSort,
                          });
                        }}
                      >
                        {" "}
                        <option key={-1} value={0}>
                          Select
                        </option>
                        <option key={1} value={1}>
                          low-to-high
                        </option>
                        <option key={2} value={2}>
                          high-to-low
                        </option>
                      </select>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
          <div className="productsWrapper">
            <div className="products">
              {pageState.currPData.map((item, i) => {
                return <Card item={item} key={i} id={item.id} />;
              })}
            </div>
            {pageState.total > 12 ? <Pages /> : null}
          </div>
        </div>
      ) : (
        <div className="loadingWrapper">
          <p className="loading">Loading</p>
        </div>
      )}
    </>
  );
}

export default Products;
