// src/utils/currencyApi.js
const currencyUrl = "https://open.er-api.com/v6/latest/PKR";

export const fetchCurrencyRates = async () => {
  const cachedRates = localStorage.getItem("pkr_currency_rates");
  const cachedDate = localStorage.getItem("pkr_rates_date");
  const today = new Date().toDateString();

  // Log whether rates are fetched or retrieved from cache
  if (cachedRates && cachedDate === today) {
    console.log("Currency rates retrieved from cache:", JSON.parse(cachedRates));
    return JSON.parse(cachedRates);
  }

  console.log("Fetching currency rates from API:", currencyUrl);

  try {
    const response = await fetch(currencyUrl);
    const data = await response.json();
    if (data.result === "success") {
      const rates = {
        USD: data.rates.USD,
        GBP: data.rates.GBP,
        AED: data.rates.AED,
      };
      localStorage.setItem("pkr_currency_rates", JSON.stringify(rates));
      localStorage.setItem("pkr_rates_date", today);
      console.log("Currency rates fetched successfully:", rates);
      return rates;
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    // Fallback to static rates
    const fallbackRates = {
      USD: 0.00358, // Approx. 1 PKR = 0.00358 USD
      GBP: 0.00281, // Approx. 1 PKR = 0.00281 GBP
      AED: 0.01316, // Approx. 1 PKR = 0.01316 AED
    };
    localStorage.setItem("pkr_currency_rates", JSON.stringify(fallbackRates));
    localStorage.setItem("pkr_rates_date", today);
    console.log("Using fallback currency rates:", fallbackRates);
    return fallbackRates;
  }
};