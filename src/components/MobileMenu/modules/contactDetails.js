// contactDetails.js

import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";



export const contactDetails = [
  {
    type: 'Email',
    icon: MdOutlineMail,
    detail: 'info@scons.com',
    link: 'mailto:info@scons.com',
  },
  {
    type: 'Phone',
    icon: FiPhone,
    detail: '(936) 978-9230',
    link: 'tel:(936) 978-9230',
  },
];
