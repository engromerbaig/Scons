import icons from "../Services/modules/icons";

export const technologiesData = {
  "Mobile Apps": {
    iOS: [
      { name: "Swift", icon: icons.mobile.SwiftIOS },
      { name: "UI Kit", icon: icons.mobile.UIKit },
      { name: "Core Data", icon: icons.mobile.CoreData },
    ],
    Android: [
      { name: "Java", icon: icons.mobile.Java },
      { name: "Kotlin", icon: icons.mobile.Kotlin },
      { name: "Retrofit", icon: icons.mobile.Retrofit },
    ],
    Hybrid: [
      { name: "React Native", icon: icons.mobile.ReactNative },
      { name: "Flutter", icon: icons.mobile.FlutterHybrid },
    ],
  },

  "Web Platforms": {
    Frontend: [
      { name: "JavaScript", icon: icons.web.JSFrontend },
      { name: "TypeScript", icon: icons.web.TSFrontend },
      { name: "Tailwind CSS", icon: icons.web.TWFrontend },
      { name: "CSS3", icon: icons.web.CSSFrontend },
      { name: "HTML5", icon: icons.web.Html5Frontend },
      { name: "Next.js", icon: icons.web.NextFrontend },
      { name: "React", icon: icons.web.ReactFrontend },
      { name: "Vue.js", icon: icons.web.VueFrontend },
      { name: "Svelte", icon: icons.web.SvelteFrontend },
      {name:"Angular", icon: icons.web.AngularFrontend},
   

    ],
    Backend: [
      { name: "Java", icon: icons.web.JavaBackend },
      { name: "Node.js", icon: icons.web.JSBackend },
      { name: "Laravel", icon: icons.web.LaravelBackend },
      { name: "Python", icon: icons.web.Backend2 },
      { name: "Php", icon: icons.web.Backend3 },
      { name: ".NET", icon: icons.web.DotNetBackend },
    ],
    CMS: [
      { name: "Shopify", icon: icons.web.Shopify },
      { name: "WordPress", icon: icons.web.Wordpress },
      { name: "Magneto", icon: icons.web.Magneto },
      {name:"Webflow", icon: icons.web.Webflow},
    ],
  },

  "UI/UX": {
    Tools: [
      { name: "Figma", icon: icons.uiux.figmaUI },
      { name: "Adobe XD", icon: icons.uiux.xdUI },
      { name: "Sketch", icon: icons.uiux.sketchUI },
    ],
    ERP: [
      { name: "SAP", icon: icons.uiux.erp1 },
      { name: "Dynamics 365", icon: icons.uiux.erp2 },
      { name: "Oracle", icon: icons.uiux.erp3 },
      { name: "Intacct", icon: icons.uiux.erp4 },
      { name: "Infor", icon: icons.uiux.erp5 },
    ],
  },

  "Blockchain": {
    SmartContracts: [
      { name: "Solana", icon: icons.blockchain.smart1 },
      { name: "Bitcoin", icon: icons.blockchain.smart2 },
      { name: "BNB Chain", icon: icons.blockchain.smart3 },
    ],
    DApps: [
      { name: "Polygon", icon: icons.blockchain.dapp1 },
      { name: "Cube", icon: icons.blockchain.dapp2 },
      { name: "Uniswap", icon: icons.blockchain.dapp3 },
    ],
    Integrations: [
      { name: "MetaMask", icon: icons.blockchain.integ1 },
      { name: "Polkadot", icon: icons.blockchain.integ2 },
      { name: "Ethereum", icon: icons.blockchain.integ3 },
      { name: "Anchor", icon: icons.blockchain.integ4 },
    ],
  },

  "Cloud & DevOps": {
    Cloud: [
      { name: "AWS", icon: icons.devops.cloud1 },
      { name: "Azure", icon: icons.devops.cloud2 },
      { name: "Google Cloud", icon: icons.devops.cloud3 },
      { name: "IBM Cloud", icon: icons.devops.cloud4 },
      { name: "Oracle Cloud", icon: icons.devops.cloud5 },
    ],
    Network: [
      { name: "Cisco", icon: icons.devops.network1 },
      { name: "Juniper", icon: icons.devops.network2 },
      { name: "Arista", icon: icons.devops.network3 },
      { name: "GitHub", icon: icons.devops.network4 },
      { name: "OpenSSL", icon: icons.devops.network5 },
    ],
    
    DataBase: [
      { name: "Amazon S3", icon: icons.devops.data1 },
      { name: "Oracle", icon: icons.devops.data2 },
      { name: "MongoDB", icon: icons.devops.data3 },
      { name: "Cassandra", icon: icons.devops.data4 },
      { name: "Firebase", icon: icons.devops.data5 },
    ],
    
  },

  "AI & ML": {
    AI: [
      { name: "Python", icon: icons.aiml.ai1 },
      { name: "Rails", icon: icons.aiml.ai2 },
      { name: "Java", icon: icons.aiml.ai3 },
      { name: "C++", icon: icons.aiml.ai4 },
      { name: "Julia", icon: icons.aiml.ai5 },
    ],
    ML: [
      { name: "TensorFlow", icon: icons.aiml.ml1 },      // TensorFlow
      { name: "PyTorch", icon: icons.aiml.ml2 }, // ML 2 (PyTorch logo)
      { name: "Keras", icon: icons.aiml.ml3 },
      { name: "SKL", icon: icons.aiml.ml4 },     // Scikit-learn
      { name: "Spark", icon: icons.aiml.ml5 },
    ],
    Processes: [
      { name: "PubNub", icon: icons.aiml.bp1 },
      { name: "Airflow", icon: icons.aiml.bp2 },
      { name: "Bizagi", icon: icons.aiml.bp3 },
      { name: "Wrike", icon: icons.aiml.bp4 },
      { name: "Asana", icon: icons.aiml.bp5 },
    ],
    
  },
};
