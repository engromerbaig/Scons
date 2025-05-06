// Import the icon(s) for each industry


import industryImage from "../../assets/images/industries/1.webp"
// new


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
        icon: financeIcon,
        image: industryImage,
        details: "Finance is all about getting the right alerts at the right time in addition to the best levels of encryption and a no-compromise approach. We understand that."
    },
    {
        name: "Health Care",
        icon: healthCareIcon,
        image: industryImage,

        details: "From universal patient directories to automated hospital management systems, we do everything when it comes to healthcare software solutions."
    },
    {
        name: "Ecommerce",
        icon: eCommerceIcon,
        image: industryImage,

        details: "From custom payment gateways to automated traffic load scaling, our e-commerce software solutions are all about functionality."
    },
    {
        name: "Education",
        icon: educationIcon,
                image: industryImage,

        details: "Unleash the power of custom curriculums and the best-in-class attendance system and more with our edu-software solutions."
    },
    {
        name: "On Demand",
        icon: onDemandIcon,
                image: industryImage,

        details: "Want to be the next DoorDash of medicinal equipment supplies or be the on-demand educational content supplier? We got you covered."
    },
    {
        name: "Travel",
        icon: travelIcon,
                image: industryImage,

        details: "Whether it is automated flight booking or automated travel planning with variable condition settings, we do it all with our travel software solutions."
    },
    {
        name: "Real Estate",
        icon: realEstateIcon,
                image: industryImage,

        details: "Do you want to automate the rent collection process for your tenants or get custom alerts for new prospective property listings? Our real-estate software Solutions are here for you."
    },
    {
        name: "Hospitality",
        icon: hotelIcon,
                image: industryImage,

        details: "Managing multiple restaurants and hotels can be challenging. Our hospitality enterprise software solutions ensure real-time establishment management."
    },

    // new
    {
        name: "Technology",
        icon: techIcon,
                image: industryImage,

        details: "Stay ahead in a fast-evolving digital world with our innovative technology solutions, offering seamless integration, enhanced security, and cutting-edge performance."

    },

    // new
    {
        name: "Fintech",
        icon: fintechIcon,
                image: industryImage,

        details: "Transform financial services with our fintech solutions, designed to optimize transactions, improve security, and drive innovation in payments, banking, and investments."

    },
];

export default industries;
