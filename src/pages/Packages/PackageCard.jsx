import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Button from "../../components/Button/Button";
import { contactDetails } from "../../components/MobileMenu/modules/contactDetails";
import { convertCurrency } from "./convertCurrency";

const currencies = ["PKR", "GBP", "USD", "AED"];

const PackageCard = ({ packageInfo }) => {
  const [currency, setCurrency] = useState("PKR");

  const displayPrice = convertCurrency(packageInfo.price, "PKR", currency);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(displayPrice);

  return (
    <div className="relative bg-white rounded-xl shadow-xl py-10 px-10 flex flex-col justify-between h-[600px] overflow-hidden">
      {/* Blob in top-left corner */}
      <div className="absolute top-[-50px] left-[-50px] w-[120px] h-[120px] bg-neon opacity-50 rounded-full animate-blob z-0"></div>

      {packageInfo.ribbonText && (
        <div className="absolute top-4 right-[-40px] w-[160px] rotate-45 bg-neon text-black text-center text-xs font-bold py-1 shadow-md z-10">
          {packageInfo.ribbonText}
        </div>
      )}

      {/* Title with custom neon underline */}
      <div className="relative mb-2 z-10">
        <Heading
          text={packageInfo.title}
          size="text-70px xl:text-40px"
          className="font-bold text-center h-[100px]"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[4px] bg-black rounded-full"></div>
      </div>

      <BodyText
        text={packageInfo.description}
        centered={true}
        className="text-gray-600 text-sm mb-4 h-[40px] leading-snug overflow-hidden z-10"
      />

      {/* Currency and Price */}
      <div className="flex flex-row justify-center items-end gap-x-2 mb-3 h-[70px] z-10">
        <div className="flex flex-col justify-end min-w-[200px] items-center">
          <div className="flex items-end gap-x-1">
            <span className="text-sm">
              {currency === "PKR" ? "PKR" : currency === "GBP" ? "£" : currency === "USD" ? "$" : "AED"}
            </span>
            <span className="text-90px xl:text-60px leading-none font-bold">{formattedPrice}</span>
          </div>
        </div>

        {/* Currency Buttons */}
        <div className="grid grid-cols-2 grid-rows-2 gap-1 justify-center">
          {currencies.map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`flex items-center justify-center px-2 py-1 text-10px font-medium rounded transition ${
                currency === cur ? "bg-neon text-black" : "bg-gray-100 text-black"
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="flex-1 overflow-y-auto my-4 h-[200px] rounded-md package-scrollbar text-black z-10">
        <div className="space-y-4 max-w-[250px] mx-auto">
          {Object.entries(packageInfo.features).map(([section, items], i) => (
            <div key={i}>
              <h4 className="text-md font-bold text-black mb-1">{section}:</h4>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <FaCheckCircle className="text-neon text-xs mt-1 flex-shrink-0" />
                    <BodyText text={item} centered={false} className="leading-snug text-sm" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-auto pt-10 z-10">
        <Button name="Buy Now" hoverBgColor="bg-neon" hoverTextColor="black" openModal={true} />
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