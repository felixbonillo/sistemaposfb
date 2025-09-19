import InventorySearch from "./components/InventorySearch";

export default function InventoryHeader({ userRole, onAdd, globalFilter, setGlobalFilter }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            {/* Título */}
            <h2 className="text-2xl font-bold text-gray-800">Inventario</h2>

            {/* Search y botón */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                <InventorySearch globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

                {userRole === "admin" && (
                    <button
                        onClick={onAdd}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Añadir Producto
                    </button>
                )}
            </div>
        </div>
    );
}
