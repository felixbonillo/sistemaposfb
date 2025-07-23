import React, { useState, useEffect } from "react"; //Importamos los hooks de React

//--- Componente: LoginScreen (Pantalla de Inicio de Sesión) ---
//Este componente se encarga de mostrar el formulario del login y manejar su logica
//Recibe una prop 'onLoginSuccess' que es una función a ejecutar al iniciar sesión correctamente

function LoginScreen({ onLoginSuccess }) {
  // 1° Declararion de estados locales con useState
  // Username y password guardaran lo que los usuarios escriba en el formulario

  const [username, setUsername] = useState(""); //Estado para el nombre de usuario (vacio inicialmente)
  const [password, setPassword] = useState(""); //Estado para la contraseña (vacio inicialmente)
  const [error, setError] = useState(""); //Estado para manejar errores (vacio inicialmente)

  // 2° Funcion handleLogin: Se ejecuta cuando el usuario envia el formulario
  const handleLogin = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario al recargar el navegador
    setError(""); // Limpia cualquier mensaje de error previo antes de intentar el login

    // 3° Logica de autenticacion simulada:
    // En un sistema real, llamariamos a una api de backend para verificar credenciales.
    // Comprobamos si el usuario y la contraseña coinciden con los valores predefinidos.

    if (username === "admin" && password === "admin") {
      onLoginSuccess("admin"); //Si es 'admin', llamamos a la función onLoginSuccess con el rol 'admin'
    } else if (username === "seller" && password === "seller") {
      onLoginSuccess("seller"); //Si es 'seller', llamamos a la función onLoginSuccess con el rol 'seller'
    } else {
      setError(
        "Credenciales incorrectas, intenta con admin/admin o seller/seller"
      ); //Si las credenciales no coinciden
    }
  };

  // 4° JSX: del componente LoginScreen (tailwindcss)

  return (
    // Contenedor principal: ocupa toda la altura de la pantalla y centra su contenido
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      // Tarjeta del formulario: Fondo blanco, sombra, padding, borde
      redondeado, ancho
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesion
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          //Formulario con espacio entre elementos
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
              placeholder="admin o seller"
              value={username} //Valor del input controlado por el estado 'username'
              onChange={(e) => setUsername(e.target.value)} //Actualiza el estado 'username' cada vez que el usuario escribe
              required //Campo obligatorio
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus.ring-blue-500"
              placeholder="admin o seller"
              value={password} //Valor del input controlado por el estado 'password'
              onChange={(e) => setPassword(e.target.value)} //Actualiza el estado password cada vez que el usuario escribe
              required //Campo requerido}
            />
          </div>
          //Renderizado condicional
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
          >
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
}

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


// --- Componente principal de la apllicacion: App ---
//Este es el componente principal que maneja el estado de la aplicacion

function App() {
  // 1° Estado de autenticacion global:
  // 'isAuthenticated' indica si el usuario esta logueado
  // 'userRole' guarda el rol del usuario ('admin' o 'seller')
  // Inicializamos estos estados intentado leerlos desde 'localStorage' para recordar la sesion

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isLoggedIn') === 'true') //Convierte la cadena ´true´ a booleano
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null); //Si no hay rol, es null

  // 2° useEffect: para persistencia de sension con localStorage
  //Cada vez que 'isAuthenticated' o 'userRole' cambien, actualizamos
  //Es ideal para efectos segundarios como interactuar con APIs o localStorage
  useEffect(() => {
    //Si el usuario esta autenticado, guardamos su estado y rol en localStorage

    if (isAuthenticated) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', userRole);
    } else {
      //Si el usuario no esta autenticado o acaba de cerrar sesion, limpiamos localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
    }
  },[isAuthenticated, userRole]) //Array de dependencias: Este efecto se re-ejecutara cada vez que cambien estos estados

  // 3° Funcion handleLoginSuccess: Se pasa al LoginScreen para que el padre se entere del login 
  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true); //Actualiza el estado de autenticacion a true
    setUserRole(role); //Actualiza el rol del usuario
  }

  // 4° Funcion handleLogout: Se pasa al DashboardScreen para cerrar sesion
  const handleLogout = () => {
    setIsAuthenticated(false); //Actualiza el estado de autenticacion a false
    setUserRole(null); //Limpia el rol del usuario
  }

  // 5° Renderizado principal de app: Decide que pantalla mostrar
  return (
    <>
    //Renderizado condicional basado en el estado de la autenticacion
    //Si isAuthenticated es true, mostramos el DashboardScreen
    //De lo contrario, mostramos el LoginScreen
    {isAuthenticated ? (
      <DashboardScreen userRole={userRole} onLogout={handleLogout} />
    ) : (
      <LoginScreen onLoginSuccess={handleLoginSuccess} /> //Pasamos la funcion de login al LoginScreen
      
    )}
    </>
  )
}
