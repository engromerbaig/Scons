import icons from "./modules/icons";
import mobileAppImage from "../../assets/images/services/1.svg"
import webAppImage from "../../assets/images/services/2.svg"
import uiuxImage from "../../assets/images/services/3.svg"
import blockchainImage from "../../assets/images/services/4.svg"
import cloudImage from "../../assets/images/services/5.svg"
import aiImage from "../../assets/images/services/6.svg"
import consultationImage from "../../assets/images/services/7.webp"






export const servicesHeading = {
  text: "Our Services",
  spanText: "Services",
  
};

export const descriptorText =
  "Comprehensive services covering software development, enterprise solutions, app/web development, and innovative technologies tailored to meet diverse business needs.";


export const services = [
  {
    heading: "Mobile App Development",
    spanText:"Mobile",
image: mobileAppImage,
    // details hero page content
    heading2: "It Starts with a Vision in Mobile App Development",
    description: "Bringing Ideas to Life, One App at a Time",
    helperText:"Mobile apps designed to meet today’s needs and redefine possibilities for tomorrow’s challenges. ",
    circularSection:[
    {
      word:"Innovation",
      icon: icons.circle.mobileCircle1,
    },

    {
      word:"Engagement",
      icon: icons.circle.mobileCircle2,
    },

    {
      word:"Performance",
      icon: icons.circle.mobileCircle3,
    },
    ],





    slug: "mobile-app-development",  // Added slug
    tagline: "Empowering Your Mobile Future",
    faqSpanText: "Develop Your Mobile App",
    faqBodyText: "Our mobile app development services deliver seamless, intuitive, and high-performance applications across platforms. We create native and hybrid apps designed to enhance your business's mobile presence.",
    processBodyText: "A typical mobile app development project at Scons begins with ideation and concept creation, followed by the design phase where we focus on UI/UX. Once the design is finalized, the development stage begins, where we build the app for different platforms. After development, we conduct rigorous testing to ensure performance and usability.",

    number: "01",
    faqData : [
      {
        question: "What is mobile app development, and why is it important?", 
        answer: "Mobile app development involves creating software applications that run on mobile devices. It's crucial for engaging customers and streamlining business processes in today’s mobile-first world."
      },
      {
        question: "Which platforms do you develop apps for?", 
        answer: "Apps are developed for both iOS and Android platforms, ensuring broad market reach and compatibility."
      },
      {
        question: "How long does it take to develop a mobile app?", 
        answer: "Development timelines vary based on complexity but typically range from 3 to 6 months."
      },
      {
        question: "What is the cost of mobile app development?", 
        answer: "Costs depend on features, complexity, and platform choice. A detailed proposal can provide precise estimates."
      },
      {
        question: "Can you develop cross-platform apps?", 
        answer: "Yes, cross-platform solutions like Flutter or React Native allow a single app to run on multiple platforms."
      },
      {
        question: "Will I own the app once it’s developed?", 
        answer: "Absolutely. Clients retain full ownership of the source code and intellectual property."
      },
      {
        question: "How do you ensure app security?", 
        answer: "Robust encryption, secure APIs, and compliance with platform guidelines are prioritized to protect user data."
      },
      {
        question: "What happens after the app is launched?", 
        answer: "Post-launch support includes maintenance, updates, and performance optimization to ensure long-term success."
      }
    ],

    featureData : [
      {
        number: "01",
        title: "Idea & Conceptualization",
        description: "The first step involves brainstorming and validating the idea for the mobile app, identifying target users, and outlining the app's core functionality and purpose.",
      },
      {
        number: "02",
        title: "UI/UX Design",
        description: "In this stage, the focus is on designing the app's user interface (UI) and user experience (UX) to ensure it's intuitive, aesthetically pleasing, and optimized for mobile devices.",
      },
      {
        number: "03",
        title: "App Development",
        description: "The development phase includes writing the code, implementing APIs, integrating third-party services, and ensuring the app functions across various devices and platforms (iOS, Android).",
      },
      {
        number: "04",
        title: "Testing & Quality Assurance",
        description: "During testing, the app undergoes rigorous checks for bugs, performance issues, security vulnerabilities, and compatibility with different devices and operating systems.",
      },
      {
        number: "05",
        title: "Launch & Maintenance",
        description: "After successful testing, the app is launched on app stores (Google Play, App Store). Post-launch, the focus shifts to regular updates, bug fixes, and ensuring app performance remains optimal over time.",
      },
    ],
    
    


    services: ["iOS", "Android", "Hybrid"],
    iconRows: [
      {
        service: "iOS",  // Corresponding service
        serviceHeading: "iOS",  // Corresponding service
        faqIcon: [icons.faq.mobileFAQ1],  // Same icons as web
        details: [  // Details related to iOS
          {
            heading: "Swift",
            description: "iOS apps are the cornerstone of Apple’s ecosystem, offering seamless experiences across devices like iPhones and iPads. They are known for their performance, user-friendly interfaces, and adherence to strict quality standards. At Scons, we understand the intricacies of iOS development, from coding to design and optimization. By leveraging Apple’s native tools and best practices, we deliver apps that not only meet App Store requirements but also stand out in a competitive market. Businesses choose us because of our ability to combine functionality with an intuitive design that resonates with users.  ",
          },
          // {
          //   heading: "UIKit",
          //   description: "Developing native user interfaces with Apple's UIKit framework for optimal performance.",
          // },
        ],
        icons: [ 
          icons.mobile.SwiftIOS, 
          icons.mobile.UIKit, 
          icons.mobile.CoreData
        ],  // Icons for iOS
      },
      {
        service: "Android",  // Corresponding service
        serviceHeading: "Android",  // Corresponding service
        faqIcon: [icons.faq.mobileFAQ2],  // Same icons as web
        details: [  // Details related to Android
          {
            heading: "Java",
            description: "Android powers the majority of mobile devices worldwide, offering unparalleled reach for businesses. Developing an Android app requires addressing compatibility across different devices, versions, and screen sizes. At Scons, we develop apps tailored to Android’s unique ecosystem, ensuring optimal performance and a native feel across devices. Our expertise in building scalable solutions helps businesses cater to global audiences. Clients partner with us because we strike the perfect balance between innovation and practicality, ensuring your app achieves its goals.",
          },
          // {
          //   heading: "Kotlin",
          //   description: "Using Kotlin for modern, expressive, and type-safe Android development.",
          // },
        ],
        icons: [
          icons.mobile.Java, 
          icons.mobile.Kotlin, 
          icons.mobile.Retrofit
        ],  // Icons for Android
      },
      {
        service: "Hybrid",  // Corresponding service
        serviceHeading: "Hybrid Apps",  // Corresponding service
        faqIcon: [icons.faq.mobileFAQ3],  // Same icons as web
        details: [  // Details related to Hybrid
          {
            heading: "Flutter",
            description: "Hybrid apps are ideal for businesses looking to maximize reach without developing separate apps for iOS and Android. Using advanced frameworks like Flutter and React Native, hybrid apps offer near-native performance while reducing development time and cost. Scons excels at building feature-rich hybrid applications that work seamlessly across platforms. Our clients trust us to deliver consistent quality, enabling them to target diverse audiences without compromising user experience.",
          },
          // {
          //   heading: "React Native",
          //   description: "Creating cross-platform mobile apps using JavaScript and React Native.",
          // },
        ],
        icons: [
          icons.mobile.FlutterHybrid, 
          icons.mobile.ReactNative
        ],  // Icons for Hybrid
      },
    ],  // Each service has its own array of icons
  },
  


  // changing for details page web
  {
    heading: "Web App Development",
    spanText:"App Development",

    image: webAppImage,

    heading2: "Expanding Horizons with Web App Development",
    description: "Your Digital Growth Engine",
    helperText: "Dynamic, scalable web solutions that amplify reach and unlock new opportunities for growth.",
    circularSection: [
      {
        word: "Flexibility",
        icon: icons.circle.webCircle1,
      },
      {
        word: "Speed",
        icon: icons.circle.webCircle2,
      },
      {
        word: "Reliability",
        icon: icons.circle.webCircle3,
      },
    ],
    

    slug: "web-app-development",  // Added slug
    tagline: "Scalable Web Solutions for Growth",
    faqSpanText : "Develop Your Website",
    faqBodyText : "Our comprehensive web development services cover everything from intuitive design to seamless functionality. We create responsive, secure, and high-performance websites tailored to your business needs.",
    processBodyText:"A typical web development project at Scons begins with concept creation, followed by the planning phase and the development stage. After that, the process moves on to fine-tuning, testing, and ultimately, delivery.",
    number: "02",
 faqData : [
  {
    question: "What is a web app, and how is it different from a website?", 
    answer: "A web app is an interactive, dynamic software accessed via a browser, whereas a website primarily offers static content."
  },
  {
    question: "What frameworks and technologies do you use for web development?", 
    answer: "Development often involves React, Angular, Laravel, Node.js, and other modern technologies based on project needs."
  },
  {
    question: "Can web apps handle high traffic?", 
    answer: "Yes, scalable architectures are implemented to ensure web apps perform well under heavy user loads."
  },
  {
    question: "How do you ensure cross-browser compatibility?", 
    answer: "Rigorous testing is conducted across all major browsers, including Chrome, Safari, and Edge."
  },
  {
    question: "What is the typical timeline for web app development?", 
    answer: "Timelines vary by complexity, ranging from 3 to 8 months for most projects."
  },
  {
    question: "Can you integrate third-party services into a web app?", 
    answer: "Yes, APIs are utilized to integrate payment gateways, analytics, CRMs, and more."
  },
  {
    question: "What kind of support is available post-launch?", 
    answer: "Ongoing maintenance, performance monitoring, and updates are available as part of our services."
  },
  {
    question: "Do web apps work offline?", 
    answer: "Progressive Web Apps (PWAs) enable offline functionality through caching and service workers."
  }
],


    featureData : [
      {
        number: "01",
        title: "Concept Creation",
        description: "This stage of the web development process involves brainstorming ideas while considering key factors such as the target audience.",
      },
      {
        number: "02",
        title: "Planning Phase",
        description: "In this phase, we map out the entire development process, create a roadmap, and ensure that the project is aligned with business goals and user needs.",
      },
      {
        number: "03",
        title: "Development Stage",
        description: "The development phase involves writing the code, setting up databases, and integrating various technologies to bring the website to life.",
      },
      {
        number: "04",
        title: "Testing & Delivery",
        description: "In this final phase, we rigorously test the website for bugs, performance, and security issues before launching it to the public.",
      },
    ],
    
    services: ["Frontend", "Backend", "CMS"],
    iconRows: [
      {
        service: "Frontend",
        serviceHeading: "Frontend", // Corresponding service
        faqIcon:[icons.faq.webFAQ1],
        details: [ // Details related to this service
          {
            heading: "HTML/CSS",
            description: "The frontend of a web app is the user’s first touchpoint. It’s responsible for delivering a visually appealing, fast, and responsive experience. At Scons, we craft frontend solutions using modern technologies like React, Angular, and Vue.js to create engaging interfaces. Whether you need a simple interface or a complex user dashboard, we ensure every design enhances usability and performance. Businesses value our ability to combine aesthetics with technical precision, making their platforms truly stand out.",
          },
    
        ],
        icons: [
          icons.web.JSFrontend, 
          icons.web.TSFrontend, 
          icons.web.ReactFrontend, 
          icons.web.NextFrontend,
          icons.web.VueFrontend,

      ], // Icons for Frontend
       // Icons for Frontend
      },
      {
        service: "Backend", 
        serviceHeading: "Backend", // Corresponding service
        faqIcon:[icons.faq.webFAQ2],

        details: [ // Details related to Backend
          {
            heading: "Node.js",
            description: "The backend is the backbone of any web application, managing data, server-side logic, and system integrations. It ensures everything runs smoothly behind the scenes. Scons specializes in building scalable, secure backends using robust technologies like Node.js, Laravel, and Python. We design architectures that can handle growth and complex workflows with ease. Companies rely on us for backend solutions because of our focus on reliability, security, and future scalability.",
          },
     
        ],
        // Corresponding service
        icons: [
          icons.web.Backend2,
          icons.web.Backend3,
          icons.web.JavaBackend,
          icons.web.JSBackend,
          icons.web.LaravelBackend
      ], // Icons for Backend
      
      },
      {
        service: "CMS", // Corresponding service
        serviceHeading: "CMS Solutions", // Corresponding service
        faqIcon:[icons.faq.webFAQ3],

        details: [ // Details related to CMS
          {
            heading: "WordPress",
            description: "A CMS is essential for managing content efficiently without needing technical expertise. It allows businesses to update websites, blogs, and product catalogs effortlessly. Scons develops custom CMS platforms or works with popular solutions like WordPress and Drupal to match your needs. Our clients appreciate our ability to tailor CMS functionality, ensuring a perfect fit for their business workflows.",
          },
      
        ],

        icons: [icons.web.Wordpress, icons.web.Shopify, icons.web.Magneto, icons.web.Webflow], // Icons for CMS
      },

    ], // Each service has its own array of icons
  },


  // updating this uxi

  {
    heading: "UI/UX Design",
    spanText:"Design",

    image: uiuxImage,

    heading2: "Designed to Stand Out in UI/UX Design",  
    description: "Where Function Meets Elegance",  
    helperText: "Exceptional design focused on creating unforgettable user experiences and lasting impressions",  
    circularSection: [
      {
        word: "Creativity",
        icon: icons.circle.uiuxCircle1,
      },
      {
        word: "Intuition",
        icon: icons.circle.uiuxCircle2,
      },
      {
        word: "Impact",
        icon: icons.circle.uiuxCircle3,
      },
    ],
    
    slug: "ui-ux-design",  // Added slug
    tagline: "Designing Exceptional Experiences",
    faqSpanText: "Design your Website",
    faqBodyText: "Our UI/UX Design services focus on creating user-centered designs that improve engagement and usability across digital platforms. From research and ideation to prototyping and testing, we ensure that your app or website is not only visually appealing but also easy to use.",
    processBodyText: "A typical UI/UX design project at Scons starts with research and understanding the user's needs. Next, we move on to wireframing and creating low-fidelity prototypes to visualize the layout.",

    number: "03",
    
    faqData: [
      {
        question: "What is the difference between UI and UX design?", 
        answer: "UI focuses on visual elements, while UX involves the overall user journey and experience."
      },
      {
        question: "Do you offer design-only services?", 
        answer: "Yes, standalone UI/UX design services are available, even if development is handled elsewhere."
      },
      {
        question: "What tools do you use for UI/UX design?", 
        answer: "Popular tools include Figma, Adobe XD, Sketch, and InVision for wireframes and prototypes."
      },
      {
        question: "How long does it take to complete a design?", 
        answer: "Timelines depend on complexity but generally take 2–6 weeks."
      },
      {
        question: "Can I provide input during the design process?", 
        answer: "Absolutely. Regular feedback sessions ensure the design aligns with your vision."
      },
      {
        question: "What is a user persona, and why is it important?", 
        answer: "User personas represent target users, guiding the design process to meet their needs effectively."
      },
      {
        question: "Do you perform usability testing?", 
        answer: "Yes, usability testing is conducted to identify and resolve issues before finalizing the design."
      }
    ],
    
  
    featureData: [
      {
        number: "01",
        title: "User Research",
        description: "We begin every project by understanding the needs and behaviors of the target users through surveys, interviews, and analytics to create user personas that inform the design process.",
      },
      {
        number: "02",
        title: "Wireframing & Prototyping",
        description: "We create low-fidelity wireframes and interactive prototypes to visualize the structure, layout, and flow of your application before we move to high-fidelity designs.",
      },
      {
        number: "03",
        title: "Visual Design",
        description: "Our designers craft high-fidelity mockups using modern design systems, ensuring that the final design is both aesthetically pleasing and functional, providing a seamless user experience.",
      },
      {
        number: "04",
        title: "Usability Testing",
        description: "We conduct usability tests to validate the design decisions and ensure that the interface is intuitive and user-friendly. Feedback from real users is incorporated to refine the design further.",
      },
    ],
  
    services: ["Mobile App Design", "Web App Design", "ERP Design"],
    
    iconRows: [
      {
        service: "Mobile App Design", // Corresponding service
        serviceHeading: "Mobile App Design", // Service title
        faqIcon: [icons.faq.uiuxFAQ1], // Icon for FAQ section of Mobile App Design
        details: [ // Details related to Mobile App Design
          {
            heading: "Wireframing",
            description: "Mobile app design is about creating user experiences that are intuitive and enjoyable. A well-designed app not only attracts users but also retains them. Scons focuses on designing apps that prioritize user journeys, ensuring every interaction is smooth and meaningful. Businesses trust us because we blend creativity with research-driven design, ensuring that form and function go hand in hand.",
          },
   
        ],
        icons: [
          icons.uiux.figmaUI, 
          icons.uiux.xdUI, 
          icons.uiux.sketchUI
        ], // Icons for Mobile App Design
      },
      {
        service: "Web App Design", // Corresponding service
        serviceHeading: "Web App Design", // Service title
        faqIcon: [icons.faq.uiuxFAQ2], // Icon for FAQ section of Web App Design
        details: [ // Details related to Web App Design
          {
            heading: "Responsive Design",
            description: "Web app design requires balancing functionality with an appealing aesthetic. Scons specializes in crafting designs that simplify navigation and make complex tasks effortless. Our design philosophy revolves around understanding the end user, enabling us to create interfaces that feel natural and enhance productivity. Organizations partner with us because of our ability to deliver designs that are visually striking yet deeply practical.",
          },
          
        ],
        icons: [
          icons.uiux.figmaUI, 
          icons.uiux.xdUI, 
          icons.uiux.sketchUI
        ], // Icons for Web App Design
      },
      {
        service: "ERP Design", // Corresponding service
        serviceHeading: "ERP Design", // Service title
        faqIcon: [icons.faq.uiuxFAQ3], // Icon for FAQ section of ERP Design
        details: [ // Details related to ERP Design
          {
            heading: "Custom Dashboards",
            description: "ERP systems often suffer from complexity, making them difficult for teams to use effectively. Scons simplifies ERP interfaces with designs that are intuitive and accessible, even for non-technical users. By streamlining workflows and enhancing clarity, we help businesses increase productivity. Companies choose us because we transform dense ERP systems into tools employees can navigate with ease.",
          },
   
        ],
        icons: [
          icons.uiux.erp1, 
          // icons.uiux.erp2, 
          icons.uiux.erp3, 
          icons.uiux.erp4, 
          // icons.uiux.erp5
        ], // Icons for ERP Design
      },
    ], // Each service has its own array of icons
  },
  

//blochain
{
  heading: "Blockchain Development",
  spanText:"Development",
  image: blockchainImage,

  heading2: "Built on Trust with Blockchain Development",  
  description: "Securing the Foundations of Tomorrow",  
  helperText: "Transparent, efficient, and secure blockchain solutions that ensure trust across every digital interaction", 
  circularSection: [
    {
      word: "Trust",
      icon: icons.circle.blockchainCircle1,
    },
    {
      word: "Transparency",
      icon: icons.circle.blockchainCircle2,
    },
    {
      word: "Security",
      icon: icons.circle.blockchainCircle3,
    },
  ],
  
  slug: "blockchain-development",  // Added slug
  tagline: "Securing the Future of Transactions",
  faqSpanText: "Develop Your Blockchain Solution",
  faqBodyText: "Our blockchain development services deliver secure, scalable, and transparent solutions using cutting-edge blockchain technologies. We build smart contracts, decentralized applications (DApps), and integrate blockchain into your existing systems.",
  processBodyText: "A typical blockchain development project at Scons starts with understanding the client's needs and selecting the appropriate blockchain framework. We then move to smart contract development, followed by DApp design and development. Afterward, we integrate the blockchain with existing systems and rigorously test its security, scalability, and performance. Finally, we deploy the solution and provide ongoing support for maintenance and upgrades.",

  number: "04",
  faqData: [
    {
      question: "What industries benefit from blockchain technology?", 
      answer: "Blockchain applies to finance, supply chain, healthcare, real estate, and more, offering transparency and security."
    },
    {
      question: "Do I need a cryptocurrency for blockchain solutions?", 
      answer: "No, blockchain can function without cryptocurrency, depending on the application."
    },
    {
      question: "What technologies do you use for blockchain development?", 
      answer: "Common technologies include Ethereum, Hyperledger, and Binance Smart Chain, tailored to your project."
    },
    {
      question: "Are blockchain apps secure?", 
      answer: "Yes, blockchain inherently uses encryption and decentralization to ensure data security."
    },
    {
      question: "How long does it take to develop a blockchain solution?", 
      answer: "Timelines depend on complexity, ranging from 4 to 12 months."
    },
    {
      question: "Can blockchain solutions integrate with existing systems?", 
      answer: "Yes, APIs are used to integrate blockchain solutions into your existing software."
    },
    {
      question: "What is a smart contract, and how does it work?", 
      answer: "Smart contracts are self-executing agreements coded on the blockchain, ensuring trust and automation."
    }
  ],
  

  featureData: [
    {
      number: "01",
      title: "Smart Contract Development",
      description: "We develop secure, scalable, and efficient smart contracts on blockchain platforms like Ethereum, ensuring they perform automatic transactions as defined by the contract conditions.",
    },
    {
      number: "02",
      title: "DApp Development",
      description: "We build decentralized applications (DApps) that are secure, scalable, and user-friendly, enabling you to interact with blockchain networks seamlessly.",
    },
    {
      number: "03",
      title: "Blockchain Integration",
      description: "We integrate blockchain solutions into your existing infrastructure, enhancing security, transparency, and operational efficiency while ensuring smooth data flow across systems.",
    },
    {
      number: "04",
      title: "Blockchain Consultation",
      description: "Our team provides expert consultation to guide you in choosing the best blockchain platform and solution for your business, optimizing your blockchain strategy for long-term success.",
    },
  ],

  services: [
    "Smart Contract Development",
    "DApp Development",
    "Blockchain Integration",
  ],

  iconRows: [
    {
      service: "Smart Contract Development",
      serviceHeading: "Smart Contracts",
      faqIcon: [icons.faq.blockchainFAQ1],
      details: [
        {
          heading: "Ethereum Smart Contracts",
          description: "Smart contracts are self-executing agreements written in code, ensuring automated and secure transactions. They reduce human error and boost efficiency. Scons develops error-free smart contracts tailored to your business needs, providing peace of mind and operational reliability. Clients value our expertise in building smart contracts that deliver precision and trust in a decentralized environment.",
        },
   
      ],
      icons: [
        icons.blockchain.smart1, 
        icons.blockchain.smart2, 
        icons.blockchain.smart3
      ], // Icons for Smart Contract Development
    },
    {
      service: "DApp Development",
      serviceHeading: "Decentralized Applications (DApps)",
      faqIcon: [icons.faq.blockchainFAQ2],
      details: [
        {
          heading: "Ethereum DApps",
          description: "Decentralized applications run on blockchain technology, offering enhanced security, transparency, and resilience. At Scons, we create scalable DApps for industries like finance, healthcare, and supply chain. Our solutions empower businesses to innovate without limitations. Companies choose us for our proven ability to deliver robust decentralized systems that align with their goals.",
        },
   
      ],
      icons: [
        icons.blockchain.dapp1, 
        icons.blockchain.dapp2, 
        icons.blockchain.dapp3
      ], // Icons for DApp Development
    },
    {
      service: "Blockchain Integration",
      serviceHeading: "Blockchain Integration",
      faqIcon: [icons.faq.blockchainFAQ3],
      details: [
        {
          heading: "API Integration",
          description: "Integrating blockchain into existing systems enhances data security, traceability, and operational efficiency. Scons helps businesses seamlessly adopt blockchain technology, ensuring minimal disruption and maximum benefit. Our clients trust us because of our capability to deliver smooth transitions and tailor solutions to their unique needs.",
        },
     
      ],
      icons: [
        icons.blockchain.integ1, 
        icons.blockchain.integ2, 
        icons.blockchain.integ3, 
        icons.blockchain.integ4
      ], // Icons for Blockchain Integration
    },
  ], // Each service has its own array of icons
},


//cloudand devops

{
  heading: "Cloud & DevOps Solutions",
  spanText:"Solutions",

  image: cloudImage,

  heading2: "Accelerating Possibilities with Cloud & DevOps Solutions",  
  description: "Infrastructure That Evolves with You",  
  helperText: "Flexible cloud strategies and agile DevOps practices designed to scale and optimize operations effortlessly", 
  circularSection: [
    {
      word: "Scalability",
      icon: icons.circle.cloudCircle1,
    },
    {
      word: "Efficiency",
      icon: icons.circle.cloudCircle2,
    },
    {
      word: "Automation",
      icon: icons.circle.cloudCircle3,
    },
  ],
   
  slug: "cloud-devops-solutions",  // Added slug
  tagline: "Building Agile, Scalable Infrastructure",
  faqSpanText: "Leverage the Power of Cloud & DevOps",
  faqBodyText: "Our Cloud and DevOps solutions enable businesses to accelerate software delivery, enhance collaboration, and improve operational efficiency by leveraging scalable cloud infrastructure, automated workflows, and robust security practices.",
  processBodyText: "A typical Cloud & DevOps project at Scons starts with understanding your infrastructure needs and selecting the best cloud platform (AWS, Azure, Google Cloud, etc.). We then focus on cloud infrastructure setup, followed by implementing DevOps practices such as CI/CD pipelines, automation, and security protocols. Once the infrastructure is in place, we provide ongoing monitoring and optimization for scalability and performance.",

  number: "05",
  faqData: [
    {
      question: "What is cloud computing?", 
      answer: "Cloud computing delivers on-demand resources like storage and computing power over the internet."
    },
    {
      question: "What is DevOps, and why is it important?", 
      answer: "DevOps combines development and operations for faster, more reliable software delivery."
    },
    {
      question: "Which cloud platforms do you support?", 
      answer: "Support includes AWS, Google Cloud, Azure, and private cloud environments."
    },
    {
      question: "Can you migrate our existing systems to the cloud?", 
      answer: "Yes, seamless migration services ensure minimal downtime during the transition."
    },
    {
      question: "How do you ensure data security in the cloud?", 
      answer: "Security measures include encryption, firewalls, and compliance with industry standards."
    },
    {
      question: "What is CI/CD in DevOps?", 
      answer: "CI/CD automates code integration and deployment, reducing errors and improving efficiency."
    },
    {
      question: "Do you offer ongoing cloud management?", 
      answer: "Yes, services include monitoring, updates, and optimization to ensure peak performance."
    }
  ],
  

  featureData: [
    {
      number: "01",
      title: "Cloud Infrastructure Management",
      description: "We offer end-to-end cloud infrastructure management services, including resource provisioning, configuration, monitoring, and optimization for scalability and performance.",
    },
    {
      number: "02",
      title: "Networking and Security",
      description: "Our team ensures your cloud environment is secure with robust networking and security solutions, including firewall management, encryption, and multi-factor authentication.",
    },
    {
      number: "03",
      title: "CI/CD Pipeline Implementation",
      description: "We implement Continuous Integration and Continuous Delivery (CI/CD) pipelines to automate software delivery and improve the speed and quality of releases.",
    },
    {
      number: "04",
      title: "Data Storage Solutions Integration",
      description: "We integrate secure and scalable data storage solutions into your cloud infrastructure, ensuring data is always available, redundant, and backed up for disaster recovery.",
    },
  ],

  services: [
    "Cloud Infrastructure Management",
    "Networking and Security",
    "Data Storage Solutions Integration",
  ],

  iconRows: [
    {
      service: "Cloud Infrastructure Management",
      serviceHeading: "Cloud Infrastructure",
      faqIcon: [icons.faq.cloudFAQ1],
      details: [
        {
          heading: "AWS Cloud",
          description: "Cloud infrastructure allows businesses to scale flexibly while reducing operational costs. Scons designs, deploys, and manages cloud environments tailored to your business needs. Our focus on performance and cost-efficiency makes us a trusted partner for organizations seeking reliable cloud solutions.",
        },
     
      ],
      icons: [
        icons.devops.cloud1, 
        icons.devops.cloud2, 
        icons.devops.cloud3, 
        icons.devops.cloud4, 
        icons.devops.cloud5
      ], // Icons for Cloud Infrastructure Management
    },
    {
      service: "Networking and Security",
      serviceHeading: "Networking and Security",
      faqIcon: [icons.faq.cloudFAQ2],
      details: [
        {
          heading: "Firewall Configuration",
          description: "Networking and security are the pillars of a robust IT environment. Scons provides solutions that safeguard data, prevent breaches, and maintain compliance with industry standards. Businesses work with us because we prioritize security without compromising performance. ",
        },
      
      ],
      icons: [
        icons.devops.network1, 
        icons.devops.network2, 
        icons.devops.network3, 
        icons.devops.network4, 
        icons.devops.network5
      ], // Icons for Networking and Security
    },
  
    {
      service: "Data Storage Solutions Integration",
      serviceHeading: "Data Storage",
      faqIcon: [icons.faq.cloudFAQ3],
      details: [
        {
          heading: "Database Management",
          description: "Efficient data storage is crucial for operations, analytics, and decision-making. Scons implements secure, scalable storage solutions using cloud technologies that optimize accessibility and reliability. Clients choose us for our commitment to secure and cost-effective data management.",
        },
    
      ],
      icons: [
        icons.devops.data1, 
        icons.devops.data2, 
        icons.devops.data3, 
        icons.devops.data4, 
        icons.devops.data5
      ], // Icons for Data Storage Solutions Integration
    },
  ], // Each service has its own array of icons
},




//ai
  
{
  heading: "AI & ML Solutions",
  spanText:"Solutions",

  image: aiImage,

  heading2: "Driven by Intelligence in AI & ML Solutions",  
  description: "Turning Data Into Actionable Insights",  
  helperText: "AI-driven solutions that turn data into powerful insights, enabling smarter, faster decisions for business transformation", 
  circularSection: [
    {
      word: "Intelligence",
      icon: icons.circle.aiCircle1,
    },
    {
      word: "Insights",
      icon: icons.circle.aiCircle2,
    },
    {
      word: "Innovation",
      icon: icons.circle.aiCircle3,
    },
  ],
  
  slug: "ai-machine-learning-solutions",  // Added slug
  tagline: "Smarter Solutions for Tomorrow",
  faqSpanText: "Leverage the Power of AI and ML",
  faqBodyText: "Our AI and machine learning solutions empower businesses by enabling intelligent applications, predictive analytics, and automated decision-making. We deliver tailored solutions to optimize operations, enhance customer experiences, and unlock new opportunities.",
  processBodyText: "A typical AI and ML project at Scons begins with understanding your business challenges, followed by data collection and preprocessing. We then apply machine learning algorithms to train models, followed by testing and optimization. Finally, we integrate the models into your business processes and provide ongoing monitoring and improvements.",

  number: "06",
  faqData: [
    {
      question: "What is AI, and how can it benefit my business?", 
      answer: "AI automates processes, enhances decision-making, and provides insights, driving efficiency and innovation."
    },
    {
      question: "What types of AI solutions do you develop?", 
      answer: "Solutions include chatbots, recommendation systems, predictive analytics, and more."
    },
    {
      question: "How is data used in AI solutions?", 
      answer: "Data is analyzed to train algorithms, enabling accurate predictions and insights."
    },
    {
      question: "How long does it take to build an AI solution?", 
      answer: "Timelines depend on complexity, usually taking 3 to 9 months."
    },
    {
      question: "Can AI solutions integrate with existing systems?", 
      answer: "Yes, APIs enable seamless integration with your current software."
    },
    {
      question: "Is AI safe and compliant with data regulations?", 
      answer: "Yes, solutions follow strict privacy standards and comply with regulations like GDPR."
    },
    {
      question: "Do AI solutions require ongoing maintenance?", 
      answer: "Regular updates and retraining are often needed to maintain accuracy and relevance."
    }
  ],
  
  featureData: [
    {
      number: "01",
      title: "AI Application Development",
      description: "We develop AI-driven applications that automate processes, enhance decision-making, and improve user engagement by leveraging machine learning, NLP, and computer vision.",
    },
    {
      number: "02",
      title: "Custom Machine Learning Algorithms",
      description: "Our team builds custom machine learning models tailored to your business needs, using techniques like regression, classification, and clustering to drive insights from your data.",
    },
    {
      number: "03",
      title: "Business Process Automation",
      description: "We help businesses automate repetitive tasks and workflows using AI-powered solutions, resulting in increased operational efficiency, reduced errors, and enhanced productivity.",
    },
    {
      number: "04",
      title: "Predictive Analytics",
      description: "We implement machine learning-based predictive analytics tools that enable businesses to forecast trends, optimize resources, and make data-driven decisions.",
    },
  ],

  services: [
    "AI Applications",
    "Machine Learning Algorithms",
    "Business Process Automation",
  ],

  iconRows: [
    {
      service: "AI Applications",
      serviceHeading: "AI-Powered Applications",
      faqIcon: [icons.faq.aiFAQ1],
      details: [
        {
          heading: "Natural Language Processing (NLP)",
          description: "AI applications transform businesses by automating tasks, predicting outcomes, and enhancing user experiences. Scons develops AI-driven solutions like chatbots, recommendation engines, and predictive analytics tailored to your needs. Companies trust us because of our ability to deliver impactful AI applications that drive tangible results.",
        },
    
      ],
      icons: [
        icons.aiml.ai1, 
        icons.aiml.ai2, 
        icons.aiml.ai3, 
        icons.aiml.ai4, 
        icons.aiml.ai5
      ], // Icons for AI Applications
    },
    {
      service: "Machine Learning Algorithms",
      serviceHeading: "Custom Machine Learning Models",
      faqIcon: [icons.faq.aiFAQ2],
      details: [
        {
          heading: "Supervised Learning",
          description: "Machine learning models unlock insights and automate decision-making processes. Scons designs algorithms that learn and improve over time, enabling businesses to stay ahead in competitive industries. Our clients rely on us for accurate, scalable solutions that deliver consistent value.",
        },
  
      ],
      icons: [
        icons.aiml.ml1, 
        icons.aiml.ml2, 
        icons.aiml.ml3, 
        icons.aiml.ml4, 
        icons.aiml.ml5
      ], // Icons for Machine Learning Algorithms
    },
    {
      service: "Business Process Automation",
      serviceHeading: "Process Automation",
      faqIcon: [icons.faq.aiFAQ3],
      details: [
        {
          heading: "Automated Workflow Management",
          description: "Automation powered by AI streamlines operations, reduces costs, and minimizes human error. Scons develops intelligent automation systems that enhance efficiency and productivity. Businesses turn to us for solutions that optimize workflows without compromising quality.",
        },
    
      ],
      icons: [
        icons.aiml.bp1, 
        icons.aiml.bp2, 
        icons.aiml.bp3, 
        icons.aiml.bp4, 
        icons.aiml.bp5
      ], // Icons for Business Process Automation
    },
  ], // Each service has its own array of icons
},



//consultantion
{
  heading: "Consulting Support",
  spanText:"Support",

  image: consultationImage,

  heading2: "Guided by Experts in Consultation",  
    description: "Shaping Strategies for Limitless Success",  
    helperText: "Expert guidance that ensures every strategy aligns with your business goals, turning vision into reality", 
    circularSection: [
      {
        word: "Expertise",
        icon: icons.circle.consultationCircle1,
      },
      {
        word: "Clarity",
        icon: icons.circle.consultationCircle2,
      },
      {
        word: "Growth",
        icon: icons.circle.consultationCircle3,
      },
    ],
     
  slug: "consultation",  // Added slug
  tagline: "Shaping Strategies for Success",
  faqSpanText: "Unlock Business Potential",

  faqBodyText: "Our consultation services focus on helping businesses navigate complex challenges, achieve operational excellence, and unlock new growth opportunities. From market expansion strategies to digital transformation, we provide expert advice to help you succeed in today's competitive market.",
  processBodyText: "A typical consultation process begins with understanding your business challenges and goals. We conduct an in-depth analysis, develop tailored strategies, and provide actionable recommendations to optimize your business. Post-consultation, we assist with implementation, monitoring, and ongoing refinement of the strategies.",

  number: "07",
  faqData: [
    {
      question: "What is included in a consultation service?", 
      answer: "Services cover strategy development, feasibility studies, and personalized recommendations tailored to your goals."
    },
    {
      question: "Who conducts the consultation sessions?", 
      answer: "Experienced business analysts and technical experts lead the sessions."
    },
    {
      question: "How long is a typical consultation?", 
      answer: "Sessions vary, usually lasting 1–3 hours depending on scope."
    },
    {
      question: "Can you help with both technical and business strategies?", 
      answer: "Yes, consultations address both technical and business needs for holistic solutions."
    },
    {
      question: "Is consultation suitable for startups?", 
      answer: "Absolutely. Tailored advice helps startups navigate challenges and scale effectively."
    },
    {
      question: "Do consultations include project cost estimation?", 
      answer: "Yes, detailed cost breakdowns are provided during the consultation."
    },
    {
      question: "Can I book ongoing consultations?", 
      answer: "Yes, recurring sessions ensure continuous alignment with your evolving goals."
    }
  ],
  

  featureData: [
    {
      number: "01",
      title: "Market Entry and Expansion Strategy",
      description: "We provide strategies to help businesses successfully enter new markets, identify growth opportunities, and mitigate potential risks. Our focus is on creating sustainable and scalable market entry plans.",
    },
    {
      number: "02",
      title: "Branding and Positioning",
      description: "We help businesses create a unique brand identity and position themselves strategically in the market. Our branding services include brand development, messaging, and positioning to make your business stand out.",
    },
    {
      number: "03",
      title: "Revenue Optimization and Cost Efficiency",
      description: "Our consultants work with businesses to identify revenue streams, optimize pricing strategies, and reduce operational costs. We focus on improving profitability and achieving long-term financial health.",
    },
    {
      number: "04",
      title: "Digital Transformation Strategy",
      description: "We assist businesses in embracing digital technologies to streamline operations, improve customer experiences, and drive innovation. Our strategy focuses on integrating digital tools and platforms into your existing processes.",
    },
    {
      number: "05",
      title: "Investment Readiness and Funding Strategy",
      description: "We guide businesses in becoming investment-ready by preparing comprehensive business plans, financial models, and growth strategies. We also assist in identifying suitable funding sources and connecting with potential investors.",
    },
  ],

  services: [
    "Market Entry and Expansion Strategy",
    "Branding and Positioning",
    "Revenue Optimization and Cost Efficiency",
    "Digital Transformation Strategy",
    "Investment Readiness and Funding Strategy",
  ],

  iconRows: [
    {
      service: "Market Entry and Expansion Strategy",
      serviceHeading: "Market Strategy",
      faqIcon: [icons.faq.consultationFAQ1],
      details: [
        {
          heading: "Market Research",
          description: "Expanding into new markets requires careful planning and local expertise. Scons guides businesses through market research, strategy development, and execution to ensure successful entry. Companies choose us because of our data-driven approach and deep market insights.",
        },
   
      ],
      icons: [ /* No specific icons yet */ ],
    },
    {
      service: "Branding and Positioning",
      serviceHeading: "Branding & Positioning",
      faqIcon: [icons.faq.consultationFAQ2],
      details: [
        {
          heading: "Brand Strategy",
          description: "Strong branding and clear positioning are essential for standing out. Scons refines your brand identity and aligns it with market demands to create a lasting impact. Businesses trust us because of our ability to turn brands into industry leaders.",
        },
   
      ],
      icons: [ /* No specific icons yet */ ],
    },
    {
      service: "Revenue Optimization and Cost Efficiency",
      serviceHeading: "Revenue Optimization",
      faqIcon: [icons.faq.consultationFAQ3],
      details: [
        {
          heading: "Revenue Strategies",
          description: "Maximizing revenue while minimizing costs requires strategic planning. Scons analyzes your operations, identifies inefficiencies, and implements solutions that drive profitability. Organizations partner with us for actionable strategies that yield measurable results.",
        },
   
      ],
      icons: [ /* No specific icons yet */ ],
    },
    {
      service: "Digital Transformation Strategy",
      serviceHeading: "Digital Transformation",
      faqIcon: [icons.faq.consultationFAQ4],
      details: [
        {
          heading: "Technology Integration",
          description: "Transitioning to digital platforms is no longer optional—it’s essential for growth. Scons helps businesses embrace digital transformation, enhancing processes, customer experiences, and competitiveness. Companies work with us because of our tailored approach to modernization.",
        },
    
      ],
      icons: [ /* No specific icons yet */ ],
    },
    {
      service: "Investment Readiness and Funding Strategy",
      serviceHeading: "Investment Preparation",
      faqIcon: [icons.faq.consultationFAQ5],
      details: [
        {
          heading: "Business Plans",
          description: "Securing investment requires clear vision and preparation. Scons helps businesses create compelling pitches, refine their financials, and align with investor expectations. Clients value our ability to position them for funding success.",
        },
    
      ],
      icons: [ /* No specific icons yet */ ],
    },
  ], // Each service has its own array of icons
},
];
