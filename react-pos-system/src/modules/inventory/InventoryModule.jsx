import ProductTable from "./components/ProductTable";
import ProductFormModal from "./components/ProductFormModal";
import InventoryHeader from "./InventoryHeader";
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
    handleAddProduct,
    handleEditProduct,
    handleSaveProduct,
    handleDeleteProduct,
  } = useInventory();


  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <InventoryHeader
        userRole={userRole}
        onAdd={handleAddProduct}
        globalFilter={search}
        setGlobalFilter={setSearch}
      />


      {/* Tabla */}
      <ProductTable
        products={products}
        onEdit={userRole === "admin" ? handleEditProduct : undefined}
        onDelete={userRole === "admin" ? handleDeleteProduct : undefined}
        userRole={userRole}
        bcvRate={36.5}
      />

      {/* Modal */}
      {isModalOpen && (
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          product={editingProduct}
        />
      )}
    </div>
  )
}

export default InventoryModule;
// Componente que representa el modulo de inventario
// Este modulo se encargara de gestionar los productos y sus existencias
