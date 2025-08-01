import React from "react";


// --- Componente: DashboardScreen (Pantalla principal del sistema) ---
//Componente que representa area principal una vez logueado
//Recibe el userRole y una funcion onLogout para cerrar sesion

function DashboardScreen({ userRole, onLogout }) {
  // 1° JSX del componente DashboardScreen con tailwind
  return (
    //Contenedor principal: Ocupa toda la altura de la pantalla, fondo gris claro, centrado
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bienvenido al Sistema POS,{" "}
        {userRole === "admin" ? "Administrador" : "Vendedor"}!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Aqui ira el contenido principal del dashboard, como ventas, inventario,
        etc.
      </p>
      <button
        onClick={onLogout} //Llama a la funcion al hacer clic
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
      >
        Cerrar Sesion
      </button>
    </div>
  );
}

export default DashboardScreen