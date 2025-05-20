import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Button from "../../components/Button/Button";

const currencyRates = {
    GBP: 0.0044,
};

const PackageCard = ({ packageInfo }) => {
    const [currency, setCurrency] = useState("PKR");

    const convertPrice = (price) => {
        if (currency === "PKR") return price;
        return (price * currencyRates.GBP).toFixed(2);
    };

    return (
        <div className="relative bg-white border border-grayText rounded-xl shadow-lg py-10 px-12 flex flex-col justify-between h-[600px] overflow-hidden">
            {/* Title */}
            <Heading text={packageInfo.title} className="text-3xl font-bold text-center mb-2" />
              <div className="flex flex-col items-center mb-3">
                    <div className="text-3xl font-semibold flex items-baseline space-x-1">
                        <span className="text-base">{currency === "PKR" ? "PKR" : "£"}</span>
                        <span>{convertPrice(packageInfo.price)}</span>
                    </div>
                    <div className="flex mt-2 space-x-2">
                        {["PKR", "GBP"].map((cur) => (
                            <button
                                key={cur}
                                onClick={() => setCurrency(cur)}
                                className={`px-3 py-1 rounded-full text-sm border transition ${
                                    currency === cur
                                        ? "bg-neon text-white"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {cur}
                            </button>
                        ))}
                    </div>
                </div>

            {/* Features */}
            <div className="flex-1 overflow-y-auto my-8 h-[150px] rounded-md package-scrollbar text-black">
                <ul className="space-y-3 max-w-[220px] mx-auto">
                    {packageInfo.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                            <FaCheckCircle className="text-neon text-sm mt-1 flex-shrink-0" />
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
