import React from "react";

//solo este icon se va a importar los demas vienen como props 

import { FaSignOutAlt } from 'react-icons/fa'

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
                    {navItems.map((item) =>
                    (item.roles.includes(userRole) && (

                        <li key={item.id} className="mb-2">

                            <button className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${activeSection === item.id ? 'bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`} onClick={() => onNavigate(item.id)}>
                                {item.icon && <item.icon className="mr-3 text-xl" />}
                                <span className="text-lg"> {item.name} </span>

                            </button>
                        </li>)

                    ))}
                </ul>
            </nav>

            <div className="mt-auto">
                <button onClick={onLogout} className="w-full flex items-center p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200" >
                    <FaSignOutAlt className="mr-3 text-xl" />
                    <span className="text-lg"> Cerrar Sesion</span>
                </button>
            </div>
        </div >

    )
}

export default Sidebar