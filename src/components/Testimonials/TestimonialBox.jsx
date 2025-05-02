import React from "react";

const TestimonialBox = ({
  quote,
  name,
  position,
  company,
  rating,
  clientImg,
  quoteImg,
}) => (
  <div className="bg-[#181818] rounded-xl shadow-lg p-8 flex flex-col gap-4 w-full max-w-xl mx-auto">
    {/* Quote Icon */}
    <div className="flex items-center">
      <img src={quoteImg} alt="Quote" className="w-8 h-8 mr-2" />
      <span className="text-white text-lg italic">{quote}</span>
    </div>
    {/* Client Info */}
    <div className="flex items-center mt-4">
      <img
        src={clientImg}
        alt={name}
        className="w-12 h-12 rounded-full border-2 border-green-400 mr-4"
      />
      <div>
        <div className="font-semibold text-white">{name}</div>
        <div className="text-gray-400 text-sm">{position}, {company}</div>
        {/* Star Rating */}
        <div className="flex mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < rating ? "text-green-400" : "text-gray-600"}>★</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialBox;
