import { displayCurrency } from './currency';

test('should render natural numbers', () => {
  expect(displayCurrency(10)).toBe('$ 10.00');
  expect(displayCurrency(10.00001)).toBe('$ 10.00');
  expect(displayCurrency(-10.5)).toBe('-$ 10.50');
});

test('should render optional currency symbol', () => {
  expect(displayCurrency(10, '£')).toBe('£ 10.00');
});

test('should not render unexpected values', () => {
  expect(displayCurrency()).toBe(null);
  expect(displayCurrency('money')).toBe(null);
  expect(displayCurrency(Infinity)).toBe(null);
});
