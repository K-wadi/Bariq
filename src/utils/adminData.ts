// Admin data management utilities
export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  carBrand: string;
  carModel: string;
  licensePlate: string;
  parkingType: 'outdoor' | 'indoor';
  packageType: 'basic' | 'premium';
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  name: string;
  email: string;
  carType?: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  totalBookings: number;
  lastBooking?: string;
  createdAt: string;
}

// Local storage keys
const STORAGE_KEYS = {
  BOOKINGS: 'bariq_bookings',
  REVIEWS: 'bariq_reviews',
  CUSTOMERS: 'bariq_customers',
};

// Initialize with some sample data if none exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    const sampleBookings: Booking[] = [
      {
        id: '1',
        name: 'Emma Jansen',
        email: 'emma.jansen@email.com',
        phone: '06 8552 3584',
        address: 'Amsterdamseweg 123',
        city: 'Amsterdam',
        postalCode: '1012 AB',
        carBrand: 'Mercedes',
        carModel: 'S-Klasse',
        licensePlate: 'AB-123-C',
        parkingType: 'outdoor',
        packageType: 'premium',
        date: '2025-05-15',
        time: '10:00',
        notes: 'Auto staat op de oprit, sleutel onder de mat',
        status: 'confirmed',
        createdAt: '2025-05-10T09:00:00Z',
        updatedAt: '2025-05-10T09:00:00Z',
      },
      {
        id: '2',
        name: 'Thijs van Dijk',
        email: 'thijs.vandijk@email.com',
        phone: '06 8552 3584',
        address: 'Rotterdamstraat 45',
        city: 'Rotterdam',
        postalCode: '3012 CD',
        carBrand: 'Volkswagen',
        carModel: 'Golf',
        licensePlate: 'CD-456-E',
        parkingType: 'outdoor',
        packageType: 'basic',
        date: '2025-05-16',
        time: '14:00',
        notes: '',
        status: 'pending',
        createdAt: '2025-05-11T14:30:00Z',
        updatedAt: '2025-05-11T14:30:00Z',
      },
      {
        id: '3',
        name: 'Sophie de Jong',
        email: 'sophie.dejong@email.com',
        phone: '06 8552 3584',
        address: 'Utrechtlaan 78',
        city: 'Utrecht',
        postalCode: '3512 EF',
        carBrand: 'BMW',
        carModel: '3 Serie',
        licensePlate: 'EF-789-G',
        parkingType: 'indoor',
        packageType: 'premium',
        date: '2025-05-17',
        time: '09:00',
        notes: 'Garage is toegankelijk via zijdeur',
        status: 'completed',
        createdAt: '2025-05-12T11:15:00Z',
        updatedAt: '2025-05-12T11:15:00Z',
      },
      // Add more sample bookings to test time slot conflicts
      {
        id: '4',
        name: 'Mark Peters',
        email: 'mark.peters@email.com',
        phone: '06 8552 3584',
        address: 'Hoofdstraat 89',
        city: 'Amsterdam',
        postalCode: '1015 GH',
        carBrand: 'Audi',
        carModel: 'A4',
        licensePlate: 'GH-890-I',
        parkingType: 'outdoor',
        packageType: 'basic',
        date: new Date().toISOString().split('T')[0], // Today
        time: '11:00',
        notes: '',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Lisa van der Berg',
        email: 'lisa.vandenberg@email.com',
        phone: '06 8552 3584',
        address: 'Kerkstraat 45',
        city: 'Amsterdam',
        postalCode: '1017 GC',
        carBrand: 'Tesla',
        carModel: 'Model 3',
        licensePlate: 'JK-123-L',
        parkingType: 'indoor',
        packageType: 'premium',
        date: new Date().toISOString().split('T')[0], // Today
        time: '15:00',
        notes: 'Elektrische auto, speciale aandacht voor lak',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(sampleBookings));
  }

  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    const sampleReviews: Review[] = [
      {
        id: '1',
        name: 'Sander de Vries',
        email: 'sander.devries@email.com',
        carType: 'BMW X5',
        rating: 5,
        comment: 'Uitstekende service! Mijn auto ziet eruit als nieuw.',
        status: 'approved',
        createdAt: '2025-05-10T16:00:00Z',
        updatedAt: '2025-05-10T16:00:00Z',
      },
      {
        id: '2',
        name: 'Lotte Bakker',
        email: 'lotte.bakker@email.com',
        carType: 'Audi A3',
        rating: 4,
        comment: 'Zeer tevreden met het resultaat.',
        status: 'approved',
        createdAt: '2025-05-12T10:30:00Z',
        updatedAt: '2025-05-12T10:30:00Z',
      },
      {
        id: '3',
        name: 'Jasper Koning',
        email: 'jasper.koning@email.com',
        carType: 'Tesla Model 3',
        rating: 5,
        comment: 'Top service, kom zeker terug!',
        status: 'pending',
        createdAt: '2025-05-14T14:45:00Z',
        updatedAt: '2025-05-14T14:45:00Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(sampleReviews));
  }

  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    const sampleCustomers: Customer[] = [
      {
        id: '1',
        name: 'Emma Jansen',
        email: 'emma.jansen@email.com',
        phone: '06 8552 3584',
        address: 'Amsterdamseweg 123',
        city: 'Amsterdam',
        postalCode: '1012 AB',
        totalBookings: 3,
        lastBooking: '2025-05-15',
        createdAt: '2025-03-01T10:00:00Z',
      },
      {
        id: '2',
        name: 'Thijs van Dijk',
        email: 'thijs.vandijk@email.com',
        phone: '06 8552 3584',
        address: 'Rotterdamstraat 45',
        city: 'Rotterdam',
        postalCode: '3012 CD',
        totalBookings: 1,
        lastBooking: '2025-05-16',
        createdAt: '2025-05-11T14:30:00Z',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(sampleCustomers));
  }
};

