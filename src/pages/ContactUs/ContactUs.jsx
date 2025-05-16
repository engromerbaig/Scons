
import React, { useRef, useEffect, useState } from "react";

import BodyText from "../../components/BodyText/BodyText";
import Heading from '../../components/Heading/Heading';
import { theme } from '../../theme';
import InnerHero from "../../components/InnerHero/InnerHero";
import contactImage from "../../assets/images/contact.svg";


const ContactUs = () => {
    return ( <div>

        <InnerHero
  headingText="Get in Contact With Us"
  spanText="Contact"
  bodyText="Have questions or want to work with us? Reach out today — we’re here to help and look forward to connecting with you."
  illustrationImage={contactImage}
  illustrationImageWidth="w-3/4"
/>
    </div> );
}
 
export default ContactUs;