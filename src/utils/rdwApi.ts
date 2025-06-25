// RDW API integration for Dutch vehicle data
export interface RDWVehicleData {
  kenteken: string;
  voertuigsoort: string;
  merk: string;
  handelsbenaming: string;
  type_gasinstallatie?: string;
  aantal_zitplaatsen?: string;
  eerste_kleur: string;
  tweede_kleur?: string;
  aantal_cilinders?: string;
  cilinder_inhoud?: string;
  massa_ledig_voertuig?: string;
  toegestane_maximum_massa_voertuig?: string;
  datum_eerste_toelating: string;
  datum_eerste_tenaamstelling_in_nederland: string;
  wacht_op_keuren?: string;
  catalogusprijs?: string;
  wam_verzekerd?: string;
  maximale_constructie_snelheid?: string;
  laadvermogen?: string;
  oplegger_geremd?: string;
  aanhangwagen_autonoom_geremd?: string;
  aanhangwagen_middenas_geremd?: string;
  aantal_staanplaatsen?: string;
  aantal_deuren?: string;
  aantal_wielen?: string;
  afstand_hart_koppeling_tot_achterzijde_voertuig?: string;
  afstand_voorzijde_voertuig_tot_hart_koppeling?: string;
  afwijkende_maximum_snelheid?: string;
  lengte?: string;
  breedte?: string;
  europese_voertuigcategorie?: string;
  europese_voertuigcategorie_toevoeging?: string;
  europese_uitvoeringcategorie_toevoeging?: string;
  plaats_chassisnummer?: string;
  technische_max_massa_trekken_ongeremd?: string;
  technische_max_massa_trekken_geremd?: string;
  type?: string;
  type_toevoeging?: string;
  variant?: string;
  uitvoering?: string;
  volgnummer_wijziging_eu_typegoedkeuring?: string;
  vermogen_massarijklaar?: string;
  wielbasis?: string;
  export_indicator?: string;
  openstaande_terugroepactie_indicator?: string;
  vervaldatum_apk?: string;
  datum_tenaamstelling?: string;
  vervaldatum_tachograaf?: string;
  taxi_indicator?: string;
  maximum_massa_samenstelling?: string;
  aantal_rolstoelplaatsen?: string;
  maximum_ondersteunende_snelheid?: string;
  jaar_laatste_registratie_tellerstand?: string;
  tellerstandoordeel?: string;
  code_toelichting_tellerstandoordeel?: string;
  tenaamstelling_dt?: string;
  vervaldatum_apk_dt?: string;
  datum_eerste_toelating_dt?: string;
  datum_eerste_tenaamstelling_in_nederland_dt?: string;
  vervaldatum_tachograaf_dt?: string;
  maximum_last_onder_de_vooras_sen?: string;
  type_remsysteem_voertuig_code?: string;
  rupsonderstelconfiguratie?: string;
  wielbasis_voertuig_minimum?: string;
  wielbasis_voertuig_maximum?: string;
  lengte_voertuig_minimum?: string;
  lengte_voertuig_maximum?: string;
  breedte_voertuig_minimum?: string;
  breedte_voertuig_maximum?: string;
  hoogte_voertuig?: string;
  hoogte_voertuig_minimum?: string;
  hoogte_voertuig_maximum?: string;
  massa_bedrijfsklaar_minimaal?: string;
  massa_bedrijfsklaar_maximaal?: string;
  technische_max_massa_voertuig?: string;
  massa_alt_aandr_syst_min?: string;
  massa_alt_aandr_syst_max?: string;
  vermogen_brom_snorfiets?: string;
  bromfiets_rijbewijs_categorie_code?: string;
  maximum_constructie_snelheid_brom_snorfiets?: string;
  certificaatsoort?: string;
  g3_installatie_aanwezig?: string;
  g3_installatie_datum?: string;
  g3_installatie_datum_dt?: string;
  ovi_aanwezig?: string;
  retrofit_roetfilter_aanwezig?: string;
  retrofit_roetfilter_datum?: string;
  retrofit_roetfilter_datum_dt?: string;
  api_gekentekende_voertuigen_assen?: string;
  api_gekentekende_voertuigen_brandstof?: string;
  api_gekentekende_voertuigen_carrosserie?: string;
  api_gekentekende_voertuigen_carrosserie_specifiek?: string;
  api_gekentekende_voertuigen_voertuigklasse?: string;
}

export interface VehiclePricing {
  basePrice: number;
  finalPrice: number;
  vehicleType: 'small' | 'medium' | 'large' | 'luxury';
  packageType: 'basic' | 'premium' | 'deluxe';
  factors: {
    size: number;
    age: number;
    luxury: number;
  };
}

