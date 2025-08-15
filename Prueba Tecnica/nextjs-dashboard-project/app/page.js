export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Bienvenido a tu <br className="hidden sm:inline" /> Dashboard de
          Proyectos (Prueba Tecnica)
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Plataforma para gestionar y visualizar tus Proyectos de manera
          eficiente
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <p className="text-md text-blue-700 font-semibold bg-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Preparado para la gestión inteligente.
          </p>
        </div>
      </div>
    </main>
  );
}
