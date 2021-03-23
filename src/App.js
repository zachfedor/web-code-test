import * as React from 'react';
import './App.css';
import BuyList from './BuyList';
import { displayCurrency } from './currency';
import StockProducts from './StockProducts.jsx';
import StockProductsData from "./data/stockProducts.json";

// Convert product data into Map for faster/easier lookups
const StockProductsMap = new Map(StockProductsData.map((product) => [product.itemNumber, product]));

function App() {
  // Map containing products added to BuyList
  const [buyListProducts, setBuyListProducts] = React.useState(new Map());

  // Sum of all BuyList product sub-totals (i.e. price by quantity)
  const buyListTotal = Array.from(buyListProducts.values()).reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);

  /**
   * Create event handler to add product to BuyList for a given itemNumber
   *
   * When the event handler runs, the product will be added to BuyList map with a default
   * quanity of 1, if it isn't already included. If the product has already been added to the
   * BuyList, nothing happens.
   * @param {string} itemNumber - The unique id of a product
   * @returns {function} - An event handler for product's onClick method
   */
  const addToBuyListHandler = (itemNumber) => () => {
    if (!buyListProducts.has(itemNumber)) {
      buyListProducts.set(itemNumber, { ...StockProductsMap.get(itemNumber), quantity: 1 });
      setBuyListProducts(new Map(buyListProducts));
    }
  };

  /**
   * Create event handler to update product quantity in BuyList for a given itemNumber
   *
   * When the event handler runs, the product's quantity will be set to the event target's value.
   * @param {string} itemNumber - The unique id of a product
   * @returns {function} - An event handler for the product's quantity input onChange method
   */
  const buyListQuantityHandler = (itemNumber) => (event) => {
    const quantity = parseInt(event.target.value, 10);
    if (typeof quantity === 'number' && quantity > 0) {
      buyListProducts.set(itemNumber, { ...buyListProducts.get(itemNumber), quantity });
      setBuyListProducts(new Map(buyListProducts));
    }
  };

  /**
   * Create event handler to remove product from BuyList for a given itemNumber
   *
   * When the event handler runs, the product will be removed from the BuyList.
   * @param {string} itemNumber - The unique id of a product
   * @returns {function} - An event handler for product's remove button onClick method
   */
  const removeFromBuyListHandler = (itemNumber) => () => {
    buyListProducts.delete(itemNumber)
    setBuyListProducts(new Map(buyListProducts));
  };

  return (
    <div className="p-10 m-auto bg-blue-50 min-h-screen">
      <div className="border border-gray-300 rounded-lg w-full bg-white p-10 shadow-lg">
        <h1 className="m-0 p-0 text-2xl font-semibold">Restaurant Order System</h1>
        <hr className="my-3 border border-0 border-t-1 border-gray-200" />
        Select products below to add to the ordering guide

        <StockProducts addToBuyListHandler={addToBuyListHandler} />

        <BuyList
          buyListQuantityHandler={buyListQuantityHandler}
          products={Array.from(buyListProducts.values())}
          removeFromBuyListHandler={removeFromBuyListHandler}
        />

        <div className="text-right font-semibold text-lg mt-4">
          Total:
          <span className="text-xl ml-2">{displayCurrency(buyListTotal)}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
