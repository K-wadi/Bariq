// Time slot management utilities
import { isTimeSlotAvailableInSupabase } from './supabaseService';

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  bookingId?: string;
}

export interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}

// Available time slots
const AVAILABLE_TIME_SLOTS = [
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
];

// Get bookings from localStorage (fallback)
const getBookings = () => {
  const bookings = localStorage.getItem("bariq_bookings");
  return bookings ? JSON.parse(bookings) : [];
};

// Check if a time slot is available for a specific date
// Now integrates with Supabase for real-time availability
export const isTimeSlotAvailable = async (
  date: string,
  time: string,
  durationMinutes: number = 90
): Promise<boolean> => {
  try {
    // Check Supabase first (source of truth)
    const availableInDB = await isTimeSlotAvailableInSupabase(date, time, durationMinutes);

    if (!availableInDB) {
      return false;
    }

    // Fallback: also check localStorage for pending bookings
    const bookings = getBookings();
    const hasConflict = bookings.some(
      (booking: any) =>
        booking.date === date &&
        booking.time === time &&
        booking.status !== "cancelled"
    );

    return !hasConflict;
  } catch (error) {
    console.error('Error checking time slot availability:', error);
    // On error, fallback to localStorage only
    const bookings = getBookings();
    const existingBooking = bookings.find(
      (booking: any) =>
        booking.date === date &&
        booking.time === time &&
        booking.status !== "cancelled"
    );
    return !existingBooking;
  }
};

// Get available time slots for a specific date
export const getAvailableTimeSlots = async (date: string, durationMinutes: number = 90): Promise<TimeSlot[]> => {
  const dateObj = new Date(date);
  const today = new Date();
  const currentTime = new Date();

  // Don't allow booking for past dates - Fix: Compare Date objects properly
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  if (dateObj.getTime() < todayMidnight.getTime()) {
    return AVAILABLE_TIME_SLOTS.map((time) => ({
      time,
      isAvailable: false,
    }));
  }

  // For today, don't allow booking for past times
  const isToday = dateObj.toDateString() === today.toDateString();

  // Check availability for all slots
  const slots = await Promise.all(
    AVAILABLE_TIME_SLOTS.map(async (time) => {
      let isAvailable = await isTimeSlotAvailable(date, time, durationMinutes);

      // If it's today, check if the time has already passed
      if (isToday && isAvailable) {
        const [hours, minutes] = time.split(":").map(Number);
        const slotTime = new Date();
        slotTime.setHours(hours, minutes, 0, 0);

        // Add 2 hours buffer for same-day bookings
        const bufferTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);

        if (slotTime.getTime() <= bufferTime.getTime()) {
          isAvailable = false;
        }
      }

      return {
        time,
        isAvailable,
      };
    })
  );

  return slots;
};

// Get schedule for multiple days
export const getWeekSchedule = async (
  startDate: Date,
  days: number = 7,
  durationMinutes: number = 90
): Promise<DaySchedule[]> => {
  const schedule: DaySchedule[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // Skip Sundays (day 0)
    if (date.getDay() === 0) {
      continue;
    }

    const dateString = date.toISOString().split("T")[0];
    const slots = await getAvailableTimeSlots(dateString, durationMinutes);

    schedule.push({
      date: dateString,
      slots,
    });
  }

  return schedule;
};

// Reserve a time slot
export const reserveTimeSlot = async (
  date: string,
  time: string,
  bookingId: string,
  durationMinutes: number = 90
): Promise<boolean> => {
  const available = await isTimeSlotAvailable(date, time, durationMinutes);
  if (!available) {
    return false;
  }

  // The actual reservation happens when the booking is saved
  // This function is mainly for validation
  return true;
};

// Get booking statistics for a date
export const getDateStatistics = async (date: string, durationMinutes: number = 90) => {
  const slots = await getAvailableTimeSlots(date, durationMinutes);
  const totalSlots = slots.length;
  const availableSlots = slots.filter((slot) => slot.isAvailable).length;
  const bookedSlots = totalSlots - availableSlots;

  return {
    totalSlots,
    availableSlots,
    bookedSlots,
    occupancyRate: Math.round((bookedSlots / totalSlots) * 100),
  };
};

// Format time for display
export const formatTimeSlot = (time: string): string => {
  return time;
};

// Check if date is a weekend or holiday
export const isDateUnavailable = (date: Date): boolean => {
  const day = date.getDay();

  // Sunday is unavailable
  if (day === 0) {
    return true;
  }

  // Add holiday checks here if needed
  // For now, only Sundays are unavailable

  return false;
};

// Get next available date
export const getNextAvailableDate = (): Date => {
  const today = new Date();
  let nextDate = new Date(today);
  nextDate.setDate(today.getDate() + 1);

  // Find the next available date (skip Sundays)
  while (isDateUnavailable(nextDate)) {
    nextDate.setDate(nextDate.getDate() + 1);
  }

  return nextDate;
};
