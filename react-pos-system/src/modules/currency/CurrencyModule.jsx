import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";

// Importa los componentes modulares

import CurrencyDisplay from "./components/CurrencyDisplay";
import ManualRateInput from "./components/ManualRateInput";
import AutoRateFetcher from "./components/AutoRateFetcher";

// Importa custom hook para fetch
import useApiData from "../../hooks/useApiData";

function CurrencyModule() {
  const [bcvRate, setBcvRate] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  // Uso del hook para la peticion
  const {
    data,
    isLoading: apiIsLoading,
    error: apiError,
    refetch,
  } = useApiData(`http://localhost:3001/api/rate`);

  // Usamos useEffect para actualizar el estado del componente cuando los datos de la api cambien
  React.useEffect(() => {
    if (data && !apiError) {
      setBcvRate(data.rate);
      setLastUpdated(new Date(data.lastUpdated).toLocaleDateString());
    }
  }, [data, apiError]);

  const handleSaveManualRate = (rate) => {
    setBcvRate(rate);
    setLastUpdated(new Date().toLocaleDateString());
    alert(`Tasa BCV actualizada manualmente a Bs. ${rate.toFixed(2)}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items">
        <FaDollarSign className="text-green-500 mr-3" />
        Modulo de Tasa BCV
      </h2>
      <p className="text-gray-700 mb-8">
        Establece y actualiza la tasa oficial de cambio para los calculos del
        sistema
      </p>

      {/* Muestra un estado de carga inicial */}
      {apiIsLoading ? (
        <div className="text-center p-8 bg-white shadow-md rounded-lg">
          <p className="text-gray-600 text-lg">Cargando tasa BCV...</p>
        </div>
      ) : apiError ? (
        <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg shadow-md">
          <p>Error al cargar la tasa: {apiError.message}. Intenta de nuevo</p>
        </div>
      ) : (
        <>
          <CurrencyDisplay rate={bcvRate} lastUpdated={lastUpdated} />
          <ManualRateInput onSaveManualRate={handleSaveManualRate} />
          <AutoRateFetcher onFetchRate={refetch} isLoading={apiIsLoading} />
        </>
      )}
    </div>
  );
}

export default CurrencyModule;
