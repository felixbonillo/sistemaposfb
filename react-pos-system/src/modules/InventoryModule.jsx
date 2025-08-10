import React from "react";
import ProductTable from "./inventory/ProductTable";

//Datos Simulados mientras, luego vendra de una api

const products = [
  { id: 'prod001', name: 'Laptop Gamer XYZ', priceUSD: 1200, stock: 10},
  { id: 'prod002', name: 'Monitor Curvo 27"', priceUSD: 350, stock: 25},
  { id: 'prod003', name: 'Teclado Mecanico RGB', priceUSD: 80, stock: 50},
  { id: 'prod004', name: 'Mouse Inalambrico', priceUSD: 30, stock: 100},
  { id: 'prod005', name: 'Webcam Full HD', priceUSD:50, stock: 30},
  { id: 'prod006', name: 'Audifonos Gaming', priceUSD:100, stock: 40},
]

function InventoryModule() {

  //Tasa de cambio simulada por ahora
  const bcvRate = 131.5 //Ejemplo de tasa Bolivar/Dolar

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Modulo de Inventario</h2>

      {/* Renderizado del componente ProductTable */}
      <ProductTable products={products} bcvRate={bcvRate}/>
    </div>
  );
}

export default InventoryModule;
// Componente que representa el modulo de inventario
// Este modulo se encargara de gestionar los productos y sus existencias