import React, { useState } from 'react';
import { Search, Car, Calendar, Palette, Zap, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import { 
  fetchVehicleData, 
  formatVehicleInfo, 
  validateLicensePlate,
  formatLicensePlate,
  type RDWVehicleData
} from '../utils/rdwApi';

interface LicensePlateInputProps {
  onSubmit?: (licensePlate: string, vehicleData?: RDWVehicleData) => void;
}

interface VehicleResult {
  vehicleData: RDWVehicleData;
  vehicleInfo: ReturnType<typeof formatVehicleInfo>;
}

const LicensePlateInput: React.FC<LicensePlateInputProps> = ({ onSubmit }) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VehicleResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!licensePlate.trim()) {
      setError('Voer een kenteken in.');
      return;
    }
    
    if (!validateLicensePlate(licensePlate)) {
      setError('Voer een geldig Nederlands kenteken in (bijv. AB-123-C).');
      return;
    }
    
    setError('');
    setIsLoading(true);
    setResult(null);
    
    try {
      const vehicleData = await fetchVehicleData(licensePlate);
      
      if (!vehicleData) {
        setError('Geen voertuiggegevens gevonden voor dit kenteken.');
        setIsLoading(false);
        return;
      }
      
      const vehicleInfo = formatVehicleInfo(vehicleData);
      
      const vehicleResult: VehicleResult = {
        vehicleData,
        vehicleInfo,
      };
      
      setResult(vehicleResult);
      
      if (onSubmit) {
        onSubmit(licensePlate, vehicleData);
      }
    } catch (error: any) {
      console.error('Error fetching vehicle data:', error);
      setError(error.message || 'Er is een fout opgetreden bij het ophalen van de voertuiggegevens.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setLicensePlate('');
    setError('');
  };

  if (result) {
    const { vehicleInfo } = result;
    
    // Bepaal klasse op basis van voertuigtype
    const isKlasseB = vehicleInfo.segment === 'large' || vehicleInfo.segment === 'premium';
    const prijs = isKlasseB ? 120 : 90;
    const klasse = isKlasseB ? 'B' : 'A';
    const klasseOmschrijving = isKlasseB ? 'Premium & Large' : 'Compact & Midsize';
    
    return (
      <div className="bg-bariq-black-lighter p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-4xl mx-auto border border-gray-800">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-display font-semibold text-bariq-white mb-3">
            Voertuiggegevens & Prijsindicatie
          </h3>
          <p className="text-bariq-grey text-lg">
            Kenteken: <span className="font-semibold text-bariq-white">{vehicleInfo.licensePlate}</span>
          </p>
        </div>
        
        {/* Vehicle Info */}
        <div className="bg-bariq-black p-6 rounded-xl mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Car className="w-6 h-6 text-bariq-red flex-shrink-0" />
              <div>
                <p className="text-sm text-bariq-grey">Merk</p>
                <p className="font-semibold text-bariq-white">{vehicleInfo.merk}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-bariq-red flex-shrink-0" />
              <div>
                <p className="text-sm text-bariq-grey">Model</p>
                <p className="font-semibold text-bariq-white">{vehicleInfo.model}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-bariq-red flex-shrink-0" />
              <div>
                <p className="text-sm text-bariq-grey">Bouwjaar</p>
                <p className="font-semibold text-bariq-white">{vehicleInfo.bouwjaar}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-bariq-red flex-shrink-0" />
              <div>
                <p className="text-sm text-bariq-grey">Segment</p>
                <p className="font-semibold text-bariq-white capitalize">{vehicleInfo.segment}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pricing Information */}
        <div className="bg-gradient-to-br from-bariq-red to-red-700 p-8 md:p-12 rounded-2xl text-center mb-8">
          <div className="inline-block bg-white/10 px-4 py-2 rounded-full mb-4">
            <span className="text-white font-semibold">Voertuigklasse {klasse}</span>
          </div>
          <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">
            €{prijs}
          </h4>
          <p className="text-white/90 mb-1">{klasseOmschrijving}</p>
          <p className="text-white/80 text-sm">Basispakket inbegrepen</p>
        </div>

        {/* What's Included */}
        <div className="bg-bariq-black p-6 md:p-8 rounded-xl mb-8 border border-gray-800">
          <h4 className="text-xl font-semibold text-bariq-white mb-6 text-center">
            Wat is inbegrepen in het basispakket?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-0.5" />
              <span className="text-bariq-white">Professionele exterieur handwas (PH-neutraal)</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-0.5" />
              <span className="text-bariq-white">Wielen & velgen dieptereiniging</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-0.5" />
              <span className="text-bariq-white">Interieur volledig stofzuigen</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-0.5" />
              <span className="text-bariq-white">Dashboard & middenconsole reinigen</span>
            </div>
            <div className="flex items-start gap-3 md:col-span-2 justify-center">
              <Check className="w-6 h-6 text-bariq-red flex-shrink-0 mt-0.5" />
              <span className="text-bariq-white">Ramen binnen & buiten kristalhelder</span>
            </div>
          </div>
        </div>

        {/* Extra's Upsell */}
        <div className="bg-bariq-black-lighter p-6 rounded-xl mb-8 border border-gray-800">
          <h4 className="text-lg font-semibold text-bariq-white mb-4 text-center">
            Wil je extra's toevoegen?
          </h4>
          <p className="text-bariq-grey text-center mb-4">
            Upgrade je pakket met dieptereiniging, geurverwijdering, en meer vanaf €20
          </p>
          <div className="text-center">
            <a 
              href="/diensten#extras"
              className="text-bariq-red hover:text-bariq-red-hover font-semibold inline-flex items-center gap-2"
            >
              Bekijk alle extra's
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button to="/booking-system" variant="primary" size="large" className="flex-1">
            Boek Nu - €{prijs}
          </Button>
          <Button to="/diensten" variant="outline" size="large" className="flex-1">
            Meer Info
          </Button>
        </div>
        
        <div className="text-center mt-4">
          <Button
            variant="text"
            onClick={handleReset}
            size="small"
          >
            Nieuw Kenteken Invoeren
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bariq-black-lighter p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto border border-gray-800">
      <h3 className="text-2xl font-display font-semibold mb-4 text-bariq-white text-center">
        Voer je kenteken in
      </h3>
      <p className="text-bariq-grey mb-6 text-center">
        Bekijk direct je voertuiggegevens en prijsindicatie door je kenteken in te voeren.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="AB-123-C"
              value={licensePlate}
              onChange={(e) => {
                const formatted = formatLicensePlate(e.target.value);
                setLicensePlate(formatted);
                if (error) setError('');
              }}
              className="w-full py-3 px-4 bg-bariq-black-lighter border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-bariq-red focus:border-bariq-red placeholder-bariq-grey text-bariq-white text-lg uppercase"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          size="large"
          icon={<Search size={18} />}
          disabled={isLoading}
        >
          {isLoading ? 'Gegevens ophalen...' : 'Check Kenteken'}
        </Button>
      </form>
      
      <div className="mt-6 text-sm text-bariq-grey text-center">
        <p>Gegevens worden opgehaald van de RDW (Rijksdienst voor het Wegverkeer)</p>
      </div>
    </div>
  );
};

export default LicensePlateInput;