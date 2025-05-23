// Import the images for each industry
import ecommerceImage from "../../assets/images/industries/ecommerce.webp";
import educationImage from "../../assets/images/industries/education.webp";
import financeImage from "../../assets/images/industries/finance.webp";
import fintechImage from "../../assets/images/industries/fintech.webp";
import hospitalImage from "../../assets/images/industries/hospital.webp";
import hotelImage from "../../assets/images/industries/hotel.webp";
import ondemandImage from "../../assets/images/industries/ondemand.webp";
import realImage from "../../assets/images/industries/real.webp";
import techImage from "../../assets/images/industries/tech.webp";
import travelImage from "../../assets/images/industries/travel.webp";

const industries = [
    {
        name: "Financial Services",
        number: "01",
        image: financeImage,
        details: "Finance is all about getting the right alerts at the right time in addition to the best levels of encryption and a no-compromise approach. We understand that."
    },
    {
        name: "Healthcare",
        number: "02",
        image: hospitalImage,
        details: "From universal patient directories to automated hospital management systems, we do everything when it comes to healthcare software solutions."
    },
    {
        name: "E-Commerce",
        number: "03",
        image: ecommerceImage,
        details: "From custom payment gateways to automated traffic load scaling, our e-commerce software solutions are all about functionality."
    },
    {
        name: "EdTech",
        number: "04",
        image: educationImage,
        details: "Unleash the power of custom curriculums and the best-in-class attendance system and more with our edu-software solutions."
    },
    {
        name: "On-Demand Services",
        number: "05",
        image: ondemandImage,
        details: "Want to be the next DoorDash of medicinal equipment supplies or be the on-demand educational content supplier? We got you covered."
    },
    {
        name: "Travel & Tourism",
        number: "06",
        image: travelImage,
        details: "Whether it is automated flight booking or automated travel planning with variable condition settings, we do it all with our travel software solutions."
    },
    {
        name: "Real Estate",
        number: "07",
        image: realImage,
        details: "Do you want to automate the rent collection process for your tenants or get custom alerts for new prospective property listings? Our real-estate software Solutions are here for you."
    },
    {
        name: "Hospitality",
        number: "08",
        image: hotelImage,
        details: "Managing multiple restaurants and hotels can be challenging. Our hospitality enterprise software solutions ensure real-time establishment management."
    },
    {
        name: "Technology Solutions",
        number: "09",
        image: techImage,
        details: "Stay ahead in a fast-evolving digital world with our innovative technology solutions, offering seamless integration, enhanced security, and cutting-edge performance."
    },
    // Uncomment if needed later
    // {
    //     name: "FinTech",
    //     number: "10",
    //     image: fintechImage,
    //     details: "Transform financial services with our fintech solutions, designed to optimize transactions, improve security, and drive innovation in payments, banking, and investments."
    // },
];

export default industries;
