import { useState, useEffect } from "react";
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

  // Fetch currency rates and determine local currency
  useEffect(() => {
    const fetchCurrencyData = async () => {
      const today = new Date().toDateString();
      const cachedData = JSON.parse(localStorage.getItem("currencyData"));

      if (cachedData && cachedData.date === today) {
        console.log("Using cached currency data:", cachedData);
        const safeRates = { USD: 1, ...cachedData.rates };
        setRates(safeRates);

        if (cachedData.localCurrency && cachedData.localCurrency !== "USD" && safeRates[cachedData.localCurrency]) {
          setLocalCurrency(cachedData.localCurrency);
          console.log(`Local currency from cache: ${cachedData.localCurrency}`);
        } else {
          setLocalCurrency(null);
          console.log("No valid local currency in cache, staying with USD");
        }

        setCurrency("USD");
        setDisplayPrice(packageInfo.price);
        setCurrencyCode("USD");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log("Fetching currency data...");

        const response = await fetch("/.netlify/functions/fetchCurrency");

        if (!response.ok) {
          throw new Error(`Netlify function status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Currency API response:", data);

        const { localCurrencyCode, rates: fetchedRates } = data;
        const safeRates = { USD: 1, ...fetchedRates };
        setRates(safeRates);

        if (localCurrencyCode && localCurrencyCode !== "USD" && safeRates[localCurrencyCode]) {
          setLocalCurrency(localCurrencyCode);
          console.log(`Local currency detected: ${localCurrencyCode}`);
        } else {
          setLocalCurrency(null);
          console.log("No valid local currency, staying with USD");
        }

        localStorage.setItem(
          "currencyData",
          JSON.stringify({
            localCurrency: localCurrencyCode,
            rates: safeRates,
            date: today,
          })
        );

        setCurrency("USD");
        setDisplayPrice(packageInfo.price);
        setCurrencyCode("USD");
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setLocalCurrency(null);
        setCurrency("USD");
        setRates({ USD: 1 });
        setDisplayPrice(packageInfo.price);
        setCurrencyCode("USD");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrencyData();
  }, [packageInfo.price]);

  const toggleCurrency = () => {
    const newCurrency = currency === "USD" && localCurrency ? localCurrency : "USD";
    setCurrency(newCurrency);

    const { price: convertedPrice, currencyCode } = convertCurrency(
      packageInfo.price,
      "USD",
      newCurrency,
      rates
    );

    setDisplayPrice(convertedPrice);
    setCurrencyCode(currencyCode);

    console.log(`Toggled to ${newCurrency}, price: ${convertedPrice} ${currencyCode}`);
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(displayPrice);

  if (isLoading) {
    console.log("PackageCard is loading currency data...");
  }

  const shouldShowToggle = localCurrency && rates[localCurrency] && localCurrency !== "USD";
  console.log("Toggle button visibility:", {
    localCurrency,
    hasRate: !!rates[localCurrency],
    isNonUSD: localCurrency !== "USD",
    shouldShow: shouldShowToggle,
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
      className="relative bg-white rounded-xl shadow-xl max-w-sm py-10 px-10 w-full flex flex-col justify-between h-[600px] xl:h-[700px] overflow-hidden transition-all duration-300 border border-neon hover:ring-2 hover:ring-neon hover:shadow-[0_0_20px_rgba(0,197,255,0.2)]"
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
            <span className="text-90px xl:text-60px leading-none font-bold">
              {formattedPrice}
            </span>
          </div>
        </div>

        {shouldShowToggle && (
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
                      className="leading-snug text-sm"
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
          packageInfo={currentPackageInfo} // Pass the current package info with display price
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