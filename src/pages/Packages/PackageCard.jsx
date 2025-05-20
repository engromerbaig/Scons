import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Button from "../../components/Button/Button";
import { contactDetails } from "../../components/MobileMenu/modules/contactDetails";

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
        <div className="relative bg-white border border-grayText rounded-xl shadow-lg py-10 px-12 flex flex-col justify-between h-[600px] overflow-hidden">

{packageInfo.ribbonText && <div className="absolute top-4 right-[-40px] w-[160px] rotate-45 bg-neon text-black text-center text-xs font-bold py-1 shadow-md z-10">
    {packageInfo.ribbonText}
</div> }
            {/* Best Seller Ribbon */}


            {/* Title - Fixed height to accommodate two lines */}
            <Heading text={packageInfo.title} size="text-40px" className="font-bold text-center mb-2 h-[100px]" />

            {/* Short description - Fixed height to align across cards */}
            <BodyText
                text={packageInfo.description}
                centered={true}
                className="text-gray-600 text-sm mb-4 h-[40px] leading-snug overflow-hidden"
            />

            {/* Currency section */}
            <div className="flex flex-row justify-center items-end gap-x-2 mb-3 h-[70px]">
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
                                    currency === cur ? 'bg-neon text-black' : 'bg-gray-100 text-black'
                                }`}
                            >
                                {cur}
                            </button>
                        ))}
                    </div>
                </div>
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
                                        <BodyText text={item} centered={false} className="leading-snug text-sm" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
 <div className="text-center mt-auto pt-10">
    <Button name="Buy Now" hoverBgColor="bg-neon" hoverTextColor="black" openModal={true} />
    {/* Contact Info - Email Only */}
    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-black">
        {contactDetails
            .filter(contact => contact.type === 'Email')
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