// Booking management functions
export const getBookings = (): Booking[] => {
  initializeData();
  const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return bookings ? JSON.parse(bookings) : [];
};

export const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Booking => {
  const bookings = getBookings();
  
  // Check for time slot conflicts
  const conflictingBooking = bookings.find(existingBooking => 
    existingBooking.date === booking.date && 
    existingBooking.time === booking.time && 
    existingBooking.status !== 'cancelled'
  );
  
  if (conflictingBooking) {
    throw new Error(`Tijdslot ${booking.time} op ${booking.date} is al geboekt. Kies een ander tijdslot.`);
  }
  
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  
  // Also add/update customer
  addOrUpdateCustomer({
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    address: booking.address,
    city: booking.city,
    postalCode: booking.postalCode,
  });
  
  return newBooking;
};

export const updateBooking = (id: string, updates: Partial<Booking>): Booking | null => {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  
  if (index === -1) return null;
  
  const oldStatus = bookings[index].status;
  const newStatus = updates.status;
  
  // If updating time or date, check for conflicts
  if (updates.date || updates.time) {
    const updatedDate = updates.date || bookings[index].date;
    const updatedTime = updates.time || bookings[index].time;
    
    const conflictingBooking = bookings.find(existingBooking => 
      existingBooking.id !== id &&
      existingBooking.date === updatedDate && 
      existingBooking.time === updatedTime && 
      existingBooking.status !== 'cancelled'
    );
    
    if (conflictingBooking) {
      throw new Error(`Tijdslot ${updatedTime} op ${updatedDate} is al geboekt. Kies een ander tijdslot.`);
    }
  }
  
  bookings[index] = {
    ...bookings[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  
  // If status changed to completed, we could trigger a review request email here
  if (oldStatus !== 'completed' && newStatus === 'completed') {
    // This is where you would trigger the review request email
    console.log('Booking completed - could send review request email');
  }
  
  // If status changed to cancelled, we could trigger a cancellation email here
  if (oldStatus !== 'cancelled' && newStatus === 'cancelled') {
    // This is where you would trigger the cancellation email
    console.log('Booking cancelled - could send cancellation email');
  }
  
  return bookings[index];
};

export const deleteBooking = (id: string): boolean => {
  const bookings = getBookings();
  const filteredBookings = bookings.filter(b => b.id !== id);
  
  if (filteredBookings.length === bookings.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(filteredBookings));
  return true;
};

// Review management functions
export const getReviews = (): Review[] => {
  initializeData();
  const reviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  return reviews ? JSON.parse(reviews) : [];
};

export const addReview = (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Review => {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  reviews.push(newReview);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  return newReview;
};

export const updateReview = (id: string, updates: Partial<Review>): Review | null => {
  const reviews = getReviews();
  const index = reviews.findIndex(r => r.id === id);
  
  if (index === -1) return null;
  
  reviews[index] = {
    ...reviews[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  return reviews[index];
};

export const deleteReview = (id: string): boolean => {
  const reviews = getReviews();
  const filteredReviews = reviews.filter(r => r.id !== id);
  
  if (filteredReviews.length === reviews.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(filteredReviews));
  return true;
};

// Customer management functions
export const getCustomers = (): Customer[] => {
  initializeData();
  const customers = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  return customers ? JSON.parse(customers) : [];
};

export const addOrUpdateCustomer = (customerData: Omit<Customer, 'id' | 'totalBookings' | 'createdAt' | 'lastBooking'>): Customer => {
  const customers = getCustomers();
  const existingIndex = customers.findIndex(c => c.email === customerData.email);
  
  if (existingIndex !== -1) {
    // Update existing customer
    customers[existingIndex] = {
      ...customers[existingIndex],
      ...customerData,
      totalBookings: customers[existingIndex].totalBookings + 1,
      lastBooking: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    return customers[existingIndex];
  } else {
    // Add new customer
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      totalBookings: 1,
      lastBooking: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    customers.push(newCustomer);
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    return newCustomer;
  }
};

// Statistics functions
export const getStatistics = () => {
  const bookings = getBookings();
  const reviews = getReviews();
  const customers = getCustomers();
  
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  
  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const averageRating = approvedReviews.length > 0 
    ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length 
    : 0;
  
  const totalRevenue = completedBookings * 65; // Average price
  
  return {
    totalBookings: bookings.length,
    completedBookings,
    pendingBookings,
    confirmedBookings,
    totalCustomers: customers.length,
    totalReviews: reviews.length,
    pendingReviews: reviews.filter(r => r.status === 'pending').length,
    averageRating: Math.round(averageRating * 10) / 10,
    totalRevenue,
    carsWashed: completedBookings + 1200, // Add base number for display
  };
};

// Format functions for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'confirmed':
    case 'approved':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'In afwachting';
    case 'confirmed':
      return 'Bevestigd';
    case 'completed':
      return 'Voltooid';
    case 'cancelled':
      return 'Geannuleerd';
    case 'approved':
      return 'Goedgekeurd';
    case 'rejected':
      return 'Afgewezen';
    default:
      return status;
  }
};