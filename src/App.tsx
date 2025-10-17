import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import DienstenPrijzenPage from "./pages/DienstenPrijzenPage";
import PackagesPage from "./pages/PackagesPage"; // Legacy
import BookingPage from "./pages/BookingPage";
import BookingSystemPage from "./pages/BookingSystemPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import KentekenCheckPage from "./pages/KentekenCheckPage";
import ServicegebiedPage from "./pages/ServicegebiedPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";
import OverPage from "./pages/OverPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="diensten" element={<DienstenPrijzenPage />} />
            <Route path="prijzen" element={<DienstenPrijzenPage />} />
            <Route path="pakketten" element={<PackagesPage />} />{" "}
            {/* Legacy route */}
            <Route path="boeken" element={<BookingPage />} />
            <Route path="booking-system" element={<BookingSystemPage />} />
            <Route path="admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="kenteken-check" element={<KentekenCheckPage />} />
            <Route
              path="servicegebied/amsterdam"
              element={<ServicegebiedPage />}
            />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="over" element={<OverPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
