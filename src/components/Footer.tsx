import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from "lucide-react";
import Logo from "./Logo";

// TikTok icon component since it's not available in lucide-react
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer: React.FC = () => {
  // JSON-LD Schema for LocalBusiness
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name: "Bariq Autocare",
    image: "https://bariqautocare.nl/B_logo_bg.png",
    url: "https://bariqautocare.nl",
    logo: "https://bariqautocare.nl/B_logo_bg.png",
    telephone: "+31685523584",
    email: "info@bariqautocare.nl",
    areaServed: ["Amsterdam", "Amstelveen", "Diemen", "Zaandam"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressCountry: "NL",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday"],
        opens: "00:00",
        closes: "00:00",
      },
    ],
    sameAs: [
      "https://www.tiktok.com/@bariq_detailing",
      "https://www.instagram.com/bariq_detailing/",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Basis handwas & interieur - Klasse A",
        priceCurrency: "EUR",
        price: "90.00",
        category: "Service",
        itemOffered: {
          "@type": "Service",
          name: "Handwas & interieur (klasse A)",
          serviceType: "Car wash & interior clean",
        },
      },
      {
        "@type": "Offer",
        name: "Basis handwas & interieur - Klasse B",
        priceCurrency: "EUR",
        price: "120.00",
        category: "Service",
        itemOffered: {
          "@type": "Service",
          name: "Handwas & interieur (klasse B)",
          serviceType: "Car wash & interior clean",
        },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <footer className="bg-bariq-black text-bariq-grey pt-12 pb-6 border-t border-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Logo size="medium" />
              <p className="mt-4 text-bariq-grey max-w-xs">
                Premium handwas & interieurreiniging in Amsterdam.
                Professioneel, transparant en op locatie.
              </p>
              <div className="flex mt-4 space-x-4">
                <a
                  href="https://www.instagram.com/bariq_detailing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bariq-grey hover:text-bariq-red transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram />
                </a>
                <a
                  href="https://www.tiktok.com/@bariq_detailing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bariq-grey hover:text-bariq-red transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-display font-semibold mb-4 text-bariq-white">
                Menu
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-bariq-grey hover:text-bariq-red transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/diensten"
                    className="text-bariq-grey hover:text-bariq-red transition-colors"
                  >
                    Diensten & Prijzen
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kenteken-check"
                    className="text-bariq-grey hover:text-bariq-red transition-colors"
                  >
                    Kenteken Check
                  </Link>
                </li>
                <li>
                  <Link
                    to="/booking-system"
                    className="text-bariq-grey hover:text-bariq-red transition-colors"
                  >
                    Boeken
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reviews"
                    className="text-bariq-grey hover:text-bariq-red transition-colors"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    to="/over"
                    className="text-bariq-grey hover:text-bariq-red transition-colors"
                  >
                    Over Ons
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-bariq-grey hover:text-bariq-red transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-display font-semibold mb-4 text-bariq-white">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 text-bariq-red flex-shrink-0 mt-0.5" />
                  <a
                    href="tel:0685523584"
                    className="text-bariq-grey hover:text-bariq-red transition-colors"
                  >
                    06 8552 3584
                  </a>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 text-bariq-red flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:info@bariqautocare.nl"
                    className="text-bariq-grey hover:text-bariq-red transition-colors"
                  >
                    info@bariqautocare.nl
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-bariq-red flex-shrink-0 mt-0.5" />
                  <span className="text-bariq-grey">Amsterdam e.o.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-display font-semibold mb-4 text-bariq-white">
                Openingstijden
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-bariq-red" />
                  <span className="text-bariq-grey">Ma: Niet beschikbaar</span>
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-bariq-red" />
                  <span className="text-bariq-grey">Di-Zo: 8:00 - 20:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-900 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-bariq-grey text-sm">
              © {new Date().getFullYear()} Bariq Autocare. Alle rechten
              voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
