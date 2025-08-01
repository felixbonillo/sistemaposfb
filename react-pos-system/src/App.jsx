import React, { useState, useEffect } from "react";
//Importamos los hooks de React
import "./index.css"; //Importamos los estilos globales





// --- Componente principal de la apllicacion: App ---
//Este es el componente principal que maneja el estado de la aplicacion

function App() {
  // 1° Estado de autenticacion global:
  // 'isAuthenticated' indica si el usuario esta logueado
  // 'userRole' guarda el rol del usuario ('admin' o 'seller')
  // Inicializamos estos estados intentado leerlos desde 'localStorage' para recordar la sesion

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  ); //Convierte la cadena ´true´ a booleano
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  ); //Si no hay rol, es null

  // 2° useEffect: para persistencia de sension con localStorage
  //Cada vez que 'isAuthenticated' o 'userRole' cambien, actualizamos
  //Es ideal para efectos segundarios como interactuar con APIs o localStorage
  useEffect(() => {
    //Si el usuario esta autenticado, guardamos su estado y rol en localStorage

    if (isAuthenticated) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", userRole);
    } else {
      //Si el usuario no esta autenticado o acaba de cerrar sesion, limpiamos localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
    }
  }, [isAuthenticated, userRole]); //Array de dependencias: Este efecto se re-ejecutara cada vez que cambien estos estados

  // 3° Funcion handleLoginSuccess: Se pasa al LoginScreen para que el padre se entere del login
  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true); //Actualiza el estado de autenticacion a true
    setUserRole(role); //Actualiza el rol del usuario
  };

  // 4° Funcion handleLogout: Se pasa al DashboardScreen para cerrar sesion
  const handleLogout = () => {
    setIsAuthenticated(false); //Actualiza el estado de autenticacion a false
    setUserRole(null); //Limpia el rol del usuario
  };

  // 5° Renderizado principal de app: Decide que pantalla mostrar
  {
    /* Renderizado condicional basado en el estado de la autenticacion */
  }
  {
    /*Si isAuthenticated es true, mostramos el DashboardScreen*/
  }
  {
    /*De lo contrario, mostramos el LoginScreen*/
  }
  return (
    <>
      {isAuthenticated ? (
        <DashboardScreen userRole={userRole} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} /> //Pasamos la funcion de login al LoginScreen
      )}
    </>
  );
}

export default App; //Exportamos el componente App como el componente principal de la aplicacion
