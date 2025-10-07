import { MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Button from '../components/Button';

const ServicegebiedPage: React.FC = () => {
  const wijken = [
    'Amsterdam Centrum',
    'Amsterdam Zuid',
    'Amsterdam Oost',
    'Amsterdam West',
    'Amsterdam Noord',
    'Amsterdam Nieuw-West',
    'Amsterdam Zuidoost',
    'Amstelveen',
    'Diemen',
    'Zaandam',
    'Uithoorn',
    'Ouderkerk aan de Amstel',
    'Duivendrecht'
  ];

  return (
    <>
      <SEO
        title="Servicegebied Amsterdam & omgeving"
        description="We komen in Amsterdam en omliggende wijken. Snel, professioneel en op locatie mogelijk."
        canonical="https://bariqautocare.nl/servicegebied/amsterdam"
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
              <MapPin className="w-5 h-5 text-bariq-red" />
              <span className="text-bariq-white font-semibold">Service op Locatie</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-bariq-white mb-6">
              Servicegebied: Amsterdam & omgeving
            </h1>
            <p className="text-xl text-bariq-grey mb-8">
              We rijden in heel Amsterdam en directe omgeving
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-bariq-black p-8 md:p-12 rounded-2xl border border-gray-800">
              <h2 className="text-3xl font-display font-bold text-bariq-white mb-8 text-center">
                Wij bedienen de volgende gebieden
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wijken.map((wijk, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-bariq-black-lighter rounded-xl border border-gray-800 hover:border-bariq-red transition-all"
                  >
                    <CheckCircle className="w-5 h-5 text-bariq-red flex-shrink-0" />
                    <span className="text-bariq-white">{wijk}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-bariq-black-lighter rounded-xl border border-bariq-red">
                <p className="text-bariq-grey text-center">
                  <span className="text-bariq-white font-semibold">Staat jouw locatie er niet bij?</span> 
                  {' '}Geen probleem! Neem contact met ons op via WhatsApp of telefoon. 
                  We kijken graag of we ook naar jouw locatie kunnen komen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-bariq-white mb-8 text-center">
              Ons werkgebied
            </h2>
            <div className="bg-bariq-black-lighter rounded-2xl border border-gray-800 overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-bariq-red mx-auto mb-4" />
                  <p className="text-bariq-white text-lg font-semibold mb-2">
                    Amsterdam en directe omgeving
                  </p>
                  <p className="text-bariq-grey">
                    Service op locatie in heel de regio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-6">
            Boek in jouw wijk
          </h2>
          <p className="text-lg text-bariq-grey mb-8 max-w-2xl mx-auto">
            We komen naar jouw locatie. Thuis, op kantoor, of waar het jou uitkomt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/boeken" variant="primary" size="large">
              Boek Nu
            </Button>
            <Button 
              href="https://wa.me/31685523584?text=Hallo,%20ik%20wil%20graag%20weten%20of%20jullie%20naar%20mijn%20locatie%20kunnen%20komen"
              variant="outline" 
              size="large"
            >
              WhatsApp Contact
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicegebiedPage;
