const geoApiUrl = "https://ipapi.co/json/"; // Correct Geo API
const currencyApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

const { countryToCurrency } = require('./currencyMap'); // Verify path

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
    const clientIp = (event.headers["x-forwarded-for"] || event.headers["x-nf-client-connection-ip"] || "").split(",")[0].trim() || "39.57.50.221"; // Hardcode for testing
    console.log("Client IP:", clientIp);

    const fetchWithRetry = async (url, options, retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (response.status === 429) {
            console.warn("Rate limit hit, waiting 5s...");
            await new Promise((resolve) => setTimeout(resolve, 5000));
            continue;
          }
          if (!response.ok) throw new Error(`Status: ${response.status} ${response.statusText}`);
          return await response.json();
        } catch (error) {
          if (i === retries - 1) throw error;
          console.warn(`Retry ${i + 1}/${retries} for ${url}`);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    };

    const fetchUserCurrency = async () => {
      try {
        const geoUrl = `${geoApiUrl}${clientIp}/`;
        console.log("Calling Geo API:", geoUrl);
        const data = await fetchWithRetry(geoUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; Netlify Function)" },
        });
        console.log("Geo API full response:", JSON.stringify(data));
        let countryCode = data.country_code || "US";
        // Fallback to x-nf-geo if Geo API fails
        if (!data.country_code && event.headers["x-nf-geo"]) {
          try {
            const geoData = JSON.parse(Buffer.from(event.headers["x-nf-geo"], "base64").toString());
            countryCode = geoData.country?.code || "US";
            console.log("Using x-nf-geo country:", countryCode);
          } catch (e) {
            console.error("Failed to parse x-nf-geo:", e.message);
          }
        }
        console.log("Country code:", countryCode);
        if (!countryToCurrency) {
          console.error("countryToCurrency mapping is undefined");
          return "USD";
        }
        console.log("Available countries in mapping:", Object.keys(countryToCurrency));
        const currencyInfo = countryToCurrency[countryCode] || { currencyCode: "USD" };
        console.log("Currency mapping:", countryToCurrency[countryCode] || "No mapping");
        console.log(`Mapped ${countryCode} to currency:`, currencyInfo);
        return currencyInfo.currencyCode;
      } catch (error) {
        console.error("Geo API error:", error.message, error.stack);
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
        console.log("Calling Currency API:", currencyApiUrl);
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
          console.log(`Rates fetched: 1 USD = ${cachedRates[localCurrencyCode]} ${localCurrencyCode}`);
          return cachedRates;
        }
        console.warn(`Currency ${localCurrencyCode} not available in API response`);
        return { USD: 1 };
      } catch (error) {
        console.error("Currency API error:", error.message, error.stack);
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