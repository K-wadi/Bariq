// Supabase Connection Test
// Run this to verify your Supabase integration is working

import { getActiveServices, getBookingsFromSupabase, getBookingStatistics } from './utils/supabaseService';

async function testSupabaseConnection() {
  console.log('🔄 Testing Supabase connection...');
  console.log('================================');
  
  try {
    // Test 1: Fetch services
    console.log('\n📦 Test 1: Fetching services...');
    const services = await getActiveServices();
    console.log(`✅ Found ${services.length} services:`);
    services.forEach(service => {
      console.log(`  - ${service.name} (${service.category}) - €${service.price}`);
    });
    
    // Test 2: Fetch bookings
    console.log('\n📅 Test 2: Fetching bookings...');
    const bookings = await getBookingsFromSupabase();
    console.log(`✅ Found ${bookings.length} bookings`);
    if (bookings.length > 0) {
      console.log('  Latest booking:', {
        customer: bookings[0].customerName,
        date: bookings[0].appointmentDate,
        status: bookings[0].status
      });
    }
    
    // Test 3: Get statistics
    console.log('\n📊 Test 3: Fetching statistics...');
    const stats = await getBookingStatistics();
    console.log('✅ Statistics:', {
      total: stats.totalBookings,
      pending: stats.pendingBookings,
      confirmed: stats.confirmedBookings,
      completed: stats.completedBookings,
      revenue: `€${stats.totalRevenue}`
    });
    
    console.log('\n🎉 All tests passed! Connection successful!');
    console.log('================================');
  } catch (error) {
    console.error('❌ Connection failed:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Check if VITE_SUPABASE_URL is set in .env');
    console.log('2. Check if VITE_SUPABASE_ANON_KEY is set in .env');
    console.log('3. Verify your Supabase project is active');
    console.log('4. Check if tables exist: bookings, services, customers');
  }
}

// Run the test
testSupabaseConnection();
