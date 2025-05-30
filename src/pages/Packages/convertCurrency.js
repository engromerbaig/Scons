
import { countryToCurrency } from "../../utilities/countryToCurrency ";

// Helper function to get currency code from your mapping
const getCurrencyCode = (currencyCode) => {
  // Find the currency in your mapping
  for (const countryCode in countryToCurrency) {
    if (countryToCurrency[countryCode].currencyCode === currencyCode) {
      return countryToCurrency[countryCode].currencyCode;
    }
  }
  // Fallback to currency code if not found
  return currencyCode;
};

const convertCurrency = (price, fromCurrency, toCurrency, rates) => {
  try {
    // Always ensure we have a valid price
    if (!price || isNaN(price)) {
      console.warn('Invalid price provided, returning 0');
      return { price: 0, currencyCode: toCurrency };
    }

    // If no rates provided or invalid rates, fallback to original price
    if (!rates || typeof rates !== 'object') {
      console.warn('No rates provided, returning original price with USD');
      return { price, currencyCode: 'USD' };
    }

    // If converting to same currency, return as-is
    if (fromCurrency === toCurrency) {
      return { price, currencyCode: toCurrency };
    }

    let convertedPrice;

    // Conversion logic - always assume base currency is USD
    if (fromCurrency === "USD" && rates[toCurrency]) {
      // USD to other currency
      convertedPrice = price * rates[toCurrency];
      console.log(`Converting ${price} USD to ${toCurrency}: ${convertedPrice}`);
    } else if (toCurrency === "USD") {
      // Other currency to USD
      if (rates[fromCurrency]) {
        convertedPrice = price / rates[fromCurrency];
        console.log(`Converting ${price} ${fromCurrency} to USD: ${convertedPrice}`);
      } else {
        // If no rate available for source currency, return original price as USD
        console.warn(`No rate available for ${fromCurrency}, treating as USD`);
        convertedPrice = price;
      }
    } else if (rates[fromCurrency] && rates[toCurrency]) {
      // Other currency to other currency (via USD)
      const inUSD = price / rates[fromCurrency];
      convertedPrice = inUSD * rates[toCurrency];
      console.log(`Converting ${price} ${fromCurrency} to ${toCurrency} via USD: ${convertedPrice}`);
    } else {
      // If conversion not possible, return original price and log warning
      console.warn(`Conversion from ${fromCurrency} to ${toCurrency} not supported with available rates`);
      convertedPrice = price;
      // Return with USD as fallback currency
      return { price: convertedPrice, currencyCode: 'USD' };
    }

    // Get appropriate currency code from your mapping
    const currencyCode = getCurrencyCode(toCurrency);

    return { price: convertedPrice, currencyCode };

  } catch (error) {
    console.error("Error in currency conversion:", error);
    // On any error, return original price with USD currency code
    return { price, currencyCode: getCurrencyCode('USD') };
  }
};

export default convertCurrency;
