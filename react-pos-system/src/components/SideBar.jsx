import React from "react";

//solo este icon se va a importar los demas vienen como props 

import { FaSingOutAlt } from 'react-icons/fa'

//Sidebar recibe props:
// - activeSection: ID de la seccion actual (Para resaltarla)
// - onNavigate: Funcion para notificar al padre sobre la navegacion
// - userRole: Rol del usuario (Para permisos)
// - onLogout: Funcion para cerrar sesion
// - navItems: Array de objetos con la configuracion para cada item de navegacion (id, name, icon, roles)


function Sidebar({ activeSection, onNavigate, userRole, onLogout, navItems }) {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col h-screen p-4 shadow-lg">
            <div className="text-2xl font-bold text-center mb-8 text-blue-300">
                POS System
            </div>

            {/*Navegacion principal */}
            <nav className="flex-grow">
                <ul>
                    <li key={item.id} className="mb-2">
                        <button> </button>
                    </li>
                </ul>
            </nav>
        </div>

    )
}