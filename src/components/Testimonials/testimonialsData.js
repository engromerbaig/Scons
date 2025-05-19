const placeholderClient = "https://randomuser.me/api/portraits/men/32.jpg";
const placeholderQuote = "https://cdn-icons-png.flaticon.com/512/25/25426.png";

import tillImage from "../../assets/images/testimonials/till.webp"
import ingeborgImage from "../../assets/images/testimonials/ingeborg.png"

import quoteIcon from "../../assets/images/testimonials/quote.svg"

const testimonials = [
  {
    quote: "After 30 hours of working with Muhammad (CEO Scons), I couldn't be more impressed by his professional and diligent way of meeting our needs. I am grateful for his calm and effective approach to every issue that my team and I have had to resolve and am looking forward to a lasting working relationship with him.",
        name: "Till Kruger",

    position: "CCO",
    company: "GlobalNation",
    rating: 5,
    clientImg: tillImage,
  },
  {
    quote: "Mr. Muhammad worked tirelessly during the development of our B2C solutions. His dedication, problem-solving skills, and consistent effort were truly commendable. I am genuinely grateful for his valuable contributions.",
    name: "Ms. Ingeborg Scheer ",
    position: "CEO",
    company: "dasign GmBH",
    rating: 5,
    clientImg: ingeborgImage,
  },
  {
    quote: "Job well done. Good communication and understanding. Highly recommend!",
    name: "Michael Chen",
    position: "Freelancer",
    company: "Upwork",
    rating: 4,
    clientImg: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    quote: "Professional, reliable, and creative. Highly recommend for any tech project.",
    name: "Emily Park",
    position: "CEO",
    company: "EduSpark",
    rating: 5,
    clientImg: "https://randomuser.me/api/portraits/women/68.jpg",
  },

];

export default testimonials;
