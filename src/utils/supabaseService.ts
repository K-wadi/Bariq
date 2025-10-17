// Supabase Service Layer for Bariq Autocare
// Type-safe database operations with field mapping (camelCase ↔ snake_case)

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ============================================================================
// SUPABASE CLIENT INITIALIZATION
// ============================================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials. Check your .env file.');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// Database row types (snake_case - matches Supabase schema)
export interface SupabaseBookingRow {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_postal_code: string;
  car_brand: string;
  car_model: string;
  license_plate: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseServiceRow {
  id: string;
  name: string;
  description?: string;
  category: 'klein' | 'groot';
  price: number;
  duration: number;
  is_active: boolean;
  is_addon: boolean;
  created_at: string;
}

export interface SupabaseCustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postal_code?: string;
  total_bookings: number;
  created_at: string;
}

// Application types (camelCase - used in React components)
export interface SupabaseBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  carBrand: string;
  carModel: string;
  licensePlate: string;
  serviceId: string;
  appointmentDate: string;
  appointmentTime: string;
  durationMinutes: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupabaseService {
  id: string;
  name: string;
  description?: string;
  category: 'klein' | 'groot';
  price: number;
  duration: number;
  isActive: boolean;
  isAddon: boolean;
  createdAt: string;
}

export interface SupabaseCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  totalBookings: number;
  createdAt: string;
}

// ============================================================================
// FIELD MAPPING UTILITIES
// ============================================================================

function mapBookingRowToApp(row: SupabaseBookingRow): SupabaseBooking {
  return {
    id: row.id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    customerAddress: row.customer_address,
    customerCity: row.customer_city,
    customerPostalCode: row.customer_postal_code,
    carBrand: row.car_brand,
    carModel: row.car_model,
    licensePlate: row.license_plate,
    serviceId: row.service_id,
    appointmentDate: row.appointment_date,
    appointmentTime: row.appointment_time,
    durationMinutes: row.duration_minutes,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapServiceRowToApp(row: SupabaseServiceRow): SupabaseService {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    price: row.price,
    duration: row.duration,
    isActive: row.is_active,
    isAddon: row.is_addon,
    createdAt: row.created_at,
  };
}

function mapCustomerRowToApp(row: SupabaseCustomerRow): SupabaseCustomer {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    city: row.city,
    postalCode: row.postal_code,
    totalBookings: row.total_bookings,
    createdAt: row.created_at,
  };
}

// ============================================================================
// BOOKING OPERATIONS
// ============================================================================

export interface CreateBookingInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  carBrand: string;
  carModel: string;
  licensePlate: string;
  date: string;
  time: string;
  notes?: string;
  addonIds?: string[];
}

export interface BookingResult {
  success: boolean;
  booking?: SupabaseBooking;
  error?: string;
}

/**
 * Add a new booking to Supabase
 */
export async function addBookingToSupabase(
  bookingData: CreateBookingInput,
  serviceId: string,
  durationMinutes: number,
  addonIds: string[] = []
): Promise<BookingResult> {
  try {
    // First check if time slot is available
    const isAvailable = await isTimeSlotAvailableInSupabase(
      bookingData.date,
      bookingData.time,
      durationMinutes
    );

    if (!isAvailable) {
      return {
        success: false,
        error: `Tijdslot ${bookingData.time} op ${bookingData.date} is niet beschikbaar.`,
      };
    }

    // Create the booking
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        customer_address: bookingData.address,
        customer_city: bookingData.city,
        customer_postal_code: bookingData.postalCode,
        car_brand: bookingData.carBrand,
        car_model: bookingData.carModel,
        license_plate: bookingData.licensePlate,
        service_id: serviceId,
        addons: addonIds, // Store addon IDs as JSON array
        appointment_date: bookingData.date,
        appointment_time: bookingData.time,
        duration_minutes: durationMinutes,
        status: 'pending',
        notes: bookingData.notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        success: false,
        error: 'Kon boeking niet opslaan. Probeer opnieuw.',
      };
    }

    // Also create/update customer record
    await createOrUpdateCustomer({
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      address: bookingData.address,
      city: bookingData.city,
      postalCode: bookingData.postalCode,
    });

    return {
      success: true,
      booking: mapBookingRowToApp(data as SupabaseBookingRow),
    };
  } catch (error) {
    console.error('Error adding booking:', error);
    return {
      success: false,
      error: 'Er ging iets mis. Probeer opnieuw.',
    };
  }
}

/**
 * Get all bookings from Supabase
 */
