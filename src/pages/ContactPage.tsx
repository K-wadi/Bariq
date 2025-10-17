import { Phone, Mail, Clock, MapPin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Button from "../components/Button";

// TikTok icon component
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

const ContactPage: React.FC = () => {
  const contactItems = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Bel ons",
      value: "06 8552 3584",
      link: "tel:0685523584",
      description: "Bereikbaar di-zo, 8:00-20:00",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      value: "info@bariqautocare.nl",
      link: "mailto:info@bariqautocare.nl",
      description: "We reageren binnen 24 uur",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Regio",
      value: "Amsterdam e.o.",
      description: "Service op locatie in heel Amsterdam en omgeving",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Openingstijden",
      value: "Di-Zo: 8:00-20:00",
      description: "Ma: Niet beschikbaar",
    },
  ];

  return (
    <>
      <SEO
        title="Contact & WhatsApp – Bariq Autocare Amsterdam"
        description="Vragen of snél boeken? Bel/WhatsApp 06 8552 3584 of mail info@bariqautocare.nl"
        canonical="https://bariqautocare.nl/contact"
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-bariq-white mb-6">
              Direct Contact
            </h1>
            <p className="text-xl text-bariq-grey mb-8">
              Vragen of snel boeken? We staan voor je klaar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-bariq-black p-8 rounded-2xl border border-gray-800 hover:border-bariq-red transition-all"
              >
                <div className="text-bariq-red mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-bariq-white mb-2">
                  {item.title}
                </h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-2xl font-bold text-bariq-white hover:text-bariq-red transition-colors block mb-2"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-2xl font-bold text-bariq-white mb-2">
                    {item.value}
                  </p>
                )}
                <p className="text-bariq-grey text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto bg-bariq-black-lighter p-8 md:p-12 rounded-2xl border border-bariq-red">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-4">
              Snelste reactie via WhatsApp
            </h2>
            <p className="text-lg text-bariq-grey mb-8">
              Stuur ons een bericht en krijg binnen enkele minuten antwoord
            </p>
            <Button
              href="https://wa.me/31685523584?text=Hallo,%20ik%20heb%20een%20vraag%20over%20Bariq%20Autocare"
              variant="primary"
              size="large"
              className="inline-flex"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-4">
            Volg ons op social media
          </h2>
          <p className="text-lg text-bariq-grey mb-8">
            Voor tips, transformaties en behind-the-scenes
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.tiktok.com/@bariq_detailing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-bariq-black px-8 py-4 rounded-2xl border border-gray-800 hover:border-bariq-red transition-all group"
            >
              <TikTokIcon className="w-8 h-8 text-bariq-white group-hover:text-bariq-red transition-colors" />
              <span className="text-bariq-white font-semibold">TikTok</span>
            </a>
            <a
              href="https://www.instagram.com/bariq_detailing/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-bariq-black px-8 py-4 rounded-2xl border border-gray-800 hover:border-bariq-red transition-all group"
            >
              <Instagram className="w-8 h-8 text-bariq-white group-hover:text-bariq-red transition-colors" />
              <span className="text-bariq-white font-semibold">Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
