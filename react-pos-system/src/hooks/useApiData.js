import { useState, useEffect } from "react";

/* Custom Hook para gestionar el estado de las peticones a la api  */

function useApiData(url, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]); //Si la url u options cambian se vuelve a ejecutar el efecto

  return { data, isLoading, error };
}

export default useApiData;
