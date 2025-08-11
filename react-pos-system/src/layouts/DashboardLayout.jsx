import React, { useState } from "react";
//Componentes de iconos que se usaran en sidebar
import Sidebar from "../components/Sidebar";
import {
  FaCube,
  FaUsers,
  FaChartPie,
  FaShoppingCart,
  FaDollarSign,
  FaBars,
} from "react-icons/fa";

// --- Importaciones de componentes necesarios MODULOS ---
import InventoryModule from "../modules/InventoryModule";
import POSModule from "../modules/POSModule";
import ClientsModule from "../modules/ClientsModule";
import CurrencyModule from "../modules/CurrencyModule";
import ReportsModule from "../modules/ReportsModule";

//Definicion centralizada de los items de navegacion para el sidebar
//Aqui se especifican el id, nombre, el componente de Icono y los roles que pueden acceder a cada item
//Esto permite una gestion mas facil de los items del sidebar y su acceso por roles
const navItems = [
  {
    id: "inventory",
    name: "Inventario",
    icon: FaCube,
    roles: ["admin", "seller"],
  },
  {
    id: "pos",
    name: "Punto de Venta",
    icon: FaShoppingCart,
    roles: ["admin", "seller"],
  },
  { id: "clients", name: "Clientes", icon: FaUsers, roles: ["admin"] },
  { id: "reports", name: "Reportes", icon: FaChartPie, roles: ["admin"] },
  { id: "currency", name: "Tasa BCV", icon: FaDollarSign, roles: ["admin"] },
];

// --- Componente: DashboardScreen (Pantalla principal del sistema) ---
//Componente que representa area principal una vez logueado
//Recibe el userRole y una funcion onLogout para cerrar sesion

function DashboardLayout({ userRole, onLogout }) {
  // 1° JSX del componente DashboardLayout con tailwind
  const [activeSection, setActiveSection] = React.useState("inventory"); //Estado para manejar la seccion activa del sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) //Nuevo estado para controlar el sidebar mobile, por defecto cerrado

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId); //Actualiza la seccion activa al hacer clic en un item del sidebar
    setIsSidebarOpen(false) //Cierra el sidebar al navegar por una nueva seccion
  };

  //Funcion para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  //Funcion para renderizar el contenido de la seccion activa
  const renderSectionContent = () => {
    switch (activeSection) {
      case "inventory":
        return <InventoryModule userRole={userRole}/>;
      case "pos":
        return <POSModule />;
      case "clients":
        return <ClientsModule />;
      case "reports":
        return <ReportsModule />;
      case "currency":
        return <CurrencyModule />;
      default:
        return <InventoryModule userRole={userRole} />;
        ;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Aqui es donde se anadira el Sidebar */}
      {/* Componente Sidebar:
      - activeSection: Le dice al Sidebar que item debe resaltar como activo
      - onNavigate: Funcion para que el sidebar pueda notificar al DashBoardLayout sobre un cambio
      - userRole: Permite al Sidebar decidir que item mostrar segun el rol del usuario
      - onLogout: Funcion para que el Sidebar pueda iniciar el proceso de cierre de sesion
      - navItems: Le pasa la configuracion completa de la navegacion incluyenbdo los iconos 
      */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        userRole={userRole}
        onLogout={onLogout}
        navItems={navItems}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/*Overlay para moviles cuando el sidebar este abierto */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={toggleSidebar}></div>
      )}



      {/* Contenido principal del dashboard */}
      <div className="flex-1 flex flex-col">
        {/*ENCABEZADO del contenido principal
        - Muestra el nombre de la seccion actual y el rol del usuario
        */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* Boton hamburguesa */}
          <button className="lg:hidden text-gray-600 mr-4" onClick={toggleSidebar}>
            <FaBars className="text-2xl"/>

          </button>
          <h2 className="text-2xl font-semibold text-gray-800">
            {/* Busca el nombre de la seccion activa en el array 'navItems' para mostrarlo en el header  */}
            {navItems.find((item) => item.id === activeSection)?.name ||
              "Dashboard"}
          </h2>
          <div className="text-lg text-gray-600">
            Rol: <span className="font-bold capitalize">{userRole}</span>
          </div>
        </header>

        {/* Area principal de contenido de los modulos */}
        <main className="flex-1 p-6 overflow-auto">
          {renderSectionContent()}
        </main>
      </div>
    </div>
  );
}
export default DashboardLayout;
