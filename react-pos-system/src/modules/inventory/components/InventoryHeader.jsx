import InventorySearch from "./InventorySearch";

export default function InventoryHeader({ globalFilter, setGlobalFilter }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            {/* Título */}
            <h2 className="text-2xl font-bold text-gray-800">Inventario</h2>

            <InventorySearch globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        </div>
    );
}
