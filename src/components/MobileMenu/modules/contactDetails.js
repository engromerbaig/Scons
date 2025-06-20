// contactDetails.js

import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



export const contactDetails = [
  {
    type: 'Email',
    icon: MdEmail,
    detail: 'contact@sconstech.com',
    link: 'mailto:contact@sconstech.com',
  },

  
  {
    type: 'Phone',
    icon: FaPhoneAlt,
    // detail: '+44 (7546) 296 810',
    // link: 'tel:+44 (7546) 296 810',

     detail: '+92 311 21 36 495',
     link: 'tel:+92 311 2136495',
  },
  
];
