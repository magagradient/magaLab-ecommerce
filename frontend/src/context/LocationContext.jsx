import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [country, setCountry] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detect = async () => {
      try {
        // Detectar país por IP
        const geoRes = await fetch("https://ipapi.co/json/");
        const geoData = await geoRes.json();
        setCountry(geoData.country_code);

        // Si es Argentina, traer cotización del dólar
        if (geoData.country_code === "AR") {
          const rateRes = await fetch("https://dolarapi.com/v1/dolares/blue");
          const rateData = await rateRes.json();
          setExchangeRate(rateData.venta);
        }
      } catch (error) {
        console.error("Error detectando ubicación:", error);
        setCountry("US"); // fallback
      } finally {
        setLoading(false);
      }
    };

    detect();
  }, []);

  const formatPrice = (priceUSD) => {
    if (country === "AR" && exchangeRate) {
      const ars = (priceUSD * exchangeRate).toLocaleString("es-AR");
      return `$${ars} ARS`;
    }
    return `$${priceUSD} USD`;
  };

  return (
    <LocationContext.Provider value={{ country, exchangeRate, loading, formatPrice }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);