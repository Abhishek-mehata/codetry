import { useState, useEffect } from 'react';

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface LocationResult {
  city: string | null;
  country: string | null;
}

function useExtractCityCountry(location: string): LocationResult {
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchLocation = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const components: AddressComponent[] = data.results[0].address_components;

          let extractedCity: string | null = null;
          let extractedCountry: string | null = null;

          components.forEach((component) => {
            if (component.types.includes('locality')) {
              extractedCity = component.long_name;
            }
            if (component.types.includes('country')) {
              extractedCountry = component.long_name;
            }
          });

          setCity(extractedCity);
          setCountry(extractedCountry);
        } else {
          setCity(null);
          setCountry(null);
        }
      } catch (error) {
        console.error('Google Maps API error:', error);
        setCity(null);
        setCountry(null);
      }
    };

    fetchLocation();
  }, [location]);

  return { city, country };
}

export default useExtractCityCountry;
