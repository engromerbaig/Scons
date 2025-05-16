
import React, { useRef, useEffect, useState } from "react";

import BodyText from "../../components/BodyText/BodyText";
import Heading from '../../components/Heading/Heading';
import { theme } from '../../theme';
import InnerHero from "../../components/InnerHero/InnerHero";


const ContactUs = () => {
    return ( <div>

        <InnerHero
  headingText="Get in Contact With Us"
  spanText="Contact"
  bodyText="Have questions or want to work with us? Reach out today — we’re here to help and look forward to connecting with you."
/>
    </div> );
}
 
export default ContactUs;