import React, { useState } from 'react';
import Button from "../Button/Button";
import { BsNewspaper } from "react-icons/bs";
import { renderToStaticMarkup } from 'react-dom/server';
import NewsletterModal from './NewsletterModal';

const NewsLetterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iconMarkup = renderToStaticMarkup(<BsNewspaper size={12} color="black" />);
  const encodedIcon = `data:image/svg+xml;utf8,${encodeURIComponent(iconMarkup)}`;

  return (
    <>
      <Button
        name="Subscribe to Newsletter"
        bgColor="bg-neon"
        hoverBgColor="bg-neon"
        textColor="black"
        hoverTextColor="black"
        icon={encodedIcon}
        noIconChange={true}
        onClick={() => setIsModalOpen(true)}
      />
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default NewsLetterButton;
