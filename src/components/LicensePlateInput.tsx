import React, { useState } from 'react';
import { Search, Car, Calendar, Palette, Zap, Check, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import { 
  fetchVehicleData, 
  calculatePricing, 
  formatVehicleInfo, 
  validateLicensePlate,
  formatLicensePlate,
  type RDWVehicleData,
  type VehiclePricing 
} from '../utils/rdwApi';

interface LicensePlateInputProps {
  onSubmit?: (licensePlate: string, vehicleData?: RDWVehicleData, pricing?: VehiclePricing) => void;
}

interface VehicleResult {
  vehicleData: RDWVehicleData;
  basicPricing: VehiclePricing;
  premiumPricing: VehiclePricing;
  deluxePricing: VehiclePricing;
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
      
      const basicPricing = calculatePricing(vehicleData, 'basic');
      const premiumPricing = calculatePricing(vehicleData, 'premium');
      const deluxePricing = calculatePricing(vehicleData, 'deluxe');
      const vehicleInfo = formatVehicleInfo(vehicleData);
      
      const vehicleResult: VehicleResult = {
        vehicleData,
        basicPricing,
        premiumPricing,
        deluxePricing,
        vehicleInfo,
      };
      
      setResult(vehicleResult);
      
      if (onSubmit) {
        onSubmit(licensePlate, vehicleData, premiumPricing);
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
    const { vehicleInfo, basicPricing, premiumPricing, deluxePricing } = result;
    
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto border border-gray-700">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-display font-semibold text-gray-200 mb-2">
            Voertuiggegevens & Prijzen
          </h3>
          <p className="text-gray-400">
            Kenteken: <span className="font-semibold">{vehicleInfo.licensePlate}</span>
          </p>
        </div>
        
        {/* Vehicle Info */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Car className="w-5 h-5 text-primary-bright mr-2" />
              <div>
                <p className="text-sm text-gray-400">Voertuig</p>
                <p className="font-semibold text-gray-200">{vehicleInfo.displayName}</p>
              </div>
            </div>
            
            {vehicleInfo.year && (
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-primary-bright mr-2" />
                <div>
                  <p className="text-sm text-gray-400">Bouwjaar</p>
                  <p className="font-semibold text-gray-200">{vehicleInfo.year}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <Palette className="w-5 h-5 text-primary-bright mr-2" />
              <div>
                <p className="text-sm text-gray-400">Kleur</p>
                <p className="font-semibold text-gray-200 capitalize">{vehicleInfo.color.toLowerCase()}</p>
              </div>
            </div>
            
            {vehicleInfo.isElectric && (
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-primary-bright mr-2" />
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="font-semibold text-gray-200">Elektrisch</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Pricing Cards - Redesigned to match PackageCard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Basic Clean */}
          <motion.div 
            className="border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-gray-800 p-6">
              <h4 className="text-xl font-display font-semibold mb-2 text-gray-200">Basic Clean</h4>
              
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-200">€{basicPricing.finalPrice}</span>
                  <span className="text-lg text-red-500 line-through ml-2">€89</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">incl. BTW</div>
                <div className="text-red-600 font-medium text-xs mt-1">
                  🔥 Prijs stijgt naar €89
                </div>
              </div>
              
              <p className="text-gray-400 mb-6">Perfecte optie voor regelmatig onderhoud en een frisse uitstraling.</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Exterieur handwas</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Wielen en velgen reiniging</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Interieur stofzuigen</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Ramen binnen en buiten</span>
                </li>
              </ul>
              
              <Button to="/boeken" variant="outline" fullWidth size="large">
                BOEK BASIC - €{basicPricing.finalPrice}
              </Button>
            </div>
          </motion.div>
          
          {/* Premium Clean */}
          <motion.div 
            className="border-2 border-primary-bright rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            {/* Badge */}
            <div className="bg-primary-bright text-white text-center py-2 font-medium text-sm flex items-center justify-center">
              <Star className="w-4 h-4 mr-1" />
              MOST POPULAR
            </div>
            
            <div className="bg-gray-800 p-6">
              <h4 className="text-xl font-display font-semibold mb-2 text-gray-200">Premium Clean</h4>
              
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-200">€{premiumPricing.finalPrice}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">incl. BTW</div>
              </div>
              
              <p className="text-gray-400 mb-6">Complete reiniging voor een showroom-ervaring.</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Alles van Basic Clean</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Dieptereiniging interieur</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Lederbehandeling</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Geuren verwijderen</span>
                </li>
              </ul>
              
              <Button to="/boeken" variant="primary" fullWidth size="large">
                Boek Premium - €{premiumPricing.finalPrice}
              </Button>
            </div>
          </motion.div>
          
          {/* Deluxe Clean */}
          <motion.div 
            className="border-2 border-purple-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            {/* Badge */}
            <div className="bg-purple-500 text-white text-center py-2 font-medium text-sm flex items-center justify-center">
              <Shield className="w-4 h-4 mr-1" />
              LUXURY EDITION
            </div>
            
            <div className="bg-gray-800 p-6">
              <h4 className="text-xl font-display font-semibold mb-2 text-gray-200">Deluxe Clean</h4>
              
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-purple-600">€{deluxePricing.finalPrice}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">incl. BTW</div>
                <div className="text-gray-400 text-sm mt-1">Luxury!</div>
              </div>
              
              <p className="text-gray-400 mb-6">Ultieme luxe behandeling met exclusieve premium service.</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Alles van Premium Clean</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Professionele ceramic coating</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Premium lederbehandeling</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Velgen dieptereiniging</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-400">Banden glans behandeling</span>
                </li>
              </ul>
              
              <Button to="/boeken" variant="secondary" fullWidth size="large">
                Boek Deluxe - €{deluxePricing.finalPrice}
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Pricing Factors */}
        {(basicPricing.factors.size !== 1 || basicPricing.factors.age !== 1 || basicPricing.factors.luxury !== 1) && (
          <div className="bg-red-900/20 p-4 rounded-lg mb-6">
            <h5 className="font-semibold text-red-300 mb-2">Prijsaanpassingen</h5>
            <div className="text-sm text-red-200 space-y-1">
              {basicPricing.factors.size !== 1 && (
                <p>• Voertuiggrootte: {basicPricing.factors.size > 1 ? '+' : ''}{Math.round((basicPricing.factors.size - 1) * 100)}%</p>
              )}
              {basicPricing.factors.age !== 1 && (
                <p>• Leeftijd voertuig: {basicPricing.factors.age > 1 ? '+' : ''}{Math.round((basicPricing.factors.age - 1) * 100)}%</p>
              )}
              {basicPricing.factors.luxury !== 1 && (
                <p>• Premium merk: {basicPricing.factors.luxury > 1 ? '+' : ''}{Math.round((basicPricing.factors.luxury - 1) * 100)}%</p>
              )}
            </div>
          </div>
        )}
        
        {/* Dynamic Urgency Message */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to="/boeken" variant="outline" size="large">
            Boek Basic (€{basicPricing.finalPrice} incl. BTW)
          </Button>
          <Button to="/boeken" variant="primary" size="large">
            Kies Premium (€{premiumPricing.finalPrice} incl. BTW)
          </Button>
          <Button to="/boeken" variant="secondary" size="large">
            Boek Deluxe (€{deluxePricing.finalPrice} incl. BTW)
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h3 className="text-xl font-display font-semibold mb-4 text-gray-200">
        Voer je kenteken in
      </h3>
      <p className="text-gray-400 mb-4">
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
              className="w-full py-3 px-4 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-500 text-lg uppercase"
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
      
      <div className="mt-4 text-xs text-gray-400">
        <p>Gegevens worden opgehaald van de RDW (Rijksdienst voor het Wegverkeer)</p>
      </div>
    </div>
  );
};

export default LicensePlateInput;