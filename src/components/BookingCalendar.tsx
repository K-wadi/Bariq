import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, Car, ChevronLeft, AlertCircle, Plus, Minus, Check } from 'lucide-react';
import { supabase, type Service } from '../lib/supabase';

interface BookingCalendarProps {
  onBookingComplete?: (booking: any) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ onBookingComplete }) => {
  const [selectedVehicleClass, setSelectedVehicleClass] = useState<'klein' | 'groot' | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Service[]>([]);
  const [addonsCompleted, setAddonsCompleted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    licensePlate: ''
  });
  const [mainServices, setMainServices] = useState<Service[]>([]);
  const [addonServices, setAddonServices] = useState<Service[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [showLicensePlateCheck, setShowLicensePlateCheck] = useState(false);
  const [licensePlateInput, setLicensePlateInput] = useState('');
  const [checkingPlate, setCheckingPlate] = useState(false);

  // Bariq brand styling - matching website
  const containerClass = `
    min-h-screen bg-bariq-black
    text-white px-4 py-6 md:px-6 md:py-10 lg:px-8 font-sans
  `;

  const cardClass = `
    bg-bariq-black-lighter border border-gray-800
    rounded-2xl p-6 md:p-8 lg:p-10
    shadow-lg transition-all duration-300
  `;

  const buttonPrimaryClass = `
    bg-bariq-red hover:bg-bariq-red-hover
    text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-300
    shadow-lg hover:shadow-xl
    transform hover:scale-[1.02] active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    text-base md:text-lg
  `;

  const inputClass = `
    w-full bg-bariq-black border border-gray-800 rounded-lg
    px-4 py-3 md:py-3.5 text-white text-base
    placeholder-bariq-grey focus:border-bariq-red focus:ring-2 focus:ring-bariq-red/20
    transition-all duration-300 outline-none hover:border-gray-700
  `;

  // Laad services bij component mount
  useEffect(() => {
    loadServices();
  }, []);

  // Laad beschikbare slots wanneer datum geselecteerd is
  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('price', { ascending: true });
    
    if (!error && data) {
      const main = data.filter(s => !s.is_addon);
      const addons = data.filter(s => s.is_addon);
      setMainServices(main);
      setAddonServices(addons);
    } else {
      setError('Kon services niet laden. Controleer je database configuratie.');
    }
  };

  const loadAvailableSlots = async (date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // 🔍 Haal alle bevestigde boekingen op voor deze datum
    const { data: existingBookings } = await supabase
      .from('bookings')
      .select('start_time, end_time, customer_name')
      .gte('start_time', startOfDay.toISOString())
      .lte('start_time', endOfDay.toISOString())
      .neq('status', 'cancelled')
      .order('start_time', { ascending: true });

    const slots: string[] = [];
    const dayOfWeek = date.getDay();
    
    // Skip maandag (1)
    if (dayOfWeek === 1) {
      setAvailableSlots([]);
      return;
    }

    // Genereer slots van 8:00 tot 20:00 (elk uur)
    for (let hour = 8; hour < 20; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      
      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + 120); // 2 uur per slot (minimale duur)

      // ✅ Check overlap met bestaande boekingen
      const isAvailable = !existingBookings?.some((booking: any) => {
        const bookingStart = new Date(booking.start_time);
        const bookingEnd = new Date(booking.end_time);
        
        // Overlap check: als er enige overlap is, is de slot niet beschikbaar
        return (
          (slotStart >= bookingStart && slotStart < bookingEnd) ||
          (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
          (slotStart <= bookingStart && slotEnd >= bookingEnd)
        );
      });

      if (isAvailable) {
        slots.push(timeString);
      }
    }

    setAvailableSlots(slots);
  };

  const handleBooking = async () => {
    if (!selectedVehicleClass || !selectedDate || !selectedTime || !customerInfo.name || !customerInfo.email) {
      setError('Vul alle verplichte velden in');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      setError('Vul een geldig e-mailadres in');
      return;
    }

    setLoading(true);
    setError('');
    
    const mainService = mainServices.find(s => s.category === selectedVehicleClass);
    if (!mainService) {
      setError('Service niet gevonden');
      setLoading(false);
      return;
    }

    const startTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    startTime.setHours(parseInt(hours), parseInt(minutes || '0'));
    
    const totalDuration = mainService.duration + selectedAddons.reduce((sum, addon) => sum + addon.duration, 0);
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + totalDuration);

    // 🔒 SMART CHECK: Voorkom dubbele afspraken (race condition protection)
    const { data: conflictingBookings } = await supabase
      .from('bookings')
      .select('id, start_time, end_time, customer_name')
      .neq('status', 'cancelled')
      .or(`and(start_time.lte.${endTime.toISOString()},end_time.gte.${startTime.toISOString()})`);

    if (conflictingBookings && conflictingBookings.length > 0) {
      setError('⚠️ Sorry! Dit tijdslot is net geboekt door iemand anders. Kies een ander tijdslot.');
      setLoading(false);
      // Herlaad beschikbare slots
      loadAvailableSlots(selectedDate);
      return;
    }

    const totalPrice = getTotalPrice();

    const { data, error: bookingError } = await supabase
      .from('bookings')
      .insert([{
        service_id: mainService.id,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone || null,
        license_plate: customerInfo.licensePlate || null,
        vehicle_type: selectedVehicleClass,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        total_price: totalPrice,
        addons: selectedAddons.map(a => ({ id: a.id, name: a.name, price: a.price })),
        status: 'confirmed'
      }])
      .select();

    if (bookingError) {
      console.error('Booking error:', bookingError);
      
      // Check of het een unique constraint error is (dubbele boeking)
      if (bookingError.message?.includes('duplicate') || bookingError.code === '23505') {
        setError('⚠️ Dit tijdslot is al bezet. Kies alstublieft een ander tijdslot.');
        // Herlaad beschikbare slots
        loadAvailableSlots(selectedDate);
      } else {
        setError('Er ging iets mis bij het maken van de boeking. Probeer het opnieuw.');
      }
      
      setLoading(false);
      return;
    }

    // Verstuur emails naar klant en admin
    try {
      await sendBookingEmails({
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        licensePlate: customerInfo.licensePlate,
        serviceName: mainService.name,
        vehicleClass: selectedVehicleClass,
        addons: selectedAddons,
        startTime: startTime.toISOString(),
        totalPrice: totalPrice,
        duration: totalDuration
      });
    } catch (e) {
      console.error('Email verzenden mislukt:', e);
      // Booking is al gemaakt, dus we tonen geen error aan de gebruiker
    }
    
    // 🎉 Boeking succesvol!
    setSuccess(true);
    setLoading(false);
    
    if (onBookingComplete && data) {
      onBookingComplete(data[0]);
    }
  };

  const sendBookingEmails = async (bookingData: any) => {
    try {
      const response = await fetch('/.netlify/functions/send-booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Email verzenden mislukt');
      }

      console.log('Emails succesvol verzonden:', result);
      return result;
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  };

  const resetBooking = () => {
    setSelectedVehicleClass(null);
    setSelectedAddons([]);
    setAddonsCompleted(false);
    setSelectedDate(null);
    setSelectedTime('');
    setCustomerInfo({ name: '', email: '', phone: '', licensePlate: '' });
    setSuccess(false);
    setError('');
  };

  const toggleAddon = (addon: Service) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const getTotalPrice = () => {
    const mainService = mainServices.find(s => s.category === selectedVehicleClass);
    const basePrice = mainService?.price || 0;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return basePrice + addonsPrice;
  };

  const getMainService = () => {
    return mainServices.find(s => s.category === selectedVehicleClass);
  };

  const checkLicensePlate = async () => {
    if (!licensePlateInput || licensePlateInput.length < 6) {
      setError('Voer een geldig kenteken in (bijv. XX-123-YY)');
      return;
    }

    setCheckingPlate(true);
    setError('');

    try {
      // Format kenteken (verwijder streepjes en maak hoofdletters)
      const formattedPlate = licensePlateInput.toUpperCase().replace(/-/g, '');
      
      // Roep RDW API aan (via jouw bestaande utility)
      const response = await fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${formattedPlate}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const vehicle = data[0];
        const massa = parseInt(vehicle.massa_ledig_voertuig) || 0;
        
        // Bepaal klasse op basis van gewicht of type
        // Klein: < 1800kg, Groot: >= 1800kg
        if (massa < 1800) {
          setSelectedVehicleClass('klein');
        } else {
          setSelectedVehicleClass('groot');
        }
        
        setShowLicensePlateCheck(false);
        setCustomerInfo({...customerInfo, licensePlate: licensePlateInput});
      } else {
        setError('Kenteken niet gevonden. Selecteer handmatig je voertuigklasse.');
      }
    } catch (err) {
      console.error('RDW API Error:', err);
      setError('Kon kenteken niet controleren. Selecteer handmatig je voertuigklasse.');
    } finally {
      setCheckingPlate(false);
    }
  };

  const getNextWeekDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      
      // Skip zondagen
      if (day.getDay() !== 0) {
        days.push(day);
      }
    }
    
    return days;
  };

  if (success) {
    return (
      <div className={containerClass}>
        <div className="max-w-2xl mx-auto pt-8 md:pt-12">
          <div className={`${cardClass} text-center`}>
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-green-500 bg-clip-text text-transparent">
              Boeking Bevestigd!
            </h2>
            <p className="text-gray-300 mb-2">
              Bedankt voor je boeking, {customerInfo.name}!
            </p>
            <p className="text-gray-400 mb-8">
              Je ontvangt een bevestigingsmail op {customerInfo.email}
            </p>
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-xl mb-4">Booking Details</h3>
              <div className="text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Service:</span>
                  <span className="font-medium">{getMainService()?.name}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="bg-gray-900/50 rounded-lg p-3 my-2">
                    <p className="text-gray-400 text-sm mb-2">Extra's ({selectedAddons.length}):</p>
                    {selectedAddons.map(addon => (
                      <div key={addon.id} className="flex justify-between text-sm py-1">
                        <span className="text-gray-300">• {addon.name}</span>
                        <span className="text-gray-300">€{addon.price}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Datum:</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tijd:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-3 mt-3">
                  <span className="text-gray-400">Totaal:</span>
                  <span className="font-bold text-red-500 text-xl">€{getTotalPrice()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={resetBooking}
              className={buttonPrimaryClass}
            >
              Nieuwe Boeking Maken
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 pt-8 md:pt-12">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold mb-4">
            <span className="text-bariq-white">Online </span>
            <span className="text-bariq-red">Boeken</span>
          </h1>
          <p className="text-bariq-grey text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            Plan je afspraak in 5 eenvoudige stappen
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
            <p className="text-red-500 text-sm md:text-base">{error}</p>
          </div>
        )}

        {/* Stap 1: Voertuigklasse selectie */}
        {!selectedVehicleClass && (
          <div className={cardClass}>
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Car className="w-6 h-6 text-bariq-red" />
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-bariq-white">
                  Stap 1: Kies je voertuigklasse
                </h2>
              </div>
              <p className="text-bariq-grey text-sm md:text-base ml-9">Weet je het niet zeker? Gebruik de kenteken check hieronder.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-6">
              {/* Klasse A - Klein */}
              <div
                onClick={() => setSelectedVehicleClass('klein')}
                className="group relative bg-bariq-black border-2 border-gray-800 hover:border-bariq-red 
                         rounded-xl p-6 md:p-7 cursor-pointer transition-all duration-300
                         hover:shadow-xl"
              >
                <h3 className="font-display font-bold text-xl md:text-2xl mb-3 text-bariq-white">
                  Klasse A
                </h3>
                <p className="text-bariq-grey text-sm mb-4">Klein voertuig</p>
                <div className="text-bariq-red font-bold text-4xl md:text-5xl mb-6">€90</div>
                <p className="text-bariq-grey text-sm font-medium mb-3 border-t border-gray-800 pt-4">Voorbeelden:</p>
                <ul className="text-bariq-grey-light text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    Audi A3, A4
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    VW Polo, Golf
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    Mercedes A-Klasse
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    BMW 3-Serie
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    Tesla Model 3
                  </li>
                </ul>
              </div>

              {/* Klasse B - Groot */}
              <div
                onClick={() => setSelectedVehicleClass('groot')}
                className="group relative bg-bariq-black border-2 border-gray-800 hover:border-bariq-red 
                         rounded-xl p-6 md:p-7 cursor-pointer transition-all duration-300
                         hover:shadow-xl"
              >
                <h3 className="font-display font-bold text-xl md:text-2xl mb-3 text-bariq-white">
                  Klasse B
                </h3>
                <p className="text-bariq-grey text-sm mb-4">Groot voertuig</p>
                <div className="text-bariq-red font-bold text-4xl md:text-5xl mb-6">€120</div>
                <p className="text-bariq-grey text-sm font-medium mb-3 border-t border-gray-800 pt-4">Voorbeelden:</p>
                <ul className="text-bariq-grey-light text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    Mercedes S-Klasse, Audi A8
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    BMW X5, Range Rover
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    Tesla Model X
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    Dodge Ram, Ford Ranger
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-bariq-red rounded-full"></div>
                    VW Amarok, Transporter
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowLicensePlateCheck(!showLicensePlateCheck)}
              className="w-full bg-bariq-black border border-gray-800 hover:border-bariq-red
                       text-white py-3.5 px-6 rounded-lg transition-all duration-300
                       font-medium text-sm md:text-base flex items-center justify-center gap-2"
            >
              <Car className="w-4 h-4" />
              {showLicensePlateCheck ? 'Verberg kenteken check' : 'Weet je het niet? Doe een kenteken check'}
            </button>

            {showLicensePlateCheck && (
              <div className="mt-6 bg-bariq-black-lighter rounded-xl p-6 md:p-7 border border-gray-800">
                <h4 className="font-display font-semibold text-lg md:text-xl mb-2 text-bariq-white">Kenteken Check</h4>
                <p className="text-bariq-grey text-sm md:text-base mb-5">
                  Voer je kenteken in voor automatische voertuigklasse selectie
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={licensePlateInput}
                    onChange={(e) => setLicensePlateInput(e.target.value.toUpperCase())}
                    placeholder="XX-123-YY"
                    className={`${inputClass} flex-1 text-center sm:text-left font-mono text-lg tracking-wider`}
                    maxLength={8}
                    onKeyPress={(e) => e.key === 'Enter' && checkLicensePlate()}
                  />
                  <button 
                    onClick={checkLicensePlate}
                    disabled={checkingPlate}
                    className="bg-bariq-red hover:bg-bariq-red-hover
                             disabled:bg-gray-700 disabled:cursor-not-allowed 
                             px-8 py-3.5 rounded-lg font-bold transition-all duration-300
                             text-base whitespace-nowrap"
                  >
                    {checkingPlate ? (
                      <span className="flex items-center gap-2 justify-center">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Checken...
                      </span>
                    ) : 'Check Kenteken'}
                  </button>
                </div>
                <div className="mt-4 flex items-start gap-2 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                  <svg className="w-4 h-4 text-bariq-grey flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-bariq-grey">
                    Gegevens worden veilig opgehaald van de RDW
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stap 2: Extra services */}
        {selectedVehicleClass && !addonsCompleted && (
          <div className={cardClass}>
            <button
              onClick={() => { 
                setSelectedVehicleClass(null); 
                setSelectedAddons([]); 
                setError(''); 
              }}
              className="flex items-center text-bariq-grey hover:text-bariq-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Terug
            </button>
            
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Plus className="w-6 h-6 text-bariq-red" />
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-bariq-white">
                  Stap 2: Selecteer je extra's
                </h2>
              </div>
              <p className="text-bariq-grey text-sm md:text-base ml-9">Optioneel - kies één of meerdere, of sla over</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8">
              {addonServices.map((addon) => {
                const isSelected = selectedAddons.find(a => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`relative bg-bariq-black border-2 rounded-xl p-5 md:p-6 cursor-pointer transition-all duration-300
                             ${isSelected 
                               ? 'border-bariq-red' 
                               : 'border-gray-800 hover:border-bariq-red'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 pr-3">
                        <h3 className="font-semibold text-base md:text-lg mb-2 text-bariq-white line-clamp-2">
                          {addon.name}
                        </h3>
                        <p className="text-bariq-red font-bold text-2xl">€{addon.price}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0
                                    ${isSelected ? 'bg-bariq-red' : 'bg-gray-800'}`}>
                        {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </div>
                    <p className="text-bariq-grey text-xs md:text-sm leading-relaxed line-clamp-3">{addon.description}</p>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Totaal prijs preview */}
            <div className="bg-bariq-black border-2 border-bariq-red rounded-xl p-6 md:p-7 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-bariq-grey text-sm md:text-base font-medium mb-1">Totale prijs</p>
                  <p className="text-bariq-white text-base md:text-lg font-semibold">
                    {getMainService()?.name}
                    {selectedAddons.length > 0 && (
                      <span className="text-bariq-red"> + {selectedAddons.length} extra{selectedAddons.length > 1 ? "'s" : ''}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-bariq-red font-bold text-4xl md:text-5xl">
                    €{getTotalPrice()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { 
                  setSelectedVehicleClass(null); 
                  setSelectedAddons([]); 
                  setError(''); 
                }}
                className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white py-3.5 px-6 rounded-lg transition-all duration-300 font-medium"
              >
                Terug
              </button>
              <button
                onClick={() => { 
                  setAddonsCompleted(true); 
                  setError(''); 
                }}
                className={`flex-1 ${buttonPrimaryClass}`}
              >
                Ga door naar datum
              </button>
            </div>
          </div>
        )}

        {/* Stap 3: Datum selectie */}
        {addonsCompleted && !selectedDate && (
          <div className={cardClass}>
            <button
              onClick={() => { 
                setAddonsCompleted(false); 
                setError(''); 
              }}
              className="flex items-center text-bariq-grey hover:text-bariq-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Terug
            </button>
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-bariq-red" />
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-bariq-white">
                  Stap 3: Kies een datum
                </h2>
              </div>
              <p className="text-bariq-grey text-sm md:text-base ml-9">Maandag gesloten • Dinsdag t/m Zondag 8:00-20:00</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {getNextWeekDays().map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  disabled={day.getDay() === 1}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed
                           ${day.getDay() === 1 
                             ? 'bg-gray-900 border-gray-800' 
                             : 'bg-bariq-black border-gray-800 hover:border-bariq-red'}`}
                >
                  <div className="text-center">
                    <p className="text-xs text-bariq-grey mb-1">
                      {day.toLocaleDateString('nl-NL', { weekday: 'short' })}
                    </p>
                    <p className="text-lg font-bold text-bariq-white">
                      {day.getDate()}
                    </p>
                    <p className="text-xs text-bariq-grey">
                      {day.toLocaleDateString('nl-NL', { month: 'short' })}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stap 4: Tijd selectie */}
        {selectedDate && !selectedTime && (
          <div className={cardClass}>
            <button
              onClick={() => { 
                setSelectedDate(null); 
                setError(''); 
              }}
              className="flex items-center text-bariq-grey hover:text-bariq-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Terug
            </button>
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-bariq-red" />
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-bariq-white">
                  Stap 4: Kies een tijd
                </h2>
              </div>
            </div>
            <p className="text-bariq-grey mb-6 text-sm md:text-base">
              {selectedDate.toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className="bg-bariq-black hover:bg-bariq-red border-2 border-gray-800 hover:border-bariq-red
                             rounded-lg py-3 px-2 text-center transition-all duration-300 font-semibold"
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-bariq-grey mb-2">Geen beschikbare tijdslots voor deze datum</p>
                <p className="text-bariq-grey text-sm">Kies een andere datum</p>
              </div>
            )}
          </div>
        )}

        {/* Stap 5: Klantgegevens */}
        {selectedTime && (
          <div className={cardClass}>
            <button
              onClick={() => { 
                setSelectedTime(''); 
                setError(''); 
              }}
              className="flex items-center text-bariq-grey hover:text-bariq-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Terug
            </button>
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-6 h-6 text-bariq-red" />
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-bariq-white">
                  Stap 5: Je gegevens
                </h2>
              </div>
              <p className="text-bariq-grey text-sm md:text-base ml-9">We behandelen je gegevens vertrouwelijk</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-bariq-grey mb-2">
                  Naam *
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className={inputClass}
                  placeholder="Je volledige naam"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bariq-grey mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className={inputClass}
                  placeholder="je@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bariq-grey mb-2">
                  Telefoon *
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className={inputClass}
                  placeholder="+31 6 12345678"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bariq-grey mb-2">
                  Kenteken *
                </label>
                <input
                  type="text"
                  value={customerInfo.licensePlate}
                  onChange={(e) => setCustomerInfo({...customerInfo, licensePlate: e.target.value.toUpperCase()})}
                  className={`${inputClass} font-mono tracking-wider`}
                  placeholder="XX-123-YY"
                  maxLength={8}
                  required
                />
              </div>
            </div>

            {/* Booking samenvatting */}
            <div className="bg-bariq-black-lighter border border-gray-800 rounded-xl p-6 mb-8">
              <h3 className="font-display font-semibold text-lg mb-4 text-bariq-white">Overzicht van je boeking</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2">
                  <span className="text-bariq-grey">Service:</span>
                  <span className="font-medium text-bariq-white">{getMainService()?.name}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="bg-gray-800/30 border border-gray-800 rounded-lg p-3 my-2">
                    <p className="text-bariq-grey text-sm mb-2 font-medium">Extra's ({selectedAddons.length}):</p>
                    {selectedAddons.map(addon => (
                      <div key={addon.id} className="flex justify-between text-sm py-1">
                        <span className="text-bariq-grey-light">• {addon.name}</span>
                        <span className="text-bariq-grey-light">€{addon.price}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-bariq-grey">Datum:</span>
                  <span className="font-medium text-bariq-white">{selectedDate?.toLocaleDateString('nl-NL')}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-bariq-grey">Tijd:</span>
                  <span className="font-medium text-bariq-white">{selectedTime}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-3 mt-3 items-center">
                  <span className="text-bariq-white font-semibold text-base">Totaal:</span>
                  <span className="font-bold text-bariq-red text-2xl">€{getTotalPrice()}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleBooking}
              disabled={loading}
              className={`w-full ${buttonPrimaryClass} text-lg py-4`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Bezig met boeken...
                </span>
              ) : `Bevestig boeking - €${getTotalPrice()}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
