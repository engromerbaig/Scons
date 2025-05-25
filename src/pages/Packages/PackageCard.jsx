import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Button from "../../components/Button/Button";
import { contactDetails } from "../../components/MobileMenu/modules/contactDetails";
import convertCurrency from "./convertCurrency";
import { fetchCurrencyRates } from "./convertCurrency";
import { countryToCurrency } from "../../utilities/currencyMap";
const PackageCard = ({ packageInfo }) => {
  const [currency, setCurrency] = useState("USD");
  const [localCurrency, setLocalCurrency] = useState(null);
  const [rates, setRates] = useState({ USD: 1 });

  // Fetch currency rates and determine local currency
  useEffect(() => {
    fetchCurrencyRates().then((fetchedRates) => {
      const nonUSDCurrency = Object.keys(fetchedRates).find((key) => key !== "USD");
      // Only set localCurrency if a valid rate exists (not 1 or undefined)
      if (nonUSDCurrency && fetchedRates[nonUSDCurrency] && fetchedRates[nonUSDCurrency] !== 1) {
        setLocalCurrency(nonUSDCurrency);
        console.log("Local currency set:", nonUSDCurrency);
      } else {
        setLocalCurrency(null);
        console.log("No valid local currency rate, using USD only");
      }
      setRates(fetchedRates);
      console.log("Rates set in PackageCard:", fetchedRates);
    });
  }, []);

  // Toggle between USD and local currency
  const toggleCurrency = () => {
    setCurrency(currency === "USD" ? localCurrency : "USD");
  };

  // Use rates from state, fallback to empty object if undefined
  const displayPrice = convertCurrency(
    packageInfo.price,
    "USD", // Assume base price is in USD
    currency,
    rates
  );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(displayPrice);

  // Get currency symbol from countryToCurrency or fallback to currency code
  const symbol = countryToCurrency[currency]?.symbol || currency;

  // Debug toggle button visibility
  console.log("Toggle button visibility check:", {
    localCurrency,
    hasRate: !!rates[localCurrency],
  });

  return (
    <div
      className="relative bg-white rounded-xl shadow-xl max-w-sm py-10 px-10 w-full flex flex-col justify-between h-[600px] xl:h-[700px]  overflow-hidden transition-all duration-300 border border-neon hover:ring-2 hover:ring-neon hover:shadow-[0_0_20px_rgba(0,197,255,0.2)]"
    >
      {/* Blob in bottom-right corner */}
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

      {/* Title with custom neon underline */}
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

      {/* Currency and Price */}
      <div className="flex flex-row justify-center items-end gap-x-2 mb-3 h-[70px]">
        <div className="flex flex-col justify-end min-w-[200px] items-center">
          <div className="flex items-end gap-x-1">
            <span className="text-sm">{symbol}</span>
            <span className="text-90px xl:text-60px leading-none font-bold">
              {formattedPrice}
            </span>
          </div>
        </div>

        {/* Currency Toggle Button (only shown if localCurrency and valid rate exist) */}
        {localCurrency && rates[localCurrency] && (
          <div className="flex items-center justify-center w-[50px]">
            <button
              onClick={toggleCurrency}
              className="flex items-center justify-center px-2 py-1 text-10px font-medium rounded bg-gray-100 text-black hover:bg-neon hover:text-black transition"
            >
              {currency === "USD" ? localCurrency : "USD"}
            </button>
          </div>
        )}
      </div>

      {/* Features */}
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

      {/* Call to Action */}
      <div className="text-center mt-auto pt-10">
        <Button
          name="Buy Now"
          hoverBgColor="bg-neon"
          hoverTextColor="black"
          openModal={true}
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