const currencyRates = {
  GBP: 0.0027,
  USD: 0.0033,
  AED: 0.0121,
};

export const convertCurrency = (price, fromCurrency, toCurrency = "PKR") => {
  if (fromCurrency === toCurrency) return price;

  // For now, assume PKR is the base currency, so convert PKR to target
  // Later, you can replace this logic with API calls
  if (fromCurrency === "PKR" && currencyRates[toCurrency]) {
    return (price * currencyRates[toCurrency]).toFixed(0);
  }

  // If converting from another currency to PKR or between other currencies, extend here
  // For now, fallback to price unchanged
  return price;
};
