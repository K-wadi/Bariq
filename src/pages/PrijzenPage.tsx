import { Check, Info, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import FAQ from "../components/FAQ";

const PrijzenPage: React.FC = () => {
  const extraServices = [
    {
      name: "Dieptereiniging mattenset",
      price: "€20",
      description: "Grondige reiniging van alle automatten",
    },
    {
      name: "Dieptereiniging stoelen",
      price: "€100",
      description: "Intensieve reiniging stof of leer + verzorging",
    },
    {
      name: "Dieptereiniging hemelbekleding",
      price: "€50",
      description: "Reinigen binnenkant dak, verwijderen vlekken",
    },
    {
      name: "Dieptereiniging vloerbekleding",
      price: "€50",
      description: "Diep reinigen volledige vloerbekleding",
    },
    {
      name: "Dieptereiniging kofferbak",
      price: "€25",
      description: "Grondige schoonmaak kofferbakbekleding",
    },
    {
      name: "Plastic matteren",
      price: "€50",
      description: "Originele matte uitstraling (niet vet/glans)",
    },
    {
      name: "Geurverwijdering Professional",
      price: "€30",
      description: "Behandeling rook, huisdier, vocht",
    },
  ];

  const basePakketFeatures = [
    "Professionele exterieur handwas",
    "Wielen & velgen dieptereiniging",
    "Interieur volledig stofzuigen",
    "Dashboard & middenconsole reinigen",
    "Ramen binnen & buiten kristalhelder",
  ];

  const faqItems = [
    {
      question: "Hoelang duurt een complete handwas?",
      answer:
        "Meestal 60–90 minuten, afhankelijk van voertuiggrootte en gekozen extra's.",
    },
    {
      question: "Reinigen jullie ook leer?",
      answer:
        "Ja, stoelen worden per materiaal behandeld; leer wordt gereinigd en gevoed.",
    },
    {
      question: "Kan ik op locatie boeken?",
      answer: "Ja, in overleg binnen onze servicegebieden.",
    },
    {
      question: "Welke betaalmethoden?",
      answer: "Pin en contant.",
    },
    {
      question: "Zijn de prijzen vast?",
      answer:
        "De basisprijs koppelen we aan RDW-gegevens (type/grootte/leeftijd). Extra's zijn optioneel.",
    },
  ];

  return (
    <>
      <SEO
        title="Prijzen & extra's – Handwas & Interieur"
        description="Heldere tarieven vanaf €90. Bekijk klassen en upgrade-opties zoals stoelen-, vloer- en hemelreiniging."
        canonical="https://bariqautocare.nl/prijzen"
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
              Prijzen & Voertuigklassen
            </h1>
            <p className="text-xl text-bariq-grey mb-8">
              Prijzen zijn gebaseerd op voertuigtype, grootte en leeftijd
              volgens RDW-gegevens
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Klasse A */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-bariq-black p-8 md:p-10 rounded-2xl border-2 border-gray-800 hover:border-bariq-red transition-all"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-bariq-white mb-4">
                  Klasse A
                </h3>
                <div className="text-6xl font-bold text-bariq-red mb-4">
                  €90
                </div>
                <p className="text-bariq-grey">Compact & Midsize voertuigen</p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-bariq-white mb-4">
                  Voorbeelden:
                </p>
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
                <p className="font-semibold text-bariq-white mb-4">
                  Basispakket inbegrepen:
                </p>
                {basePakketFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-bariq-red flex-shrink-0 mt-0.5" />
                    <span className="text-bariq-grey">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                to="/kenteken-check"
                variant="outline"
                size="large"
                className="w-full"
              >
                Check Kenteken
              </Button>
            </motion.div>

            {/* Klasse B */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-bariq-black p-8 md:p-10 rounded-2xl border-2 border-bariq-red hover:shadow-red-glow transition-all relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-bariq-red text-bariq-white px-4 py-1 rounded-full text-sm font-semibold">
                  PREMIUM
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-bariq-white mb-4">
                  Klasse B
                </h3>
                <div className="text-6xl font-bold text-bariq-red mb-4">
                  €120
                </div>
                <p className="text-bariq-grey">Premium & Large voertuigen</p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-bariq-white mb-4">
                  Voorbeelden:
                </p>
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
                <p className="font-semibold text-bariq-white mb-4">
                  Basispakket inbegrepen:
                </p>
                {basePakketFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-bariq-red flex-shrink-0 mt-0.5" />
                    <span className="text-bariq-grey">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                to="/kenteken-check"
                variant="primary"
                size="large"
                className="w-full"
              >
                Check Kenteken
              </Button>
            </motion.div>
          </div>

          {/* Info Box */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-bariq-black p-6 rounded-2xl border border-bariq-red flex items-start gap-4">
              <Info className="w-6 h-6 text-bariq-red flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-bariq-white font-semibold mb-2">
                  Niet zeker welke klasse?
                </p>
                <p className="text-bariq-grey">
                  Gebruik onze{" "}
                  <Link
                    to="/kenteken-check"
                    className="text-bariq-red hover:text-bariq-red-hover font-semibold"
                  >
                    kenteken-check
                  </Link>{" "}
                  voor een directe prijsindicatie op basis van RDW-gegevens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Services */}
      <section id="extras" className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Optionele Extra's"
            subtitle="Upgrade je pakket met intensive-care services"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {extraServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-bariq-black-lighter p-6 rounded-2xl border border-gray-800 hover:border-bariq-red transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-bariq-white flex-1">
                    {service.name}
                  </h3>
                  <span className="text-2xl font-bold text-bariq-red ml-4">
                    {service.price}
                  </span>
                </div>
                <p className="text-bariq-grey text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-bariq-grey mb-6">
              Extra's kunnen tijdens het boeken worden toegevoegd
            </p>
            <Button
              to="/booking-system"
              variant="primary"
              size="large"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Boek Nu
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Veelgestelde Vragen"
            subtitle="Alles wat je moet weten over onze prijzen"
          />
          <FAQ items={faqItems} includeSchema={true} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-6">
            Klaar om te boeken?
          </h2>
          <p className="text-lg text-bariq-grey mb-8 max-w-2xl mx-auto">
            Check eerst je kenteken voor een nauwkeurige prijsindicatie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/kenteken-check" variant="primary" size="large">
              Check Kenteken
            </Button>
            <Button to="/booking-system" variant="outline" size="large">
              Direct Boeken
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrijzenPage;
