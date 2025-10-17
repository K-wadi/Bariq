import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Settings,
  BarChart3,
  Clock,
  Mail,
  Phone,
  RefreshCw,
  Send,
  Filter,
} from "lucide-react";
import { supabase, type Service } from "../lib/supabase";

interface BookingWithService {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  start_time: string;
  end_time: string;
  status: "confirmed" | "cancelled" | "completed";
  notes: string | null;
  service: Service;
}

export const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<BookingWithService[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "past">(
    "upcoming"
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "confirmed" | "cancelled" | "completed"
  >("all");

  const containerClass = `
    min-h-screen bg-bariq-black
    text-white px-4 py-6 md:px-6 md:py-10 lg:px-8 pt-20 md:pt-16 lg:pt-16 font-sans
  `;

  const cardClass = `
    bg-bariq-black-lighter border border-gray-800
    rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300
  `;

  useEffect(() => {
    loadBookings();

    // Real-time subscriptions
    const subscription = supabase
      .channel("bookings-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          loadBookings();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [filter, statusFilter]);

  const loadBookings = async () => {
    setLoading(true);
    let query = supabase
      .from("bookings")
      .select(
        `
        *,
        service:services(*)
      `
      )
      .order("start_time", { ascending: true });

    // Tijd filter toepassen
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (filter) {
      case "today":
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        query = query
          .gte("start_time", today.toISOString())
          .lt("start_time", tomorrow.toISOString());
        break;
      case "upcoming":
        query = query.gte("start_time", now.toISOString());
        break;
      case "past":
        query = query.lt("start_time", now.toISOString());
        break;
    }

    // Status filter toepassen
    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setBookings(data as BookingWithService[]);
    }
    setLoading(false);
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    // Haal de booking op om email te kunnen sturen
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", bookingId);

    if (!error) {
      // Verstuur status update email naar klant
      try {
        await fetch("/.netlify/functions/send-status-update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerEmail: booking.customer_email,
            customerName: booking.customer_name,
            serviceName: booking.service.name,
            startTime: booking.start_time,
            status: newStatus,
            price: booking.service.price,
          }),
        });
        console.log(`Status update email verzonden voor ${newStatus}`);
      } catch (emailError) {
        console.error("Kon status email niet versturen:", emailError);
      }

      loadBookings();
    }
  };

  const sendReminder = async (booking: BookingWithService) => {
    try {
      const response = await fetch("/.netlify/functions/send-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: booking.customer_email,
          customerName: booking.customer_name,
          serviceName: booking.service.name,
          startTime: booking.start_time,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          `✅ Herinnering succesvol verzonden naar ${booking.customer_email}`
        );
      } else {
        throw new Error(result.error || "Email versturen mislukt");
      }
    } catch (error) {
      console.error("Reminder error:", error);
      alert(
        "❌ Kon herinnering niet versturen. Check de console voor details."
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-500 bg-green-500/20 border-green-500/50";
      case "cancelled":
        return "text-red-500 bg-red-500/20 border-red-500/50";
      case "completed":
        return "text-blue-500 bg-blue-500/20 border-blue-500/50";
      default:
        return "text-gray-500 bg-gray-500/20 border-gray-500/50";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Bevestigd";
      case "cancelled":
        return "Geannuleerd";
      case "completed":
        return "Voltooid";
      default:
        return status;
    }
  };

  const getTodayBookings = () => {
    const today = new Date();
    return bookings.filter((b) => {
      const bookingDate = new Date(b.start_time);
      return bookingDate.toDateString() === today.toDateString();
    });
  };

  const getRevenue = () => {
    return bookings
      .filter((b) => b.status === "confirmed" || b.status === "completed")
      .reduce((sum, b) => sum + (b.service?.price || 0), 0);
  };

  return (
    <div className={containerClass}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-bariq-white mb-2">
              Admin <span className="text-bariq-red">Dashboard</span>
            </h1>
            <p className="text-bariq-grey text-sm md:text-base">
              Beheer je boekingen en klanten
            </p>
          </div>
          <button
            onClick={loadBookings}
            className="flex items-center gap-2 bg-bariq-red hover:bg-bariq-red-hover px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Ververs</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-start gap-3 mb-3">
            <Filter className="w-5 h-5 text-bariq-red mt-1 flex-shrink-0" />
            <div className="flex flex-wrap gap-2">
              {(["all", "today", "upcoming", "past"] as const).map(
                (filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`px-3 md:px-4 py-2 rounded-lg transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                      filter === filterOption
                        ? "bg-bariq-red text-white shadow-lg"
                        : "bg-gray-800 text-bariq-grey hover:bg-gray-700 border border-gray-700"
                    }`}
                  >
                    {filterOption === "all"
                      ? "Alle"
                      : filterOption === "today"
                      ? "Vandaag"
                      : filterOption === "upcoming"
                      ? "Komende"
                      : "Verleden"}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pl-8">
            {(["all", "confirmed", "completed", "cancelled"] as const).map(
              (statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => setStatusFilter(statusOption)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 text-xs md:text-sm whitespace-nowrap ${
                    statusFilter === statusOption
                      ? "bg-bariq-red text-white shadow-lg"
                      : "bg-gray-800 text-bariq-grey hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  {statusOption === "all"
                    ? "Alle Status"
                    : getStatusLabel(statusOption)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className={cardClass}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-bariq-grey text-xs md:text-sm mb-1">
                  Vandaag
                </p>
                <p className="text-2xl md:text-3xl font-bold text-bariq-red">
                  {getTodayBookings().length}
                </p>
                <p className="text-xs text-bariq-grey mt-1">boekingen</p>
              </div>
              <Calendar className="w-8 h-8 md:w-10 md:h-10 text-bariq-red self-end md:self-auto" />
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-bariq-grey text-xs md:text-sm mb-1">
                  Bevestigd
                </p>
                <p className="text-2xl md:text-3xl font-bold text-green-500">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </p>
                <p className="text-xs text-bariq-grey mt-1">boekingen</p>
              </div>
              <Users className="w-8 h-8 md:w-10 md:h-10 text-green-600 self-end md:self-auto" />
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-bariq-grey text-xs md:text-sm mb-1">Omzet</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-500">
                  €{getRevenue()}
                </p>
                <p className="text-xs text-bariq-grey mt-1">verwacht</p>
              </div>
              <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-blue-600 self-end md:self-auto" />
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-bariq-grey text-xs md:text-sm mb-1">
                  Voltooid
                </p>
                <p className="text-2xl md:text-3xl font-bold text-purple-500">
                  {bookings.filter((b) => b.status === "completed").length}
                </p>
                <p className="text-xs text-bariq-grey mt-1">boekingen</p>
              </div>
              <Settings className="w-8 h-8 md:w-10 md:h-10 text-purple-600 self-end md:self-auto" />
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className={cardClass}>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-bariq-red" />
            <h2 className="text-xl md:text-2xl font-display font-semibold text-bariq-white">
              Boekingen{" "}
              <span className="text-bariq-grey">({bookings.length})</span>
            </h2>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bariq-red"></div>
              <p className="text-bariq-grey mt-4">Laden...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-bariq-grey">Geen boekingen gevonden</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-bariq-grey text-sm">
                      Klant
                    </th>
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-bariq-grey text-sm">
                      Service
                    </th>
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-bariq-grey text-sm">
                      Datum & Tijd
                    </th>
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-bariq-grey text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-bariq-grey text-sm">
                      Acties
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-4 px-3 md:px-4">
                        <div>
                          <p className="font-semibold text-bariq-white text-sm md:text-base">
                            {booking.customer_name}
                          </p>
                          <div className="flex items-center text-xs md:text-sm text-bariq-grey mt-1">
                            <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">
                              {booking.customer_email}
                            </span>
                          </div>
                          {booking.customer_phone && (
                            <div className="flex items-center text-xs md:text-sm text-bariq-grey mt-0.5">
                              <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                              {booking.customer_phone}
                            </div>
                          )}
                          {booking.notes && (
                            <div className="text-xs text-bariq-grey-light mt-1">
                              🚗 {booking.notes}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-3 md:px-4">
                        <div>
                          <p className="font-semibold text-bariq-white text-sm md:text-base">
                            {booking.service?.name || "Onbekend"}
                          </p>
                          <div className="flex items-center text-xs md:text-sm text-bariq-grey mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {booking.service?.duration} min
                          </div>
                          <div className="text-sm font-bold text-bariq-red mt-1">
                            €{booking.service?.price}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3 md:px-4">
                        <p className="font-medium text-bariq-white text-sm">
                          {new Date(booking.start_time).toLocaleDateString(
                            "nl-NL",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-sm text-bariq-grey mt-0.5">
                          {new Date(booking.start_time).toLocaleTimeString(
                            "nl-NL",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </td>
                      <td className="py-4 px-3 md:px-4">
                        <span
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>
                      <td className="py-4 px-3 md:px-4">
                        <div className="flex gap-2">
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              updateBookingStatus(booking.id, e.target.value)
                            }
                            className="bg-gray-800 border border-gray-700 rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm text-bariq-white hover:border-bariq-red transition-colors focus:outline-none focus:border-bariq-red"
                          >
                            <option value="confirmed">Bevestigd</option>
                            <option value="completed">Voltooid</option>
                            <option value="cancelled">Geannuleerd</option>
                          </select>
                          <button
                            onClick={() => sendReminder(booking)}
                            className="bg-blue-600 hover:bg-blue-700 px-2 md:px-3 py-1.5 rounded-lg text-xs md:text-sm transition-colors flex items-center gap-1"
                            title="Stuur herinnering"
                          >
                            <Send className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
