import React, { useEffect, useState } from "react";
import { normalizeProduct } from "../helpers/productHelpers";

export default function ProductFormModal({ isOpen, onClose, onSave, initialData }) {
    const [productData, setProductData] = useState({
        id: null,
        name: "",
        priceUSD: 0,
        stock: 0,
    });

    useEffect(() => {
        if (initialData) {
            setProductData(initialData)
        } else {
            setProductData({
                id: null,
                name: "",
                priceUSD: "",
                stock: "",
            })
        }

    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!productData.name.trim()) {
            alert("El nombre es obligatorio")
            return;
        }

        if (productData.priceUSD <= 0) {
            alert("El precio debe ser mayor de 0")
            return;
        }

        const productToSave = normalizeProduct(productData)

        onSave(productToSave);
        onClose(); //Cerrar modal despues de anadir
    };

    if (!isOpen) return null; //No renderizar si no esta abierto

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
                <h3 className="text 2xl font-bold mb-6 text-gray-800">
                    {productData.id ? "Editar Producto" : "Añadir Nuevo Producto"}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Nombre del Producto:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="priceUSD"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Precio (USD):
                        </label>
                        <input
                            type="number"
                            id="priceUSD"
                            name="priceUSD"
                            value={productData.priceUSD}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="stock"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Stock:
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={productData.stock}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                        >
                            {productData.id ? "Guardar Cambios" : "Guardar Producto"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
