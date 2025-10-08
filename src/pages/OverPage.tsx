import { Award, Heart, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Button from '../components/Button';

const OverPage: React.FC = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Vakmanschap',
      description: 'Handwas met PH-neutrale shampoo. We behandelen elke auto met de zorg en aandacht die het verdient. Geen shortcuts, alleen topkwaliteit.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passie',
      description: 'Autodetailing is onze passie. We houden van wat we doen en dat zie je terug in elk detail.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Transparantie',
      description: 'Heldere prijzen, duidelijke communicatie en eerlijke adviezen. Wat je ziet is wat je krijgt.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Service',
      description: 'Jouw tevredenheid staat voorop. We komen naar jou toe, op jouw tijdstip, zonder gedoe.'
    }
  ];

  return (
    <>
      <SEO
        title="Over Bariq Autocare – Vakmanschap & zorg"
        description="Amsterdamse autodetailer met focus op kwaliteit, transparantie en service."
        canonical="https://bariqautocare.nl/over"
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-bariq-white mb-4 md:mb-6">
              Over Bariq Autocare
            </h1>
            <p className="text-lg md:text-xl text-bariq-grey mb-6 md:mb-8">
              Vakmanschap & zorg voor jouw auto
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-bariq-black p-6 md:p-8 lg:p-12 rounded-xl md:rounded-2xl border border-gray-800"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-bariq-white mb-4 md:mb-6">
                Wij combineren vakmanschap met oog voor detail
              </h2>
              <div className="space-y-3 md:space-y-4 text-bariq-grey text-base md:text-lg leading-relaxed">
                <p>
                  Bariq Autocare is opgericht vanuit een passie voor auto's en een drive om 
                  de beste service te leveren. We geloven dat elke auto het verdient om er op 
                  z'n best uit te zien, zonder dat het uren van je tijd kost.
                </p>
                <p>
                  Daarom komen we naar jou toe. Of je nu thuis bent, op kantoor, of ergens anders 
                  – wij zorgen ervoor dat jouw auto weer glanst, terwijl jij doorgaat met waar je 
                  mee bezig was.
                </p>
                <p>
                  Wat ons onderscheidt? <span className="text-bariq-white font-semibold">Eerlijke prijzen, 
                  heldere communicatie en topresultaat</span> – elke keer weer. Geen verborgen kosten, 
                  geen verrassingen. Gewoon vakwerk waar je op kunt rekenen.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-bariq-white mb-8 md:mb-12 text-center">
              Waar wij voor staan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-bariq-black-lighter p-6 md:p-8 rounded-xl md:rounded-2xl border border-gray-800 hover:border-bariq-red transition-all"
                >
                  <div className="text-bariq-red mb-3 md:mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-bariq-white mb-2 md:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-bariq-grey text-sm md:text-base">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 lg:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-bariq-white mb-6 md:mb-8 text-center">
              Waarom Bariq kiezen?
            </h2>
            
            <div className="bg-bariq-black p-6 md:p-8 lg:p-12 rounded-xl md:rounded-2xl border border-gray-800">
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm md:text-base">
                    <span className="text-bariq-white font-semibold">Premium kwaliteit:</span>
                    <span className="text-bariq-grey"> We gebruiken alleen de beste producten en technieken voor langdurig resultaat</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm md:text-base">
                    <span className="text-bariq-white font-semibold">Service op locatie:</span>
                    <span className="text-bariq-grey"> Bespaar tijd – wij komen naar jou, waar en wanneer het uitkomt</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm md:text-base">
                    <span className="text-bariq-white font-semibold">Transparante prijzen:</span>
                    <span className="text-bariq-grey"> Geen verrassingen, directe prijsindicatie via kenteken-check</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm md:text-base">
                    <span className="text-bariq-white font-semibold">Flexibele planning:</span>
                    <span className="text-bariq-grey"> Beschikbaar di-zo van 8:00-20:00, eenvoudig online boeken</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 bg-bariq-red rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm md:text-base">
                    <span className="text-bariq-white font-semibold">Lokaal & betrouwbaar:</span>
                    <span className="text-bariq-grey"> Gevestigd in Amsterdam, honderden tevreden klanten</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-bariq-white mb-4 md:mb-6">
            Klaar om kennis te maken?
          </h2>
          <p className="text-base md:text-lg text-bariq-grey mb-6 md:mb-8 max-w-2xl mx-auto">
            Ontdek onze diensten of plan direct een afspraak
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button to="/diensten" variant="outline" size="large" className="w-full sm:w-auto">
              Bekijk Diensten & Prijzen
            </Button>
            <Button to="/booking-system" variant="primary" size="large" className="w-full sm:w-auto">
              Boek Nu
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default OverPage;
