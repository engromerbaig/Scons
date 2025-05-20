import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Button from "../../components/Button/Button";

const currencyRates = {
    GBP: 0.0044, // Example: 1 PKR = 0.0044 GBP
};

const PackageCard = ({ packageInfo }) => {
    const [currency, setCurrency] = useState("PKR");

    const convertPrice = (price) => {
        if (currency === "PKR") return `PKR ${price}`;
        const converted = (price * currencyRates.GBP).toFixed(2);
        return `£${converted}`;
    };

    const toggleCurrency = () => {
        setCurrency((prev) => (prev === "PKR" ? "GBP" : "PKR"));
    };

    return (
        <div className="relative bg-white border border-grayText rounded-xl shadow-lg py-10 px-12 flex flex-col justify-between h-[600px] overflow-hidden">
            {/* Title */}
            <Heading text={packageInfo.title} className="text-3xl font-bold text-center mb-2" />

            {/* Price & Toggle */}
            <div className="flex flex-row justify-center items-center text-center mb-2">
                <BodyText text={convertPrice(packageInfo.price)} className="text-3xl font-semibold" />
                <button
                    onClick={toggleCurrency}
                    className="text-sm text-neon "
                >
                    View in {currency === "PKR" ? "GBP" : "PKR"}
                </button>
            </div>

            {/* Features with check icons */}
            <div className="flex-1  overflow-x-hidden overflow-y-auto my-10 h-[150px] rounded-md thin-scrollbar break-words text-black \">
                <ul className="space-y-2 max-w-[200px]">
                    {packageInfo.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-start space-x-2">
                            <FaCheckCircle className="text-neon text-sm" />
                            <BodyText text={feature} centered={false} />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Button inside, aligned to bottom */}
            <div className="mt-auto pt-10 text-center">
                <Button name="Buy Now" openModal={true} />
            </div>
        </div>
    );
};

export default PackageCard;
