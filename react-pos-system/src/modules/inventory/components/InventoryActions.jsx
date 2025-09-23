export default function InventoryActions({ onAdd }) {
    return (
        <div className="flex flex-wrap gap-2 justify-end mb-4">
            {/* Añadir producto */}
            <button
                onClick={onAdd}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
                ➕ Añadir Producto
            </button>

            {/* Importar productos (CSV) */}
            <button
                onClick={() => alert("Función de importar CSV aún no implementada")}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
                📂 Importar CSV
            </button>

            {/* Exportar a PDF */}
            <button
                onClick={() => alert("Exportar a PDF aún no implementado")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                📄 Exportar PDF
            </button>

            {/* Exportar a Excel */}
            <button
                onClick={() => alert("Exportar a Excel aún no implementado")}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
                📊 Exportar Excel
            </button>
        </div>
    );
}
