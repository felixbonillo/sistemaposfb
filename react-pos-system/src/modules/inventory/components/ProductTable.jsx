import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useCurrency } from "../../../context/useCurrency";


export default function ProductTable({ products, onEdit, onDelete }) {
  const { rate } = useCurrency();

  const data = useMemo(() => products, [products]);

  const columns = useMemo(
    () => [
      {
        header: "Nombre",
        accessorKey: "name",
      },
      {
        header: "Precio (USD)",
        accessorKey: "priceUSD",
        cell: (info) => {
          const usd = Number(info.row.original.priceUSD);
          return usd ? `$${usd.toFixed(2)}` : "$0.00";
        },
      },
      {
        header: "Precio (Bs)",
        accessorKey: "priceBS",
        cell: (info) => {
          const usd = Number(info.row.original.priceUSD);
          if (!usd || !rate || isNaN(usd * rate)) {
            return "Bs 0.00";
          }
          return `Bs ${(usd * rate).toFixed(2)}`;
        },
      },
      {
        header: "Stock",
        accessorKey: "stock",
      },
      {
        header: "Acciones",
        id: "actions",
        cell: (info) => (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(info.row.original)}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(info.row.original.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    [rate, onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-2 border text-left text-sm font-medium"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4 py-2 border text-sm">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
