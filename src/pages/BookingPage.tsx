import { useEffect } from 'react';
import { Calendar, MapPin, Phone, MessageCircle, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';

import SEO from '../components/SEO';
import Button from '../components/Button';

const BookingPage: React.FC = () => {
  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <SEO
        title="Online boeken – Beschikbaarheid & afspraak"
        description="Plan direct je handwas of dieptereiniging. Beschikbaar di–zo 8:00–20:00, Amsterdam e.o."
        canonical="https://bariqautocare.nl/booking-system"
      />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-bariq-white mb-4 md:mb-6">
              Plan je afspraak
            </h1>
            <p className="text-lg md:text-xl text-bariq-grey mb-6 md:mb-8">
              We zijn beschikbaar di–zo, 8:00–20:00 (ma: niet beschikbaar). Kies je datum en tijd.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendly Booking Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Calendly Widget */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/bariqautocare-info/2uur?hide_event_type_details=1&hide_gdpr_banner=1" 
                  style={{ minWidth: '320px', height: '700px' }}
                ></div>
              </div>
              
              <div className="mt-4 md:mt-6 p-4 md:p-5 bg-bariq-black rounded-xl border border-gray-800 flex items-start gap-3">
                <Info className="w-5 h-5 text-bariq-red flex-shrink-0 mt-0.5" />
                <p className="text-bariq-grey text-sm md:text-base">
                  <span className="text-bariq-white font-semibold">Geen tijd vrij?</span> Stuur ons een WhatsApp bericht, we denken graag mee voor een geschikte tijd.
                </p>
              </div>
            </div>
            
            {/* Sidebar Info */}
            <div className="space-y-4 md:space-y-6">
              {/* Availability */}
              <motion.div 
                className="bg-bariq-black p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-800"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-3 md:mb-4 flex items-center text-bariq-white">
                  <Calendar className="w-5 h-5 mr-2 text-bariq-red" />
                  Beschikbaarheid
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-bariq-grey text-sm md:text-base">Maandag:</span>
                    <span className="font-semibold text-red-500 text-sm md:text-base">Niet beschikbaar</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-bariq-grey text-sm md:text-base">Dinsdag - Zondag:</span>
                    <span className="font-semibold text-bariq-white text-sm md:text-base">8:00 - 20:00</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Service Region */}
              <motion.div 
                className="bg-bariq-black p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-800"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-3 md:mb-4 flex items-center text-bariq-white">
                  <MapPin className="w-5 h-5 mr-2 text-bariq-red" />
                  Serviceregio
                </h3>
                <p className="text-bariq-grey mb-3 text-sm md:text-base">
                  We zijn actief in:
                </p>
                <ul className="space-y-2 text-bariq-grey text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    Amsterdam en omgeving
                  </li>
                </ul>
                <p className="text-bariq-grey text-xs md:text-sm mt-4">
                  Niet in deze regio? Neem contact op voor de mogelijkheden.
                </p>
              </motion.div>

              {/* Service Details */}
              <motion.div 
                className="bg-bariq-black p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-800"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-3 md:mb-4 flex items-center text-bariq-white">
                  <Clock className="w-5 h-5 mr-2 text-bariq-red" />
                  Service Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-bariq-grey text-sm md:text-base">Gemiddelde duur:</span>
                    <span className="font-semibold text-bariq-white text-sm md:text-base">60-90 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-bariq-grey text-sm md:text-base">Service locatie:</span>
                    <span className="font-semibold text-bariq-white text-sm md:text-base">Op locatie</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-bariq-grey text-sm md:text-base">Betaling:</span>
                    <span className="font-semibold text-bariq-white text-sm md:text-base">Pin & Contant</span>
                  </div>
                </div>
              </motion.div>

              {/* Direct Contact */}
              <motion.div 
                className="bg-gradient-to-br from-bariq-red to-red-700 p-5 md:p-6 rounded-xl md:rounded-2xl text-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-3 md:mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Direct Contact
                </h3>
                <p className="text-white/90 mb-4 text-sm md:text-base">
                  Liever direct contact? Bel of WhatsApp ons voor snelle service.
                </p>
                <div className="space-y-3">
                  <Button
                    href="tel:0685523584"
                    variant="outline"
                    className="w-full text-white border-white hover:bg-white/10"
                    icon={<Phone size={18} />}
                  >
                    06 8552 3584
                  </Button>
                  <Button
                    href="https://wa.me/31685523584?text=Hallo,%20ik%20wil%20graag%20een%20afspraak%20maken"
                    variant="outline"
                    className="w-full text-white border-white hover:bg-white/10"
                    icon={<MessageCircle size={18} />}
                  >
                    WhatsApp
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-6">
            Wil je eerst de prijzen bekijken?
          </h2>
          <p className="text-lg text-bariq-grey mb-8 max-w-2xl mx-auto">
            Check onze transparante prijzen op basis van voertuigklasse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/diensten" variant="outline" size="large">
              Bekijk Diensten & Prijzen
            </Button>
            <Button to="/kenteken-check" variant="outline" size="large">
              Check Kenteken
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;