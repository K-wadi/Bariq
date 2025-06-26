import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle, Clock, Users, TrendingUp, Shield, Star } from 'lucide-react';

import SectionTitle from '../components/SectionTitle';
import PackageCard from '../components/PackageCard';
import Button from '../components/Button';

const PackagesPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const [todayBookings, setTodayBookings] = useState(12);
  const [spotsLeft, setSpotsLeft] = useState(4);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate live bookings
  useEffect(() => {
    const bookingTimer = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        setTodayBookings(prev => prev + 1);
        setSpotsLeft(prev => Math.max(1, prev - 1));
      }
    }, 30000);

    return () => clearInterval(bookingTimer);
  }, []);

  const comparisonFeatures = [
    { name: 'Exterieur handwas', basic: true, premium: true, deluxe: true },
    { name: 'Wielen en velgen reiniging', basic: true, premium: true, deluxe: true },
    { name: 'Interieur stofzuigen', basic: true, premium: true, deluxe: true },
    { name: 'Dashboard en console reiniging', basic: true, premium: true, deluxe: true },
    { name: 'Ramen binnen en buiten', basic: true, premium: true, deluxe: true },
    { name: 'Dieptereiniging stoelen en vloermatten', basic: false, premium: true, deluxe: true },
    { name: 'Lederbehandeling (indien van toepassing)', basic: false, premium: true, deluxe: true },
    { name: 'Interieur geuren verwijderen', basic: false, premium: true, deluxe: true },
    { name: 'Ventilatiesysteem reinigen', basic: false, premium: true, deluxe: true },
    { name: 'Behandeling van kunststof onderdelen', basic: false, premium: true, deluxe: true },
    { name: 'Professionele ceramic coating', basic: false, premium: false, deluxe: true },
    { name: 'Premium lederbehandeling & conditioner', basic: false, premium: false, deluxe: true },
    { name: 'Exclusieve wax behandeling', basic: false, premium: false, deluxe: true },
    { name: 'Voor/na fotos professioneel', basic: false, premium: false, deluxe: true },
    { name: 'Velgen dieptereiniging', basic: false, premium: false, deluxe: true },
    { name: 'Banden glans behandeling', basic: false, premium: false, deluxe: true },
    { name: 'Uitgebreide kofferbak reiniging', basic: false, premium: false, deluxe: true },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    })
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-charcoal-50 to-primary-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Onze Pakketten
          </motion.h1>
          <motion.p 
            className="text-xl text-charcoal-700 max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Kies het perfecte pakket dat past bij jouw auto en wensen
          </motion.p>
          
          {/* Urgency Banner */}
          <motion.div 
            className="bg-red-500 text-white p-4 rounded-lg max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-bold">🔥 LAATSTE WEEK: Prijzen stijgen 1 juli met €10</span>
            </div>
            <div className="flex justify-center space-x-4 text-sm">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}u</span>
              <span>{timeLeft.minutes}m</span>
              <span>{timeLeft.seconds}s</span>
            </div>
          </motion.div>
          
          {/* Live Stats */}
          <div className="flex justify-center space-x-6 text-sm text-charcoal-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-green-500" />
              <span>Vandaag al {todayBookings} auto's geboekt</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-1 text-orange-500" />
              <span>⏰ Nog {spotsLeft} plekken beschikbaar deze week</span>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="Individuele Services"
            subtitle="Eenmalige reiniging wanneer je het nodig hebt"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Deluxe - Anchoring Effect */}
            <PackageCard
              title="Deluxe Clean"
              price="€275"
              description="Ultieme luxe behandeling met exclusieve premium service."
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
              decoy={true}
              actionLabel="UPGRADE NAAR DELUXE - €275"
              badge="LUXURY EDITION"
              delay={0.1}
            />
            
            {/* Premium - Most Popular */}
            <PackageCard
              title="Premium Clean"
              price="€125"
              oldPrice="€170"
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
              actionLabel="KIES PREMIUM - €125"
              savings="BESPAAR €45 NU!"
              urgency="Prijsstijging volgende week"
              delay={0.2}
            />

            {/* Basic */}
            <PackageCard
              title="Basic Clean"
              price="€65"
              oldPrice="€59"
              description="Perfecte optie voor regelmatig onderhoud."
              features={[
                "Exterieur handwas",
                "Wielen en velgen reiniging",
                "Interieur stofzuigen",
                "Dashboard en console reiniging",
                "Ramen binnen en buiten"
              ]}
              missingFeatures={[
                "Dieptereiniging interieur",
                "Lederbehandeling",
                "Geuren verwijderen",
                "Ventilatiesysteem reinigen"
              ]}
              actionLabel="BOEK BASIC - €65"
              delay={0.3}
            />
          </div>
          
          {/* Customer Journey Message */}
          <div className="mt-12 text-center">
            <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <p className="text-blue-800 font-medium mb-2">
                📈 Boekingen stijgen 300% - reserveer nu
              </p>
              <p className="text-blue-700 text-sm">
                De meeste klanten upgraden van Basic naar Premium na hun eerste ervaring. 
                Bespaar tijd en kies direct voor de complete service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscriptions */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-charcoal-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="Abonnementen"
            subtitle="Regelmatige verzorging met exclusieve voordelen"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Care Subscription */}
            <PackageCard
              title="Care Subscription"
              price="€99/maand"
              oldPrice="€105"
              description="Maandelijkse Premium Clean met exclusieve voordelen."
              features={[
                "1x Premium Clean maandelijks",
                "Gratis ophaal/brengservice (15km)",
                "15% korting op extra services",
                "Prioriteit bij planning",
                "Geen bindingsperiode"
              ]}
              savings="BESPAAR €300/jaar vs individuele boekingen"
              actionLabel="START CARE ABONNEMENT - €99"
              delay={0.1}
            />
            
            {/* VIP Subscription */}
            <PackageCard
              title="VIP Subscription"
              price="€189/maand"
              description="Ultieme service met VIP behandeling."
              features={[
                "2x Premium Clean maandelijks",
                "Gratis ophaal/brengservice (25km)",
                "25% korting op alle services",
                "Prioriteit + spoedservice",
                "Exclusieve VIP support lijn",
                "Geen bindingsperiode"
              ]}
              savings="BESPAAR €610/jaar vs individuele boekingen"
              bestValue={true}
              actionLabel="WORD VIP MEMBER - €189"
              delay={0.2}
            />
          </div>
          
          {/* Subscription Benefits */}
          <div className="mt-12 bg-green-50 p-6 rounded-lg max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-display font-semibold text-green-800 mb-2">
                Abonnement Garanties
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="text-green-700">
                <Star className="w-6 h-6 mx-auto mb-2" />
                <p className="font-medium">CANCEL ANYTIME</p>
                <p className="text-sm">Geen bindingsperiode</p>
              </div>
              <div className="text-green-700">
                <Shield className="w-6 h-6 mx-auto mb-2" />
                <p className="font-medium">100% TEVREDENHEID</p>
                <p className="text-sm">Geld-terug-garantie</p>
              </div>
              <div className="text-green-700">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <p className="font-medium">FLEXIBELE PLANNING</p>
                <p className="text-sm">Pas aan wanneer nodig</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="Pakketvergelijking"
            subtitle="Zie precies wat je krijgt met elk pakket"
          />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-medium text-charcoal-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-medium text-charcoal-500 uppercase tracking-wider">
                      Basic Clean
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-medium text-charcoal-500 uppercase tracking-wider bg-primary-50">
                      Premium Clean ⭐
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-medium text-charcoal-500 uppercase tracking-wider">
                      Deluxe Clean
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-200">
                  {comparisonFeatures.map((feature, index) => (
                    <motion.tr 
                      key={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      custom={index * 0.05}
                      variants={fadeInUpVariants}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-charcoal-25'}
                    >
                      <td className="px-4 py-3 text-sm text-charcoal-800">
                        {feature.name}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {feature.basic ? (
                          <Check className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center bg-primary-25">
                        {feature.premium ? (
                          <Check className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {feature.deluxe ? (
                          <Check className="w-4 h-4 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-red-400 mx-auto" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot className="bg-charcoal-50">
                  <tr>
                    <td className="px-4 py-4 font-display font-semibold text-lg text-charcoal-900">
                      Prijs
                    </td>
                    <td className="px-4 py-4 text-center text-charcoal-900 font-semibold">
                      €65 <span className="text-red-500 line-through text-sm">€59</span>
                    </td>
                    <td className="px-4 py-4 text-center text-charcoal-900 font-semibold bg-primary-25">
                      €125 <span className="text-red-500 line-through text-sm">€170</span>
                    </td>
                    <td className="px-4 py-4 text-center text-charcoal-900 font-semibold">
                      €275
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4"></td>
                    <td className="px-4 py-4 text-center">
                      <Button to="/boeken" variant="outline" size="small">
                        Boek Basic
                      </Button>
                    </td>
                    <td className="px-4 py-4 text-center bg-primary-25">
                      <Button to="/boeken" variant="primary" size="small">
                        Kies Premium
                      </Button>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Button to="/boeken" variant="secondary" size="small">
                        Upgrade Deluxe
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 md:py-24 bg-charcoal-50">
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
              <div className="text-3xl font-bold text-primary-600 mb-2">3+</div>
              <p className="text-charcoal-600">Jaar ervaring</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
              <p className="text-charcoal-600">Geld terug garantie</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="Veelgestelde Vragen"
            subtitle="Alles wat je moet weten over onze pakketten"
          />
          
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div 
              className="bg-charcoal-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-display font-semibold mb-2 text-charcoal-900">
                Waarom kiezen de meeste klanten Premium?
              </h3>
              <p className="text-charcoal-700">
                78% van onze klanten kiest Premium omdat het de beste waarde biedt. Je krijgt een complete reiniging die je auto maandenlang fris houdt, terwijl Basic alleen de basis dekt. De meeste klanten upgraden na hun eerste Basic ervaring.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-charcoal-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-display font-semibold mb-2 text-charcoal-900">
                Hoe werken de abonnementen?
              </h3>
              <p className="text-charcoal-700">
                Onze abonnementen zijn maandelijks opzegbaar zonder bindingsperiode. Je betaalt elke maand en krijgt exclusieve voordelen zoals gratis ophaal/brengservice en kortingen. Je bespaart honderden euro's per jaar vergeleken met individuele boekingen.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-charcoal-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-display font-semibold mb-2 text-charcoal-900">
                Wat als ik niet tevreden ben?
              </h3>
              <p className="text-charcoal-700">
                We bieden 100% tevredenheidsgarantie. Als je niet volledig tevreden bent, komen we terug om het gratis opnieuw te doen of geven we je geld terug. Jouw tevredenheid is onze prioriteit.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-charcoal-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-display font-semibold mb-2 text-charcoal-900">
                Waarom stijgen de prijzen?
              </h3>
              <p className="text-charcoal-700">
                Door de enorme vraagstijging (300% meer boekingen) en stijgende kosten van premium producten moeten we onze prijzen aanpassen. Boek nu om van de huidige prijzen te profiteren.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Klaar om je auto te laten stralen?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Boek vandaag nog en profiteer van de huidige prijzen. Prijzen stijgen volgende week!
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              to="/boeken" 
              variant="secondary" 
              size="large"
              className="bg-[#119EF3] text-primary-600 hover:bg-gray-100"
            >
              KIES PREMIUM - €125
            </Button>
            <Button 
              to="/boeken" 
              variant="outline" 
              size="large"
              className="text-white border-white hover:bg-white/10"
            >
              Bekijk Alle Opties
            </Button>
          </motion.div>
          
          <div className="mt-6 text-white/80 text-sm">
            🔥 Laatste week voor prijsstijging • ⏰ Beperkte plekken beschikbaar
          </div>
        </div>
      </section>
    </>
  );
};

export default PackagesPage;