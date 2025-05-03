import karachiImage from '../../../assets/icons/locations/Karachi.svg';
import dubaiImage from '../../../assets/icons/locations/Dubai.webp';
import sydneyImage from '../../../assets/icons/locations/Sydney.svg';
import houstonImage from '../../../assets/icons/locations/Houston.webp';

const accordionData = [
    {
        title: "Glasgow",
        country: "UK",
        lineHeight: "long",
        content: {
            address: "Office 1/2 351 Calder Street G427NT, Glasgow, Scotland",
            phone: "+44 7546 296810",
            image: sydneyImage, // Reusing Sydney image as requested
        },
    },
   
    {
        title: "Karachi",
        country: "Pakistan",
        lineHeight: "long",
        content: {
            address: "Office 1A1, Westland Trade Center, Jinnah Housing Society Karachi, 75300",
            phone: "+92 311 2136495",
            image: karachiImage,
        },
    },
];

export default accordionData;
