const currencyRates = {
  GBP: 0.0027,
  USD: 0.0035,
  AED: 0.013,
};

export const convertCurrency = (price, fromCurrency, toCurrency = "PKR") => {
  if (fromCurrency === toCurrency) return price;

  // Assume PKR is base currency
  if (fromCurrency === "PKR" && currencyRates[toCurrency]) {
    return price * currencyRates[toCurrency];
  }

  // Convert other currencies back to PKR
  if (toCurrency === "PKR" && currencyRates[fromCurrency]) {
    return price / currencyRates[fromCurrency];
  }

  // Convert between two non-PKR currencies via PKR as base
  if (currencyRates[fromCurrency] && currencyRates[toCurrency]) {
    const inPKR = price / currencyRates[fromCurrency];
    return inPKR * currencyRates[toCurrency];
  }

  // Fallback
  return price;
};
