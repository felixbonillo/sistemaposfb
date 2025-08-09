import React from "react";

//Este componente solo se encargara de mostrar la tabla de productos
//Recibira products como una prop

function ProductTable ({ products, bcvRate }) {
    if (!products || products.length === 0) {
        return <p className="text-gray-600">No hay productos para mostrar</p>
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                        
                    </tr>
                </thead>
            </table>
        </div>
    )
}