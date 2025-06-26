import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Clock 
} from 'lucide-react';
import Logo from './Logo';

// TikTok icon component since it's not available in lucide-react
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-primary-silver pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo size="medium" />
            <p className="mt-4 text-text-muted max-w-xs">
              De premium carwash aan huis in Nederland. Geen wachttijden, geen gedoe – Bariq komt naar jou toe.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="https://www.instagram.com/bariq_detailing/" className="text-text-muted hover:text-primary-bright transition-colors" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://www.tiktok.com/@bariq_detailing" className="text-text-muted hover:text-primary-bright transition-colors" aria-label="TikTok">
                <TikTokIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-primary-silver">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-muted hover:text-primary-bright transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pakketten" className="text-text-muted hover:text-primary-bright transition-colors">
                  Pakketten
                </Link>
              </li>
              <li>
                <Link to="/boeken" className="text-text-muted hover:text-primary-bright transition-colors">
                  Boeken
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-text-muted hover:text-primary-bright transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-primary-silver">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-primary-bright flex-shrink-0 mt-0.5" />
                <span className="text-text-muted">06 8552 3584</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-primary-bright flex-shrink-0 mt-0.5" />
                <span className="text-text-muted">info@bariqautocare.nl</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary-bright flex-shrink-0 mt-0.5" />
                <span className="text-text-muted">Amsterdam, Nederland</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-primary-silver">Openingstijden</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary-bright" />
                <span className="text-text-muted">Ma-Vr: 8:00 - 18:00</span>
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary-bright" />
                <span className="text-text-muted">Za: 9:00 - 17:00</span>
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary-bright" />
                <span className="text-text-muted">Zo: Gesloten</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-ocean/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Bariq Autocare. Alle rechten voorbehouden.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-text-muted hover:text-primary-bright text-sm transition-colors">
              Privacybeleid
            </Link>
            <Link to="/voorwaarden" className="text-text-muted hover:text-primary-bright text-sm transition-colors">
              Algemene Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;