// RDW API endpoint
const RDW_API_BASE = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json';

// Normalize license plate format for API call
const normalizeLicensePlate = (licensePlate: string): string => {
  return licensePlate.replace(/[-\s]/g, '').toUpperCase();
};

// Format license plate for display
export const formatLicensePlate = (licensePlate: string): string => {
  const normalized = normalizeLicensePlate(licensePlate);
  
  // Dutch license plate patterns - comprehensive formatting
  if (normalized.length === 6) {
    // 6-character patterns
    if (/^[A-Z]{2}[0-9]{2}[A-Z]{2}$/.test(normalized)) {
      return `${normalized.slice(0, 2)}-${normalized.slice(2, 4)}-${normalized.slice(4, 6)}`;
    }
    if (/^[0-9]{2}[A-Z]{2}[0-9]{2}$/.test(normalized)) {
      return `${normalized.slice(0, 2)}-${normalized.slice(2, 4)}-${normalized.slice(4, 6)}`;
    }
    if (/^[0-9]{2}[A-Z]{3}[0-9]{1}$/.test(normalized)) {
      return `${normalized.slice(0, 2)}-${normalized.slice(2, 5)}-${normalized.slice(5, 6)}`;
    }
    if (/^[A-Z]{2}[0-9]{3}[A-Z]{1}$/.test(normalized)) {
      return `${normalized.slice(0, 2)}-${normalized.slice(2, 5)}-${normalized.slice(5, 6)}`;
    }
    if (/^[A-Z]{1}[0-9]{3}[A-Z]{2}$/.test(normalized)) {
      return `${normalized.slice(0, 1)}-${normalized.slice(1, 4)}-${normalized.slice(4, 6)}`;
    }
    if (/^[0-9]{3}[A-Z]{2}[0-9]{1}$/.test(normalized)) {
      return `${normalized.slice(0, 3)}-${normalized.slice(3, 5)}-${normalized.slice(5, 6)}`;
    }
    if (/^[0-9]{1}[A-Z]{3}[0-9]{2}$/.test(normalized)) {
      return `${normalized.slice(0, 1)}-${normalized.slice(1, 4)}-${normalized.slice(4, 6)}`;
    }
    if (/^[A-Z]{3}[0-9]{2}[A-Z]{1}$/.test(normalized)) {
      return `${normalized.slice(0, 3)}-${normalized.slice(3, 5)}-${normalized.slice(5, 6)}`;
    }
  }
  
  // 7-character patterns
  if (normalized.length === 7) {
    if (/^[0-9]{1}[A-Z]{3}[0-9]{3}$/.test(normalized)) {
      return `${normalized.slice(0, 1)}-${normalized.slice(1, 4)}-${normalized.slice(4, 7)}`;
    }
    if (/^[A-Z]{3}[0-9]{3}[A-Z]{1}$/.test(normalized)) {
      return `${normalized.slice(0, 3)}-${normalized.slice(3, 6)}-${normalized.slice(6, 7)}`;
    }
    if (/^[0-9]{3}[A-Z]{3}[0-9]{1}$/.test(normalized)) {
      return `${normalized.slice(0, 3)}-${normalized.slice(3, 6)}-${normalized.slice(6, 7)}`;
    }
    if (/^[A-Z]{1}[0-9]{3}[A-Z]{3}$/.test(normalized)) {
      return `${normalized.slice(0, 1)}-${normalized.slice(1, 4)}-${normalized.slice(4, 7)}`;
    }
  }
  
  // 8-character patterns (special vehicles)
  if (normalized.length === 8) {
    if (/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{2}$/.test(normalized)) {
      return `${normalized.slice(0, 2)}-${normalized.slice(2, 4)}-${normalized.slice(4, 6)}-${normalized.slice(6, 8)}`;
    }
    if (/^[0-9]{2}[A-Z]{2}[0-9]{2}[A-Z]{2}$/.test(normalized)) {
      return `${normalized.slice(0, 2)}-${normalized.slice(2, 4)}-${normalized.slice(4, 6)}-${normalized.slice(6, 8)}`;
    }
  }
  
  return licensePlate; // Return original if no pattern matches
};

