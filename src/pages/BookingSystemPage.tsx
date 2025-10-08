import SEO from '../components/SEO';
import { BookingCalendar } from '../components/BookingCalendar';

const BookingSystemPage: React.FC = () => {
  const handleBookingComplete = (booking: any) => {
    console.log('Booking completed:', booking);
    // Optioneel: navigate naar een bevestigingspagina of toon success message
  };

  return (
    <>
      <SEO
        title="Premium Booking System – Bariq Auto Care"
        description="Boek direct je premium auto detailing service online via ons geavanceerde booking systeem."
        canonical="https://bariqautocare.nl/booking-system"
      />
      
      <BookingCalendar onBookingComplete={handleBookingComplete} />
    </>
  );
};

export default BookingSystemPage;
