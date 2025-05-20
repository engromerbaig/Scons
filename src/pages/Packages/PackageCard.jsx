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
        return (price * currencyRates.GBP).toFixed(0);
    };

    return (
        <div className="relative bg-white gap-y-4 border border-grayText rounded-xl shadow-lg py-10 px-12 flex flex-col justify-between h-[600px] overflow-hidden">
            {/* Title */}
            <Heading text={packageInfo.title} size="text-40px" className=" font-bold text-center mb-2" />

            {/* currency part */}
              <div className="flex flex-row justify-center gap-x-2 items-center mb-3">
                    <div className="text-3xl font-semibold flex items-baseline space-x-1">
                        <span className="text-sm">{currency === "PKR" ? "PKR" : "£"}</span>
                        <span className="text-60px font-bold">{convertPrice(packageInfo.price)}</span>
                    </div>
                    <div className="flex mt-2 space-x-1">
                        {["PKR", "GBP"].map((cur) => (
                            <button
                                key={cur}
                                onClick={() => setCurrency(cur)}
                                className={`px-1 py-1  text-10px  transition ${
                                    currency === cur
                                        ? "bg-neon text-black"
                                        : "bg-gray-100 text-black"
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
