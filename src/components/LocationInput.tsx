import React, { useRef, useEffect, useState } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: any;
  }
}

interface LocationInputProps {
  onLocationSelect: (location: LocationData) => void;
  initialValue?: string;
  error?: string;
}

export interface LocationData {
  address: string;
  city: string;
  postalCode: string;
  fullAddress: string;
  lat?: number;
  lng?: number;
}

const LocationInput: React.FC<LocationInputProps> = ({
  onLocationSelect,
  initialValue = '',
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Initialize Google Places Autocomplete (without API key for basic functionality)
  useEffect(() => {
    // Load Google Places script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        initializeAutocomplete();
      };
    } else {
      initializeAutocomplete();
    }
  }, []);

  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'nl' }, // Restrict to Netherlands
      fields: ['address_components', 'formatted_address', 'geometry'],
      types: ['address'], // Only addresses, not businesses
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.address_components) {
        return;
      }

      // Extract address components
      const addressComponents = place.address_components;
      let street = '';
      let houseNumber = '';
      let city = '';
      let postalCode = '';

      addressComponents.forEach((component: any) => {
        const types = component.types;

        if (types.includes('route')) {
          street = component.long_name;
        }
        if (types.includes('street_number')) {
          houseNumber = component.long_name;
        }
        if (types.includes('locality')) {
          city = component.long_name;
        }
        if (types.includes('postal_code')) {
          postalCode = component.long_name;
        }
      });

      const address = `${street} ${houseNumber}`.trim();
      const fullAddress = place.formatted_address || '';

      const locationData: LocationData = {
        address,
        city,
        postalCode,
        fullAddress,
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      };

      setSelectedLocation(locationData);
      setValue(fullAddress);
      onLocationSelect(locationData);
    });
  };

  // Fallback: Manual address search using Dutch postal code API (free)
  const searchDutchAddress = async (query: string) => {
    // Check if query looks like a postal code (Dutch format: 1234AB)
    const postalCodeRegex = /^\d{4}\s*[A-Za-z]{2}$/;
    const cleanQuery = query.replace(/\s+/g, '').toUpperCase();

    if (postalCodeRegex.test(cleanQuery)) {
      try {
        setIsLoading(true);
        // Use free Dutch postal code API
        const response = await fetch(
          `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${encodeURIComponent(
            cleanQuery
          )}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.response?.docs?.length > 0) {
            setSuggestions(data.response.docs);
            setShowSuggestions(true);
          }
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setSelectedLocation(null); // Reset selection when typing

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Trigger search after user stops typing
    if (newValue.length >= 6) {
      debounceTimer.current = setTimeout(() => {
        searchDutchAddress(newValue);
      }, 500);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const locationData: LocationData = {
      address: suggestion.straatnaam || '',
      city: suggestion.woonplaatsnaam || '',
      postalCode: suggestion.postcode || '',
      fullAddress: `${suggestion.straatnaam || ''}, ${
        suggestion.woonplaatsnaam || ''
      } ${suggestion.postcode || ''}`,
    };

    setSelectedLocation(locationData);
    setValue(locationData.fullAddress);
    onLocationSelect(locationData);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-bariq-grey mb-2">
        Adres *
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          className={`w-full p-3 pr-10 bg-bariq-black-lighter border ${
            error ? 'border-red-500' : 'border-gray-700'
          } rounded-lg text-bariq-white placeholder-gray-500 focus:outline-none focus:border-bariq-red focus:ring-1 focus:ring-bariq-red transition-colors`}
          placeholder="Straat 123, 1012AB Amsterdam"
          required
        />

        {selectedLocation && !isLoading && (
          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
        )}

        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-bariq-red"></div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-bariq-black-lighter border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left p-3 hover:bg-gray-800 border-b border-gray-800 last:border-b-0 transition-colors"
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bariq-red mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-bariq-white">
                    {suggestion.straatnaam}
                  </div>
                  <div className="text-sm text-bariq-grey">
                    {suggestion.woonplaatsnaam} {suggestion.postcode}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Help text */}
      <p className="text-xs text-yellow-500 mt-2 flex items-center gap-1">
        💡 Tip: Type je postcode (bijv. 1012AB) voor snelle zoekresultaten
      </p>
    </div>
  );
};

export default LocationInput;

