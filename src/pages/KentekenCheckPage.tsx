import { Car, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import LicensePlateInput from '../components/LicensePlateInput';

const KentekenCheckPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Kenteken prijs-check – Directe prijsindicatie"
        description="Voer je kenteken in en ontvang prijs op basis van voertuigtype, grootte & leeftijd via RDW-gegevens."
        canonical="https://bariqautocare.nl/kenteken-check"
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
            <div className="inline-flex items-center gap-2 bg-bariq-black-lighter px-4 py-2 rounded-full mb-6">
              <Car className="w-5 h-5 text-bariq-red" />
              <span className="text-bariq-white font-semibold">Prijs Check</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-bariq-white mb-6">
              Prijs-check via kenteken
            </h1>
            <p className="text-xl text-bariq-grey mb-8">
              Voer je kenteken in voor een nauwkeurige prijsindicatie op basis van je voertuiggegevens
            </p>
          </motion.div>
        </div>
      </section>

      {/* License Plate Input */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <LicensePlateInput />
            
            <div className="mt-8 p-6 bg-bariq-black rounded-xl border border-gray-800 flex items-start gap-4">
              <Info className="w-5 h-5 text-bariq-red flex-shrink-0 mt-0.5" />
              <div className="text-sm text-bariq-grey">
                <p className="font-semibold text-bariq-white mb-2">
                  Gegevens worden opgehaald van de RDW
                </p>
                <p>
                  Prijzen zijn gebaseerd op voertuigtype, grootte en leeftijd volgens de Rijksdienst voor het Wegverkeer. 
                  De indicatie die je ontvangt is voor ons basispakket. Extra's kun je tijdens het boeken toevoegen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Categories */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Onze prijscategorieën"
            subtitle="Eenvoudige indeling op basis van voertuigtype"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Klasse A */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-bariq-black-lighter p-8 rounded-2xl border-2 border-gray-800 hover:border-bariq-red transition-all"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-bariq-white mb-2">Klasse A</h3>
                <div className="text-5xl font-bold text-bariq-red mb-2">€90</div>
                <p className="text-sm text-bariq-grey">Basis pakket inbegrepen</p>
              </div>
              
              <div className="space-y-3 text-sm text-bariq-grey">
                <p className="font-semibold text-bariq-white mb-3">Voorbeelden:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    Audi A3, A4
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    VW Polo, Golf
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    Mercedes A-Klasse
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    BMW 3-Serie
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    Tesla Model 3
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Klasse B */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-bariq-black-lighter p-8 rounded-2xl border-2 border-bariq-red hover:shadow-red-glow transition-all"
            >
              <div className="text-center mb-6">
                <div className="inline-block bg-bariq-red text-bariq-black px-3 py-1 rounded-full text-xs font-semibold mb-3">
                  PREMIUM
                </div>
                <h3 className="text-2xl font-bold text-bariq-white mb-2">Klasse B</h3>
                <div className="text-5xl font-bold text-bariq-red mb-2">€120</div>
                <p className="text-sm text-bariq-grey">Basis pakket inbegrepen</p>
              </div>
              
              <div className="space-y-3 text-sm text-bariq-grey">
                <p className="font-semibold text-bariq-white mb-3">Voorbeelden:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    Mercedes S-Klasse, Audi A8
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    BMW X5, Range Rover
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    Tesla Model X
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    Dodge Ram, Ford Ranger
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-bariq-red rounded-full"></div>
                    VW Amarok, Transporter
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-8 text-center">
              Wat zit er in het basispakket?
            </h2>
            
            <div className="bg-bariq-black p-8 md:p-12 rounded-2xl border border-bariq-red">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-bariq-white">Professionele exterieur handwas</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-bariq-white">Wielen & velgen dieptereiniging</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-bariq-white">Interieur volledig stofzuigen</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-bariq-white">Dashboard & middenconsole reinigen</span>
                </div>
                <div className="flex items-start gap-3 md:col-span-2 justify-center">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-bariq-white">Ramen binnen & buiten kristalhelder</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-bariq-grey mb-6">
                Wil je extra's toevoegen zoals dieptereiniging van stoelen, hemel of plastic matteren?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/prijzen#extras"
                  className="inline-flex items-center justify-center px-6 py-3 bg-bariq-black-lighter text-bariq-white rounded-xl border border-gray-800 hover:border-bariq-red transition-all font-semibold"
                >
                  Bekijk Alle Extra's
                </a>
                <a 
                  href="/boeken"
                  className="inline-flex items-center justify-center px-6 py-3 bg-bariq-red text-bariq-white rounded-xl hover:bg-bariq-red-hover transition-all font-semibold"
                >
                  Boek Nu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KentekenCheckPage;
