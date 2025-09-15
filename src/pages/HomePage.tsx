import { ArrowRight, Clock, Award, Droplet, Car, Calendar, MessageCircle, MapPin, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import LicensePlateInput from '../components/LicensePlateInput';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ReviewCard from '../components/ReviewCard';
import PackageCard from '../components/PackageCard';
import DynamicPricingBanner from '../components/DynamicPricingBanner';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { heroAnimations, scrollAnimations, cardAnimations, floatingAnimations } from '../utils/animationUtils';

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
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-charcoal-50 to-primary-50 overflow-hidden">
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
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 mb-4"
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
                className="text-xl md:text-2xl text-charcoal-700 mb-6"
                variants={heroAnimations.subtitle}
              >
                Geen wachttijden, geen gedoe – Bariq komt naar jou toe.
              </motion.p>
              
              {/* Dynamic Urgency Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <DynamicPricingBanner variant="hero" />
              </motion.div>
              
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
                  Boek Nu - €79 incl. BTW
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
              
              {/* Live Stats */}
              <div className="flex items-center space-x-4 mt-4 text-sm text-charcoal-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-green-500" />
                  <span>Vandaag al 12 auto's geboekt</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-orange-500" />
                  <span>⏰ Nog 4 plekken deze week</span>
                </div>
              </div>
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
      <section className="py-16 md:py-24 bg-white">
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

      {/* Packages Preview */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-charcoal-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Onze Pakketten"
            subtitle="Kies het pakket dat bij jouw auto past"
          />
          
          {/* Social Proof */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-800 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-2" />
              78% van klanten kiest Premium pakket
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={cardAnimations.container}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Basic Clean */}
            <PackageCard
              title="Basic Clean"
              price="€79"
              oldPrice="€89"
              description="Perfecte optie voor regelmatig onderhoud en een frisse uitstraling."
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
                "Geuren verwijderen"
              ]}
              actionLabel="BOEK BASIC - €79"
              urgency="Prijs stijgt naar €89"
              delay={0.1}
            />
            
            {/* Premium Clean */}
            <PackageCard
              title="Premium Clean"
              price="€149"
              oldPrice="€199"
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
              actionLabel="KIES PREMIUM - €149"
              savings="BESPAAR €50 NU!"
              delay={0.2}
            />

            {/* Deluxe Clean */}
            <PackageCard
              title="Deluxe Clean"
              price="€329"
              oldPrice="€379"
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
              actionLabel="UPGRADE NAAR DELUXE - €329"
              badge="LUXURY EDITION"
              delay={0.3}
            />
          </motion.div>
          
          {/* Customer Journey Message */}
          <div className="mt-12 text-center">
            <div className="bg-yellow-50 p-6 rounded-lg max-w-2xl mx-auto border border-yellow-200">
              <p className="text-yellow-800 font-medium mb-2">
                💡 Slim kiezen bespaart geld
              </p>
              <p className="text-yellow-700 text-sm">
                De meeste klanten upgraden van Basic naar Premium na hun eerste ervaring. 
                Kies direct Premium en bespaar een tweede rit.
              </p>
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

      {/* License Plate Check - Changed background to #119EF3 */}
      <section id="license-check" className="py-16 md:py-24" style={{ backgroundColor: '#119EF3' }}>
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Prijs Check via Kenteken"
            subtitle="Voer je kenteken in voor een nauwkeurige prijsindicatie op basis van je voertuiggegevens"
            alignment="center"
            className="text-white"
            titleSize="large"
          />
          
          <div className="max-w-4xl mx-auto">
            <LicensePlateInput />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-white/80 text-sm">
              Prijzen zijn gebaseerd op voertuigtype, grootte en leeftijd volgens RDW-gegevens
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Resultaten die Spreken"
            subtitle="Bekijk enkele van onze recente transformaties"
          />
          
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-charcoal-50">
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

      {/* CTA Section - Changed background to #119EF3 */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#119EF3' }}>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Klaar om je auto te laten stralen zonder je huis te verlaten?
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Boek vandaag nog en ervaar het verschil van een premium autopoetsservice aan huis. 
            Prijzen stijgen volgende week!
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
  className="bg-[#119EF3] text-primary-600 hover:bg-gray-100"
>
  KIES PREMIUM - €149 incl. BTW
</Button>
            <Button 
              href="https://wa.me/31685523584?text=Hallo,%20ik%20wil%20graag%20een%20afspraak%20maken%20voor%20een%20autopoetsbeurt."
              variant="outline" 
              size="large"
              className="text-white border-white hover:bg-white/10"
              icon={<MessageCircle size={20} />}
            >
              WhatsApp Contact
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

export default HomePage;