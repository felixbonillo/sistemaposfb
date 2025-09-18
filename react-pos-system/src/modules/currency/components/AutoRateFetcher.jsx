function AutoRateFetcher({ onFetchRate, isLoading }) {
    return (
        <div className="text-center">
            <button
                onClick={onFetchRate}
                disabled={isLoading}
                className={`px-6 py-2 rounded-md text-white font-semibold transition ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
                {isLoading ? "Actualizando... " : "Actualizar Tasa BCV"}
            </button>
        </div>
    )
}

export default AutoRateFetcher;