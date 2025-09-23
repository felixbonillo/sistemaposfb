import ProductTable from "./components/ProductTable";
import ProductFormModal from "./components/ProductFormModal";
import InventoryHeader from "./components/InventoryHeader";
import { useInventory } from "./hooks/useInventory";

//Datos Simulados mientras, luego vendra de una api

function InventoryModule({ userRole }) {

  const {
    products,
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editingProduct,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,
  } = useInventory();


  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <InventoryHeader
        userRole={userRole}
        onAdd={handleAdd}
        globalFilter={search}
        setGlobalFilter={setSearch}
      />


      {/* Tabla */}
      <ProductTable
        products={products}
        onEdit={userRole === "admin" ? handleEdit : undefined}
        onDelete={userRole === "admin" ? handleDelete : undefined}
        userRole={userRole}
      />

      {/* Modal */}
      {isModalOpen && (
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          product={editingProduct}
        />
      )}
    </div>
  )
}

export default InventoryModule;
// Componente que representa el modulo de inventario
// Este modulo se encargara de gestionar los productos y sus existencias
