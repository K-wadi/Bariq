import { ArrowRight, Clock, Award, Car, Calendar, MessageCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import LicensePlateInput from '../components/LicensePlateInput';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ReviewCard from '../components/ReviewCard';

const HomePage: React.FC = () => {
  const scrollToLicenseCheck = () => {
    const element = document.getElementById('license-check');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const extraServices = [
    { name: 'Matten', price: '€20' },
    { name: 'Stoelen', price: '€100' },
    { name: 'Hemel', price: '€50' },
    { name: 'Vloer', price: '€50' },
    { name: 'Kofferbak', price: '€25' },
    { name: 'Plastic matteren', price: '€50' },
    { name: 'Geurverwijdering Pro', price: '€30' }
  ];

  return (
    <>
      <SEO
        title="Bariq Autocare – Premium handwas & interieurreiniging Amsterdam"
        description="Professionele handwas, velgen, interieur & glas. Boek 8:00–20:00 (di–zo). Prijs op kenteken-check. Bel/WhatsApp 06 8552 3584."
        canonical="https://bariqautocare.nl/"
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-bariq-black overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial opacity-50"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-bariq-white mb-6">
              Premium autowas & interieurreiniging in Amsterdam
            </h1>
            
            <p className="text-xl md:text-2xl text-bariq-grey mb-8">
              Handwas door professionals. Transparante prijzen. Snel te boeken.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                to="/boeken" 
                variant="primary" 
                size="large"
                icon={<Calendar size={20} />}
              >
                Boek Nu
              </Button>
              <Button 
                onClick={scrollToLicenseCheck}
                variant="outline" 
                size="large"
                icon={<Car size={20} />}
              >
                Check Kenteken
              </Button>
              <Button 
                href="https://wa.me/31685523584?text=Hallo,%20ik%20wil%20graag%20een%20afspraak%20maken"
                variant="outline" 
                size="large"
                icon={<MessageCircle size={20} />}
              >
                WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waarom Bariq */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Waarom Bariq"
            subtitle="Wat ons onderscheidt"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Echte handwas"
              description="Handwas met PH-neutrale shampoo. Veilig voor lak, streeploos resultaat. Geen automatische wasstraat maar vakmanschap."
              delay={0.1}
            />
            <FeatureCard
              icon={<Car className="w-8 h-8" />}
              title="Transparante prijzen"
              description="Op basis van kenteken/voertuigklasse. Geen verrassingen, altijd duidelijk."
              delay={0.2}
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Flexibel plannen"
              description="Dinsdag t/m zondag, 8:00–20:00. Boek online wanneer het jou uitkomt."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Basispakket */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Inbegrepen Basispakket"
            subtitle="Perfect voor regulier onderhoud – jouw auto weer fris"
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-bariq-black-lighter p-6 md:p-8 lg:p-12 rounded-2xl border-2 border-bariq-red">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-bariq-white mb-1">
                      Professionele exterieur handwas
                    </h3>
                    <p className="text-bariq-grey text-sm">Lakvriendelijk en streeploos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-bariq-white mb-1">
                      Wielen & velgen dieptereiniging
                    </h3>
                    <p className="text-bariq-grey text-sm">Verwijdering van remstof en vuil</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-bariq-white mb-1">
                      Interieur volledig stofzuigen
                    </h3>
                    <p className="text-bariq-grey text-sm">Stoelen, vloeren en alle hoekjes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-bariq-white mb-1">
                      Dashboard & middenconsole reinigen
                    </h3>
                    <p className="text-bariq-grey text-sm">Reiniging en verzorging van alle delen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-bariq-white mb-1">
                      Ramen binnen & buiten kristalhelder
                    </h3>
                    <p className="text-bariq-grey text-sm">Voor optimaal zicht</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
                  <div>
                    <p className="text-bariq-grey text-sm mb-1">Klasse A</p>
                    <p className="text-2xl sm:text-3xl font-bold text-bariq-red">€90</p>
                  </div>
                  <div className="text-bariq-grey hidden sm:block">|</div>
                  <div>
                    <p className="text-bariq-grey text-sm mb-1">Klasse B</p>
                    <p className="text-2xl sm:text-3xl font-bold text-bariq-red">€120</p>
                  </div>
                </div>
                <Button to="/diensten" variant="primary" size="large" className="w-full sm:w-auto">
                  Bekijk Alle Prijzen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extra's */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Extra's"
            subtitle="Upgrade je pakket met intensive-care services"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4 max-w-6xl mx-auto mb-8">
            {extraServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-bariq-black p-4 md:p-5 rounded-xl border border-gray-800 hover:border-bariq-red transition-all text-center"
              >
                <p className="text-bariq-white font-semibold text-sm md:text-base mb-1">{service.name}</p>
                <p className="text-bariq-red font-bold text-lg">{service.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/diensten#extras"
              className="inline-flex items-center gap-2 text-bariq-red hover:text-bariq-red-hover font-semibold"
            >
              Bekijk alle extra's
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Beschikbaarheid */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-bariq-white mb-6">
              Beschikbaarheid
            </h2>
            <div className="bg-bariq-black-lighter p-6 md:p-8 rounded-2xl border border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 bg-bariq-black rounded-xl">
                  <p className="text-bariq-grey mb-2 text-sm md:text-base">Maandag</p>
                  <p className="text-lg md:text-xl font-semibold text-red-500">Niet beschikbaar</p>
                </div>
                <div className="p-4 bg-bariq-black rounded-xl">
                  <p className="text-bariq-grey mb-2 text-sm md:text-base">Dinsdag – Zondag</p>
                  <p className="text-lg md:text-xl font-semibold text-bariq-white">8:00 – 20:00</p>
                </div>
              </div>
              <p className="text-bariq-grey text-sm mt-6">
                Regio: Amsterdam en omgeving
              </p>
              <div className="mt-6">
                <Button to="/boeken" variant="primary" size="large" className="w-full sm:w-auto">
                  Boek Nu via Calendly
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License Plate Check */}
      <section id="license-check" className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Prijs Check via Kenteken"
            subtitle="Voer je kenteken in voor een nauwkeurige prijsindicatie op basis van je voertuiggegevens"
          />
          
          <div className="max-w-4xl mx-auto">
            <LicensePlateInput />
            
            <div className="mt-6 text-center">
              <p className="text-bariq-grey text-sm">
                Gegevens via RDW · Prijzen gebaseerd op voertuigtype, grootte en leeftijd
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Resultaten die Spreken"
            subtitle="Bekijk enkele van onze recente transformaties"
          />
          
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Wat Klanten Zeggen"
            subtitle="Sterke reviews – bekijk onze ervaringen"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <ReviewCard
              name="Sander de Vries"
              date="15 mei 2024"
              rating={5}
              comment="Uitstekende service! Mijn auto ziet eruit als nieuw. Ik was verbaasd over hoeveel vuil ze uit mijn interieur hebben gekregen."
              carType="BMW X5"
              delay={0.1}
            />
            <ReviewCard
              name="Emma Jansen"
              date="2 april 2024"
              rating={5}
              comment="Super tevreden met het resultaat. Zo fijn dat ze aan huis komen, scheelt enorm veel tijd. Zeker een aanrader!"
              carType="Audi A3"
              delay={0.2}
            />
            <ReviewCard
              name="Bram Vermeulen"
              date="18 maart 2024"
              rating={5}
              comment="Professionele aanpak en perfect resultaat. De auto glanst weer als nieuw."
              carType="Volvo XC60"
              delay={0.3}
            />
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <Button 
              href="https://g.page/r/CWIdr67jKTkcEAI"
              variant="outline"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Bekijk Alle Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-bariq-white mb-4 md:mb-6 max-w-3xl mx-auto">
            Klaar om je auto te laten stralen zonder je huis te verlaten?
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-bariq-grey mb-6 md:mb-8 max-w-2xl mx-auto">
            Boek vandaag nog en ervaar het verschil van een premium autopoetsservice aan huis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              to="/boeken" 
              variant="primary" 
              size="large"
              icon={<Calendar size={20} />}
            >
              Boek Nu - Vanaf €90
            </Button>
            <Button 
              href="https://wa.me/31685523584?text=Hallo,%20ik%20wil%20graag%20een%20afspraak%20maken"
              variant="outline" 
              size="large"
              icon={<MessageCircle size={20} />}
            >
              WhatsApp Contact
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;