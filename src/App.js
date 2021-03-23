import * as React from 'react';
import './App.css';
import StockProducts from './StockProducts.jsx';
import BuyList from './BuyList';

function App() {
  const [buyListItems, setBuyListItems] = React.useState([]);

  /**
   * Create event handler to add product to BuyList for a given itemNumber
   *
   * When the event handler runs, the product will be added to BuyList array with a default
   * quanity of 1, if it isn't already included. If the product has already been added to the
   * BuyList, nothing happens.
   * @param {string} itemNumber - The unique id of a product
   * @returns {function} - An event handler
   */
  const addToBuyListHandler = (itemNumber) => () => {
    if (!buyListItems.find(item => item.itemNumber === itemNumber)) {
      setBuyListItems([...buyListItems, { itemNumber, quantity: 1 }]);
    }
  };

  /**
   * Create event handler to remove product from BuyList for a given itemNumber
   *
   * When the event handler runs, the product will be filtered out of the BuyList array.
   * @param {string} itemNumber - The unique id of a product
   */
  const removeFromBuyListHandler = (itemNumber) => () => {
    setBuyListItems(buyListItems.filter(item => item.itemNumber !== itemNumber));
  };

  return (
    <div className="p-10 m-auto bg-blue-50 min-h-screen">
      <div className="border border-gray-300 rounded-lg w-full bg-white p-10 shadow-lg">
        <h1 className="m-0 p-0 text-2xl font-semibold">Restaurant Order System</h1>
        <hr className="my-3 border border-0 border-t-1 border-gray-200" />
        Select products below to add to the ordering guide

        <StockProducts addToBuyListHandler={addToBuyListHandler} />

        <BuyList items={buyListItems} removeFromBuyListHandler={removeFromBuyListHandler} />

        <div className="text-right font-semibold text-lg mt-4">
          Total:
          <span className="text-xl ml-2">$0.00</span>
        </div>
      </div>
    </div>
  );
}

export default App;
