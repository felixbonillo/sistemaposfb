import { render, screen } from "@testing-library/react";
import ProductTable from "../ProductTable";
import { describe, it, expect } from "vitest";

describe("ProductTable", () => {
    it("muestra la lista de productos en la tabla", () => {
        const products = [
            { id: 1, name: "Laptop", price: 500, stock: 3 },
            { id: 2, name: "Mouse", price: 20, stock: 15 },
        ];

        render(<ProductTable products={products} />);

        // verificamos que los nombres aparecen en la tabla
        expect(screen.getByText("Laptop")).toBeInTheDocument();
        expect(screen.getByText("Mouse")).toBeInTheDocument();
    });
});
