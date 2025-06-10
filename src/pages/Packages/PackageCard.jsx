<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState, useEffect, useCallback } from "react";
>>>>>>> working_main
import { FaCheckCircle } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Button from "../../components/Button/Button";
import { contactDetails } from "../../components/MobileMenu/modules/contactDetails";
import convertCurrency from "./convertCurrency";

const PackageCard = ({ packageInfo }) => {
  const [currency, setCurrency] = useState("USD");
  const [localCurrency, setLocalCurrency] = useState(null);
  const [rates, setRates] = useState({ USD: 1 });
  const [displayPrice, setDisplayPrice] = useState(packageInfo.price);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState(null);

<<<<<<< HEAD
  // Fetch currency rates and determine local currency
  useEffect(() => {
    const fetchCurrencyData = async () => {
      const today = new Date().toDateString();
      let cachedData;

      // Parse cached data safely
      try {
        cachedData = JSON.parse(localStorage.getItem("currencyData"));
        console.log("Cached data:", cachedData);
      } catch (e) {
        console.warn("Invalid cached currency data, clearing cache:", e);
        localStorage.removeItem("currencyData");
      }

      // Check if cached data is valid for today
      if (cachedData && cachedData.date === today && cachedData.rates) {
        console.log("Using cached currency data:", cachedData);
        const safeRates = { USD: 1, ...cachedData.rates };
        console.log("Safe rates from cache:", safeRates);

        // Fetch API to check if location has changed
        try {
          const response = await fetch("/netlify/functions/fetchCurrency");
          if (!response.ok) {
            throw new Error(`Netlify function status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Currency API response for validation:", data);

          const { localCurrencyCode } = data;
          console.log("API localCurrencyCode:", localCurrencyCode);

          // If cached currency differs from API, clear cache and refetch
          if (cachedData.localCurrency !== localCurrencyCode) {
            console.log(`Currency changed: ${cachedData.localCurrency} -> ${localCurrencyCode}, clearing cache`);
            localStorage.removeItem("currencyData");
            await fetchCurrencyData(); // Recursive call to refetch
            return;
          }

          // Use cached data if currency matches
          setRates(safeRates);
          if (
            cachedData.localCurrency &&
            cachedData.localCurrency !== "USD" &&
            safeRates[cachedData.localCurrency]
          ) {
            setLocalCurrency(cachedData.localCurrency);
            console.log(`Local currency from cache: ${cachedData.localCurrency}`);
          } else {
            setLocalCurrency(null);
            console.log("No valid local currency in cache, using USD");
          }

          setCurrency("USD");
          setDisplayPrice(packageInfo.price);
          setCurrencyCode("USD");
          setIsLoading(false);
          return;
        } catch (error) {
          console.error("Error validating currency data:", error);
          // Use cached data if validation fails
          setRates(safeRates);
          setLocalCurrency(
            cachedData.localCurrency &&
            cachedData.localCurrency !== "USD" &&
            safeRates[cachedData.localCurrency]
              ? cachedData.localCurrency
              : null
          );
          setCurrency("USD");
          setDisplayPrice(packageInfo.price);
          setCurrencyCode("USD");
          setIsLoading(false);
          return;
        }
      }

      // No valid cache, fetch fresh data
      try {
        setIsLoading(true);
        console.log("Fetching fresh currency data from /netlify/functions/fetchCurrency");
=======
  // Enhanced currency fetching with better error handling and logging
  const fetchCurrencyData = useCallback(async () => {
    const today = new Date().toDateString();
    const CACHE_KEY = "currencyData";
    
    try {
      // Check localStorage cache first
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          if (parsed && parsed.date === today && parsed.rates) {
            console.log("✅ Using cached currency data:", {
              localCurrency: parsed.localCurrency,
              ratesCount: Object.keys(parsed.rates).length,
              age: 'today'
            });
            
            const safeRates = { USD: 1, ...parsed.rates };
            setRates(safeRates);
            setDebugInfo(parsed.debug);

            if (parsed.localCurrency && 
                parsed.localCurrency !== "USD" && 
                safeRates[parsed.localCurrency]) {
              setLocalCurrency(parsed.localCurrency);
              console.log(`✅ Local currency from cache: ${parsed.localCurrency}`);
            } else {
              setLocalCurrency(null);
              console.log("ℹ️ No valid local currency in cache, using USD");
            }

            // Set initial display values
            setCurrency("USD");
            setDisplayPrice(packageInfo.price);
            setCurrencyCode("USD");
            setIsLoading(false);
            return;
          } else {
            console.log("ℹ️ Cache is stale or invalid, fetching fresh data");
          }
        } catch (parseError) {
          console.warn("⚠️ Failed to parse cached currency data:", parseError.message);
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // Fetch fresh data
      setIsLoading(true);
      console.log("🌐 Fetching fresh currency data...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      try {
        const response = await fetch("/.netlify/functions/fetchCurrency", {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });

        clearTimeout(timeoutId);
>>>>>>> working_main

        const response = await fetch("/netlify/functions/fetchCurrency");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("🌐 Currency API Response:", {
          localCurrency: data.localCurrencyCode,
          ratesCount: Object.keys(data.rates || {}).length,
          hasDebug: !!data.debug,
          hasError: !!data.error
        });

<<<<<<< HEAD
        const { localCurrencyCode, rates: fetchedRates } = data;
        console.log("Fetched localCurrencyCode:", localCurrencyCode);
        console.log("Fetched rates:", fetchedRates);

        const safeRates = { USD: 1, ...fetchedRates };
        console.log("Safe rates from API:", safeRates);
        setRates(safeRates);

        if (
          localCurrencyCode &&
          localCurrencyCode !== "USD" &&
          safeRates[localCurrencyCode]
        ) {
          setLocalCurrency(localCurrencyCode);
          console.log(`Local currency set: ${localCurrencyCode}`);
        } else {
          setLocalCurrency(null);
          console.log("No valid local currency, using USD");
=======
        // Log debug info if available
        if (data.debug) {
          console.log("🔍 Debug Info:", data.debug);
          setDebugInfo(data.debug);
>>>>>>> working_main
        }

        if (data.error) {
          console.warn("⚠️ API returned error:", data.error);
        }

        // Process the response
        const { localCurrencyCode, rates: fetchedRates } = data;
        const safeRates = { USD: 1, ...(fetchedRates || {}) };
        setRates(safeRates);

        // Determine if we have a valid local currency
        const hasValidLocalCurrency = localCurrencyCode && 
                                     localCurrencyCode !== "USD" && 
                                     safeRates[localCurrencyCode] &&
                                     safeRates[localCurrencyCode] > 0;

        if (hasValidLocalCurrency) {
          setLocalCurrency(localCurrencyCode);
          console.log(`✅ Local currency detected: ${localCurrencyCode} (Rate: ${safeRates[localCurrencyCode]})`);
        } else {
          setLocalCurrency(null);
          console.log("ℹ️ No valid local currency detected, using USD only");
          
          if (localCurrencyCode && localCurrencyCode !== "USD") {
            console.log(`⚠️ ${localCurrencyCode} was detected but rate is invalid:`, safeRates[localCurrencyCode]);
          }
        }

        // Cache the successful result
        const cacheData = {
          localCurrency: hasValidLocalCurrency ? localCurrencyCode : null,
          rates: safeRates,
          date: today,
          debug: data.debug,
          timestamp: new Date().toISOString()
        };

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
          console.log("💾 Currency data cached successfully");
        } catch (cacheError) {
          console.warn("⚠️ Failed to cache currency data:", cacheError.message);
        }

        // Set initial display state
        setCurrency("USD");
        setDisplayPrice(packageInfo.price);
        setCurrencyCode("USD");

      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          console.error("⏰ Currency fetch timed out");
        } else {
          console.error("❌ Currency fetch failed:", fetchError.message);
        }
        
        // Fallback to USD
        setLocalCurrency(null);
        setCurrency("USD");
        setRates({ USD: 1 });
        setDisplayPrice(packageInfo.price);
        setCurrencyCode("USD");
        setDebugInfo({ error: fetchError.message });
      }

    } catch (error) {
      console.error("❌ Critical error in currency fetching:", error.message);
      
      // Ultimate fallback
      setLocalCurrency(null);
      setCurrency("USD");
      setRates({ USD: 1 });
      setDisplayPrice(packageInfo.price);
      setCurrencyCode("USD");
      setDebugInfo({ criticalError: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [packageInfo.price]);

<<<<<<< HEAD
  const toggleCurrency = () => {
    const newCurrency = currency === "USD" && localCurrency ? localCurrency : "USD";
    console.log(`Toggling currency to: ${newCurrency}`);
=======
  // Fetch currency data on component mount
  useEffect(() => {
    // Add a small delay to not block initial render
    const timer = setTimeout(() => {
      fetchCurrencyData();
    }, 100);

    return () => clearTimeout(timer);
  }, [fetchCurrencyData]);

  // Currency toggle function
  const toggleCurrency = useCallback(() => {
    if (!localCurrency || !rates[localCurrency]) {
      console.warn("⚠️ Cannot toggle: no valid local currency available");
      return;
    }

    const newCurrency = currency === "USD" ? localCurrency : "USD";
>>>>>>> working_main
    setCurrency(newCurrency);

    try {
      const { price: convertedPrice, currencyCode: newCurrencyCode } = convertCurrency(
        packageInfo.price,
        "USD",
        newCurrency,
        rates
      );

<<<<<<< HEAD
    console.log(`Converted price: ${convertedPrice} ${currencyCode}`);
    setDisplayPrice(convertedPrice);
    setCurrencyCode(currencyCode);
  };
=======
      setDisplayPrice(convertedPrice);
      setCurrencyCode(newCurrencyCode);

      console.log(`🔄 Currency toggled to ${newCurrency}:`, {
        originalPrice: `USD ${packageInfo.price}`,
        convertedPrice: `${newCurrencyCode} ${convertedPrice}`,
        rate: rates[newCurrency]
      });
    } catch (error) {
      console.error("❌ Currency conversion failed:", error.message);
      // Fallback to original values
      setCurrency("USD");
      setDisplayPrice(packageInfo.price);
      setCurrencyCode("USD");
    }
  }, [currency, localCurrency, rates, packageInfo.price]);
>>>>>>> working_main

  // Format price for display
  const formattedPrice = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(displayPrice);

<<<<<<< HEAD
  const shouldShowToggle = localCurrency && rates[localCurrency] && localCurrency !== "USD";
  console.log("Toggle button visibility:", {
=======
  // Determine if toggle button should be shown
  const shouldShowToggle = localCurrency && 
                          rates[localCurrency] && 
                          localCurrency !== "USD" &&
                          rates[localCurrency] > 0;

  // Log current state for debugging
  console.log("💳 PackageCard State:", {
    isLoading,
    currency,
>>>>>>> working_main
    localCurrency,
    shouldShowToggle,
    ratesAvailable: Object.keys(rates),
    displayPrice: `${currencyCode} ${formattedPrice}`
  });

  // Create package info with current display values for the modal
  const currentPackageInfo = {
    ...packageInfo,
    displayPrice: `${currencyCode} ${formattedPrice}`,
    currentCurrency: currency,
    currentCurrencyCode: currencyCode,
  };

  return (
    <div
      className="relative bg-white rounded-xl shadow-xl w-full py-10 px-10 flex flex-col justify-between h-[650px] xl:h-[700px] overflow-hidden transition-all duration-300 border border-neon hover:ring-2 hover:ring-neon hover:shadow-[0_0_20px_rgba(0,197,255,0.2)]"
    >
      <div className="absolute bottom-[-50px] right-[-50px] w-[110px] h-[110px] bg-neon opacity-50 rounded-full animate-blob z-0"></div>

      {packageInfo.category && (
        <div className="absolute top-2 left-2 px-1 text-neon border border-neon opacity-100 rounded-xl flex items-center justify-center text-center text-10px font-bold">
          {packageInfo.category}
        </div>
      )}

      {packageInfo.ribbonText && (
        <div className="absolute top-4 right-[-40px] w-[160px] rotate-45 bg-neon text-black text-center text-xs font-bold py-1 shadow-md z-10">
          {packageInfo.ribbonText}
        </div>
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="absolute top-2 right-2 text-xs bg-gray-100 p-2 rounded max-w-[200px] text-left">
          <div>IP: {debugInfo.clientIp}</div>
          <div>Location: {debugInfo.location?.countryCode || 'N/A'}</div>
          <div>Currency: {debugInfo.detectedCurrency || 'N/A'}</div>
          <div>Rates: {debugInfo.ratesCount || 0}</div>
        </div>
      )}

      <div className="relative mb-2">
        <Heading
          text={packageInfo.title}
          size="text-70px xl:text-40px"
          className="font-bold text-center h-[100px] xl:h-[140px] overflow-hidden"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[4px] bg-black rounded-full"></div>
      </div>

      <BodyText
        text={packageInfo.description}
        centered={true}
        className="text-gray-600 text-sm mb-4 h-[50px] xl:h-[60px] leading-tight overflow-hidden"
      />

      <div className="flex flex-row justify-center items-end gap-x-2 mb-3 h-[70px]">
        <div className="flex flex-col justify-end min-w-[200px] items-center">
          <div className="flex items-end gap-x-1">
            <span className="text-sm font-medium">{currencyCode}</span>
            <span className="text-100px xl:text-60px leading-none font-bold">
              {formattedPrice}
            </span>
          </div>
          {isLoading && (
            <div className="text-xs text-gray-500 mt-1">Loading rates...</div>
          )}
        </div>

        {shouldShowToggle && !isLoading && (
          <div className="flex items-center justify-center w-[50px]">
            <button
              onClick={toggleCurrency}
              className="flex items-center justify-center px-2 py-1 text-10px font-medium rounded bg-gray-100 text-black hover:bg-neon hover:text-black transition-colors duration-200"
              title={`Switch to ${currency === "USD" ? localCurrency : "USD"}`}
            >
              {currency === "USD" ? localCurrency : "USD"}
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto my-4 h-[200px] rounded-md package-scrollbar text-black">
        <div className="space-y-4 max-w-[250px] mx-auto">
          {Object.entries(packageInfo.features).map(([section, items], i) => (
            <div key={i}>
              <h4 className="text-md font-bold text-black mb-1">{section}:</h4>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <FaCheckCircle className="text-neon text-xs mt-1 flex-shrink-0" />
                    <BodyText
                      text={item}
                      centered={false}
                      className="leading-snug text-sm pr-4"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-auto pt-10">
        <Button
          name="Buy Now"
          hoverBgColor="bg-neon"
          hoverTextColor="black"
          openPackageModal={true}
          packageInfo={currentPackageInfo}
        />
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-black">
          {contactDetails
            .filter((contact) => contact.type === "Email")
            .map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Icon className="text-neon" />
                  <a href={contact.link} className="hover:underline">
                    {contact.detail}
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;