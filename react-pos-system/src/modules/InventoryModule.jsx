import React, { useState } from "react";
import ProductTable from "./inventory/ProductTable";
import ProductFormModal from "./inventory/ProductFormModal";

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
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Modulo de Inventario
      </h2>

      <div className="mb-6 flex justify-end">
        {/* Solo muestra el botón "Añadir Producto" si el rol es 'admin' */}
        {userRole === "admin" && (
          <button
            onClick={handleOpenAddProductModal}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Añadir Producto
          </button>
        )}
      </div>

      {/* Renderizado del componente ProductTable */}
      <ProductTable products={products} bcvRate={bcvRate} userRole={userRole} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} />
      <ProductFormModal isOpen={isAddProductModalOpen} onClose={handleCloseAddProductModal} onAddProduct={handleAddProduct} /> 
    </div>
  );
}

export default InventoryModule;
// Componente que representa el modulo de inventario
// Este modulo se encargara de gestionar los productos y sus existencias
