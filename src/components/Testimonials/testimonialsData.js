const placeholderClient = "https://randomuser.me/api/portraits/men/32.jpg";
const placeholderQuote = "https://cdn-icons-png.flaticon.com/512/25/25426.png";

import tillImage from "../../assets/images/testimonials/till.webp"
import ingeborgImage from "../../assets/images/testimonials/ingeborg.png"
import upworkImage from "../../assets/images/testimonials/3.svg"
import annaImage from "../../assets/images/testimonials/habib.webp"


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
    name: "Freelancer",
    position: "Freelancer via",
    company: "Upwork",
    rating: 5,
    clientImg: upworkImage,
  },
  {
    quote: "I hired Scons Tech in 2023 to support marketing for my brand QuantumLearn, an online platform focused on physics education in Germany. I was genuinely impressed by Mr. Faraz’s marketing skills — his strategy led to substantial growth across Europe. Their team was professional, proactive, and results-focused. Highly recommended!",
    name: "Mr. Habib Ali",
    position: "CEO",
    company: "QuantumLearn",
    rating: 5,
    clientImg: annaImage,
  },

];

export default testimonials;
