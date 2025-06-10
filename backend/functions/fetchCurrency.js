const geoApiUrl = "https://ipapi.co/json/"; // More reliable Geo API
const currencyApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

const { countryToCurrency } = require('./currencyMap'); // Adjust path as needed


let cachedRates = null;
let cachedDate = null;

exports.handler = async (event) => {
  const today = new Date().toDateString();

  // Handle OPTIONS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  try {
    console.log("Event headers:", event.headers);
    const clientIp = event.headers["client-ip"] || event.headers["x-forwarded-for"] || "8.8.8.8";
    console.log("Client IP:", clientIp);

    const fetchWithRetry = async (url, options, retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (!response.ok) throw new Error(`Status: ${response.status} ${response.statusText}`);
          return await response.json();
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    };

    const fetchUserCurrency = async () => {
      try {
        const data = await fetchWithRetry(geoApiUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; Netlify Function)" },
        });
        console.log("Geo API response:", data);
        const countryCode = data.country_code || "US";
        const currencyInfo = countryToCurrency[countryCode] || { currencyCode: "USD" };
        console.log(`Mapped ${countryCode} to currency:`, currencyInfo);
        return currencyInfo.currencyCode;
      } catch (error) {
        console.error("Geo API error:", error.message);
        return "USD";
      }
    };

    const fetchRates = async (localCurrencyCode) => {
      if (localCurrencyCode === "USD") {
        cachedRates = { USD: 1 };
        cachedDate = today;
        return cachedRates;
      }

      if (cachedRates && cachedDate === today && cachedRates[localCurrencyCode]) {
        console.log("Using cached rates:", cachedRates);
        return cachedRates;
      }

      try {
        const data = await fetchWithRetry(currencyApiUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; Netlify Function)" },
        });
        console.log("Currency API response:", Object.keys(data.rates || {}).length, "currencies");
        if (data.rates && data.rates[localCurrencyCode]) {
          cachedRates = {
            USD: 1,
            [localCurrencyCode]: data.rates[localCurrencyCode],
          };
          cachedDate = today;
          return cachedRates;
        }
        console.warn(`Currency ${localCurrencyCode} not available`);
        return { USD: 1 };
      } catch (error) {
        console.error("Currency API error:", error.message);
        return { USD: 1 };
      }
    };

    const localCurrencyCode = await fetchUserCurrency();
    const rates = await fetchRates(localCurrencyCode);

    console.log("Final response:", { localCurrencyCode, rates });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ localCurrencyCode, rates }),
    };
  } catch (error) {
    console.error("Function error:", error.message, error.stack);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        localCurrencyCode: "USD",
        rates: { USD: 1 },
        error: "Failed to fetch currency data",
      }),
    };
  }
};