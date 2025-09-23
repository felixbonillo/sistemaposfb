import React from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

//Este componente solo se encargara de mostrar la tabla de productos
//Recibira products como una prop

function ProductTable({
  products,
  bcvRate,
  userRole,
  onEdit,
  onDelete,
  globalFilter,
  setGlobalFilter
}) {
  //1. Definir las columnas de las tablas
  //Cada objeto va a definir una columna

  const columns = React.useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "id", //Clave del dato en cada objeto de producto
        header: "ID", //El texto que se mostrara en la cabecera
        cell: (info) => info.getValue(), // Como renderizar la celda (Aqui solo se muestra el valor)
      },
      {
        accessorKey: "name",
        header: "Nombre del Producto",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "priceUSD",
        header: "Precio (USD)",
        cell: (info) => {
          const value = Number(info.getValue());
          return `$${isNaN(value) ? "0.00" : value.toFixed(2)}`
        }
      },
      {
        header: "Precio (Bs)",
        cell: (info) => {
          const usd = Number(info.row.original.priceUSD);
          const rate = Number(bcvRate);
          if (!usd || !rate || isNaN(usd * rate)) {
            return "Bs 0.00";
          }
          return `Bs ${(usd * rate).toFixed(2)}`;
        }
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: (info) => info.getValue(),
      },
    ];

    // Si el usuario es 'admin', añadimos la columna de acciones
    if (userRole === "admin") {
      baseColumns.push({
        id: "actions", // ID único para esta columna
        header: "Acciones",
        cell: (
          { row } // 'row' contiene los datos de la fila actual
        ) => (
          <div className="flex justify-center items-center">
            <button
              onClick={() => onEdit(row.original)} // Pasa el producto completo
              className="text-blue-600 hover:text-blue-800 mr-3 text-lg"
              title="Editar producto"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(row.original.id)} // Pasa solo el ID para eliminar
              className="text-red-600 hover:text-red-800 text-lg"
              title="Eliminar producto"
            >
              Eliminar
            </button>
          </div>
        ),
      });
    }

    return baseColumns;
  }, [bcvRate, userRole, onEdit, onDelete]); // Dependencias: Si cambian, se recalculan las columnas
  //Creamos la instancia de la tabla usando useReactTable hook

  const table = useReactTable({
    data: products, // Los datos que la tabla mostrara
    columns, //Las columnas que definimos
    getCoreRowModel: getCoreRowModel(), //Un modelo esencial para que la tabla funcione
    //Configuracion para el filtro global
    getFilteredRowModel: getFilteredRowModel(), //Habilita el filtrado
    state: {
      globalFilter: globalFilter, //Conecta el filtro global al estado del input
    },
    onGlobalFilterChange: setGlobalFilter
  });

  if (!products || products.length === 0) {
    return <p className="text-gray-600">No hay productos para mostrar</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            {/* Iteramos sobre los grupos de cabeceras */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {/* Iteramos sobre cada cabecera dentro del grupo */}
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase -tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* Iteramos sobre las filas de la tabla */}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {/* Iteramos sobre cada celda de la fila */}
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
