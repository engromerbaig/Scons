
const geoApiUrl = "http://ip-api.com/json/"; // Free geo IP API that's more reliable
const currencyApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

// Import your currency mapping - you'll need to copy this into the function
const { countryToCurrency } = require('./currencyMap'); // Adjust path as needed

// In-memory cache (persists for the lifetime of the function instance)
let cachedRates = null;
let cachedDate = null;

exports.handler = async (event) => {
  const today = new Date().toDateString();

  try {
    console.log("Fetch function available:", typeof fetch);

    // Get client IP from Netlify headers
    const clientIp = event.headers["client-ip"] || event.headers["x-forwarded-for"] || "unknown";
    console.log("Client IP:", clientIp);

    // Fetch user currency based on location
    const fetchUserCurrency = async () => {
      try {
        console.log("Calling Geo API:", geoApiUrl);
        const response = await fetch(geoApiUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Netlify Function)'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Geo API status: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Geo API response:", { currency: data.currency, country: data.country, countryCode: data.countryCode });
        
        // Use country code to get currency from your mapping
        const countryCode = data.countryCode;
        if (countryCode && countryToCurrency[countryCode]) {
          const currencyInfo = countryToCurrency[countryCode];
          console.log(`Mapped ${countryCode} to currency:`, currencyInfo);
          return currencyInfo.currencyCode;
        }
        
        // Fallback to USD if no mapping found
        console.log(`No currency mapping found for country code: ${countryCode}`);
        return "USD";
      } catch (error) {
        console.error("Geo API error:", error.message);
        return "USD"; // Always fallback to USD
      }
    };

    // Fetch currency rates
    const fetchRates = async (localCurrencyCode) => {
      // If local currency is USD, just return USD rates
      if (localCurrencyCode === "USD") {
        cachedRates = { USD: 1 };
        cachedDate = today;
        return cachedRates;
      }

      // Check if we have cached rates for today
      if (cachedRates && cachedDate === today && cachedRates[localCurrencyCode]) {
        console.log("Using cached rates:", cachedRates);
        return cachedRates;
      }

      try {
        console.log("Calling Currency API:", currencyApiUrl);
        const response = await fetch(currencyApiUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Netlify Function)'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Currency API status: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Currency API response - rates available for:", Object.keys(data.rates || {}).length, "currencies");
        
        if (data.rates && data.rates[localCurrencyCode]) {
          cachedRates = {
            USD: 1,
            [localCurrencyCode]: data.rates[localCurrencyCode],
          };
          cachedDate = today;
          console.log(`Rates fetched successfully: 1 USD = ${cachedRates[localCurrencyCode]} ${localCurrencyCode}`);
          return cachedRates;
        } else {
          console.warn(`Local currency ${localCurrencyCode} rate not available in API response`);
          // Fallback to USD if local currency rate not available
          cachedRates = { USD: 1 };
          cachedDate = today;
          return cachedRates;
        }
      } catch (error) {
        console.error("Error fetching rates:", error.message);
        // Always fallback to USD on error
        cachedRates = { USD: 1 };
        cachedDate = today;
        return cachedRates;
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
      body: JSON.stringify({
        localCurrencyCode,
        rates,
      }),
    };
  } catch (error) {
    console.error("Function error:", error.message, error.stack);
    
    // Always return USD as fallback, even on complete failure
    return {
      statusCode: 200, // Return 200 so frontend doesn't fail
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        localCurrencyCode: "USD",
        rates: { USD: 1 },
        error: "Failed to fetch currency data, using USD fallback",
      }),
    };
  }
};
