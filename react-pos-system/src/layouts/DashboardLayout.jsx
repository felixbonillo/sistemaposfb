import React from "react";

// --- Importaciones de componentes necesarios ---
import InventoryModule from "../modules/InventoryModule";
import POSModule from "../modules/POSModule";
import ClientsModule from "../modules/ClientsModule";
import CurrencyModule from "../modules/CurrencyModule";
import ReportsModule from "../modules/ReportsModule";
import SideBar from "../components/Sidebar";

const navItems = [
  { id: "inventory", name: "Inventario", roles: ["admin", "seller"] },
  { id: "pos", name: "Punto de Venta", roles: ["admin", "seller"] },
  { id: "clients", name: "Clientes", roles: ["admin"] },
  { id: "reports", name: "Reportes", roles: ["admin"] },
  { id: "currency", name: "Tasa BCV", roles: ["admin"] },
];

// --- Componente: DashboardScreen (Pantalla principal del sistema) ---
//Componente que representa area principal una vez logueado
//Recibe el userRole y una funcion onLogout para cerrar sesion

function DashboardLayout({ userRole, onLogout }) {
  // 1° JSX del componente DashboardLayout con tailwind
  const [activeSection, setActiveSection] = React.useState("inventory"); //Estado para manejar la seccion activa del sidebar

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId); //Actualiza la seccion activa al hacer clic en un item del sidebar
  };

  //Funcion para renderizar el contenido de la seccion activa
  const renderSectionContent = () => {
    switch (activeSection) {
      case "inventory":
        return <InventoryModule />;
      case "pos":
        return <POSModule />;
      case "clients":
        return <ClientsModule />;
      case "reports":
        return <ReportsModule />;
      case "currency":
        return <CurrencyModule />;
      default:
        return (
          <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Bienvenido al Dashboard
            </h2>
            <p className="text-gray-700">
              Seleccione una seccion del menu lateral
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Aqui es donde se anadira el Sidebar */}
      {/* <Sidebar activeSection={activeSection} onNavigate= { handleNavigate} userRole={ userRole} onLogout= {onLogout} /> */}
      <div className="w-64 bg-gray-800 text-white p-4 shadow-lg flex flex-col items-center justify-center">
        <p className="text-xl font-bold">Sidebar Aqui</p>
        <button onClick={onLogout} className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
          Cerrar Sesion
        </button>
      </div>
    </div>
  )
}
export default DashboardLayout;
