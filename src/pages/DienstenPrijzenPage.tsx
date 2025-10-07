import { Link } from 'react-router-dom';
import { Car, Droplet, Sparkles, Wind, Euro, Check, Info, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import FAQ from '../components/FAQ';

const DienstenPrijzenPage: React.FC = () => {
  const baseDiensten = [
    {
      icon: <Car className="w-8 h-8" />,
      title: 'Exterieur handwas',
      description: 'Lakvriendelijke handmatige wassing met PH-neutrale shampoo. Streeploos, glanzend resultaat.'
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

  const basePakketFeatures = [
    'Professionele exterieur handwas (PH-neutraal)',
    'Wielen & velgen dieptereiniging',
    'Interieur volledig stofzuigen',
    'Dashboard & middenconsole reinigen',
    'Ramen binnen & buiten kristalhelder'
  ];

  const faqItems = [
    {
      question: 'Hoelang duurt een complete handwas?',
      answer: 'Meestal 60–90 minuten, afhankelijk van voertuiggrootte en gekozen extra\'s.'
    },
    {
      question: 'Reinigen jullie ook leer?',
      answer: 'Ja, stoelen worden per materiaal behandeld; leer wordt gereinigd en gevoed.'
    },
    {
      question: 'Kan ik op locatie boeken?',
      answer: 'Ja, in overleg binnen onze servicegebieden.'
    },
    {
      question: 'Welke betaalmethoden?',
      answer: 'Pin en contant.'
    },
    {
      question: 'Zijn de prijzen vast?',
      answer: 'De basisprijs koppelen we aan RDW-gegevens (type/grootte/leeftijd). Extra\'s zijn optioneel.'
    }
  ];

  return (
    <>
      <SEO
        title="Diensten & Prijzen – Handwas & Interieurreiniging"
        description="Exterieur handwas, wielen/velgen, stofzuigen, dashboard/console, ramen. Heldere tarieven vanaf €90."
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-bariq-white mb-4 md:mb-6">
              Diensten & Prijzen
            </h1>
            <p className="text-lg md:text-xl text-bariq-grey mb-6 md:mb-8">
              Elk detail telt. Transparante prijzen op basis van voertuigklasse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Basis Pakket Diensten */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Basis – Handwas & Interieur"
            subtitle="Inbegrepen in elke afspraak"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-8 md:mb-12">
            {baseDiensten.map((dienst, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-bariq-black p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-800 hover:border-bariq-red transition-all"
              >
                <div className="text-bariq-red mb-3 md:mb-4">
                  {dienst.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-bariq-white mb-2">
                  {dienst.title}
                </h3>
                <p className="text-sm md:text-base text-bariq-grey">
                  {dienst.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Prijzen per Voertuigklasse"
            subtitle="Gebaseerd op voertuigtype, grootte en leeftijd volgens RDW"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-12 md:mb-16">
            {/* Klasse A */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-bariq-black-lighter p-6 md:p-8 lg:p-10 rounded-2xl border-2 border-gray-800 hover:border-bariq-red transition-all"
            >
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-bariq-white mb-3 md:mb-4">Klasse A</h3>
                <div className="text-5xl md:text-6xl font-bold text-bariq-red mb-3 md:mb-4">€90</div>
                <p className="text-sm md:text-base text-bariq-grey">Compact & Midsize voertuigen</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <p className="font-semibold text-bariq-white mb-4">Voorbeelden:</p>
                <ul className="space-y-2 text-bariq-grey">
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

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-bariq-white mb-4">Basispakket inbegrepen:</p>
                {basePakketFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-bariq-red flex-shrink-0 mt-0.5" />
                    <span className="text-bariq-grey">{feature}</span>
                  </div>
                ))}
              </div>

              <Button to="/kenteken-check" variant="outline" size="large" className="w-full">
                Check Kenteken
              </Button>
            </motion.div>

            {/* Klasse B */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-bariq-black-lighter p-8 md:p-10 rounded-2xl border-2 border-bariq-red hover:shadow-red-glow transition-all relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-bariq-red text-bariq-white px-4 py-1 rounded-full text-sm font-semibold">
                  PREMIUM
                </div>
              </div>

              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-bariq-white mb-3 md:mb-4">Klasse B</h3>
                <div className="text-5xl md:text-6xl font-bold text-bariq-red mb-3 md:mb-4">€120</div>
                <p className="text-sm md:text-base text-bariq-grey">Premium & Large voertuigen</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <p className="font-semibold text-bariq-white mb-4">Voorbeelden:</p>
                <ul className="space-y-2 text-bariq-grey">
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

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-bariq-white mb-4">Basispakket inbegrepen:</p>
                {basePakketFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-bariq-red flex-shrink-0 mt-0.5" />
                    <span className="text-bariq-grey">{feature}</span>
                  </div>
                ))}
              </div>

              <Button to="/kenteken-check" variant="primary" size="large" className="w-full">
                Check Kenteken
              </Button>
            </motion.div>
          </div>

          {/* Info Box */}
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-bariq-black-lighter p-5 md:p-6 rounded-xl md:rounded-2xl border border-bariq-red flex flex-col sm:flex-row items-start gap-3 md:gap-4">
              <Info className="w-6 h-6 text-bariq-red flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-bariq-white font-semibold mb-2 text-sm md:text-base">
                  Niet zeker welke klasse?
                </p>
                <p className="text-bariq-grey text-sm md:text-base">
                  Gebruik onze{' '}
                  <Link to="/kenteken-check" className="text-bariq-red hover:text-bariq-red-hover font-semibold">
                    kenteken-check
                  </Link>
                  {' '}voor een directe prijsindicatie op basis van RDW-gegevens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intensive Care Extra's */}
      <section id="extras" className="py-12 md:py-16 lg:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Intensive-care extra's"
            subtitle="Optionele upgrades voor dieptereiniging"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {extraDiensten.map((extra, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-bariq-black p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-800 hover:border-bariq-red transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                  <h3 className="text-base md:text-lg font-semibold text-bariq-white flex-1">
                    {extra.name}
                  </h3>
                  <span className="text-xl md:text-2xl font-bold text-bariq-red whitespace-nowrap">
                    {extra.price}
                  </span>
                </div>
                <p className="text-bariq-grey text-sm">
                  {extra.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <p className="text-bariq-grey mb-4 md:mb-6 text-sm md:text-base">
              Extra's kunnen tijdens het boeken worden toegevoegd
            </p>
            <Button to="/boeken" variant="primary" size="large" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="w-full sm:w-auto">
              Boek Nu
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Veelgestelde Vragen"
            subtitle="Alles wat je moet weten over onze diensten en prijzen"
          />
          <div className="max-w-3xl mx-auto">
            <FAQ items={faqItems} includeSchema={true} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-bariq-white mb-4 md:mb-6">
            Klaar om te boeken?
          </h2>
          <p className="text-base md:text-lg text-bariq-grey mb-6 md:mb-8 max-w-2xl mx-auto">
            Check eerst je kenteken voor een nauwkeurige prijsindicatie
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button to="/kenteken-check" variant="primary" size="large" className="w-full sm:w-auto">
              Check Kenteken
            </Button>
            <Button to="/boeken" variant="outline" size="large" className="w-full sm:w-auto">
              Direct Boeken
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DienstenPrijzenPage;
