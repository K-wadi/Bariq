import React, { useEffect } from 'react';
import { Calendar, MapPin, Phone, MessageCircle, CheckCircle, Star, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import PackageCard from '../components/PackageCard';
import AnimatedCounter from '../components/AnimatedCounter';

const BookingPage: React.FC = () => {
  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-charcoal-50 to-primary-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Boek Je Afspraak
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-charcoal-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Kies een tijd en datum die jou uitkomt en wij komen naar je toe
          </motion.p>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-8 md:py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="Kies Je Pakket"
            subtitle="Selecteer het pakket dat het beste bij jouw auto past"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <PackageCard
              title="Basic Clean"
              price="€79"
              description="Perfecte optie voor regelmatig onderhoud."
              features={[
                "Exterieur handwas",
                "Wielen en velgen reiniging",
                "Interieur stofzuigen",
                "Dashboard en console reiniging",
                "Ramen binnen en buiten"
              ]}
              actionLabel="Boek Basic Clean"
              delay={0.1}
            />
            
            <PackageCard
              title="Premium Clean"
              price="€149"
              description="Complete reiniging voor een showroom-ervaring."
              features={[
                "Alles van Basic Clean",
                "Dieptereiniging stoelen en vloermatten",
                "Lederbehandeling (indien van toepassing)",
                "Interieur geuren verwijderen",
                "Ventilatiesysteem reinigen",
                "Behandeling van kunststof onderdelen"
              ]}
              popular={true}
              actionLabel="Boek Premium Clean"
              delay={0.2}
            />

            <PackageCard
              title="Deluxe Clean"
              price="€329"
              description="Ultieme luxe behandeling met exclusieve service."
              features={[
                "Alles van Premium Clean",
                "Professionele ceramic coating",
                "Premium lederbehandeling & conditioner",
                "Exclusieve wax behandeling",
                "Voor- en na foto's professioneel",
                "Velgen dieptereiniging",
                "Banden glans behandeling",
                "Uitgebreide kofferbak reiniging"
              ]}
              actionLabel="Boek Deluxe Clean"
              delay={0.3}
            />
          </div>

          {/* Subscription Options */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg mb-12 border border-gray-700">
            <h3 className="text-2xl font-display font-bold text-center mb-6 text-gray-200">Abonnementen</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <PackageCard
                title="Care Subscription"
                price="€119/maand"
                description="Maandelijkse Premium Clean met exclusieve voordelen."
                features={[
                  "1x Premium Clean maandelijks",
                  "Gratis ophaal/brengservice (15km)",
                  "15% korting op extra services",
                  "Prioriteit bij planning",
                  "Geen bindingsperiode"
                ]}
                actionLabel="Start Care Abonnement"
                delay={0.4}
              />
              
              <PackageCard
                title="VIP Subscription"
                price="€229/maand"
                description="Ultieme service met VIP behandeling."
                features={[
                  "2x Premium Clean maandelijks",
                  "Gratis ophaal/brengservice (25km)",
                  "25% korting op alle services",
                  "Prioriteit + spoedservice",
                  "Exclusieve VIP support lijn",
                  "Geen bindingsperiode"
                ]}
                bestValue={true}
                actionLabel="Word VIP Member"
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Booking Section */}
      <section className="py-8 md:py-16 bg-charcoal-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <SectionTitle 
                title="Plan Je Afspraak"
                subtitle="Kies een datum en tijd die jou uitkomt"
                alignment="left"
              />
              
              {/* Calendly Widget - Updated URL */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/bariqautocare-info/2uur?hide_event_type_details=1&hide_gdpr_banner=1" 
                  style={{ minWidth: '320px', height: '700px' }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-4 flex items-center text-charcoal-900">
                  <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                  Beschikbaarheid
                </h3>
                <p className="text-charcoal-700 mb-4 text-sm md:text-base">
                  We zijn beschikbaar op de volgende tijden:
                </p>
                <ul className="space-y-2 text-charcoal-700 text-sm md:text-base">
                  <li className="flex justify-between">
                    <span>Maandag:</span>
                    <span className="font-medium text-red-600">Niet beschikbaar</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Dinsdag - Zondag:</span>
                    <span className="font-medium">8:00 - 20:00</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Maandagen zijn niet beschikbaar voor service
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-4 flex items-center text-charcoal-900">
                  <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                  Serviceregio
                </h3>
                <p className="text-charcoal-700 mb-4 text-sm md:text-base">
                  We zijn actief in de volgende regio's:
                </p>
                <ul className="space-y-1 text-charcoal-700 text-sm md:text-base">
                  <li>• Amsterdam en omgeving</li>
                </ul>
                <p className="text-charcoal-500 text-xs md:text-sm mt-4">
                  Niet in deze regio? Neem contact met ons op voor de mogelijkheden.
                </p>
              </motion.div>

              {/* Live Stats */}
              <motion.div 
                className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm border border-gray-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-4 flex items-center text-charcoal-800">
                  <Clock className="w-5 h-5 mr-2 text-charcoal-600" />
                  Service Details
                </h3>
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-700">Gemiddelde duur:</span>
                    <span className="font-bold text-charcoal-800">2-3 uur</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-700">Service locatie:</span>
                    <span className="font-bold text-charcoal-800">Aan huis</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-700">Betaling:</span>
                    <span className="font-bold text-charcoal-800">Na service</span>
                  </div>
                </div>
              </motion.div>

              {/* Mobile-optimized booking process */}
              <motion.div 
                className="bg-green-50 p-4 md:p-6 rounded-lg shadow-sm border border-green-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-4 flex items-center text-green-800">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Hoe het werkt
                </h3>
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span className="text-green-700">Kies je pakket hierboven</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span className="text-green-700">Selecteer datum en tijd in de agenda</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span className="text-green-700">Vul je gegevens in</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                    <span className="text-green-700">Wij komen naar je toe!</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-primary p-4 md:p-6 rounded-lg shadow-sm text-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Direct Contact
                </h3>
                <p className="text-white/90 mb-4 text-sm md:text-base">
                  Liever direct contact? Bel ons of stuur een WhatsApp bericht voor snelle service en persoonlijk advies.
                </p>
                <div className="space-y-3">
                  <Button
                    href="tel:0685523584"
                    variant="outline"
                    className="w-full text-white border-white hover:bg-white/10 text-sm md:text-base py-3"
                    icon={<Phone size={18} />}
                  >
                    06 8552 3584
                  </Button>
                  <Button
                    href="https://wa.me/31685523584?text=Hallo,%20ik%20wil%20graag%20een%20afspraak%20maken%20voor%20een%20autopoetsbeurt."
                    variant="secondary"
                    className="w-full text-sm md:text-base py-3"
                    icon={<MessageCircle size={18} />}
                  >
                    WhatsApp Contact
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedCounter 
                end={98} 
                suffix="%" 
                className="text-3xl font-bold text-primary-600 mb-2"
                delay={0}
              />
              <p className="text-charcoal-600">Klanttevredenheid</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AnimatedCounter 
                end={5000} 
                suffix="+" 
                className="text-3xl font-bold text-primary-600 mb-2"
                delay={0.2}
              />
              <p className="text-charcoal-600">Auto's gereinigd</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnimatedCounter 
                end={100} 
                suffix="%" 
                className="text-3xl font-bold text-primary-600 mb-2"
                delay={0.4}
              />
              <p className="text-charcoal-600">Geld terug garantie</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <p className="text-charcoal-600">Support beschikbaar</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-charcoal-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="Veelgestelde Vragen"
            subtitle="Alles wat je moet weten over het boeken van een afspraak"
          />
          
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            <motion.div 
              className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg md:text-xl font-display font-semibold mb-2 text-charcoal-900">
                Waarom zijn maandagen niet beschikbaar?
              </h3>
              <p className="text-charcoal-700 text-sm md:text-base">
                Maandagen gebruiken we voor materiaal aanvulling, equipment onderhoud en planning. Hierdoor kunnen we dinsdag t/m zondag optimale service leveren.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg md:text-xl font-display font-semibold mb-2 text-charcoal-900">
                Moet ik thuis zijn tijdens de service?
              </h3>
              <p className="text-charcoal-700 text-sm md:text-base">
                Niet noodzakelijk. Als je auto toegankelijk is (bijvoorbeeld op je oprit of in een toegankelijke garage), dan kunnen we de service uitvoeren zonder dat je aanwezig bent. We stemmen dit graag vooraf met je af.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg md:text-xl font-display font-semibold mb-2 text-charcoal-900">
                Wat gebeurt er als het regent op de dag van mijn afspraak?
              </h3>
              <p className="text-charcoal-700 text-sm md:text-base">
                Bij lichte regen kunnen we nog steeds service verlenen als je auto onder een overkapping staat. Bij zware regen nemen we contact met je op om de afspraak te verzetten naar een andere datum of tijd.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg md:text-xl font-display font-semibold mb-2 text-charcoal-900">
                Kan ik mijn afspraak wijzigen of annuleren?
              </h3>
              <p className="text-charcoal-700 text-sm md:text-base">
                Ja, je kunt je afspraak tot 24 uur van tevoren kosteloos wijzigen of annuleren. Neem hiervoor telefonisch of via WhatsApp contact met ons op.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg md:text-xl font-display font-semibold mb-2 text-charcoal-900">
                Welke betalingsmethoden accepteren jullie?
              </h3>
              <p className="text-charcoal-700 text-sm md:text-base">
                We accepteren contante betaling, pinbetaling ter plaatse, en vooraf betalen via bankoverschrijving. Voor abonnementen werken we met automatische incasso.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;