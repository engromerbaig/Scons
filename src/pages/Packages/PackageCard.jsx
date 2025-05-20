import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Button from "../../components/Button/Button";

const currencyRates = {
    GBP: 0.0027,
};

const PackageCard = ({ packageInfo }) => {
    const [currency, setCurrency] = useState("PKR");

    const convertPrice = (price) => {
        if (currency === "PKR") return price;
        return (price * currencyRates.GBP).toFixed(0);
    };

    return (
        <div className="relative bg-white gap-y-4 border border-grayText rounded-xl shadow-lg py-10 px-12 flex flex-col justify-between h-[600px] overflow-hidden">
            {/* Title */}
            <Heading text={packageInfo.title} size="text-40px" className="font-bold text-center mb-2" />

            {/* Currency part */}
        <div className="flex flex-row justify-center items-end gap-x-2 mb-3">
  {/* Currency and Price */}
  <div className="flex flex-col justify-end min-w-[200px] items-center">
    <div className="flex items-end gap-x-1">
      <span className="text-sm">{currency === "PKR" ? "PKR" : "£"}</span>
      <span className="text-[50px] leading-none font-bold">
        {convertPrice(packageInfo.price)}
      </span>
    </div>
  </div>

  {/* Currency Buttons */}
  <div className="flex flex-col justify-end">
    <div className="flex space-x-1">
      {["PKR", "GBP"].map((cur) => (
        <button
          key={cur}
          onClick={() => setCurrency(cur)}
          className={`px-2 py-1 text-[10px] font-medium rounded transition ${
            currency === cur ? "bg-neon text-black" : "bg-gray-100 text-black"
          }`}
        >
          {cur}
        </button>
      ))}
    </div>
  </div>
</div>


            {/* Features */}
            <div className="flex-1 overflow-y-auto my-8 h-[150px] rounded-md package-scrollbar text-black">
                <ul className="space-y-3 max-w-[220px] mx-auto">
                    {packageInfo.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                            <FaCheckCircle className="text-neon text-sm mt-2 flex-shrink-0" />
                            <BodyText
                                text={feature}
                                centered={false}
                                className="break-words leading-snug"
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price and Currency Toggle */}
            <div className="text-center mt-auto pt-5">
                {/* CTA Button */}
                <Button name="Buy Now" openModal={true} />
            </div>
        </div>
    );
};

export default PackageCard;