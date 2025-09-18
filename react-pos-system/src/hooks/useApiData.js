import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useApiData(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //Funcion para traer los datos
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);
      setData(response.data); //Axios ya devuelve el json
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  //useEffect: Carga inicial

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //Devolvemos todo al componente
  return { data, isLoading, error, refetch: fetchData };
}

export default useApiData;
