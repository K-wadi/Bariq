import { Link } from 'react-router-dom';
import { Car, Droplet, Sparkles, Wind, Euro, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

const DienstenPage: React.FC = () => {
  const baseDiensten = [
    {
      icon: <Car className="w-8 h-8" />,
      title: 'Exterieur handwas',
      description: 'Lakvriendelijke handmatige wassing met premium producten. Streeploos, glanzend resultaat.'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Velgen/wielen diep reinigen',
      description: 'Grondige reiniging van wielen en velgen, verwijdering van remstof en vuil.'
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: 'Interieur stofzuigen',
      description: 'Volledig stofzuigen van stoelen, vloeren, dashboard en alle hoekjes.'
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: 'Dashboard & console reinigen',
      description: 'Reiniging en verzorging van dashboard, middenconsole en alle interieurdelen.'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Glas binnen/buiten',
      description: 'Kristalheldere ramen, binnen en buiten, voor optimaal zicht.'
    }
  ];

  const extraDiensten = [
    {
      name: 'Dieptereiniging mattenset',
      price: '€20',
      description: 'Grondige reiniging van alle automatten. Vuil, zand en vlekken worden verwijderd.'
    },
    {
      name: 'Dieptereiniging stoelen',
      price: '€100',
      description: 'Intensieve reiniging van alle stoelen. Stof of leer wordt gereinigd en verzorgd.'
    },
    {
      name: 'Dieptereiniging hemelbekleding',
      price: '€50',
      description: 'Reinigen van de binnenkant van het dak. Vlekken en vetsporen worden verwijderd.'
    },
    {
      name: 'Dieptereiniging vloerbekleding',
      price: '€50',
      description: 'Diep reinigen van de volledige vloerbekleding. Verwijdert ingelopen vuil en vlekken.'
    },
    {
      name: 'Dieptereiniging kofferbakbekleding',
      price: '€25',
      description: 'Grondige schoonmaak van de bekleding in de kofferbak.'
    },
    {
      name: 'Plastic matteren',
      price: '€50',
      description: 'Binnenpanelen krijgen hun originele, matte uitstraling terug (niet vet of glanzend).'
    },
    {
      name: 'Geurverwijdering Professional',
      price: '€30',
      description: 'Behandeling tegen rook, huisdieren, vocht en andere geuren. Auto ruikt weer fris.'
    }
  ];

  return (
    <>
      <SEO
        title="Autowassen & Interieurreiniging – Diensten"
        description="Exterieur handwas, wielen/velgen, stofzuigen, dashboard/console, ramen. Optionele dieptereiniging & geurverwijdering."
        canonical="https://bariqautocare.nl/diensten"
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
              Diensten & Opties
            </h1>
            <p className="text-xl text-bariq-grey mb-8">
              Elk detail telt. Kies je basispakket en upgrade met intensive-care services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Basis Pakket */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Basis – Handwas & Interieur"
            subtitle="Inbegrepen in elke afspraak"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {baseDiensten.map((dienst, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-bariq-black p-6 rounded-2xl border border-gray-800 hover:border-bariq-red transition-all"
              >
                <div className="text-bariq-red mb-4">
                  {dienst.icon}
                </div>
                <h3 className="text-xl font-semibold text-bariq-white mb-2">
                  {dienst.title}
                </h3>
                <p className="text-bariq-grey">
                  {dienst.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 p-6 bg-bariq-black rounded-2xl max-w-4xl mx-auto border border-bariq-red">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Euro className="w-6 h-6 text-bariq-red" />
              <h3 className="text-2xl font-bold text-bariq-white">Vanaf €90 voor Klasse A · €120 voor Klasse B</h3>
            </div>
            <p className="text-bariq-grey mb-4">
              Alle bovenstaande diensten inbegrepen
            </p>
            <Link to="/prijzen" className="text-bariq-red hover:text-bariq-red-hover font-semibold inline-flex items-center gap-2">
              Bekijk prijzen per voertuigklasse
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Intensive Care Extra's */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Intensive-care extra's"
            subtitle="Optionele upgrades voor dieptereiniging"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {extraDiensten.map((extra, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-bariq-black-lighter p-6 rounded-2xl border border-gray-800 hover:border-bariq-red transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-bariq-white">
                    {extra.name}
                  </h3>
                  <span className="text-2xl font-bold text-bariq-red">
                    {extra.price}
                  </span>
                </div>
                <p className="text-bariq-grey text-sm">
                  {extra.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-6">
            Klaar om je auto te laten stralen?
          </h2>
          <p className="text-lg text-bariq-grey mb-8 max-w-2xl mx-auto">
            Bekijk onze prijzen of plan direct een afspraak
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/prijzen" variant="primary" size="large">
              Bekijk Prijzen
            </Button>
            <Button to="/booking-system" variant="outline" size="large">
              Boek Nu
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DienstenPage;
