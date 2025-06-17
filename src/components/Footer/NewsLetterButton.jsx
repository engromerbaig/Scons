import Button from "../Button/Button";
import { BsNewspaper } from "react-icons/bs";
import { renderToStaticMarkup } from 'react-dom/server';

const NewsLetterButton = () => {
  // Convert icon to SVG string
  const iconMarkup = renderToStaticMarkup(<BsNewspaper size={12} color="black" />);
  const encodedIcon = `data:image/svg+xml;utf8,${encodeURIComponent(iconMarkup)}`;

  return (
    <Button
      name="Subscribe to Newsletter"
      bgColor="bg-neon"
      hoverBgColor="bg-neon"
      textColor="black"
      hoverTextColor="black"
      icon={encodedIcon}
      noIconChange={true}
    />
  );
};

export default NewsLetterButton;
