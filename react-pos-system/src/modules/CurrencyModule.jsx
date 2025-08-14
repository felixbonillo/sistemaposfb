import React, {useState} from 'react'
import { FaSyncAlt, FaDollarSign } from 'react-icons/fa';


function CurrencyModule() {

  //Estado para la tasa BCV del dia
  const [bcvRate, setBcvRate] = useState(0)
  //Estado para la fecha de la ultima actualizacion
  const [lastUpdated, setLastUpdated] = useState('')
  //Estado para manejar el campo de entrada manuak
  const [manualRate, setManualRate] = useState('')
  //Estado para indicar si la informacion se esta cargando
  const [isLoading, setIsLoading] = useState(false)

  //Funcion para manejar el cambio en el input normal
  const handleManualRateChange = (e) => {
    setManualRate(e.target.value)
  }

  //Funcion para guardar tasa manual
  const handleSaveManualRate = () => {
    if (manualRate && !isNaN(manualRate) && Number(manualRate) > 0) {
      setBcvRate(Number(manualRate))
      setLastUpdated(new Date().toLocaleString());
      setManualRate('') //Limpiar el input
      alert(`Tasa BCV actualizada manualmente a Bs. ${Number(manualRate).toFixed(2)} `)
    } else {
      alert('Por favor, introduce una tasa valida.')
    }
  }

  //Implementar la funcion de web scraping para obtener la tasa automatica
  const fetchBcvRate = async () => {
    setIsLoading(true);
    
  }



  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Modulo de Tasa BCV
      </h2>
      <p className="text-gray-700">
        Aqui se gestionaran las diferentes monedas y sus tasas de cambio
      </p>
      <p className="mt-4 text-blue-600 font-medium">
        Este es un componente separado para el modulo de Monedas
      </p>
    </div>
  );
}
export default CurrencyModule;