// Validate Dutch license plate format - comprehensive validation
export const validateLicensePlate = (licensePlate: string): boolean => {
  const normalized = normalizeLicensePlate(licensePlate);
  
  // Comprehensive Dutch license plate patterns
  const patterns = [
    // 6-character patterns (Sidecodes 1-10)
    /^[A-Z]{2}[0-9]{2}[A-Z]{2}$/, // XX-99-XX (sidecode 1) - like AB-12-CD
    /^[0-9]{2}[A-Z]{2}[0-9]{2}$/, // 99-XX-99 (sidecode 2) - like 12-AB-34
    /^[0-9]{2}[A-Z]{3}[0-9]{1}$/, // 99-XXX-9 (sidecode 3) - like 12-ABC-3
    /^[A-Z]{2}[0-9]{3}[A-Z]{1}$/, // XX-999-X (sidecode 4) - like AB-123-C
    /^[A-Z]{1}[0-9]{3}[A-Z]{2}$/, // X-999-XX (sidecode 5) - like A-123-BC
    /^[0-9]{3}[A-Z]{2}[0-9]{1}$/, // 999-XX-9 (sidecode 6) - like 123-AB-4
    /^[0-9]{1}[A-Z]{3}[0-9]{2}$/, // 9-XXX-99 (sidecode 7) - like 1-ABC-23
    /^[A-Z]{3}[0-9]{2}[A-Z]{1}$/, // XXX-99-X (sidecode 8) - like ABC-12-D
    /^[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}$/, // 99-X-99-X (sidecode 9) - like 12-A-34-B
    /^[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{2}$/, // X-99-X-99 (sidecode 10) - like A-12-B-34
    
    // 7-character patterns (Sidecodes 11-14)
    /^[0-9]{1}[A-Z]{3}[0-9]{3}$/, // 9-XXX-999 (sidecode 11) - like 1-ABC-234
    /^[A-Z]{3}[0-9]{3}[A-Z]{1}$/, // XXX-999-X (sidecode 12) - like ABC-123-D
    /^[0-9]{3}[A-Z]{3}[0-9]{1}$/, // 999-XXX-9 (sidecode 13) - like 123-ABC-4
    /^[A-Z]{1}[0-9]{3}[A-Z]{3}$/, // X-999-XXX (sidecode 14) - like A-123-BCD
    
    // Additional patterns for special vehicles and edge cases
    /^[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/, // X-9-X-9-X-9 (diplomatic/special)
    /^[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{1}$/, // 9-X-9-X-9-X (diplomatic/special)
    
    // Historical patterns that might still be in use
    /^[A-Z]{2}[0-9]{4}$/, // XX9999 (old format)
    /^[0-9]{2}[A-Z]{4}$/, // 99XXXX (old format)
    /^[A-Z]{4}[0-9]{2}$/, // XXXX99 (old format)
    
    // Special vehicle patterns (trailers, etc.)
    /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{2}$/, // XX-99-XX-99 (8 chars)
    /^[0-9]{2}[A-Z]{2}[0-9]{2}[A-Z]{2}$/, // 99-XX-99-XX (8 chars)
    
    // Motorcycle patterns
    /^[A-Z]{2}[0-9]{2}[A-Z]{1}$/, // XX-99-X (5 chars)
    /^[0-9]{2}[A-Z]{2}[A-Z]{1}$/, // 99-XX-X (5 chars)
    
    // Additional comprehensive patterns to catch edge cases
    /^[A-Z]{1}[0-9]{2}[A-Z]{3}$/, // X-99-XXX
    /^[0-9]{1}[A-Z]{2}[0-9]{3}$/, // 9-XX-999
    /^[A-Z]{3}[0-9]{1}[A-Z]{2}$/, // XXX-9-XX
    /^[0-9]{3}[A-Z]{1}[0-9]{2}$/, // 999-X-99
    
    // Patterns for the specific examples mentioned: 83-XG-SX and 61-RX-JL
    /^[0-9]{2}[A-Z]{2}[A-Z]{2}$/, // 99-XX-XX (like 83-XG-SX, 61-RX-JL)
    /^[A-Z]{2}[0-9]{2}[0-9]{2}$/, // XX-99-99
    /^[A-Z]{2}[A-Z]{2}[0-9]{2}$/, // XX-XX-99
    /^[0-9]{2}[0-9]{2}[A-Z]{2}$/, // 99-99-XX
  ];
  
  return patterns.some(pattern => pattern.test(normalized));
};

// Fetch vehicle data from RDW API
export const fetchVehicleData = async (licensePlate: string): Promise<RDWVehicleData | null> => {
  try {
    const normalized = normalizeLicensePlate(licensePlate);
    
    if (!validateLicensePlate(normalized)) {
      throw new Error('Ongeldig kenteken formaat');
    }
    
    const response = await fetch(`${RDW_API_BASE}?kenteken=${normalized}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: RDWVehicleData[] = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('Geen voertuiggegevens gevonden voor dit kenteken');
    }
    
    return data[0];
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
    throw error;
  }
};

// Calculate pricing based on vehicle data - Updated with new prices
export const calculatePricing = (vehicleData: RDWVehicleData, packageType: 'basic' | 'premium' | 'deluxe' = 'basic'): VehiclePricing => {
  const basePrices = {
    basic: 65,    // Updated from 59
    premium: 125, // Updated from 119
    deluxe: 275   // Updated from 185
  };
  
  const basePrice = basePrices[packageType];
  
  // Determine vehicle size based on various factors
  let vehicleType: 'small' | 'medium' | 'large' | 'luxury' = 'medium';
  let sizeMultiplier = 1.0;
  let ageMultiplier = 1.0;
  let luxuryMultiplier = 1.0;
  
  // Size calculation based on vehicle category and dimensions
  const voertuigsoort = vehicleData.voertuigsoort?.toLowerCase() || '';
  const merk = vehicleData.merk?.toLowerCase() || '';
  const lengte = parseInt(vehicleData.lengte || '0');
  const massa = parseInt(vehicleData.massa_ledig_voertuig || '0');
  
  // Vehicle type determination
  if (voertuigsoort.includes('personenauto')) {
    // Luxury brands
    const luxuryBrands = ['mercedes', 'bmw', 'audi', 'porsche', 'jaguar', 'lexus', 'tesla', 'bentley', 'rolls-royce', 'maserati'];
    if (luxuryBrands.some(brand => merk.includes(brand))) {
      vehicleType = 'luxury';
      luxuryMultiplier = 1.3;
    }
    
    // Size based on length and mass
    if (lengte > 0) {
      if (lengte < 4000) { // < 4m
        vehicleType = vehicleType === 'luxury' ? 'luxury' : 'small';
        sizeMultiplier = 0.9;
      } else if (lengte > 4800) { // > 4.8m
        vehicleType = vehicleType === 'luxury' ? 'luxury' : 'large';
        sizeMultiplier = 1.2;
      }
    }
    
    // Mass consideration
    if (massa > 2000) {
      sizeMultiplier = Math.max(sizeMultiplier, 1.15);
      vehicleType = vehicleType === 'luxury' ? 'luxury' : 'large';
    }
  } else if (voertuigsoort.includes('bedrijfsauto') || voertuigsoort.includes('bus')) {
    vehicleType = 'large';
    sizeMultiplier = 1.4;
  }
  
  // Age calculation
  const firstRegistration = vehicleData.datum_eerste_toelating_dt || vehicleData.datum_eerste_toelating;
  if (firstRegistration) {
    const registrationYear = new Date(firstRegistration).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - registrationYear;
    
    if (age > 15) {
      ageMultiplier = 1.1; // Older cars might need more work
    } else if (age < 3) {
      ageMultiplier = 0.95; // Newer cars might be easier to clean
    }
  }
  
  const finalPrice = Math.round(basePrice * sizeMultiplier * ageMultiplier * luxuryMultiplier);
  
  return {
    basePrice,
    finalPrice,
    vehicleType,
    packageType,
    factors: {
      size: sizeMultiplier,
      age: ageMultiplier,
      luxury: luxuryMultiplier,
    },
  };
};

// Get vehicle display name
export const getVehicleDisplayName = (vehicleData: RDWVehicleData): string => {
  const merk = vehicleData.merk || '';
  const handelsbenaming = vehicleData.handelsbenaming || '';
  
  if (handelsbenaming && handelsbenaming !== merk) {
    return `${merk} ${handelsbenaming}`;
  }
  
  return merk;
};

// Get vehicle year
export const getVehicleYear = (vehicleData: RDWVehicleData): number | null => {
  const firstRegistration = vehicleData.datum_eerste_toelating_dt || vehicleData.datum_eerste_toelating;
  if (firstRegistration) {
    return new Date(firstRegistration).getFullYear();
  }
  return null;
};

// Check if vehicle is electric
export const isElectricVehicle = (vehicleData: RDWVehicleData): boolean => {
  // This would need to be checked against fuel type data from a separate API endpoint
  // For now, we'll use some heuristics
  const merk = vehicleData.merk?.toLowerCase() || '';
  const handelsbenaming = vehicleData.handelsbenaming?.toLowerCase() || '';
  
  return merk === 'tesla' || 
         handelsbenaming.includes('electric') || 
         handelsbenaming.includes('ev') ||
         handelsbenaming.includes('e-');
};

// Format vehicle info for display
export const formatVehicleInfo = (vehicleData: RDWVehicleData): {
  displayName: string;
  year: number | null;
  color: string;
  isElectric: boolean;
  licensePlate: string;
} => {
  return {
    displayName: getVehicleDisplayName(vehicleData),
    year: getVehicleYear(vehicleData),
    color: vehicleData.eerste_kleur || 'Onbekend',
    isElectric: isElectricVehicle(vehicleData),
    licensePlate: formatLicensePlate(vehicleData.kenteken),
  };
};