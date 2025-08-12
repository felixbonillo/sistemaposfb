import React, { useEffect, useState } from "react";

function ProductFormModal({ isOpen, onClose, onAddProduct }) {
  const [productData, setProductData] = useState({
    name: "",
    priceUSD: "",
    stock: "",
  });

  useEffect(() => {
    if (isOpen) {
      setProductData({ name: "", priceUSD: "", stock: "" }); //Resetea el formulario
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "priceUSD" || name === "stock") {
      setProductData({ ...productData, [name]: Number(value) || "" });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !productData.name ||
      !productData.priceUSD <= 0 ||
      !productData.stock ||
      productData.stock < 0
    ) {
        alert('Por favor, completa todos los campos con valores validos')
        return;
    }
    onAddProduct(productData)
    onClose() //Cerrar modal despues de anadir

    if (!isOpen) return null; //No renderizar si no esta abierto

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
                <h3 className="text 2xl font-bold mb-6 text-gray-800">Añadir Nuevo Producto</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Product0:</label>
                        <input type="text" id="name" name="name" value={productData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="priceUSD" className="block text-gray-700 text-sm font-bold mb-2">Precio (USD):</label>
                        <input type="number" id="priceUSD" value={productData.priceUSD} name="priceUSD" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" step= "0.01" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
                        <input type="number" id="stock" name="stock" value={productData.stock} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700
                        text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">
                            Guardar Producto
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
  };
}

export default ProductFormModal;
