import { render, screen, fireEvent } from "@testing-library/react";
import ManualRateInput from "../components/ManualRateInput";
import { describe, it, expect, vi } from "vitest";

describe("ManualRateInput", () => {
    it("permite guardar una tasa válida", () => {
        const mockSave = vi.fn();

        render(<ManualRateInput onSaveManualRate={mockSave} />);

        const input = screen.getByPlaceholderText(/Ingresar tasa manual/i);
        fireEvent.change(input, { target: { value: "120.5" } });

        const button = screen.getByRole("button", { name: /guardar/i });
        fireEvent.click(button);

        expect(mockSave).toHaveBeenCalledWith(120.5);
    });
});
