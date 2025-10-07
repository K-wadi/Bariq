import React, { useState, useEffect } from 'react';
import { Clock, Users, Car, AlertCircle, MessageCircle, Check, Search, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';
import { nl } from 'date-fns/locale';
import { addBooking } from '../utils/adminData';
import { sendBookingConfirmationEmail, type BookingEmailData } from '../utils/emailService';
import { 
  fetchVehicleData, 
  calculatePricing, 
  formatVehicleInfo, 
  validateLicensePlate,
  formatLicensePlate,
  type RDWVehicleData 
} from '../utils/rdwApi';
import { 
  getAvailableTimeSlots, 
  isTimeSlotAvailable, 
  getDateStatistics,
  isDateUnavailable,
  getNextAvailableDate,
  type TimeSlot 
} from '../utils/timeSlotManager';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    carBrand: '',
    carModel: '',
    licensePlate: '',
    parkingType: 'outdoor',
    packageType: 'basic',
    date: getNextAvailableDate(),
    time: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [vehicleData, setVehicleData] = useState<RDWVehicleData | null>(null);
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);
  const [vehicleError, setVehicleError] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDateStats, setSelectedDateStats] = useState<any>(null);
  const [showMobileTimeSlots, setShowMobileTimeSlots] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string>('');

  // Update available time slots when date changes
  useEffect(() => {
    if (formData.date) {
      const dateString = formData.date.toISOString().split('T')[0];
      const slots = getAvailableTimeSlots(dateString);
      setAvailableTimeSlots(slots);
      setSelectedDateStats(getDateStatistics(dateString));
      
      // Clear selected time if it's no longer available
      if (formData.time && !slots.find(slot => slot.time === formData.time && slot.isAvailable)) {
        setFormData(prev => ({ ...prev, time: '' }));
      }
    }
  }, [formData.date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleLicensePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatLicensePlate(e.target.value);
    setFormData({ ...formData, licensePlate: formatted });
    
    // Clear errors and vehicle data when license plate changes
    if (errors.licensePlate) {
      setErrors({ ...errors, licensePlate: '' });
    }
    setVehicleData(null);
    setVehicleError('');
  };

  const handleLookupVehicle = async () => {
    if (!formData.licensePlate.trim()) {
      setVehicleError('Voer eerst een kenteken in.');
      return;
    }

    if (!validateLicensePlate(formData.licensePlate)) {
      setVehicleError('Voer een geldig Nederlands kenteken in.');
      return;
    }

    setIsLoadingVehicle(true);
    setVehicleError('');

    try {
      const data = await fetchVehicleData(formData.licensePlate);
      if (data) {
        setVehicleData(data);
        
        // Auto-fill vehicle brand and model
        setFormData({
          ...formData,
          carBrand: data.merk || '',
          carModel: data.handelsbenaming || data.type || '',
        });
      }
    } catch (error: any) {
      setVehicleError(error.message || 'Kon voertuiggegevens niet ophalen.');
    } finally {
      setIsLoadingVehicle(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({ ...formData, date });
      if (errors.date) {
        setErrors({ ...errors, date: '' });
      }
    }
  };

  const handleTimeSlotSelect = (time: string) => {
    const dateString = formData.date.toISOString().split('T')[0];
    
    if (isTimeSlotAvailable(dateString, time)) {
      setFormData({ ...formData, time });
      setShowMobileTimeSlots(false);
      
      if (errors.time) {
        setErrors({ ...errors, time: '' });
      }
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
    
    if (!formData.phone.trim()) newErrors.phone = 'Telefoonnummer is verplicht';
    if (!formData.address.trim()) newErrors.address = 'Adres is verplicht';
    if (!formData.city.trim()) newErrors.city = 'Stad is verplicht';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postcode is verplicht';
    if (!formData.carBrand.trim()) newErrors.carBrand = 'Automerk is verplicht';
    if (!formData.carModel.trim()) newErrors.carModel = 'Automodel is verplicht';
    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = 'Kenteken is verplicht';
    } else if (!validateLicensePlate(formData.licensePlate)) {
      newErrors.licensePlate = 'Kenteken formaat is ongeldig (bijv. AB-123-C)';
    }
    
    if (!formData.time) {
      newErrors.time = 'Tijd is verplicht';
    } else {
      // Check if selected time is still available
      const dateString = formData.date.toISOString().split('T')[0];
      if (!isTimeSlotAvailable(dateString, formData.time)) {
        newErrors.time = 'Deze tijd is niet meer beschikbaar. Kies een andere tijd.';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setEmailStatus('Boeking wordt verwerkt...');
      
      try {
        // Save booking to local storage
        const bookingData = {
          ...formData,
          date: formData.date.toISOString().split('T')[0],
          parkingType: formData.parkingType as 'outdoor' | 'indoor',
          packageType: formData.packageType as 'basic' | 'premium',
        };
        
        const newBooking = addBooking(bookingData);
        
        setEmailStatus('Bevestigingsmails worden verzonden...');
        
        // Prepare email data
        const emailData: BookingEmailData = {
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          customerCity: formData.city,
          customerPostalCode: formData.postalCode,
          carBrand: formData.carBrand,
          carModel: formData.carModel,
          licensePlate: formData.licensePlate,
          packageType: formData.packageType as 'basic' | 'premium',
          date: formData.date.toISOString().split('T')[0],
          time: formData.time,
          notes: formData.notes || undefined,
          bookingId: newBooking.id,
        };
        
        // Send confirmation emails
        const emailsSent = await sendBookingConfirmationEmail(emailData);
        
        if (emailsSent) {
          setEmailStatus('✅ Bevestigingsmails succesvol verzonden!');
        } else {
          setEmailStatus('⚠️ Boeking opgeslagen, maar er was een probleem met het verzenden van emails.');
        }
        
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          
          // Reset form after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
            setEmailStatus('');
            setFormData({
              name: '',
              email: '',
              phone: '',
              address: '',
              city: '',
              postalCode: '',
              carBrand: '',
              carModel: '',
              licensePlate: '',
              parkingType: 'outdoor',
              packageType: 'basic',
              date: getNextAvailableDate(),
              time: '',
              notes: '',
            });
            setVehicleData(null);
          }, 5000);
        }, 2000);
      } catch (error) {
        console.error('Error saving booking:', error);
        setIsSubmitting(false);
        setEmailStatus('❌ Er is een fout opgetreden. Probeer het opnieuw.');
      }
    }
  };

  // Calculate pricing if vehicle data is available
  const pricing = vehicleData ? {
    basic: calculatePricing(vehicleData, 'basic'),
    premium: calculatePricing(vehicleData, 'premium')
  } : null;

  if (isSubmitted) {
    return (
      <div className="bg-green-50 p-6 md:p-8 rounded-lg border border-green-200 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl md:text-2xl font-display font-semibold text-green-800 mb-2">Bedankt voor je boeking!</h3>
        <p className="text-green-700 mb-4">
          We hebben je aanvraag ontvangen en zullen zo snel mogelijk contact met je opnemen om je boeking te bevestigen.
          Je ontvangt ook een bevestigingsmail met alle details.
        </p>
        {emailStatus && (
          <div className="bg-white p-3 rounded-md mb-4 text-sm">
            <p className="text-charcoal-700">{emailStatus}</p>
          </div>
        )}
        <Button variant="primary" to="/">Terug naar Home</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-700">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-primary text-white p-4">
        <h2 className="text-xl font-display font-semibold text-center">Maak een afspraak</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-6 lg:p-8">
        {/* Desktop Header */}
        <h2 className="hidden md:block text-2xl font-display font-semibold mb-6 text-gray-200">Maak een afspraak</h2>
        
        {/* Email Status */}
        {emailStatus && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-md">
            <p className="text-red-300 text-sm">{emailStatus}</p>
          </div>
        )}
        
        {/* Personal Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-display font-semibold mb-4 flex items-center text-gray-200">
            <Users className="w-5 h-5 mr-2 text-primary-bright" />
            Persoonlijke gegevens
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label htmlFor="name" className="block text-charcoal-700 mb-1 font-medium">Naam</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base`}
                placeholder="Uw volledige naam"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-charcoal-700 mb-1 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base`}
                placeholder="uw.email@voorbeeld.nl"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-charcoal-700 mb-1 font-medium">Telefoonnummer</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base`}
                placeholder="06 1234 5678"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="address" className="block text-charcoal-700 mb-1 font-medium">Adres</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base`}
                placeholder="Straatnaam 123"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div>
              <label htmlFor="city" className="block text-charcoal-700 mb-1 font-medium">Stad</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base`}
                placeholder="Amsterdam"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            
            <div>
              <label htmlFor="postalCode" className="block text-charcoal-700 mb-1 font-medium">Postcode</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.postalCode ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base`}
                placeholder="1012 AB"
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-charcoal-200" />
        
        {/* Vehicle Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-display font-semibold mb-4 flex items-center text-charcoal-900">
            <Car className="w-5 h-5 mr-2 text-primary-500" />
            Voertuiginformatie
          </h3>
          
          <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4">
            <div>
              <label htmlFor="licensePlate" className="block text-charcoal-700 mb-1 font-medium">Kenteken</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleLicensePlateChange}
                  placeholder="AB-123-C"
                  className={`flex-1 p-3 border ${errors.licensePlate ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-charcoal-400 text-base uppercase`}
                  disabled={isLoadingVehicle}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLookupVehicle}
                  disabled={isLoadingVehicle}
                  icon={<Search size={16} />}
                  className="px-4 py-3"
                >
                  <span className="hidden sm:inline">{isLoadingVehicle ? 'Laden...' : 'Opzoeken'}</span>
                </Button>
              </div>
              {errors.licensePlate && <p className="text-red-500 text-sm mt-1">{errors.licensePlate}</p>}
              {vehicleError && <p className="text-red-500 text-sm mt-1">{vehicleError}</p>}
            </div>
            
            {vehicleData && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Voertuiggegevens gevonden</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-green-700 font-medium">Merk & Model:</span>
                    <p className="text-green-800">{formatVehicleInfo(vehicleData).displayName}</p>
                  </div>
                  {formatVehicleInfo(vehicleData).year && (
                    <div>
                      <span className="text-green-700 font-medium">Bouwjaar:</span>
                      <p className="text-green-800">{formatVehicleInfo(vehicleData).year}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-green-700 font-medium">Kleur:</span>
                    <p className="text-green-800 capitalize">{formatVehicleInfo(vehicleData).color.toLowerCase()}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="carBrand" className="block text-charcoal-700 mb-1 font-medium">Automerk</label>
                <input
                  type="text"
                  id="carBrand"
                  name="carBrand"
                  value={formData.carBrand}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.carBrand ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base`}
                  placeholder="BMW, Mercedes, etc."
                />
                {errors.carBrand && <p className="text-red-500 text-sm mt-1">{errors.carBrand}</p>}
              </div>
              
              <div>
                <label htmlFor="carModel" className="block text-charcoal-700 mb-1 font-medium">Automodel</label>
                <input
                  type="text"
                  id="carModel"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.carModel ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base`}
                  placeholder="3 Serie, C-Klasse, etc."
                />
                {errors.carModel && <p className="text-red-500 text-sm mt-1">{errors.carModel}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="parkingType" className="block text-charcoal-700 mb-1 font-medium">Parkeerlocatie</label>
              <select
                id="parkingType"
                name="parkingType"
                value={formData.parkingType}
                onChange={handleChange}
                className="w-full p-3 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
              >
                <option value="outdoor">Buiten (straat, oprit)</option>
                <option value="indoor">Binnen (garage)</option>
              </select>
            </div>
          </div>
        </div>
        
        <hr className="my-6 border-t border-charcoal-200" />
        
        {/* Service Details Section */}
        <div className="mb-6">
          <h3 className="text-lg font-display font-semibold mb-4 flex items-center text-charcoal-900">
            <Clock className="w-5 h-5 mr-2 text-primary-500" />
            Servicedetails
          </h3>
          
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div>
              <label htmlFor="packageType" className="block text-charcoal-700 mb-1 font-medium">Servicepakket</label>
              <select
                id="packageType"
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                className="w-full p-3 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
              >
                <option value="basic">
                  Basic Clean {pricing ? `(€${pricing.basic.finalPrice} incl. BTW)` : '(€79+ incl. BTW)'}
                </option>
                <option value="premium">
                  Premium Clean {pricing ? `(€${pricing.premium.finalPrice} incl. BTW)` : '(€149+ incl. BTW)'}
                </option>
              </select>
              <p className="text-charcoal-500 text-sm mt-1">
                {pricing 
                  ? 'Prijs gebaseerd op je voertuiggegevens' 
                  : 'Prijs kan variëren op basis van de staat van je auto'
                }
              </p>
            </div>
            
            <div>
              <label className="block text-charcoal-700 mb-1 font-medium">Datum</label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                minDate={new Date()}
                locale={nl}
                dateFormat="dd/MM/yyyy"
                filterDate={(date) => !isDateUnavailable(date)}
                className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base`}
                placeholderText="Selecteer een datum"
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              
              {selectedDateStats && (
                <div className="mt-2 text-sm text-charcoal-600">
                  <span className="inline-flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      selectedDateStats.availableSlots > 5 ? 'bg-green-500' : 
                      selectedDateStats.availableSlots > 2 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                    {selectedDateStats.availableSlots} van {selectedDateStats.totalSlots} tijdsloten beschikbaar
                  </span>
                </div>
              )}
            </div>
            
            {/* Time Slot Selection */}
            <div>
              <label className="block text-charcoal-700 mb-1 font-medium">Tijd</label>
              
              {/* Mobile Time Slot Button */}
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setShowMobileTimeSlots(true)}
                  className={`w-full p-3 border ${errors.time ? 'border-red-500' : 'border-charcoal-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base text-left flex justify-between items-center ${
                    formData.time ? 'text-charcoal-900' : 'text-charcoal-500'
                  }`}
                >
                  <span>{formData.time || 'Selecteer een tijd'}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Desktop Time Slot Grid */}
              <div className="hidden md:block">
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-64 overflow-y-auto mobile-scroll">
                  {availableTimeSlots.map((slot, index) => (
                    <motion.button
                      key={slot.time}
                      type="button"
                      onClick={() => handleTimeSlotSelect(slot.time)}
                      disabled={!slot.isAvailable}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                        formData.time === slot.time
                          ? 'bg-primary-500 text-white border-primary-500 shadow-lg transform scale-105'
                          : slot.isAvailable
                          ? 'bg-white text-charcoal-700 border-charcoal-300 hover:border-primary-500 hover:bg-primary-50 hover:shadow-md'
                          : 'bg-charcoal-100 text-charcoal-400 border-charcoal-200 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{slot.time}</span>
                        {!slot.isAvailable && (
                          <span className="text-xs mt-1 opacity-70">Bezet</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-charcoal-700 mb-1 font-medium">
                Opmerkingen (optioneel)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Speciale verzoeken, aanwijzingen, huisdieren, etc."
                className="w-full p-3 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-base resize-none"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-50 p-4 rounded-md mb-6 flex items-start">
          <AlertCircle className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-primary-800 text-sm">
            Na het indienen van je aanvraag zullen we binnen 24 uur contact met je opnemen om je boeking te bevestigen. 
            Je ontvangt ook direct een bevestigingsmail met alle details. Je kunt ook direct contact opnemen via WhatsApp voor snellere service.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            disabled={isSubmitting}
            className="text-base py-4"
          >
            {isSubmitting ? 'Bezig met verzenden...' : 'Reservering Plaatsen'}
          </Button>
          
          <Button
            href="https://wa.me/31685523584?text=Hallo,%20ik%20wil%20graag%20een%20afspraak%20maken%20voor%20een%20autopoetsbeurt."
            variant="outline"
            size="large"
            fullWidth
            icon={<MessageCircle size={18} />}
            className="text-base py-4"
          >
            Via WhatsApp
          </Button>
        </div>
      </form>

      {/* Mobile Time Slot Modal */}
      {showMobileTimeSlots && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:hidden">
          <motion.div 
            className="bg-white w-full rounded-t-lg max-h-[80vh] overflow-hidden no-bounce"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-charcoal-200 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-display font-semibold text-charcoal-900">Selecteer een tijd</h3>
              <button
                type="button"
                onClick={() => setShowMobileTimeSlots(false)}
                className="p-2 hover:bg-charcoal-100 rounded-md mobile-transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 mobile-scroll" style={{ maxHeight: 'calc(80vh - 80px)', overflowY: 'auto' }}>
              {selectedDateStats && (
                <div className="mb-4 text-sm text-charcoal-600 text-center">
                  <span className="inline-flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      selectedDateStats.availableSlots > 5 ? 'bg-green-500' : 
                      selectedDateStats.availableSlots > 2 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                    {selectedDateStats.availableSlots} van {selectedDateStats.totalSlots} tijdsloten beschikbaar
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                {availableTimeSlots.map((slot, index) => (
                  <motion.button
                    key={slot.time}
                    type="button"
                    onClick={() => handleTimeSlotSelect(slot.time)}
                    disabled={!slot.isAvailable}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg border text-base font-medium mobile-transition ${
                      formData.time === slot.time
                        ? 'bg-primary-500 text-white border-primary-500 shadow-lg'
                        : slot.isAvailable
                        ? 'bg-white text-charcoal-700 border-charcoal-300 hover:border-primary-500 hover:bg-primary-50 hover:shadow-md'
                        : 'bg-charcoal-100 text-charcoal-400 border-charcoal-200 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                    {!slot.isAvailable && (
                      <div className="text-xs mt-1 opacity-70">Bezet</div>
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Add some bottom padding for better scrolling */}
              <div className="h-4"></div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;