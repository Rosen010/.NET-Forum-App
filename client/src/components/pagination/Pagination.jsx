import { getPageNumbers, getPaginationInfo } from "../../utils/paginationUtils";

export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    onPageChange,
    itemName = "items"
}) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                    {getPaginationInfo(startIndex, endIndex, totalItems)} {itemName}
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            currentPage === 1
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                    >
                        Previous
                    </button>

                    {getPageNumbers(currentPage, totalPages).map((page, index) => (
                        page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                    currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-white hover:bg-gray-600'
                                }`}
                            >
                                {page}
                            </button>
                        )
                    ))}

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            currentPage === totalPages
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}