// Import your currency mapping
const { countryToCurrency } = require('./currencyMap');

const currencyApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

// Multiple geo IP services for better reliability
const geoApiServices = [
  {
    url: "http://ip-api.com/json/",
    parser: (data) => ({
      country: data.country,
      countryCode: data.countryCode,
      currency: data.currency
    })
  },
  {
    url: "https://ipapi.co/json/",
    parser: (data) => ({
      country: data.country_name,
      countryCode: data.country_code,
      currency: data.currency
    })
  },
  {
    url: "https://api.ipify.org?format=json",
    parser: (data) => ({ ip: data.ip }) // This service only returns IP
  }
];

// In-memory cache
let cachedRates = null;
let cachedDate = null;
let cachedLocation = null;

exports.handler = async (event) => {
  const today = new Date().toDateString();

  try {
    console.log("=== Currency Function Started ===");
    
    // Helper function to get client IP with multiple fallbacks
    const getClientIp = () => {
      const possibleHeaders = [
        event.headers["client-ip"],
        event.headers["x-forwarded-for"],
        event.headers["x-real-ip"],
        event.headers["cf-connecting-ip"], // Cloudflare
        event.headers["x-client-ip"],
        event.headers["x-forwarded"],
        event.headers["forwarded-for"],
        event.headers["forwarded"]
      ];
      
      for (const header of possibleHeaders) {
        if (header) {
          // Handle comma-separated IPs (take the first one)
          const ip = header.split(',')[0].trim();
          console.log(`Found IP from header: ${ip}`);
          return ip;
        }
      }
      
      console.log("No client IP found in headers");
      return null;
    };

    const clientIp = getClientIp();
    console.log("Client IP detected:", clientIp);

    // Function to try multiple geo services
    const fetchUserLocation = async () => {
      // Check cache first
      if (cachedLocation && cachedLocation.date === today) {
        console.log("Using cached location:", cachedLocation);
        return cachedLocation;
      }

      for (const service of geoApiServices) {
        try {
          console.log(`Trying geo service: ${service.url}`);
          
          let url = service.url;
          // Add IP parameter if we have one and service supports it
          if (clientIp && service.url.includes('ip-api.com')) {
            url = `${service.url}${clientIp}`;
          }
          
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; Netlify Function)',
              'Accept': 'application/json'
            },
            timeout: 5000 // 5 second timeout
          });
          
          if (!response.ok) {
            console.log(`Service ${url} returned status: ${response.status}`);
            continue;
          }
          
          const data = await response.json();
          const parsed = service.parser(data);
          
          console.log(`Service ${url} response:`, parsed);
          
          if (parsed.countryCode) {
            const locationData = {
              country: parsed.country,
              countryCode: parsed.countryCode,
              currency: parsed.currency,
              date: today,
              source: service.url
            };
            
            // Cache the successful result
            cachedLocation = locationData;
            console.log("Successfully detected location:", locationData);
            return locationData;
          }
        } catch (error) {
          console.log(`Geo service ${service.url} failed:`, error.message);
          continue;
        }
      }
      
      console.log("All geo services failed, no location detected");
      return null;
    };

    // Function to determine currency from location
    const getCurrencyFromLocation = (locationData) => {
      if (!locationData || !locationData.countryCode) {
        console.log("No location data available");
        return null;
      }
      
      const countryCode = locationData.countryCode.toUpperCase();
      console.log(`Looking up currency for country: ${countryCode}`);
      
      if (countryToCurrency[countryCode]) {
        const currencyInfo = countryToCurrency[countryCode];
        console.log(`Found currency mapping: ${countryCode} -> ${currencyInfo.currencyCode}`);
        return currencyInfo.currencyCode;
      }
      
      // Try the currency from the geo service directly
      if (locationData.currency) {
        console.log(`Using currency from geo service: ${locationData.currency}`);
        return locationData.currency;
      }
      
      console.log(`No currency mapping found for country: ${countryCode}`);
      return null;
    };

    // Function to fetch exchange rates
    const fetchExchangeRates = async (targetCurrency) => {
      // If target is USD, return simple rates
      if (!targetCurrency || targetCurrency === "USD") {
        const rates = { USD: 1 };
        cachedRates = rates;
        cachedDate = today;
        return rates;
      }

      // Check cache
      if (cachedRates && cachedDate === today && cachedRates[targetCurrency]) {
        console.log("Using cached exchange rates");
        return cachedRates;
      }

      try {
        console.log(`Fetching exchange rates for ${targetCurrency}...`);
        
        const response = await fetch(currencyApiUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Netlify Function)',
            'Accept': 'application/json'
          },
          timeout: 8000 // 8 second timeout
        });
        
        if (!response.ok) {
          throw new Error(`Exchange rate API returned: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.rates || typeof data.rates !== 'object') {
          throw new Error("Invalid exchange rate data format");
        }
        
        console.log(`Exchange rate API returned ${Object.keys(data.rates).length} currencies`);
        
        // Check if our target currency is available
        if (data.rates[targetCurrency]) {
          const rates = {
            USD: 1,
            [targetCurrency]: data.rates[targetCurrency]
          };
          
          cachedRates = rates;
          cachedDate = today;
          
          console.log(`Successfully fetched rate: 1 USD = ${rates[targetCurrency]} ${targetCurrency}`);
          return rates;
        } else {
          console.log(`Target currency ${targetCurrency} not available in exchange rates`);
          // Return USD as fallback
          const rates = { USD: 1 };
          cachedRates = rates;
          cachedDate = today;
          return rates;
        }
        
      } catch (error) {
        console.error("Exchange rate fetch failed:", error.message);
        // Return USD fallback
        const rates = { USD: 1 };
        cachedRates = rates;
        cachedDate = today;
        return rates;
      }
    };

    // Main execution flow
    console.log("=== Starting location detection ===");
    const locationData = await fetchUserLocation();
    
    console.log("=== Determining currency ===");
    const detectedCurrency = getCurrencyFromLocation(locationData);
    
    console.log("=== Fetching exchange rates ===");
    const rates = await fetchExchangeRates(detectedCurrency);
    
    // Determine final currency (fallback to USD if detection failed)
    const finalCurrency = detectedCurrency && rates[detectedCurrency] ? detectedCurrency : "USD";
    
    console.log("=== Final Result ===");
    console.log("Detected Currency:", detectedCurrency);
    console.log("Final Currency:", finalCurrency);
    console.log("Available Rates:", Object.keys(rates));
    
    const result = {
      localCurrencyCode: finalCurrency,
      rates: rates,
      debug: {
        clientIp: clientIp || "not detected",
        location: locationData || "not detected",
        detectedCurrency: detectedCurrency || "not detected",
        ratesCount: Object.keys(rates).length
      }
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, max-age=3600" // Cache for 1 hour
      },
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error("=== Function Error ===", error.message, error.stack);
    
    // Always return a working response
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
        error: "Currency detection failed, using USD fallback",
        debug: {
          errorMessage: error.message
        }
      })
    };
  }
};