const schema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Scons Tech",
  "description": "Scons Tech offers expert web development, mobile app creation, UI/UX design, and SEO services to boost your digital presence.",
  "url": "https://sconstech.com/",
  "telephone": "+92 311 2136495",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office 1A1, Westland Trade Center, Jinnah Housing Society",
    "addressLocality": "Karachi",
    "postalCode": "75300",
    "addressCountry": "PK"
  },
  "sameAs": [
    "https://www.facebook.com/sconstech",
    "https://www.twitter.com/sconstech",
    "https://www.linkedin.com/company/sconstech",
    "https://www.instagram.com/sconstech",
  ]
});

export default schema;
