import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Star,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Clock,
  Filter,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import {
  getBookings,
  getReviews,
  getCustomers,
  getStatistics,
  updateBooking,
  updateReview,
  deleteBooking,
  deleteReview,
  getStatusColor,
  getStatusText,
  formatDate,
  type Booking,
  type Review,
  type Customer,
} from "../utils/adminData";
import {
  getEmailLogs,
  clearEmailLogs,
  type EmailLog,
} from "../utils/emailService";

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authAttempts, setAuthAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "bookings" | "reviews" | "customers" | "emails"
  >("dashboard");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showEmailDetails, setShowEmailDetails] = useState<string | null>(null);

  // Admin password (in production, this should be handled server-side)
  const ADMIN_PASSWORD = "bariq2025admin";
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

  // Check if user is locked out
  useEffect(() => {
    const lockoutEnd = localStorage.getItem("admin_lockout_end");
    if (lockoutEnd && new Date().getTime() < parseInt(lockoutEnd)) {
      setIsLocked(true);
      setAuthAttempts(MAX_ATTEMPTS);
    }
  }, []);

  // Handle authentication
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      setAuthError("Account is vergrendeld. Probeer het later opnieuw.");
      return;
    }

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
      setAuthAttempts(0);
      localStorage.removeItem("admin_lockout_end");
    } else {
      const newAttempts = authAttempts + 1;
      setAuthAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        const lockoutEnd = new Date().getTime() + LOCKOUT_TIME;
        localStorage.setItem("admin_lockout_end", lockoutEnd.toString());
        setAuthError(
          `Te veel mislukte pogingen. Account vergrendeld voor 15 minuten.`
        );
      } else {
        setAuthError(
          `Onjuist wachtwoord. ${MAX_ATTEMPTS - newAttempts} pogingen over.`
        );
      }
      setPassword("");
    }
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h1 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-charcoal-600">
                Toegang beperkt tot geautoriseerd personeel
              </p>
            </div>

            {isLocked && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <Lock className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-medium text-red-800">
                    Account Vergrendeld
                  </span>
                </div>
                <p className="text-red-700 text-sm">
                  Te veel mislukte inlogpogingen. Probeer het over 15 minuten
                  opnieuw.
                </p>
              </div>
            )}

            <form onSubmit={handleAuth}>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-charcoal-700 mb-2 font-medium"
                >
                  Admin Wachtwoord
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 border ${
                    authError ? "border-red-500" : "border-charcoal-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="Voer admin wachtwoord in"
                  disabled={isLocked}
                />
                {authError && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {authError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                disabled={isLocked || !password.trim()}
                icon={<Lock size={18} />}
              >
                {isLocked ? "Account Vergrendeld" : "Inloggen"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">
                    Beveiligingsmaatregelen
                  </span>
                </div>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Maximaal {MAX_ATTEMPTS} inlogpogingen</li>
                  <li>• 15 minuten vergrendeling na mislukte pogingen</li>
                  <li>• Alle activiteiten worden gelogd</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button to="/" variant="outline" size="small">
                Terug naar Website
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Get data (only after authentication)
  const bookings = getBookings();
  const reviews = getReviews();
  const customers = getCustomers();
  const statistics = getStatistics();
  const emailLogs = getEmailLogs();

  // Filter functions
  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filterStatus);

  const filteredReviews =
    filterStatus === "all"
      ? reviews
      : reviews.filter((review) => review.status === filterStatus);

  // Action handlers
  const handleBookingStatusChange = (
    bookingId: string,
    newStatus: Booking["status"]
  ) => {
    updateBooking(bookingId, { status: newStatus });
    window.location.reload(); // Simple refresh for demo
  };

  const handleReviewStatusChange = (
    reviewId: string,
    newStatus: Review["status"]
  ) => {
    updateReview(reviewId, { status: newStatus });
    window.location.reload(); // Simple refresh for demo
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm("Weet je zeker dat je deze boeking wilt verwijderen?")) {
      deleteBooking(bookingId);
      window.location.reload();
    }
  };

  const handleDeleteReview = (reviewId: string) => {
    if (confirm("Weet je zeker dat je deze review wilt verwijderen?")) {
      deleteReview(reviewId);
      window.location.reload();
    }
  };

  const handleClearEmailLogs = () => {
    if (confirm("Weet je zeker dat je alle email logs wilt wissen?")) {
      clearEmailLogs();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setAuthError("");
  };

  const exportData = (type: "bookings" | "reviews" | "customers") => {
    let data;
    let filename;

    switch (type) {
      case "bookings":
        data = bookings;
        filename = "bariq-bookings.json";
        break;
      case "reviews":
        data = reviews;
        filename = "bariq-reviews.json";
        break;
      case "customers":
        data = customers;
        filename = "bariq-customers.json";
        break;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-charcoal-50 pt-24">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <SectionTitle
            title="Admin Dashboard"
            subtitle="Beheer boekingen, reviews en klantgegevens"
            alignment="left"
          />
          <Button
            onClick={handleLogout}
            variant="outline"
            icon={<Lock size={16} />}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Uitloggen
          </Button>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">
              Beveiligde Sessie Actief
            </span>
            <span className="ml-auto text-green-700 text-sm">
              Ingelogd als Administrator
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-charcoal-200">
          {[
            { id: "dashboard", label: "Dashboard", icon: TrendingUp },
            { id: "bookings", label: "Boekingen", icon: Calendar },
            { id: "reviews", label: "Reviews", icon: Star },
            { id: "customers", label: "Klanten", icon: Users },
            { id: "emails", label: "Email Logs", icon: Mail },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-primary-600 border-b-2 border-primary-600"
                  : "text-charcoal-600 hover:text-primary-600"
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal-500 text-sm">
                      Totaal Boekingen
                    </p>
                    <p className="text-2xl font-bold text-charcoal-900">
                      {statistics.totalBookings}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary-600" />
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal-500 text-sm">Klanten</p>
                    <p className="text-2xl font-bold text-charcoal-900">
                      {statistics.totalCustomers}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal-500 text-sm">
                      Gemiddelde Rating
                    </p>
                    <p className="text-2xl font-bold text-charcoal-900">
                      {statistics.averageRating}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal-500 text-sm">Omzet (geschat)</p>
                    <p className="text-2xl font-bold text-charcoal-900">
                      €{statistics.totalRevenue}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Recente Boekingen
                </h3>
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex justify-between items-center p-3 bg-charcoal-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{booking.name}</p>
                        <p className="text-sm text-charcoal-600">
                          {formatDate(booking.date)} - {booking.time}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recente Reviews</h3>
                <div className="space-y-3">
                  {reviews.slice(0, 5).map((review) => (
                    <div
                      key={review.id}
                      className="flex justify-between items-center p-3 bg-charcoal-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-charcoal-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          review.status
                        )}`}
                      >
                        {getStatusText(review.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-charcoal-300 rounded-md"
                >
                  <option value="all">Alle statussen</option>
                  <option value="pending">In afwachting</option>
                  <option value="confirmed">Bevestigd</option>
                  <option value="completed">Voltooid</option>
                  <option value="cancelled">Geannuleerd</option>
                </select>
              </div>
              <Button
                onClick={() => exportData("bookings")}
                variant="outline"
                icon={<Download size={16} />}
              >
                Exporteer
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-charcoal-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Klant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Datum & Tijd
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Voertuig
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Pakket
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Acties
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-charcoal-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{booking.name}</p>
                            <p className="text-sm text-charcoal-600">
                              {booking.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">
                              {formatDate(booking.date)}
                            </p>
                            <p className="text-sm text-charcoal-600">
                              {booking.time}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">
                              {booking.carBrand} {booking.carModel}
                            </p>
                            <p className="text-sm text-charcoal-600">
                              {booking.licensePlate}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="capitalize">
                            {booking.packageType}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              handleBookingStatusChange(
                                booking.id,
                                e.target.value as Booking["status"]
                              )
                            }
                            className={`px-2 py-1 rounded text-xs font-medium border-0 ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            <option value="pending">In afwachting</option>
                            <option value="confirmed">Bevestigd</option>
                            <option value="completed">Voltooid</option>
                            <option value="cancelled">Geannuleerd</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="text-primary-600 hover:text-primary-800"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-charcoal-300 rounded-md"
                >
                  <option value="all">Alle statussen</option>
                  <option value="pending">In afwachting</option>
                  <option value="approved">Goedgekeurd</option>
                  <option value="rejected">Afgewezen</option>
                </select>
              </div>
              <Button
                onClick={() => exportData("reviews")}
                variant="outline"
                icon={<Download size={16} />}
              >
                Exporteer
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-charcoal-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Klant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Rating
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Auto
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Datum
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Acties
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-200">
                    {filteredReviews.map((review) => (
                      <tr key={review.id} className="hover:bg-charcoal-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-sm text-charcoal-600">
                              {review.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-charcoal-300"
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span>{review.carType || "Niet opgegeven"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span>{formatDate(review.createdAt)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={review.status}
                            onChange={(e) =>
                              handleReviewStatusChange(
                                review.id,
                                e.target.value as Review["status"]
                              )
                            }
                            className={`px-2 py-1 rounded text-xs font-medium border-0 ${getStatusColor(
                              review.status
                            )}`}
                          >
                            <option value="pending">In afwachting</option>
                            <option value="approved">Goedgekeurd</option>
                            <option value="rejected">Afgewezen</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedReview(review)}
                              className="text-primary-600 hover:text-primary-800"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                onClick={() => exportData("customers")}
                variant="outline"
                icon={<Download size={16} />}
              >
                Exporteer
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-charcoal-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Naam
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Adres
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Boekingen
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Laatste Boeking
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-200">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-charcoal-50">
                        <td className="px-4 py-3">
                          <p className="font-medium">{customer.name}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm">{customer.email}</p>
                            <p className="text-sm text-charcoal-600">
                              {customer.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm">{customer.address}</p>
                            <p className="text-sm text-charcoal-600">
                              {customer.postalCode} {customer.city}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium">
                            {customer.totalBookings}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span>
                            {customer.lastBooking
                              ? formatDate(customer.lastBooking)
                              : "Nooit"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Email Logs Tab */}
        {activeTab === "emails" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Email Logs</h3>
              <Button
                onClick={handleClearEmailLogs}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
                icon={<Trash2 size={16} />}
              >
                Wis Logs
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-charcoal-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Ontvanger
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Onderwerp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Datum
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                        Acties
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-200">
                    {emailLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-charcoal-50">
                        <td className="px-4 py-3">
                          <span className="capitalize">
                            {log.type.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">{log.recipient}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">{log.subject}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              log.status === "sent"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {log.status === "sent" ? "Verzonden" : "Mislukt"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">
                            {log.timestamp.toLocaleString("nl-NL")}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              setShowEmailDetails(
                                showEmailDetails === log.id ? null : log.id
                              )
                            }
                            className="text-primary-600 hover:text-primary-800"
                          >
                            {showEmailDetails === log.id ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Email Details */}
            {showEmailDetails && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                {(() => {
                  const log = emailLogs.find((l) => l.id === showEmailDetails);
                  if (!log) return null;

                  return (
                    <div>
                      <h4 className="font-semibold mb-4">Email Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-charcoal-700">
                            Type:
                          </p>
                          <p className="text-sm text-charcoal-600 capitalize">
                            {log.type.replace("_", " ")}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal-700">
                            Status:
                          </p>
                          <p className="text-sm text-charcoal-600">
                            {log.status === "sent" ? "Verzonden" : "Mislukt"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal-700">
                            Ontvanger:
                          </p>
                          <p className="text-sm text-charcoal-600">
                            {log.recipient}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal-700">
                            Datum:
                          </p>
                          <p className="text-sm text-charcoal-600">
                            {log.timestamp.toLocaleString("nl-NL")}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-charcoal-700">
                            Onderwerp:
                          </p>
                          <p className="text-sm text-charcoal-600">
                            {log.subject}
                          </p>
                        </div>
                        {log.bookingId && (
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-charcoal-700">
                              Boeking ID:
                            </p>
                            <p className="text-sm text-charcoal-600">
                              #{log.bookingId}
                            </p>
                          </div>
                        )}
                        {log.errorMessage && (
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-red-700">
                              Foutmelding:
                            </p>
                            <p className="text-sm text-red-600">
                              {log.errorMessage}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Boeking Details</h3>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-charcoal-500 hover:text-charcoal-700"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-charcoal-700">Klant:</p>
                      <p className="text-charcoal-600">
                        {selectedBooking.name}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">Email:</p>
                      <p className="text-charcoal-600">
                        {selectedBooking.email}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">Telefoon:</p>
                      <p className="text-charcoal-600">
                        {selectedBooking.phone}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">
                        Datum & Tijd:
                      </p>
                      <p className="text-charcoal-600">
                        {formatDate(selectedBooking.date)} om{" "}
                        {selectedBooking.time}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">Voertuig:</p>
                      <p className="text-charcoal-600">
                        {selectedBooking.carBrand} {selectedBooking.carModel}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">Kenteken:</p>
                      <p className="text-charcoal-600">
                        {selectedBooking.licensePlate}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">Pakket:</p>
                      <p className="text-charcoal-600 capitalize">
                        {selectedBooking.packageType}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">
                        Parkeertype:
                      </p>
                      <p className="text-charcoal-600 capitalize">
                        {selectedBooking.parkingType}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-charcoal-700">Adres:</p>
                    <p className="text-charcoal-600">
                      {selectedBooking.address}
                      <br />
                      {selectedBooking.postalCode} {selectedBooking.city}
                    </p>
                  </div>

                  {selectedBooking.notes && (
                    <div>
                      <p className="font-medium text-charcoal-700">
                        Opmerkingen:
                      </p>
                      <p className="text-charcoal-600">
                        {selectedBooking.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-charcoal-500" />
                      <a
                        href={`tel:${selectedBooking.phone}`}
                        className="text-primary-600 hover:underline"
                      >
                        Bel klant
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-charcoal-500" />
                      <a
                        href={`mailto:${selectedBooking.email}`}
                        className="text-primary-600 hover:underline"
                      >
                        Email klant
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-charcoal-500" />
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          selectedBooking.address + ", " + selectedBooking.city
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        Toon op kaart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Details Modal */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Review Details</h3>
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="text-charcoal-500 hover:text-charcoal-700"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-charcoal-700">Naam:</p>
                      <p className="text-charcoal-600">{selectedReview.name}</p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">Email:</p>
                      <p className="text-charcoal-600">
                        {selectedReview.email}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">Auto:</p>
                      <p className="text-charcoal-600">
                        {selectedReview.carType || "Niet opgegeven"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">Datum:</p>
                      <p className="text-charcoal-600">
                        {formatDate(selectedReview.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-charcoal-700">Rating:</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < selectedReview.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-charcoal-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-charcoal-600">
                        ({selectedReview.rating}/5)
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-charcoal-700">Review:</p>
                    <p className="text-charcoal-600 mt-1">
                      {selectedReview.comment}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={() => {
                        handleReviewStatusChange(selectedReview.id, "approved");
                        setSelectedReview(null);
                      }}
                      variant="primary"
                      size="small"
                    >
                      Goedkeuren
                    </Button>
                    <Button
                      onClick={() => {
                        handleReviewStatusChange(selectedReview.id, "rejected");
                        setSelectedReview(null);
                      }}
                      variant="outline"
                      size="small"
                    >
                      Afwijzen
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
