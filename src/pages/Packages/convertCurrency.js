// src/pages/convertCurrency.js
export const convertCurrency = (price, fromCurrency, toCurrency = "PKR", rates) => {
  if (fromCurrency === toCurrency) return price;

  // Ensure rates are provided
  if (!rates) {
    console.warn("No currency rates provided, returning original price");
    return price;
  }

  // Convert from PKR to target currency
  if (fromCurrency === "PKR" && rates[toCurrency]) {
    return price * rates[toCurrency];
  }

  // Convert from other currency to PKR
  if (toCurrency === "PKR" && rates[fromCurrency]) {
    return price / rates[fromCurrency];
  }

  // Convert between two non-PKR currencies via PKR
  if (rates[fromCurrency] && rates[toCurrency]) {
    const inPKR = price / rates[fromCurrency];
    return inPKR * rates[toCurrency];
  }

  // Fallback: return original price if conversion not possible
  console.warn(`Conversion from ${fromCurrency} to ${toCurrency} not supported`);
  return price;
};