import React from "react";

function InventoryActions({ userRole, onAddClick }) {
  return (
    <div>
      {/* Boton anadir producto solo para administrador */}
      {userRole === "admin" && (
        <button
          onClick={onAddClick} //Llama a la funcion pasada por prop
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Añadir Producto
        </button>
      )}
    </div>
  );
}

export default InventoryActions;
