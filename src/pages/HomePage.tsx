import { ArrowRight, Clock, Award, Droplet, Car, Calendar, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import LicensePlateInput from '../components/LicensePlateInput';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ReviewCard from '../components/ReviewCard';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { heroAnimations, cardAnimations } from '../utils/animationUtils';

const HomePage: React.FC = () => {
  // Enhanced smooth scroll to license plate section
  const scrollToLicenseCheck = () => {
    const element = document.getElementById('license-check');
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-black overflow-hidden">
        {/* Animated Background */}
        <BackgroundAnimation variant="hero" particleCount={80} />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            variants={heroAnimations.container}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="flex-1"
              variants={heroAnimations.container}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-200 mb-4"
                variants={heroAnimations.title}
              >
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  De premium carwash
                </motion.span>{' '}
                <motion.span
                  className="inline-block bg-gradient-to-r from-primary-bright to-primary-clean bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  aan huis
                </motion.span>
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  , wanneer het jou uitkomt.
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-400 mb-6"
                variants={heroAnimations.subtitle}
              >
                Geen wachttijden, geen gedoe – Bariq komt naar jou toe.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={heroAnimations.cta}
              >
                <Button 
                  to="/boeken" 
                  variant="primary" 
                  size="large"
                  icon={<Calendar size={20} />}
                >
                  Boek Nu - Vanaf €90
                </Button>
                <Button 
                  onClick={scrollToLicenseCheck}
                  variant="outline" 
                  size="large"
                  icon={<Car size={20} />}
                >
                  Prijs via kenteken
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/6873086/pexels-photo-6873086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Bariq Autocare service" 
                className="rounded-lg shadow-xl w-full h-auto object-cover aspect-video"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Waarom Bariq Autocare?"
            subtitle="Professionele service op jouw locatie, op jouw tijdstip"
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={cardAnimations.container}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Flexibele Planning"
              description="Wij passen ons aan jouw schema aan. Boek op elk moment dat jou uitkomt."
              delay={0.1}
            />
            <FeatureCard
              icon={<MapPin className="w-6 h-6" />}
              title="Service Aan Huis"
              description="Geen ritje naar de wasstraat. Wij komen naar jouw locatie, waar dan ook in Nederland."
              delay={0.2}
            />
            <FeatureCard
              icon={<Award className="w-6 h-6" />}
              title="Premium Kwaliteit"
              description="Professionele reiniging met hoogwaardige producten voor langdurig resultaat."
              delay={0.3}
            />
            <FeatureCard
              icon={<Droplet className="w-6 h-6" />}
              title="Milieuvriendelijk"
              description="We gebruiken efficiënte technieken en ecologisch verantwoorde reinigingsmiddelen."
              delay={0.4}
            />
          </motion.div>
        </div>
      </section>

      {/* Simple Pricing Flow */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Hoe werkt het?"
            subtitle="Simpel, snel en transparant"
          />
          
          {/* Step-by-step Process */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="text-center">
                <div className="bg-primary-bright text-gray-900 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
                <p className="text-gray-300 font-semibold">Wat is je auto?</p>
                <p className="text-gray-400 text-sm mt-1">Kenteken check</p>
              </div>
              <div className="hidden md:block text-center text-gray-600">→</div>
              <div className="text-center">
                <div className="bg-primary-bright text-gray-900 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
                <p className="text-gray-300 font-semibold">Kies je categorie</p>
                <p className="text-gray-400 text-sm mt-1">€90 of €120</p>
              </div>
              <div className="hidden md:block text-center text-gray-600">→</div>
              <div className="text-center">
                <div className="bg-primary-bright text-gray-900 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
                <p className="text-gray-300 font-semibold">Selecteer extra's</p>
                <p className="text-gray-400 text-sm mt-1">Optioneel</p>
              </div>
              <div className="hidden md:block text-center text-gray-600">→</div>
              <div className="text-center">
                <div className="bg-primary-bright text-gray-900 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">4</div>
                <p className="text-gray-300 font-semibold">Boek direct</p>
                <p className="text-gray-400 text-sm mt-1">Totaalprijs</p>
              </div>
            </div>
          </div>

          {/* Vehicle Categories Info */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold text-gray-200 mb-8">Stap 2: Kies je categorie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-900 p-8 rounded-lg border-2 border-gray-700 hover:border-primary-bright transition-all">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold text-gray-200 mb-2">Compact & Midsize</h4>
                  <div className="text-5xl font-bold text-primary-bright mb-2">€90</div>
                  <p className="text-sm text-gray-400">Essential Pakket inbegrepen</p>
                </div>
                <div className="text-xs text-gray-400 space-y-2 text-left">
                  <p className="font-medium text-gray-300 mb-3">Voorbeelden:</p>
                  <p>• Audi A3, A4</p>
                  <p>• VW Polo, Golf</p>
                  <p>• Mercedes A-Klasse</p>
                  <p>• BMW 3-Serie</p>
                  <p>• Tesla Model 3</p>
                </div>
              </div>
              <div className="bg-gray-900 p-8 rounded-lg border-2 border-primary-bright shadow-lg">
                <div className="text-center mb-4">
                  <div className="inline-block bg-primary-bright text-gray-900 px-3 py-1 rounded-full text-xs font-semibold mb-3">PREMIUM</div>
                  <h4 className="text-2xl font-bold text-gray-200 mb-2">Premium & Large</h4>
                  <div className="text-5xl font-bold text-primary-bright mb-2">€120</div>
                  <p className="text-sm text-gray-400">Essential Pakket inbegrepen</p>
                </div>
                <div className="text-xs text-gray-400 space-y-2 text-left">
                  <p className="font-medium text-gray-300 mb-3">Voorbeelden:</p>
                  <p>• Mercedes S-Klasse, Audi A8</p>
                  <p>• BMW X5, Range Rover</p>
                  <p>• Tesla Model X</p>
                  <p>• Dodge Ram, Ford Ranger</p>
                  <p>• VW Amarok, Transporter</p>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={cardAnimations.container}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Essential Pakket */}
            <div className="md:col-span-3">
              <div className="bg-gray-900 p-8 rounded-lg border border-primary-bright shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-block bg-primary-bright text-gray-900 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                    INBEGREPEN IN STARTPRIJS
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-200 mb-2">Essential Pakket</h3>
                  <p className="text-gray-400">Perfect voor regulier onderhoud - jouw auto weer fris</p>
                  <div className="mt-4 flex items-center justify-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Compact & Midsize</p>
                      <p className="text-2xl font-bold text-primary-bright">€90</p>
                    </div>
                    <div className="text-gray-600">|</div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Premium & Large</p>
                      <p className="text-2xl font-bold text-primary-bright">€120</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-bright rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">Professionele exterieur handwas</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-bright rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">Wielen & velgen dieptereiniging</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-bright rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">Interieur volledige stofzuiging</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-bright rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">Dashboard & middenconsole reiniging</span>
                  </div>
                  <div className="flex items-start md:col-span-2 justify-center">
                    <div className="w-2 h-2 bg-primary-bright rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">Ramen binnen & buiten kristalhelder</span>
                  </div>
                </div>
                <div className="text-center">
                  <Button 
                    to="/boeken" 
                    variant="primary" 
                    size="large"
                    icon={<Calendar size={20} />}
                  >
                    Boek Nu - Vanaf €90
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Add-ons Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-200 mb-2">Stap 3: Selecteer je extra's</h3>
              <p className="text-gray-400">Optioneel - upgrade je pakket met intensive care services</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary-bright transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Dieptereiniging mattenset</h4>
                <p className="text-3xl font-bold text-primary-bright mb-3">€20</p>
                <p className="text-gray-400 text-sm">Grondige reiniging van alle automatten. Vuil, zand en vlekken worden verwijderd zodat ze weer fris en schoon ogen.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary-bright transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Dieptereiniging stoelen</h4>
                <p className="text-3xl font-bold text-primary-bright mb-3">€100</p>
                <p className="text-gray-400 text-sm">Intensieve reiniging van alle stoelen. Stof wordt diep schoongemaakt of leer wordt gereinigd en verzorgd, voor een frisse look en hygiëne.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary-bright transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Dieptereiniging hemelbekleding</h4>
                <p className="text-3xl font-bold text-primary-bright mb-3">€50</p>
                <p className="text-gray-400 text-sm">Reinigen van de binnenkant van het dak (hemel). Vlekken en vetsporen worden verwijderd, zodat de bekleding weer licht en schoon is.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary-bright transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Dieptereiniging vloerbekleding</h4>
                <p className="text-3xl font-bold text-primary-bright mb-3">€50</p>
                <p className="text-gray-400 text-sm">Diep reinigen van de volledige vloerbekleding. Verwijdert ingelopen vuil, vlekken, voor een frisse basis in de auto.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary-bright transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Dieptereiniging kofferbakbekleding</h4>
                <p className="text-3xl font-bold text-primary-bright mb-3">€25</p>
                <p className="text-gray-400 text-sm">Grondige schoonmaak van de bekleding in de kofferbak. Ideaal tegen vlekken.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary-bright transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Plastic matteren</h4>
                <p className="text-3xl font-bold text-primary-bright mb-3">€50</p>
                <p className="text-gray-400 text-sm">Binnenpanelen en kunststofdelen worden schoongemaakt en behandeld, zodat ze hun originele, matte uitstraling terugkrijgen (niet vet of glanzend).
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary-bright transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Geurverwijdering Professional</h4>
                <p className="text-3xl font-bold text-primary-bright mb-3">€30</p>
                <p className="text-gray-400 text-sm">Behandeling van (rook, huisdieren, vocht en andere geuren) Je auto ruikt weer fris vanbinnen.</p>
              </motion.div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              to="/pakketten" 
              variant="text" 
              icon={<ArrowRight size={16} />} 
              iconPosition="right"
            >
              Bekijk alle pakketten en abonnementen
            </Button>
          </div>
        </div>
      </section>

      {/* License Plate Check */}
      <section id="license-check" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Prijs Check via Kenteken"
            subtitle="Voer je kenteken in voor een nauwkeurige prijsindicatie op basis van je voertuiggegevens"
            alignment="center"
            className="text-gray-200"
            titleSize="large"
          />
          
          <div className="max-w-4xl mx-auto">
            <LicensePlateInput />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Prijzen zijn gebaseerd op voertuigtype, grootte en leeftijd volgens RDW-gegevens
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Resultaten die Spreken"
            subtitle="Bekijk enkele van onze recente transformaties"
          />
          
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Wat Klanten Zeggen"
            subtitle="Honderden tevreden klanten door heel Nederland"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ReviewCard
              name="Sander de Vries"
              date="15 mei 2025"
              rating={5}
              comment="Uitstekende service! Mijn auto ziet eruit als nieuw. Ik was verbaasd over hoeveel vuil ze uit mijn interieur hebben gekregen."
              carType="BMW X5"
              delay={0.1}
            />
            <ReviewCard
              name="Emma Jansen"
              date="2 april 2025"
              rating={5}
              comment="Super tevreden met het resultaat. Zo fijn dat ze aan huis komen, scheelt enorm veel tijd. Zeker een aanrader!"
              carType="Audi A3"
              delay={0.2}
            />
            <ReviewCard
              name="Bram Vermeulen"
              date="18 maart 2025"
              rating={4}
              comment="Goede service, al had de buitenkant van de auto nog wat watervlekken. Wel zeer vriendelijke en professionele medewerkers."
              carType="Volvo XC60"
              delay={0.3}
            />
          </div>
          
          <div className="text-center mt-12">
            <Button to="/reviews" variant="outline">
              Bekijk Alle Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold text-gray-200 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Klaar om je auto te laten stralen zonder je huis te verlaten?
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Boek vandaag nog en ervaar het verschil van een premium autopoetsservice aan huis.
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
  icon={<Calendar size={20} />}
              className="bg-gray-800 text-gray-200 border-2 border-gray-700 hover:bg-gray-700"
>
  BOEK NU - Vanaf €90
</Button>
            <Button 
              href="https://wa.me/31685523584?text=Hallo,%20ik%20wil%20graag%20een%20afspraak%20maken%20voor%20een%20autopoetsbeurt."
              variant="outline" 
              size="large"
              className="text-gray-200 border-gray-700 hover:bg-gray-800"
              icon={<MessageCircle size={20} />}
            >
              WhatsApp Contact
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;