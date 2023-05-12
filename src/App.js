import React, { useContext, useState } from "react";
import "./styles.css";

import faker from "faker";
import { ProductContext } from "./contexts/ProductContext";

faker.seed(123);

export const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color()
}));

console.log(data);

const idealForArray = data.reduce(
  (acc, { idealFor }) => (!acc.includes(idealFor) ? [...acc, idealFor] : acc),
  []
);

const levelArray = data.reduce(
  (acc, { level }) => (!acc.includes(level) ? [...acc, level] : acc),
  []
);

export default function App() {
  const [inputText, setInputText] = useState("");
  const { state, dispatch, selectLevelFilteredProducts } = useContext(
    ProductContext
  );

  return (
    <div className="App">
      <h1>Product Lite</h1>
      <div className="search">
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="Search By Name"
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
        <button
          onClick={() => dispatch({ type: "SEARCH", payload: inputText })}
        >
          {inputText.trim() !== "" ? "Search Data" : "Show All Data"}
        </button>
      </div>
      <div className="filter">
        <fieldset>
          <legend>Sort By</legend>
          <label>
            <input
              type="radio"
              name="priceSort"
              onChange={() => dispatch({ type: "SORT", payload: "HTL" })}
            />
            Price - High To Low
          </label>
          <label>
            <input
              type="radio"
              name="priceSort"
              onChange={() => dispatch({ type: "SORT", payload: "LTH" })}
            />
            Price - Low To High
          </label>
          <label>
            <input
              type="radio"
              name="priceSort"
              onChange={() => dispatch({ type: "SORT", payload: "RESET" })}
            />
            Reset
          </label>
        </fieldset>
        <fieldset>
          <legend>Filters</legend>
          <label>
            <input
              type="checkbox"
              onClick={() => dispatch({ type: "FILTERS", payload: "inStock" })}
            />
            Include Out of Stock
          </label>
          <label>
            <input
              type="checkbox"
              onClick={() =>
                dispatch({ type: "FILTERS", payload: "fastDelivery" })
              }
            />
            Fast Delivery Only
          </label>
        </fieldset>
        <fieldset>
          <legend>Category Filters</legend>
          <label>
            Ideal For:{" "}
            <select
              value={state.idealFor}
              onChange={(e) =>
                dispatch({ type: "SELECT_IDEAL_FOR", payload: e.target.value })
              }
            >
              <option value="">All</option>
              {idealForArray.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>{" "}
          <label>
            Level:{" "}
            <select
              value={state.level}
              onChange={(e) =>
                dispatch({ type: "SELECT_LEVEL", payload: e.target.value })
              }
            >
              <option value="">All</option>
              {levelArray.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
      </div>
      <div className="product-list">
        {selectLevelFilteredProducts?.length === 0 ? (
          <p>No products Found!</p>
        ) : (
          selectLevelFilteredProducts?.map(
            ({
              id,
              name,
              image,
              price,
              productName,
              inStock,
              level,
              fastDelivery,
              offer
            }) => (
              <div key={id} className="product-card">
                <img src={image} alt={productName} />
                <h3> {name} </h3>
                <div>Rs. {price}</div>
                {inStock && <div> In Stock </div>}
                {!inStock && <div style={{ color: "red" }}> Out of Stock </div>}
                <div>{level}</div>
                <div style={{ color: "blue" }}>{offer}</div>
                {fastDelivery ? (
                  <div style={{ color: "green" }}> Fast Delivery </div>
                ) : (
                  <div> 3 days minimum </div>
                )}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
