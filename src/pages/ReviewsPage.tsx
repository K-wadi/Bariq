import React, { useState } from 'react';
import { Star, ThumbsUp, Lock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

import SectionTitle from '../components/SectionTitle';
import ReviewCard from '../components/ReviewCard';
import Button from '../components/Button';
import { addReview, getReviews, getStatistics, getBookings } from '../utils/adminData';

const ReviewsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    carType: '',
    rating: 5,
    comment: '',
    bookingId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'email' | 'booking' | 'verified'>('email');
  const [customerBookings, setCustomerBookings] = useState<any[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  // Verify customer email and find their completed bookings
  const verifyCustomerEmail = () => {
    if (!formData.email.trim()) {
      setErrors({ email: 'Email is verplicht voor verificatie' });
      return;
    }

    const bookings = getBookings();
    const completedBookings = bookings.filter(
      (booking: any) => 
        booking.email.toLowerCase() === formData.email.toLowerCase() && 
        booking.status === 'completed'
    );

    if (completedBookings.length === 0) {
      setErrors({ 
        email: 'Geen voltooide services gevonden voor dit email adres. Alleen klanten die service hebben ontvangen kunnen reviews plaatsen.' 
      });
      return;
    }

    setCustomerBookings(completedBookings);
    setVerificationStep('booking');
    setErrors({});
  };

  // Verify booking selection
  const verifyBooking = () => {
    if (!formData.bookingId) {
      setErrors({ bookingId: 'Selecteer de service waarvoor je een review wilt schrijven' });
      return;
    }

    const selectedBooking = customerBookings.find(b => b.id === formData.bookingId);
    if (selectedBooking) {
      setFormData({
        ...formData,
        name: selectedBooking.name,
        carType: `${selectedBooking.carBrand} ${selectedBooking.carModel}`
      });
      setVerificationStep('verified');
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Naam is verplicht';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is verplicht';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is ongeldig';
    }
    
    if (!formData.comment.trim()) newErrors.comment = 'Review tekst is verplicht';
    if (!formData.bookingId) newErrors.bookingId = 'Boeking selectie is verplicht';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Save review to local storage
        addReview({
          name: formData.name,
          email: formData.email,
          carType: formData.carType || undefined,
          rating: formData.rating,
          comment: formData.comment,
          status: 'pending',
        });
        
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          
          // Reset form after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
            setShowForm(false);
            setVerificationStep('email');
            setFormData({
              name: '',
              email: '',
              carType: '',
              rating: 5,
              comment: '',
              bookingId: '',
            });
            setCustomerBookings([]);
          }, 5000);
        }, 1500);
      } catch (error) {
        console.error('Error saving review:', error);
        setIsSubmitting(false);
      }
    }
  };

  // Get approved reviews from local storage
  const allReviews = getReviews();
  const approvedReviews = allReviews.filter(review => review.status === 'approved');
  
  // Get statistics
  const stats = getStatistics();

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-charcoal-50 to-primary-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Klantervaringen
          </motion.h1>
          <motion.p 
            className="text-xl text-charcoal-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Zie wat onze klanten over ons zeggen
          </motion.p>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {approvedReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {approvedReviews.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  name={review.name}
                  date={new Date(review.createdAt).toLocaleDateString('nl-NL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  rating={review.rating}
                  comment={review.comment}
                  carType={review.carType}
                  delay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-charcoal-600 text-lg">
                Er zijn nog geen goedgekeurde reviews. Wees de eerste om een review achter te laten!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Review Form - Restricted Access */}
      <section className="py-16 md:py-24 bg-charcoal-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle 
            title="Deel Je Ervaring"
            subtitle="Alleen klanten die service hebben ontvangen kunnen reviews plaatsen"
          />
          
          <div className="max-w-2xl mx-auto">
            {!showForm ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <Shield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold mb-4 text-charcoal-900">
                  Verifiëerde Reviews Alleen
                </h3>
                <p className="text-charcoal-600 mb-6">
                  Om de kwaliteit van onze reviews te waarborgen, kunnen alleen klanten die daadwerkelijk 
                  service van ons hebben ontvangen een review plaatsen. Dit zorgt voor eerlijke en betrouwbare feedback.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <Lock className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Vereisten voor Review</span>
                  </div>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Je moet een voltooide service hebben gehad</li>
                    <li>• Verificatie via email adres gebruikt bij boeking</li>
                    <li>• Selectie van specifieke service voor review</li>
                  </ul>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  variant="primary"
                  size="large"
                  className="w-full md:w-auto"
                >
                  Ik ben een Klant - Schrijf Review
                </Button>
              </div>
            ) : !isSubmitted ? (
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                {/* Step 1: Email Verification */}
                {verificationStep === 'email' && (
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-4 text-charcoal-900">
                      Stap 1: Verifieer je Email
                    </h3>
                    <p className="text-charcoal-600 mb-4">
                      Voer het email adres in dat je hebt gebruikt bij het boeken van je service.
                    </p>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-charcoal-700 mb-1 font-medium">
                        Email Adres
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                          errors.email ? 'border-red-500' : 'border-charcoal-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        placeholder="uw.email@voorbeeld.nl"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={verifyCustomerEmail}
                        variant="primary"
                        size="large"
                      >
                        Verifieer Email
                      </Button>
                      <Button
                        onClick={() => setShowForm(false)}
                        variant="outline"
                        size="large"
                      >
                        Annuleren
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Booking Selection */}
                {verificationStep === 'booking' && (
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-4 text-charcoal-900">
                      Stap 2: Selecteer je Service
                    </h3>
                    <p className="text-charcoal-600 mb-4">
                      We hebben {customerBookings.length} voltooide service(s) gevonden. 
                      Selecteer de service waarvoor je een review wilt schrijven.
                    </p>
                    <div className="mb-4">
                      <label htmlFor="bookingId" className="block text-charcoal-700 mb-1 font-medium">
                        Selecteer Service
                      </label>
                      <select
                        id="bookingId"
                        name="bookingId"
                        value={formData.bookingId}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                          errors.bookingId ? 'border-red-500' : 'border-charcoal-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      >
                        <option value="">Selecteer een service...</option>
                        {customerBookings.map((booking) => (
                          <option key={booking.id} value={booking.id}>
                            {new Date(booking.date).toLocaleDateString('nl-NL')} - {booking.packageType} - {booking.carBrand} {booking.carModel}
                          </option>
                        ))}
                      </select>
                      {errors.bookingId && <p className="text-red-500 text-sm mt-1">{errors.bookingId}</p>}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={verifyBooking}
                        variant="primary"
                        size="large"
                      >
                        Bevestig Selectie
                      </Button>
                      <Button
                        onClick={() => setVerificationStep('email')}
                        variant="outline"
                        size="large"
                      >
                        Terug
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review Form */}
                {verificationStep === 'verified' && (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-display font-semibold mb-4 text-charcoal-900">
                      Stap 3: Schrijf je Review
                    </h3>
                    
                    <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">Geverifieerde Klant</span>
                      </div>
                      <p className="text-green-700 text-sm">
                        Je bent succesvol geverifieerd als klant. Je review zal worden gemarkeerd als "Geverifieerde Aankoop".
                      </p>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="rating" className="block text-charcoal-700 mb-2 font-medium">
                        Jouw waardering
                      </label>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className="p-1 focus:outline-none"
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= formData.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-charcoal-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-charcoal-700 mb-1 font-medium">
                          Naam (automatisch ingevuld)
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          readOnly
                          className="w-full p-3 border border-charcoal-300 rounded-md bg-charcoal-50 text-charcoal-600"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="carType" className="block text-charcoal-700 mb-1 font-medium">
                          Auto (automatisch ingevuld)
                        </label>
                        <input
                          type="text"
                          id="carType"
                          name="carType"
                          value={formData.carType}
                          readOnly
                          className="w-full p-3 border border-charcoal-300 rounded-md bg-charcoal-50 text-charcoal-600"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="comment" className="block text-charcoal-700 mb-1 font-medium">
                          Jouw review
                        </label>
                        <textarea
                          id="comment"
                          name="comment"
                          value={formData.comment}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full p-3 border ${
                            errors.comment ? 'border-red-500' : 'border-charcoal-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                          placeholder="Beschrijf je ervaring met onze service..."
                        ></textarea>
                        {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Bezig met verzenden...' : 'Plaats Review'}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setVerificationStep('email');
                          setFormData({
                            name: '',
                            email: '',
                            carType: '',
                            rating: 5,
                            comment: '',
                            bookingId: '',
                          });
                        }}
                        variant="outline"
                        size="large"
                      >
                        Annuleren
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <motion.div 
                className="bg-green-50 p-8 rounded-lg border border-green-200 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-green-800 mb-2">
                  Bedankt voor je geverifieerde review!
                </h3>
                <p className="text-green-700 mb-4">
                  Je feedback is succesvol verzonden en zal spoedig worden gepubliceerd na moderatie. 
                  Als geverifieerde klant krijgt je review extra zichtbaarheid.
                </p>
                <Button variant="primary" to="/">
                  Terug naar Home
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section - Changed background to #119EF3 */}
      <section className="py-16 md:py-24 text-white" style={{ backgroundColor: '#119EF3' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <p className="text-lg text-white/80">Klanttevredenheid</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stats.carsWashed}+</div>
              <p className="text-lg text-white/80">Auto's gereinigd</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stats.averageRating || 4.9}</div>
              <p className="text-lg text-white/80">Gemiddelde beoordeling</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewsPage;