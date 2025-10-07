import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock, Shield, Star } from 'lucide-react';

import SectionTitle from '../components/SectionTitle';
import PackageCard from '../components/PackageCard';
import Button from '../components/Button';

const PackagesPage: React.FC = () => {
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
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-display font-bold text-gray-200 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Onze Pakketten
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Kies het perfecte pakket dat past bij jouw auto en wensen
          </motion.p>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="Individuele Services"
            subtitle="Eenmalige reiniging wanneer je het nodig hebt"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
              delay={0.1}
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
                      €79
                      <div className="text-xs text-charcoal-500 font-normal">incl. BTW</div>
                    </td>
                    <td className="px-4 py-4 text-center text-charcoal-900 font-semibold bg-primary-25">
                      €149
                      <div className="text-xs text-charcoal-500 font-normal">incl. BTW</div>
                    </td>
                    <td className="px-4 py-4 text-center text-charcoal-900 font-semibold">
                      €329
                      <div className="text-xs text-charcoal-500 font-normal">incl. BTW</div>
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
                Waarom Premium kiezen?
              </h3>
              <p className="text-charcoal-700">
                Premium biedt een complete reiniging die je auto maandenlang fris houdt, inclusief dieptereiniging van stoelen, lederbehandeling, en geurverwijdering. Ideaal voor wie het beste resultaat wil.
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
                Onze abonnementen zijn maandelijks opzegbaar zonder bindingsperiode. Je betaalt elke maand en krijgt exclusieve voordelen zoals gratis ophaal/brengservice en kortingen.
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
                Kan ik een pakket aanpassen?
              </h3>
              <p className="text-charcoal-700">
                Ja, alle pakketten kunnen aangepast worden met extra services naar wens. Neem contact met ons op om een op maat gemaakt pakket samen te stellen.
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
            Boek vandaag nog en ervaar premium autopoetsservice aan huis.
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
              Boek Nu
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
        </div>
      </section>
    </>
  );
};

export default PackagesPage;