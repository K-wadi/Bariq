import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Button from '../components/Button';
import ReviewCard from '../components/ReviewCard';

const ReviewsPage: React.FC = () => {
  // Sample reviews
  const reviews = [
    {
      name: 'Sander de Vries',
      date: '15 mei 2024',
      rating: 5,
      comment: 'Uitstekende service! Mijn auto ziet eruit als nieuw. Ik was verbaasd over hoeveel vuil ze uit mijn interieur hebben gekregen.',
      carType: 'BMW X5'
    },
    {
      name: 'Emma Jansen',
      date: '2 april 2024',
      rating: 5,
      comment: 'Super tevreden met het resultaat. Zo fijn dat ze aan huis komen, scheelt enorm veel tijd. Zeker een aanrader!',
      carType: 'Audi A3'
    },
    {
      name: 'Bram Vermeulen',
      date: '18 maart 2024',
      rating: 5,
      comment: 'Professionele aanpak en perfect resultaat. De auto glanst weer als nieuw.',
      carType: 'Mercedes C-Klasse'
    },
    {
      name: 'Lisa van Dam',
      date: '5 maart 2024',
      rating: 5,
      comment: 'Zeer vriendelijk personeel en uitstekend werk. Mijn Tesla ziet er weer prachtig uit!',
      carType: 'Tesla Model 3'
    },
    {
      name: 'Tom Hendriks',
      date: '22 februari 2024',
      rating: 4,
      comment: 'Goede service en netjes werk. Kleine watervlekken hier en daar, maar overall zeer tevreden.',
      carType: 'Volkswagen Golf'
    },
    {
      name: 'Sophie Peters',
      date: '10 februari 2024',
      rating: 5,
      comment: 'Fantastisch! De auto is volledig getransformeerd. Aanrader voor iedereen!',
      carType: 'Range Rover'
    }
  ];

  return (
    <>
      <SEO
        title="Klantreviews – Bariq Autocare"
        description="Lees echte ervaringen en beoordeel ons. Jouw auto in vakkundige handen."
        canonical="https://bariqautocare.nl/reviews"
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
              Klantreviews
            </h1>
            <p className="text-xl text-bariq-grey mb-8">
              Jouw mening telt. Lees wat onze klanten zeggen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="py-12 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-bariq-black p-8 md:p-12 rounded-2xl border-2 border-bariq-red">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-4">
                Bekijk onze Google Reviews
              </h2>
              <p className="text-lg text-bariq-grey mb-8">
                Zie wat onze klanten zeggen op Google
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="https://g.page/r/CWIdr67jKTkcEAE/review"
                  variant="primary"
                  size="large"
                  icon={<Star className="w-5 h-5" />}
                >
                  Schrijf een Review
                </Button>
                <Button
                  href="https://g.page/r/CWIdr67jKTkcEAI"
                  variant="outline"
                  size="large"
                  icon={<ExternalLink className="w-5 h-5" />}
                >
                  Meer Reviews Bekijken
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 md:py-24 bg-bariq-black">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-12 text-center">
            Recente Ervaringen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                date={review.date}
                rating={review.rating}
                comment={review.comment}
                carType={review.carType}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-bariq-black-lighter">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-bariq-white mb-6">
            Klaar voor jouw ervaring?
          </h2>
          <p className="text-lg text-bariq-grey mb-8 max-w-2xl mx-auto">
            Word onderdeel van onze tevreden klanten
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/boeken" variant="primary" size="large">
              Boek Nu
            </Button>
            <Button to="/diensten" variant="outline" size="large">
              Bekijk Diensten & Prijzen
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewsPage;