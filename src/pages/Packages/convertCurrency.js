const currencyUrl = "https://open.er-api.com/v6/latest/USD";
const primaryGeoApiUrl = "http://ip-api.com/json/?fields=countryCode,currency";
const fallbackGeoApiUrl = "https://freegeoip.app/json/";
import { countryToCurrency } from "../../utilities/currencyMap";

// Fetch user location to determine local currency
const fetchUserCurrency = async () => {
  // Try primary API (ip-api.com)
  try {
    const response = await fetch(primaryGeoApiUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Primary Geo API responded with status ${response.status}`);
    }
    const data = await response.json();
    console.log("Primary Geo API response (ip-api.com):", data);
    return data.currency || "USD"; // Use currency field, default to USD
  } catch (error) {
    console.error("Error fetching user location from ip-api.com:", error);
  }

  // Fallback to freegeoip.app with manual mapping
  try {
    const response = await fetch(fallbackGeoApiUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Fallback Geo API responded with status ${response.status}`);
    }
    const data = await response.json();
    console.log("Fallback Geo API response (freegeoip.app):", data);
    return countryToCurrency[data.country_code]?.currencyCode || "USD"; // Map country_code to currency
  } catch (error) {
    console.error("Error fetching user location from freegeoip.app:", error);
    return "USD"; // Default to USD if both APIs fail
  }
};

export const fetchCurrencyRates = async () => {
  const cachedRates = localStorage.getItem("usd_currency_rates");
  const cachedDate = localStorage.getItem("usd_rates_date");
  const today = new Date().toDateString();

  // Get local currency based on user location
  const localCurrency = await fetchUserCurrency();
  console.log("Local currency determined:", localCurrency);

  // Skip fetching rates if localCurrency is USD (no conversion needed)
  if (localCurrency === "USD") {
    const usdOnlyRates = { USD: 1 };
    localStorage.setItem("usd_currency_rates", JSON.stringify(usdOnlyRates));
    localStorage.setItem("usd_rates_date", today);
    console.log("Using USD-only rates (local currency is USD):", usdOnlyRates);
    return usdOnlyRates;
  }

  // Check cache validity
  let rates;
  if (cachedRates && cachedDate === today) {
    rates = JSON.parse(cachedRates);
    console.log("Cached rates found:", rates);
    // Only use cache if it includes a valid rate for localCurrency
    if (rates[localCurrency] && rates[localCurrency] !== 1) {
      console.log("Using valid cached rates:", rates);
      return rates;
    } else {
      console.log("Cached rates invalid or missing local currency rate, fetching new rates");
    }
  } else {
    console.log("No valid cache or cache expired, fetching new rates");
  }

  console.log("Fetching currency rates from API:", currencyUrl);

  try {
    const response = await fetch(currencyUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Currency API responded with status ${response.status}`);
    }
    const data = await response.json();
    console.log("Currency API response:", data);
    if (data.result === "success" && data.rates[localCurrency]) {
      rates = {
        USD: data.rates.USD, // Always 1
        [localCurrency]: data.rates[localCurrency], // Include local currency
      };
      localStorage.setItem("usd_currency_rates", JSON.stringify(rates));
      localStorage.setItem("usd_rates_date", today);
      console.log("Currency rates fetched successfully:", rates);
      return rates;
    } else {
      throw new Error("Currency API request failed or local currency rate not available");
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    // Return only USD if API fails or rate not available
    const usdOnlyRates = { USD: 1 };
    localStorage.setItem("usd_currency_rates", JSON.stringify(usdOnlyRates));
    localStorage.setItem("usd_rates_date", today);
    console.log("Using USD-only rates due to API failure:", usdOnlyRates);
    return usdOnlyRates;
  }
};

const convertCurrency = (price, fromCurrency, toCurrency = "USD", rates) => {
  if (fromCurrency === toCurrency) return price;

  // Ensure rates are provided and valid
  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
    console.warn(
      `No valid rates for conversion from ${fromCurrency} to ${toCurrency}`,
      rates
    );
    return price;
  }

  // Convert from USD to target currency
  if (fromCurrency === "USD" && rates[toCurrency]) {
    return price * rates[toCurrency];
  }

  // Convert from other currency to USD
  if (toCurrency === "USD" && rates[fromCurrency]) {
    return price / rates[fromCurrency];
  }

  // Convert between two non-USD currencies via USD
  if (rates[fromCurrency] && rates[toCurrency]) {
    const inUSD = price / rates[fromCurrency];
    return inUSD * rates[toCurrency];
  }

  // Fallback: return original price if conversion not possible
  console.warn(`Conversion from ${fromCurrency} to ${toCurrency} not supported`);
  return price;
};

export default convertCurrency;