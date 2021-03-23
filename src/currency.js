/**
 * Convert a number value into a string of currency
 * @param {number} value - Currency amount, any natural number
 * @param {string} [symbol='$'] - Type of currency
 * @returns {string}
 */
const displayCurrency = (value, symbol = '$') => {
  if (!value || typeof value !== 'number' || [Infinity, -Infinity, NaN].includes(value)) {
    // TODO: log error or throw exception
    return null;
  }

  const sign = value < 0 ? '-' : '';
  const [dollars, cents] = value.toString().split('.');
  const formattedCents = !cents ? '00' : cents.slice(0,2).padEnd(2, '0');

  return `${sign}${symbol} ${Math.abs(dollars)}.${formattedCents}`;
};

export { displayCurrency};
