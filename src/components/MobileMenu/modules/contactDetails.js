// contactDetails.js

import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



export const contactDetails = [
  {
    type: 'Email',
    icon: MdEmail,
    detail: 'info@scons.com',
    link: 'mailto:info@scons.com',
  },
  {
    type: 'Phone',
    icon: FaPhoneAlt,
    detail: '+44 (7546) 296 810',
    link: 'tel:+44 (7546) 296 810',
  },
];
