import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import StockProductsData from './data/stockProducts.json';

test('renders learn react link', () => {
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
