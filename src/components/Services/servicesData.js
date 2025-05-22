import icons from "./modules/icons";
import mobileAppImage from "../../assets/images/services/1.svg";
import webAppImage from "../../assets/images/services/6.svg";
import uiuxImage from "../../assets/images/services/2.svg";
import blockchainImage from "../../assets/images/services/3.svg"; // Used for Digital Marketing
import aiImage from "../../assets/images/services/4.svg";
import consultationImage from "../../assets/images/services/5.svg";

// Accordion Images
// Mobile
import accordianmob1 from "../../assets/images/service-details/accordian/mobile/1.webp";
import accordianmob2 from "../../assets/images/service-details/accordian/mobile/2.webp";
import accordianmob3 from "../../assets/images/service-details/accordian/mobile/3.webp";
// Web
import accordianweb1 from "../../assets/images/service-details/accordian/web/1.webp";
import accordianweb2 from "../../assets/images/service-details/accordian/web/2.webp";
import accordianweb3 from "../../assets/images/service-details/accordian/web/3.webp";
// UI/UX
import accordianuiux1 from "../../assets/images/service-details/accordian/uiux/1.webp";
import accordianuiux2 from "../../assets/images/service-details/accordian/uiux/2.webp";
import accordianuiux3 from "../../assets/images/service-details/accordian/uiux/3.webp";
import accordianuiux4 from "../../assets/images/service-details/accordian/uiux/4.png";

// Digital Marketing (using blockchain accordion images)
import accordiandigital1 from "../../assets/images/service-details/accordian/digital/1.webp";
import accordiandigital2 from "../../assets/images/service-details/accordian/digital/2.webp";
import accordiandigital3 from "../../assets/images/service-details/accordian/digital/3.webp";
import accordiandigital4 from "../../assets/images/service-details/accordian/digital/4.webp";

// AI Integration
import accordianai1 from "../../assets/images/service-details/accordian/ai/1.svg";
import accordianai2 from "../../assets/images/service-details/accordian/ai/2.svg";
import accordianai3 from "../../assets/images/service-details/accordian/ai/3.svg";
import accordianai4 from "../../assets/images/service-details/accordian/ai/4.webp";

// Consulting
import accordianconsult1 from "../../assets/images/service-details/accordian/consultant/1.webp";
import accordianconsult2 from "../../assets/images/service-details/accordian/consultant/2.webp";
import accordianconsult3 from "../../assets/images/service-details/accordian/consultant/3.webp";

export const servicesHeading = {
  text: "Our Services",
  spanText: "Services",
};

export const descriptorText =
  "Comprehensive services covering software development, enterprise solutions, app/web development, digital marketing, AI integration, and strategic consulting tailored to meet diverse business needs.";

