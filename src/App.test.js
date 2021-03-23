import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import StockProductsData from './data/stockProducts.json';

test('renders restuarant order system', () => {
  render(<App />);
  const linkElement = screen.getByText(/Restaurant Order System/i);
  expect(linkElement).toBeInTheDocument();
});

test('can add product to BuyList', () => {
  const testProduct = StockProductsData[0];

  // Render the app and verify the test product is on the page
  render(<App />);
  const productElement = screen.getByRole('button', {
    name: testProduct.name,
  });
  expect(screen.getAllByText(testProduct.name).length).toBe(1);

  // Click the product to add it to the buy list component with default quantity
  userEvent.click(productElement);
  expect(screen.getAllByText(testProduct.name).length).toBe(2);
  expect(screen.getByRole('spinbutton')).toHaveValue(1);

  // Clicking the same element should not add it again
  userEvent.click(productElement);
  expect(screen.getAllByText(testProduct.name).length).toBe(2);
});

test('can remove product from BuyList', () => {
  const testProduct = StockProductsData[0];

  // Render the app and add the test product to BuyList
  render(<App />);
  userEvent.click(screen.getByRole('button', {
    name: testProduct.name,
  }));
  expect(screen.getAllByText(testProduct.name).length).toBe(2);


  // Click the remove button, then verify it was removed
  const button = screen.getByRole('button', { name: 'Remove' });
  userEvent.click(button);
  expect(button).not.toBeInTheDocument();
  expect(screen.getAllByText(testProduct.name).length).toBe(1);
});

test('can recalculate BuyList total when quantity changed or item removed', () => {
  const productA = StockProductsData[0];
  const productB = StockProductsData[1];

  // Render the app and add the test product to BuyList
  render(<App />);
  userEvent.click(screen.getByRole('button', { name: productA.name }));

  // Product prices can be shown in up to 3 places depending on items and quantities in BuyList:
  // 1. The per unit price if product is added to BuyList
  // 2. That product's sub-total if its quantity is 1
  // 3. The BuyList total if its quantity is 1 and there are no other products
  expect(screen.getAllByText(`$ ${productA.price}`).length).toBe(3);

  // Add product B and verify change in total
  userEvent.click(screen.getByRole('button', { name: productB.name }));
  expect(screen.getAllByText(`$ ${productA.price}`).length).toBe(2); // per unit and sub-total
  expect(screen.getAllByText(`$ ${productB.price}`).length).toBe(2); // per unit and sub-total
  expect(screen.getAllByText(`$ ${productA.price + productB.price}`).length).toBe(1); // total

  // Increase quantity of a product A to ten units
  const productAQty = screen.getAllByRole('spinbutton')[0];
  userEvent.type(productAQty, '0'); // append a '0' after the default of '1'

  // Verify change in total
  expect(screen.getByText(`$ ${(productA.price * 10) + productB.price}`)).toBeInTheDocument();

  // Remove product A
  userEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);

  // Verify change in total
  expect(screen.getAllByText(`$ ${productB.price}`).length).toBe(3); // per unit, sub-total, total
  expect(screen.queryByText(`$ ${productA.price}`)).not.toBeInTheDocument();
});
