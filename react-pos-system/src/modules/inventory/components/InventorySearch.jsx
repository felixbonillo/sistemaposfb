import React from "react";

function InventorySearch({ globalFilter, setGlobalFilter, placeholder }) {
  const setterFilter = (e) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <input
      type="text"
      value={globalFilter || ""} // Asegura que el input no sea 'undefined'
      onChange={setterFilter}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow mr-4 max-w-sm" // max-w-sm para que no sea demasiado ancho
    />
  );
}

export default InventorySearch;