export async function getBookingsFromSupabase(): Promise<SupabaseBooking[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true });

    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }

    return (data as SupabaseBookingRow[]).map(mapBookingRowToApp);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

/**
 * Get a single booking by ID
 */
export async function getBookingById(id: string): Promise<SupabaseBooking | null> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching booking:', error);
      return null;
    }

    return mapBookingRowToApp(data as SupabaseBookingRow);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
}

/**
 * Update a booking
 */
export async function updateBookingInSupabase(
  id: string,
  updates: Partial<SupabaseBookingRow>
): Promise<BookingResult> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking:', error);
      return {
        success: false,
        error: 'Kon boeking niet bijwerken.',
      };
    }

    return {
      success: true,
      booking: mapBookingRowToApp(data as SupabaseBookingRow),
    };
  } catch (error) {
    console.error('Error updating booking:', error);
    return {
      success: false,
      error: 'Er ging iets mis bij het bijwerken.',
    };
  }
}

/**
 * Cancel a booking
 */
export async function cancelBooking(id: string): Promise<BookingResult> {
  return updateBookingInSupabase(id, { status: 'cancelled' });
}

/**
 * Confirm a booking
 */
export async function confirmBooking(id: string): Promise<BookingResult> {
  return updateBookingInSupabase(id, { status: 'confirmed' });
}

/**
 * Complete a booking
 */
export async function completeBooking(id: string): Promise<BookingResult> {
  return updateBookingInSupabase(id, { status: 'completed' });
}

/**
 * Delete a booking (hard delete)
 */
