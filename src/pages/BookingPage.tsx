import React, { useEffect } from 'react';
import { Calendar, MapPin, Phone, MessageCircle, CheckCircle, Star, Shield, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

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
            className="text-lg md:text-xl text-charcoal-700 max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Kies een tijd en datum die jou uitkomt en wij komen naar je toe
          </motion.p>
          
          {/* Urgency Banner */}
          <motion.div 
            className="bg-red-500 text-white p-3 rounded-lg max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-bold">🔥 LAATSTE WEEK: Prijzen stijgen 1 juli met €10</p>
            <p className="text-sm">⏰ Nog 4 plekken beschikbaar deze week</p>
          </motion.div>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="Kies Je Pakket"
            subtitle="Selecteer het pakket dat het beste bij jouw auto past"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {/* Basic Clean */}
            <motion.div 
              className="border border-charcoal-200 rounded-lg p-6 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-display font-semibold mb-2">Basic Clean</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-charcoal-900">€65</span>
                <span className="text-red-500 line-through ml-2">€59</span>
              </div>
              <p className="text-charcoal-600 mb-4">Perfecte optie voor regelmatig onderhoud.</p>
              <ul className="text-sm text-charcoal-700 space-y-2 mb-6">
                <li>• Exterieur handwas</li>
                <li>• Wielen en velgen reiniging</li>
                <li>• Interieur stofzuigen</li>
                <li>• Dashboard reiniging</li>
                <li>• Ramen binnen en buiten</li>
              </ul>
              <div className="text-xs text-red-600 mb-4">🔥 Prijs stijgt naar €75</div>
            </motion.div>

            {/* Premium Clean */}
            <motion.div 
              className="border-2 border-primary-500 rounded-lg p-6 hover:shadow-lg transition-all relative pt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-1" />
                MOST POPULAR
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Premium Clean</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary-600">€125</span>
                <span className="text-red-500 line-through ml-2">€170</span>
              </div>
              <p className="text-charcoal-600 mb-4">Complete reiniging voor showroom-ervaring.</p>
              <ul className="text-sm text-charcoal-700 space-y-2 mb-6">
                <li>• Alles van Basic Clean</li>
                <li>• Dieptereiniging interieur</li>
                <li>• Lederbehandeling</li>
                <li>• Geuren verwijderen</li>
                <li>• Ventilatiesysteem reinigen</li>
              </ul>
              <div className="text-xs text-green-600 mb-4">💰 BESPAAR €45 NU!</div>
              <div className="text-xs text-blue-600 mb-4">⭐ 78% van klanten kiest dit pakket</div>
            </motion.div>

            {/* Deluxe Clean - Fixed padding to prevent overlap */}
            <motion.div 
              className="border-2 border-purple-500 rounded-lg p-6 hover:shadow-lg transition-all relative pt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                LUXURY EDITION
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Deluxe Clean</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-purple-600">€275</span>
                <span className="text-green-600 text-sm ml-2">Luxury!</span>
              </div>
              <p className="text-charcoal-600 mb-4">Ultieme luxe behandeling met exclusieve premium service.</p>
              <ul className="text-sm text-charcoal-700 space-y-2 mb-6">
                <li>• Alles van Premium Clean</li>
                <li>• Professionele ceramic coating</li>
                <li>• Premium lederbehandeling & conditioner</li>
                <li>• Motorruimte detailing</li>
                <li>• Exclusieve wax behandeling</li>
                <li>• Voor- en na foto's professioneel</li>
                <li>• VIP white-glove service</li>
                <li>• 6 maanden beschermingsgarantie</li>
              </ul>
              <div className="text-xs text-purple-600 mb-4">🛡️ Langdurige luxe bescherming</div>
            </motion.div>
          </div>

          {/* Subscription Options */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-display font-bold text-center mb-6">Abonnementen - Bespaar Honderden Euro's</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Care Subscription */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md border border-green-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-xl font-display font-semibold mb-2">Care Subscription</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-green-600">€99</span>
                  <span className="text-charcoal-600">/maand</span>
                  <div className="text-red-500 line-through text-sm">Was €105</div>
                </div>
                <ul className="text-sm text-charcoal-700 space-y-2 mb-4">
                  <li>• 1x Premium Clean maandelijks</li>
                  <li>• Gratis ophaal/brengservice (15km)</li>
                  <li>• 15% korting op extra services</li>
                  <li>• Prioriteit bij planning</li>
                  <li>• CANCEL ANYTIME</li>
                </ul>
                <div className="bg-green-100 p-3 rounded text-green-800 text-sm font-medium">
                  BESPAAR €300/jaar vs individuele boekingen
                </div>
              </motion.div>

              {/* VIP Subscription */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-500 relative pt-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  BEST VALUE
                </div>
                <h4 className="text-xl font-display font-semibold mb-2">VIP Subscription</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-600">€189</span>
                  <span className="text-charcoal-600">/maand</span>
                </div>
                <ul className="text-sm text-charcoal-700 space-y-2 mb-4">
                  <li>• 2x Premium Clean maandelijks</li>
                  <li>• Gratis ophaal/brengservice (25km)</li>
                  <li>• 25% korting op alle services</li>
                  <li>• Prioriteit + spoedservice</li>
                  <li>• Exclusieve VIP support lijn</li>
                  <li>• CANCEL ANYTIME</li>
                </ul>
                <div className="bg-blue-100 p-3 rounded text-blue-800 text-sm font-medium">
                  BESPAAR €610/jaar vs individuele boekingen
                </div>
              </motion.div>
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
                className="bg-red-50 p-4 md:p-6 rounded-lg shadow-sm border border-red-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg md:text-xl font-display font-semibold mb-4 flex items-center text-red-800">
                  <Clock className="w-5 h-5 mr-2 text-red-600" />
                  Live Updates
                </h3>
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex items-center justify-between">
                    <span className="text-red-700">Vandaag geboekt:</span>
                    <span className="font-bold text-red-800">12 auto's</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-700">Deze week nog:</span>
                    <span className="font-bold text-red-800">4 plekken</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-700">Prijsstijging over:</span>
                    <span className="font-bold text-red-800">6 dagen</span>
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
              <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
              <p className="text-charcoal-600">Klanttevredenheid</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">5000+</div>
              <p className="text-charcoal-600">Auto's gereinigd</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
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