function CurrencyDisplay({ rate, lastUpdated }) {

    return (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-xl font-bold text-gray-800">
                Tasa BCV: {rate ? `Bs. ${rate.toFixed(2)}` : "--"}
            </h3>
            <p className="text-sm text-gray-500">
                Ultima actualizacion: {lastUpdated || "N/A"}
            </p>
        </div>
    )
}

export default CurrencyDisplay;