export async function deleteBooking(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('bookings').delete().eq('id', id);

    if (error) {
      console.error('Error deleting booking:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
}

// ============================================================================
// TIME SLOT AVAILABILITY
// ============================================================================

/**
 * Check if a time slot is available
 * Accounts for booking duration and overlaps
 */
export async function isTimeSlotAvailableInSupabase(
  date: string,
  time: string,
  durationMinutes: number
): Promise<boolean> {
  try {
    // Get all bookings for the specified date (excluding cancelled)
    const { data, error } = await supabase
      .from('bookings')
      .select('appointment_time, duration_minutes')
      .eq('appointment_date', date)
      .neq('status', 'cancelled');

    if (error) {
      console.error('Error checking availability:', error);
      return false;
    }

    if (!data || data.length === 0) {
      return true; // No bookings on this date
    }

    // Convert requested time to minutes since midnight
    const [reqHours, reqMinutes] = time.split(':').map(Number);
    const requestedStart = reqHours * 60 + reqMinutes;
    const requestedEnd = requestedStart + durationMinutes;

    // Check for conflicts
    for (const booking of data) {
      const [bookHours, bookMinutes] = booking.appointment_time.split(':').map(Number);
      const bookedStart = bookHours * 60 + bookMinutes;
      const bookedEnd = bookedStart + booking.duration_minutes;

      // Check if time slots overlap
      const hasOverlap =
        (requestedStart >= bookedStart && requestedStart < bookedEnd) ||
        (requestedEnd > bookedStart && requestedEnd <= bookedEnd) ||
        (requestedStart <= bookedStart && requestedEnd >= bookedEnd);

      if (hasOverlap) {
        return false; // Conflict found
      }
    }

    return true; // No conflicts
  } catch (error) {
    console.error('Error checking time slot availability:', error);
    return false;
  }
}

/**
 * Get available time slots for a specific date
 */
export async function getAvailableTimeSlotsForDate(
  date: string,
  durationMinutes: number = 90
): Promise<string[]> {
  const allTimeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  const availableSlots: string[] = [];

  for (const slot of allTimeSlots) {
    const isAvailable = await isTimeSlotAvailableInSupabase(date, slot, durationMinutes);
    if (isAvailable) {
      availableSlots.push(slot);
    }
  }

  return availableSlots;
}

// ============================================================================
// SERVICE OPERATIONS
// ============================================================================

/**
 * Get all active services
 */
export async function getActiveServices(): Promise<SupabaseService[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    return (data as SupabaseServiceRow[]).map(mapServiceRowToApp);
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

/**
 * Get services by category (klein/groot)
 */
export async function getServicesByCategory(
  category: 'klein' | 'groot'
): Promise<SupabaseService[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .eq('is_addon', false)
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    return (data as SupabaseServiceRow[]).map(mapServiceRowToApp);
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

/**
 * Get addon services
 */
export async function getAddonServices(): Promise<SupabaseService[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_addon', true)
      .eq('is_active', true)
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching addons:', error);
      return [];
    }

    return (data as SupabaseServiceRow[]).map(mapServiceRowToApp);
  } catch (error) {
    console.error('Error fetching addons:', error);
    return [];
  }
}

/**
 * Get a service by ID
 */
export async function getServiceById(id: string): Promise<SupabaseService | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching service:', error);
      return null;
    }

    return mapServiceRowToApp(data as SupabaseServiceRow);
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

// ============================================================================
// CUSTOMER OPERATIONS
// ============================================================================

interface CreateCustomerInput {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

/**
 * Create or update a customer
 */
export async function createOrUpdateCustomer(
  customerData: CreateCustomerInput
): Promise<SupabaseCustomer | null> {
  try {
    // Check if customer exists
    const { data: existing } = await supabase
      .from('customers')
      .select('*')
      .eq('email', customerData.email)
      .single();

    if (existing) {
      // Update existing customer
      const { data, error } = await supabase
        .from('customers')
        .update({
          name: customerData.name,
          phone: customerData.phone,
          address: customerData.address,
          city: customerData.city,
          postal_code: customerData.postalCode,
          total_bookings: existing.total_bookings + 1,
        })
        .eq('email', customerData.email)
        .select()
        .single();

      if (error) {
        console.error('Error updating customer:', error);
        return null;
      }

      return mapCustomerRowToApp(data as SupabaseCustomerRow);
    } else {
      // Create new customer
      const { data, error } = await supabase
        .from('customers')
        .insert({
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          address: customerData.address,
          city: customerData.city,
          postal_code: customerData.postalCode,
          total_bookings: 1,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating customer:', error);
        return null;
      }

      return mapCustomerRowToApp(data as SupabaseCustomerRow);
    }
  } catch (error) {
    console.error('Error creating/updating customer:', error);
    return null;
  }
}

/**
 * Get all customers
 */
export async function getCustomers(): Promise<SupabaseCustomer[]> {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching customers:', error);
      return [];
    }

    return (data as SupabaseCustomerRow[]).map(mapCustomerRowToApp);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
}

// ============================================================================
// STATISTICS & ANALYTICS
// ============================================================================

export interface BookingStatistics {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
}

/**
 * Get booking statistics
 */
export async function getBookingStatistics(): Promise<BookingStatistics> {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('status, service_id');

    if (error || !bookings) {
      console.error('Error fetching statistics:', error);
      return {
        totalBookings: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0,
        totalRevenue: 0,
        averageBookingValue: 0,
      };
    }

    // Get services for price calculation
    const { data: services } = await supabase.from('services').select('id, price');
    const serviceMap = new Map(services?.map((s) => [s.id, s.price]) || []);

    const stats = {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter((b) => b.status === 'pending').length,
      confirmedBookings: bookings.filter((b) => b.status === 'confirmed').length,
      completedBookings: bookings.filter((b) => b.status === 'completed').length,
      cancelledBookings: bookings.filter((b) => b.status === 'cancelled').length,
      totalRevenue: 0,
      averageBookingValue: 0,
    };

    // Calculate revenue
    const completedBookings = bookings.filter((b) => b.status === 'completed');
    stats.totalRevenue = completedBookings.reduce((sum, booking) => {
      const price = serviceMap.get(booking.service_id) || 0;
      return sum + price;
    }, 0);

    stats.averageBookingValue =
      completedBookings.length > 0 ? stats.totalRevenue / completedBookings.length : 0;

    return stats;
  } catch (error) {
    console.error('Error calculating statistics:', error);
    return {
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      totalRevenue: 0,
      averageBookingValue: 0,
    };
  }
}

// ============================================================================
// REAL-TIME SUBSCRIPTIONS
// ============================================================================

/**
 * Subscribe to booking changes
 */
export function subscribeToBookings(
  callback: (booking: SupabaseBooking) => void
): () => void {
  const subscription = supabase
    .channel('bookings-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bookings',
      },
      (payload) => {
        if (payload.new) {
          callback(mapBookingRowToApp(payload.new as SupabaseBookingRow));
        }
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(subscription);
  };
}

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

export function getSupabaseErrorMessage(error: any): string {
  if (error?.message) {
    // Map common Supabase errors to Dutch
    const errorMap: Record<string, string> = {
      'duplicate key value': 'Deze boeking bestaat al.',
      'violates foreign key constraint': 'Ongeldige service geselecteerd.',
      'invalid input syntax': 'Ongeldige invoer.',
      'not found': 'Niet gevonden.',
    };

    for (const [key, value] of Object.entries(errorMap)) {
      if (error.message.toLowerCase().includes(key)) {
        return value;
      }
    }

    return error.message;
  }

  return 'Er ging iets mis met de database verbinding.';
}

