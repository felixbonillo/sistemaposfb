import React, { useState } from "react";
import ProductTable from "./inventory/ProductTable";
import ProductFormModal from "./inventory/ProductFormModal";
import InventoryActions from "./inventory/InventoryActions";
import InventorySearch from "./inventory/InventorySearch";

//Datos Simulados mientras, luego vendra de una api

function InventoryModule({ userRole }) {
  const [products, setProducts] = useState([
    { id: "prod001", name: "Laptop Gamer XYZ", priceUSD: 1200, stock: 10 },
    { id: "prod002", name: 'Monitor Curvo 27"', priceUSD: 350, stock: 25 },
    { id: "prod003", name: "Teclado Mecanico RGB", priceUSD: 80, stock: 50 },
    { id: "prod004", name: "Mouse Inalambrico", priceUSD: 30, stock: 100 },
    { id: "prod005", name: "Webcam Full HD", priceUSD: 50, stock: 30 },
    { id: "prod006", name: "Audifonos Gaming", priceUSD: 100, stock: 40 },
  ]);

  //Tasa de cambio simulada por ahora
  const bcvRate = 131.5; //Ejemplo de tasa Bolivar/Dolar

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  //Estado para la busqueda global
  const [globalFilter, setGlobalFilter] = useState('')

  const handleOpenAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCloseAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleAddProduct = (newProductData) => {
    const newId = `prod${String(products.length + 1).padStart(3, "0")}`;
    const productToAdd = { id: newId, ...newProductData };
    setProducts([...products, productToAdd]);
    console.log("Nuevo producto anadido: ", productToAdd);
  };

  //Funciones editar y eliminar

  const handleEditProduct = (product) => {
    console.log("Editar producto", product);
    alert(`Preparando para editar el producto: ${product.name}`);
  };

  const handleDeleteProduct = (productId) => {
    if (
      window.confirm(
        `Estas seguro de que quieres eliminar el producto ${productId}?`
      )
    ) {
      setProducts(products.filter((p) => p.id !== productId));
      console.log("Eliminar producto con ID: ", productId);
      alert(`Producto ${productId} eliminado`);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Módulo de Inventario</h2>

      <div className="flex justify-between items-center mb-6"> {/* Alineación para el buscador y el botón */}
        {/* NUEVO: Campo de Búsqueda Global */}
        
        <InventorySearch
          globalFilter = {globalFilter}
          setGlobalFilter = {setGlobalFilter}
          placeholder = "Buscar productos..."
        />

        <InventoryActions
          userRole={userRole}
          onAddClick={handleOpenAddProductModal}
        />
      </div>

      {/* Renderizado del componente ProductTable */}
      <ProductTable
        products={products}
        bcvRate={bcvRate} userRole={userRole}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter} />

      <ProductFormModal
        isOpen={isAddProductModalOpen}
        onClose={handleCloseAddProductModal}
        onAddProduct={handleAddProduct} />

    </div>
  );
}

export default InventoryModule;
// Componente que representa el modulo de inventario
// Este modulo se encargara de gestionar los productos y sus existencias