export const services = [
  {
    heading: "Mobile App Development",
    spanText: "Mobile",
    image: mobileAppImage,
    serviceAccordionData: [
      {
        id: 1,
        question: "Cross-Platform App Development",
        answer: "Create apps that work on both iOS and Android using a single codebase.",
        image: accordianmob1,
        bestPoints: [
          "Single codebase for multiple platforms",
          "Faster development cycle",
          "Cost-effective",
          "Easier maintenance",
        ],
      },
      {
        id: 2,
        question: "Hybrid App Development",
        answer: "Combine web technologies to deliver app-like experiences in a native container.",
        image: accordianmob2,
        bestPoints: [
          "Quick to launch",
          "Access to device APIs",
          "Lower development cost",
          "Wide reach",
        ],
      },
      {
        id: 3,
        question: "Native App Development",
        answer: "Build apps specifically for iOS or Android using Swift or Kotlin.",
        image: accordianmob3,
        bestPoints: [
          "Best performance",
          "Full device integration",
          "Highly responsive UI",
          "Platform-specific features",
        ],
      },
    ],
    heading2: "It Starts with a Vision in Mobile App Development",
    description: "Bringing Ideas to Life, One App at a Time",
    helperText: "Mobile apps designed to meet today’s needs and redefine possibilities for tomorrow’s challenges.",
    slug: "mobile-app-development",
    tagline: "Empowering Your Mobile Future",
    faqSpanText: "Develop Your Mobile App",
    faqBodyText:
      "Our mobile app development services deliver seamless, intuitive, and high-performance applications across platforms. We create native and hybrid apps designed to enhance your business's mobile presence.",
    processBodyText:
      "A typical mobile app development project begins with ideation, followed by UI/UX design, development, rigorous testing, and launch with post-launch support.",
    number: "01",
    faqData: [
      {
        question: "What types of mobile apps do you develop?",
        answer: "We develop native, hybrid, and cross-platform apps for iOS and Android tailored to your needs.",
      },
      {
        question: "How long does it take to develop a mobile app?",
        answer: "Timelines vary based on complexity, typically ranging from 3 to 6 months.",
      },
      {
        question: "What is the cost of developing a mobile app?",
        answer: "Costs depend on features and platforms. We provide detailed estimates after consultation.",
      },
      {
        question: "Do you offer post-launch support?",
        answer: "Yes, we provide maintenance, updates, and optimization post-launch.",
      },
      {
        question: "Can you develop apps for both iOS and Android?",
        answer: "Yes, we specialize in cross-platform and native development for both platforms.",
      },
      {
        question: "How do you ensure app security?",
        answer: "We use encryption, secure APIs, and comply with platform security standards.",
      },
    ],
    services: ["iOS", "Android", "Hybrid"],
    iconRows: [
      {
        service: "iOS",
        serviceHeading: "iOS",
        faqIcon: [icons.faq.mobileFAQ1],
        details: [
          {
            heading: "Swift",
            description:
              "We deliver high-performance iOS apps using Swift, ensuring seamless integration with Apple’s ecosystem and adherence to App Store standards.",
          },
        ],
        icons: [icons.mobile.SwiftIOS, icons.mobile.UIKit, icons.mobile.CoreData],
      },
      {
        service: "Android",
        serviceHeading: "Android",
        faqIcon: [icons.faq.mobileFAQ2],
        details: [
          {
            heading: "Kotlin",
            description:
              "Our Android apps are built with Kotlin for optimal performance across diverse devices, ensuring scalability and user satisfaction.",
          },
        ],
        icons: [icons.mobile.Java, icons.mobile.Kotlin, icons.mobile.Retrofit],
      },
      {
        service: "Hybrid",
        serviceHeading: "Hybrid Apps",
        faqIcon: [icons.faq.mobileFAQ3],
        details: [
          {
            heading: "Flutter",
            description:
              "We use Flutter and React Native to build hybrid apps that offer near-native performance with reduced development time and cost.",
          },
        ],
        icons: [icons.mobile.FlutterHybrid, icons.mobile.ReactNative],
      },
    ],
  },
  {
    heading: "Web App Development",
    spanText: "Web",
    image: webAppImage,
    serviceAccordionData: [
      {
        id: 1,
        question: "Dedicated Development",
        answer: "Build customized websites using frameworks like React, Vue, or Angular.",
        image: accordianweb1,
        bestPoints: [
          "High customization",
          "Optimized performance",
          "Scalable and maintainable",
          "Rich interactive UI",
        ],
      },
      {
        id: 2,
        question: "Content Management Systems (CMS)",
        answer: "Create easy-to-manage websites using WordPress, Joomla, or Drupal.",
        image: accordianweb2,
        bestPoints: [
          "User-friendly content editing",
          "Quick deployment",
          "Extensive plugin ecosystem",
          "SEO friendly",
        ],
      },
      {
        id: 3,
        question: "Static Site Generators",
        answer: "Develop fast, secure websites with Gatsby, Next.js, or Hugo.",
        image: accordianweb3,
        bestPoints: [
          "Blazing fast load times",
          "Improved security",
          "Easy hosting",
          "Great for blogs and portfolios",
        ],
      },
    ],
    heading2: "Expanding Horizons with Web App Development",
    description: "Your Digital Growth Engine",
    helperText: "Dynamic, scalable web solutions that amplify reach and unlock new opportunities for growth.",
    slug: "web-app-development",
    tagline: "Scalable Web Solutions for Growth",
    faqSpanText: "Develop Your Website",
    faqBodyText:
      "Our comprehensive web development services cover intuitive design to seamless functionality, creating responsive, secure, and high-performance websites.",
    processBodyText:
      "A typical web development project begins with concept creation, planning, development, testing, and delivery.",
    number: "02",
    faqData: [
      {
        question: "What types of web apps do you develop?",
        answer: "We develop dynamic web apps, CMS-based sites, and static websites tailored to your needs.",
      },
      {
        question: "What technologies do you use for web development?",
        answer: "We use React, Angular, Laravel, Node.js, and other modern frameworks based on project requirements.",
      },
      {
        question: "How do you ensure web app performance?",
        answer: "We optimize code, use scalable architectures, and test across browsers for high performance.",
      },
      {
        question: "Can you integrate third-party services?",
        answer: "Yes, we integrate payment gateways, analytics, CRMs, and more via APIs.",
      },
      {
        question: "What is the typical timeline for web app development?",
        answer: "Timelines range from 3 to 8 months, depending on complexity.",
      },
      {
        question: "Do you provide post-launch support?",
        answer: "Yes, we offer maintenance, updates, and performance monitoring post-launch.",
      },
    ],
    services: ["Frontend", "Backend", "CMS"],
    iconRows: [
      {
        service: "Frontend",
        serviceHeading: "Frontend",
        faqIcon: [icons.faq.webFAQ1],
        details: [
          {
            heading: "HTML/CSS",
            description:
              "We craft engaging frontend interfaces using React, Angular, and Vue.js for responsive and visually appealing web apps.",
          },
        ],
        icons: [
          icons.web.JSFrontend,
          icons.web.TSFrontend,
          icons.web.ReactFrontend,
          icons.web.NextFrontend,
          icons.web.VueFrontend,
        ],
      },
      {
        service: "Backend",
        serviceHeading: "Backend",
        faqIcon: [icons.faq.webFAQ2],
        details: [
          {
            heading: "Node.js",
            description:
              "Our scalable backends, built with Node.js, Laravel, and Python, ensure robust data management and system integration.",
          },
        ],
        icons: [
          icons.web.Backend2,
          icons.web.Backend3,
          icons.web.JavaBackend,
          icons.web.JSBackend,
          icons.web.LaravelBackend,
        ],
      },
      {
        service: "CMS",
        serviceHeading: "CMS Solutions",
        faqIcon: [icons.faq.webFAQ3],
        details: [
          {
            heading: "WordPress",
            description:
              "We develop custom CMS platforms or use WordPress and Drupal for efficient content management.",
          },
        ],
        icons: [icons.web.Wordpress, icons.web.Shopify, icons.web.Magneto, icons.web.Webflow],
      },
    ],
  },
  {
    heading: "UI/UX Design",
    spanText: "UI/UX",
    image: uiuxImage,
    serviceAccordionData: [
      {
        id: 1,
        question: "Logo Design",
        answer: "Create unique visual symbols that represent your brand identity.",
        image: accordianuiux1,
        bestPoints: [
          "Brand recognition",
          "Custom and scalable designs",
          "Versatile for all mediums",
          "Timeless visual identity",
        ],
      },
      {
        id: 2,
        question: "UI Design",
        answer: "Craft visually appealing and intuitive interfaces for websites and apps.",
        image: accordianuiux2,
        bestPoints: [
          "User-friendly layouts",
          "Consistent visual language",
          "Responsive designs",
          "Interactive elements",
        ],
      },
      {
        id: 3,
        question: "UX Design",
        answer: "Optimize usability, accessibility, and interaction flow for digital products.",
        image: accordianuiux3,
        bestPoints: [
          "Seamless user journeys",
          "User research driven",
          "Problem-solving approach",
          "Increased user retention",
        ],
      },
      {
        id: 4,
        question: "Brand Identity",
        answer: "Create a cohesive visual system to define your brand’s personality.",
        image: accordianuiux4,
        bestPoints: [
          "Consistent brand messaging",
          "Memorable brand presence",
          "Emotional connection",
          "Differentiation from competitors",
        ],
      },
    ],
    heading2: "Designed to Stand Out in UI/UX Design",
    description: "Where Function Meets Elegance",
    helperText: "Exceptional design focused on creating unforgettable user experiences and lasting impressions.",
    slug: "ui-ux-design",
    tagline: "Designing Exceptional Experiences",
    faqSpanText: "Design Your Website",
    faqBodyText:
      "Our UI/UX Design services create user-centered designs that improve engagement and usability across digital platforms, from research to prototyping and testing.",
    processBodyText:
      "A typical UI/UX design project starts with user research, followed by wireframing, prototyping, and usability testing to ensure intuitive designs.",
    number: "03",
    faqData: [
      {
        question: "What is the difference between UI and UX design?",
        answer: "UI focuses on visual elements, while UX enhances the overall user journey and experience.",
      },
      {
        question: "What tools do you use for UI/UX design?",
        answer: "We use Figma, Adobe XD, Sketch, and InVision for wireframes and prototypes.",
      },
      {
        question: "How long does a UI/UX design project take?",
        answer: "Projects typically take 2–6 weeks, depending on complexity.",
      },
      {
        question: "Do you involve clients in the design process?",
        answer: "Yes, we include regular feedback sessions to align with your vision.",
      },
      {
        question: "Do you conduct usability testing?",
        answer: "Yes, we test designs with real users to ensure intuitiveness and functionality.",
      },
      {
        question: "Can you redesign existing interfaces?",
        answer: "Yes, we can enhance existing designs to improve usability and aesthetics.",
      },
    ],
    services: ["Logo Design", "UI/UX Design", "Brand Identity"],
    iconRows: [
      {
        service: "Logo Design",
        serviceHeading: "Logo Design",
        faqIcon: [icons.faq.uiuxFAQ1],
        details: [
          {
            heading: "Wireframing",
            description:
              "We design intuitive mobile app interfaces that prioritize user journeys and engagement, blending creativity with research-driven design.",
          },
        ],
        icons: [icons.uiux.logo1, icons.uiux.logo3, icons.uiux.logo2],
      },
      {
        service: "UI/UX Design",
        serviceHeading: "UI/UX Design",
        faqIcon: [icons.faq.uiuxFAQ2],
        details: [
          {
            heading: "Responsive Design",
            description:
              "Our web app designs balance aesthetics and functionality, ensuring seamless navigation and user-friendly interfaces.",
          },
        ],
        icons: [icons.uiux.figmaUI, icons.uiux.xdUI, icons.uiux.sketchUI],
      },
      {
        service: "Brand Identity",
        serviceHeading: "Brand Identity",
        faqIcon: [icons.faq.uiuxFAQ3],
        details: [
          {
            heading: "Custom Dashboards",
            description:
              "We simplify ERP interfaces with intuitive designs that enhance productivity and accessibility for all users.",
          },
        ],
        icons: [icons.uiux.logo1, icons.uiux.logo4, icons.uiux.logo5],
      },
    ],
  },
  {
    heading: "Digital Marketing",
    spanText: "Digital",
    image: blockchainImage,
    serviceAccordionData: [
      {
        id: 1,
        question: "Search Engine Optimization (SEO)",
        answer: "Optimize your website to rank higher on search engines, driving organic traffic.",
        image: accordiandigital1,
        bestPoints: [
          "Improved search rankings",
          "Increased organic traffic",
          "On-page and off-page SEO",
          "Keyword research & analysis",
        ],
      },
      {
        id: 2,
        question: "Pay-Per-Click Advertising (PPC)",
        answer: "Reach your audience quickly through paid ads on Google Ads and social media.",
        image: accordiandigital2,
        bestPoints: [
          "Targeted ad campaigns",
          "Measurable ROI",
          "Flexible budget control",
          "Quick lead generation",
        ],
      },
      {
        id: 3,
        question: "Social Media Marketing",
        answer: "Build brand awareness and drive conversions through creative social media campaigns.",
        image: accordiandigital3,
        bestPoints: [
          "Platform-specific strategies",
          "Content creation & scheduling",
          "Community engagement",
          "Performance analytics",
        ],
      },
      {
        id: 4,
        question: "Email Marketing",
        answer: "Create personalized email campaigns to nurture leads and maintain customer relationships.",
        image: accordiandigital4,
        bestPoints: [
          "Targeted mailing lists",
          "Automated email workflows",
          "A/B testing for optimization",
          "High ROI communication",
        ],
      },
    ],
    heading2: "Amplifying Reach with Digital Marketing",
    description: "Driving Visibility and Engagement",
    helperText: "Strategic digital marketing solutions that boost brand presence and deliver measurable results.",
    slug: "digital-marketing",
    tagline: "Elevating Your Brand Online",
    faqSpanText: "Boost Your Online Presence",
    faqBodyText:
      "Our digital marketing services enhance your brand’s visibility through SEO, PPC, social media, and email campaigns, driving traffic and conversions.",
    processBodyText:
      "A typical digital marketing project starts with strategy development, followed by campaign creation, execution, and performance analysis to optimize results.",
    number: "04",
    faqData: [
      {
        question: "What digital marketing services do you offer?",
        answer: "We provide SEO, PPC, social media marketing, and email marketing tailored to your goals.",
      },
      {
        question: "How do you measure campaign success?",
        answer: "We use analytics to track traffic, conversions, ROI, and other key performance indicators.",
      },
      {
        question: "Can you target specific audiences?",
        answer: "Yes, we use data-driven targeting to reach your ideal customers across platforms.",
      },
      {
        question: "How long does it take to see results from digital marketing?",
        answer: "Results vary; SEO may take 3–6 months, while PPC can show immediate impact.",
      },
      {
        question: "Do you manage social media accounts?",
        answer: "Yes, we create and manage content for platforms like Facebook, Instagram, and LinkedIn.",
      },
      {
        question: "What is the cost of digital marketing services?",
        answer: "Costs depend on campaign scope; we provide customized quotes after consultation.",
      },
    ],
    services: ["SEO", "PPC", "Digital Marketing"],
    iconRows: [
      {
        service: "SEO",
        serviceHeading: "Search Engine Optimization",
        faqIcon: [icons.faq.blockchainFAQ1],
        details: [
          {
            heading: "Keyword Strategy",
            description:
              "Our SEO services optimize your website to rank higher, driving organic traffic through targeted keywords and on-page enhancements.",
          },
        ],
        icons: [icons.blockchain.seo1, icons.blockchain.seo2],
      },
      {
        service: "PPC",
        serviceHeading: "Pay-Per-Click Advertising",
        faqIcon: [icons.faq.blockchainFAQ2],
        details: [
          {
            heading: "Ad Campaign Management",
            description:
              "We create targeted PPC campaigns on Google Ads and social platforms to deliver quick, measurable results.",
          },
        ],
        icons: [icons.blockchain.ppc1, icons.blockchain.ppc2],
      },
      {
        service: "Digital Marketing",
        serviceHeading: "Digital Marketing",
        faqIcon: [icons.faq.blockchainFAQ3],
        details: [
          {
            heading: "Content Strategy",
            description:
              "Our social media strategies engage audiences with creative content and platform-specific campaigns to boost brand awareness.",
          },
        ],
        icons: [icons.blockchain.marketing1, icons.blockchain.marketing2],
      },
     
    ],
  },
  {
    heading: "AI Integration",
    spanText: "AI",
    image: aiImage,
    serviceAccordionData: [
      {
        id: 1,
        question: "Voice Bots & Conversational AI",
        answer: "Develop intelligent voice bots and chatbots for automated customer service and support.",
        image: accordianai1,
        bestPoints: [
          "24/7 customer engagement",
          "Natural language understanding",
          "Multi-channel support",
          "Reduced operational costs",
        ],
      },
      {
        id: 2,
        question: "Zapier & Workflow Automation",
        answer: "Automate repetitive tasks by integrating apps through Zapier, streamlining processes.",
        image: accordianai2,
        bestPoints: [
          "Time-saving automation",
          "No-code integrations",
          "Improved efficiency",
          "Scalable workflows",
        ],
      },
      {
        id: 3,
        question: "Generative AI Solutions",
        answer: "Leverage generative AI to create content, images, and code, enhancing productivity.",
        image: accordianai3,
        bestPoints: [
          "Creative content generation",
          "Personalized user experiences",
          "Rapid prototyping",
          "Cost-effective innovation",
        ],
      },
      {
        id: 4,
        question: "AI-powered Analytics",
        answer: "Use AI-driven analytics to extract insights and forecast trends for smarter decisions.",
        image: accordianai4,
        bestPoints: [
          "Real-time data processing",
          "Predictive insights",
          "Enhanced decision-making",
          "Customizable dashboards",
        ],
      },
    ],
    heading2: "Driven by Intelligence in AI Integration",
    description: "Turning Data Into Actionable Insights",
    helperText: "AI-driven solutions that enable smarter, faster decisions for business transformation.",
    slug: "ai-integration",
    tagline: "Smarter Solutions for Tomorrow",
    faqSpanText: "Leverage the Power of AI",
    faqBodyText:
      "Our AI integration services empower businesses with intelligent applications, predictive analytics, and automation to optimize operations and enhance experiences.",
    processBodyText:
      "An AI integration project begins with understanding business challenges, followed by data preprocessing, model training, testing, and integration with ongoing support.",
    number: "05",
    faqData: [
      {
        question: "How can AI integration benefit my business?",
        answer: "AI automates tasks, provides insights, and enhances decision-making for efficiency and innovation.",
      },
      {
        question: "What types of AI solutions do you offer?",
        answer: "We offer chatbots, predictive analytics, automation tools, and generative AI solutions.",
      },
      {
        question: "How long does it take to implement an AI solution?",
        answer: "Timelines range from 3 to 9 months, depending on complexity.",
      },
      {
        question: "Can AI integrate with existing systems?",
        answer: "Yes, we use APIs to seamlessly integrate AI with your current software.",
      },
      {
        question: "Is AI compliant with data privacy regulations?",
        answer: "Yes, our solutions adhere to standards like GDPR to ensure data security.",
      },
      {
        question: "Do AI solutions require maintenance?",
        answer: "Yes, regular updates and retraining ensure ongoing accuracy and performance.",
      },
    ],
    services: ["AI Applications", "Machine Learning Algorithms", "Business Process Automation"],
    iconRows: [
      {
        service: "AI Applications",
        serviceHeading: "AI-Powered Applications",
        faqIcon: [icons.faq.aiFAQ1],
        details: [
          {
            heading: "Natural Language Processing",
            description:
              "We develop AI applications like chatbots and recommendation systems to enhance user experiences and automate tasks.",
          },
        ],
        icons: [icons.aiml.ai1, icons.aiml.ai2, icons.aiml.ai3, icons.aiml.ai4, icons.aiml.ai5],
      },
      {
        service: "Machine Learning Algorithms",
        serviceHeading: "Custom Machine Learning Models",
        faqIcon: [icons.faq.aiFAQ2],
        details: [
          {
            heading: "Supervised Learning",
            description:
              "Our machine learning models deliver insights and automation, learning and improving over time for competitive advantage.",
          },
        ],
        icons: [icons.aiml.ml1, icons.aiml.ml2, icons.aiml.ml3, icons.aiml.ml4, icons.aiml.ml5],
      },
      {
        service: "Business Process Automation",
        serviceHeading: "Process Automation",
        faqIcon: [icons.faq.aiFAQ3],
        details: [
          {
            heading: "Automated Workflow Management",
            description:
              "We implement AI-driven automation to streamline operations, reduce errors, and boost productivity.",
          },
        ],
        icons: [icons.aiml.bp1, icons.aiml.bp2, icons.aiml.bp3, icons.aiml.bp4, icons.aiml.bp5],
      },
    ],
  },
  // {
  //   heading: "Consulting Support",
  //   spanText: "Consulting",
  //   image: consultationImage,
  //   serviceAccordionData: [
  //     {
  //       id: 1,
  //       question: "B2B Support & Solutions",
  //       answer: "Tailored support to streamline operations and improve partnerships.",
  //       image: accordianconsult1,
  //       bestPoints: [
  //         "Customized business strategies",
  //         "Partner relationship management",
  //         "Process optimization",
  //         "Scalable support models",
  //       ],
  //     },
  //     {
  //       id: 2,
  //       question: "Strategy Consulting",
  //       answer: "Define your vision and roadmap with market and competitive analysis.",
  //       image: accordianconsult2,
  //       bestPoints: [
  //         "Market research & insights",
  //         "Competitive analysis",
  //         "Business model innovation",
  //         "Long-term growth planning",
  //       ],
  //     },
  //     {
  //       id: 3,
  //       question: "Technical Advisory",
  //       answer: "Expert advice on technology selection and system architecture.",
  //       image: accordianconsult3,
  //       bestPoints: [
  //         "Technology evaluation",
  //         "Architecture design",
  //         "Risk assessment",
  //         "Implementation guidance",
  //       ],
  //     },
  //   ],
  //   heading2: "Guided by Experts in Consultation",
  //   description: "Shaping Strategies for Limitless Success",
  //   helperText: "Expert guidance that ensures every strategy aligns with your business goals, turning vision into reality.",
  //   slug: "consultation",
  //   tagline: "Shaping Strategies for Success",
  //   faqSpanText: "Unlock Business Potential",
  //   faqBodyText:
  //     "Our consultation services help businesses navigate challenges, achieve operational excellence, and unlock growth through strategic advice.",
  //   processBodyText:
  //     "A consultation project begins with analyzing your goals, developing tailored strategies, and assisting with implementation and monitoring.",
  //   number: "06",
  //   faqData: [
  //     {
  //       question: "What does your consulting service include?",
  //       answer: "We offer strategy development, market analysis, and tailored recommendations for your goals.",
  //     },
  //     {
  //       question: "Who provides the consultation?",
  //       answer: "Our team of experienced business analysts and technical experts leads the sessions.",
  //     },
  //     {
  //       question: "How long is a typical consultation session?",
  //       answer: "Sessions typically last 1–3 hours, depending on the scope.",
  //     },
  //     {
  //       question: "Can you assist with technical and business strategies?",
  //       answer: "Yes, we provide holistic solutions covering both technical and business needs.",
  //     },
  //     {
  //       question: "Is consulting suitable for startups?",
  //       answer: "Yes, we tailor advice to help startups scale and overcome challenges.",
  //     },
  //     {
  //       question: "Do you offer ongoing consulting support?",
  //       answer: "Yes, we provide recurring sessions to align with your evolving goals.",
  //     },
  //   ],
  //   services: [
  //     "Market Entry and Expansion Strategy",
  //     "Branding and Positioning",
  //     "Revenue Optimization and Cost Efficiency",
  //     "Digital Transformation Strategy",
  //     "Investment Readiness and Funding Strategy",
  //   ],
  //   iconRows: [
  //     {
  //       service: "Market Entry and Expansion Strategy",
  //       serviceHeading: "Market Strategy",
  //       faqIcon: [icons.faq.consultationFAQ1],
  //       details: [
  //         {
  //           heading: "Market Research",
  //           description:
  //             "We guide businesses through market research and strategy development for successful market entry.",
  //         },
  //       ],
  //       icons: [],
  //     },
  //     {
  //       service: "Branding and Positioning",
  //       serviceHeading: "Branding & Positioning",
  //       faqIcon: [icons.faq.consultationFAQ2],
  //       details: [
  //         {
  //           heading: "Brand Strategy",
  //           description:
  //             "We refine your brand identity to create a lasting impact and align with market demands.",
  //         },
  //       ],
  //       icons: [],
  //     },
  //     {
  //       service: "Revenue Optimization and Cost Efficiency",
  //       serviceHeading: "Revenue Optimization",
  //       faqIcon: [icons.faq.consultationFAQ3],
  //       details: [
  //         {
  //           heading: "Revenue Strategies",
  //           description:
  //             "We analyze operations and implement strategies to maximize revenue and reduce costs.",
  //         },
  //       ],
  //       icons: [],
  //     },
  //     {
  //       service: "Digital Transformation Strategy",
  //       serviceHeading: "Digital Transformation",
  //       faqIcon: [icons.faq.consultationFAQ4],
  //       details: [
  //         {
  //           heading: "Technology Integration",
  //           description:
  //             "We help businesses embrace digital tools to enhance processes and competitiveness.",
  //         },
  //       ],
  //       icons: [],
  //     },
  //     {
  //       service: "Investment Readiness and Funding Strategy",
  //       serviceHeading: "Investment Preparation",
  //       faqIcon: [icons.faq.consultationFAQ5],
  //       details: [
  //         {
  //           heading: "Business Plans",
  //           description:
  //             "We prepare compelling pitches and financials to position businesses for funding success.",
  //         },
  //       ],
  //       icons: [],
  //     },
  //   ],
  // },
];