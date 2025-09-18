import { useState } from "react";

function ManualRateInput({ onSaveManualRate }) {
    const [manualRate, setManualRate] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!manualRate || Number(manualRate) <= 0) {
            alert(" Introduce un valor valido ")
            return;
        }

        onSaveManualRate(Number(manualRate))
        setManualRate("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
            <input type="number"
                step="0.01"
                value={manualRate}
                onChange={(e) => setManualRate(e.target.value)}
                placeholder="Ingresar tasa manual"
                className="px-3 py-2 border rounded-md flex-grow"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Guardar
            </button>
        </form>
    )
}

export default ManualRateInput;