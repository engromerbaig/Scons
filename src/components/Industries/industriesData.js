// Import the icon(s) for each industry


// new
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






import eCommerceIcon from '../../assets/icons/industries/Ecommerce.svg';
import educationIcon from '../../assets/icons/industries/Education.svg';


import fintechIcon from '../../assets/icons/industries/Fintech.svg';


import financeIcon from '../../assets/icons/industries/Finance.svg';
import healthCareIcon from '../../assets/icons/industries/HealthCare.svg';
import hotelIcon from '../../assets/icons/industries/Hotel.svg';
import onDemandIcon from '../../assets/icons/industries/OnDemand.svg';
import realEstateIcon from '../../assets/icons/industries/RealEstate.svg';
import travelIcon from '../../assets/icons/industries/Travel.svg';


import techIcon from '../../assets/icons/industries/Technology.svg';



const industries = [
    {
        name: "Finance",
      number: "01",
        icon: financeIcon,
        image: financeImage,
        details: "Finance is all about getting the right alerts at the right time in addition to the best levels of encryption and a no-compromise approach. We understand that."
    },
    {
        name: "Health Care",
        number: "02",
        icon: healthCareIcon,
        image: hospitalImage,

        details: "From universal patient directories to automated hospital management systems, we do everything when it comes to healthcare software solutions."
    },
    {
        name: "Ecommerce",
        number: "03",

        icon: eCommerceIcon,
        image: ecommerceImage,

        details: "From custom payment gateways to automated traffic load scaling, our e-commerce software solutions are all about functionality."
    },
    {
        name: "Education",
        number: "04",
        icon: educationIcon,
                image: educationImage,

        details: "Unleash the power of custom curriculums and the best-in-class attendance system and more with our edu-software solutions."
    },
    {
        name: "On Demand",
        number: "05",
        icon: onDemandIcon,
                image: ondemandImage,

        details: "Want to be the next DoorDash of medicinal equipment supplies or be the on-demand educational content supplier? We got you covered."
    },
    {
        name: "Travel",
        number: "06",
        icon: travelIcon,
                image: travelImage,

        details: "Whether it is automated flight booking or automated travel planning with variable condition settings, we do it all with our travel software solutions."
    },
    {
        name: "Real Estate",
        number: "07",
        icon: realEstateIcon,
                image: realImage,

        details: "Do you want to automate the rent collection process for your tenants or get custom alerts for new prospective property listings? Our real-estate software Solutions are here for you."
    },
    {
        name: "Hospitality",
        number: "08",
        icon: hotelIcon,
                image: hotelImage,

        details: "Managing multiple restaurants and hotels can be challenging. Our hospitality enterprise software solutions ensure real-time establishment management."
    },

    // new
    {
        name: "Technology",
        number: "09",
        icon: techIcon,
                image: techImage,

        details: "Stay ahead in a fast-evolving digital world with our innovative technology solutions, offering seamless integration, enhanced security, and cutting-edge performance."

    },

    // new
    // {
    //     name: "Fintech",
    //     number: "10",
    //     icon: fintechIcon,
    //             image: financeImage,

    //     details: "Transform financial services with our fintech solutions, designed to optimize transactions, improve security, and drive innovation in payments, banking, and investments."

    // },
];

export default industries;
