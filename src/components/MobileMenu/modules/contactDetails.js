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
    detail: '(936) 978-9230',
    link: 'tel:(936) 978-9230',
  },
];
