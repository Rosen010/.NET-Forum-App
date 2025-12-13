/**
 * Pagination utility functions
 */

/**
 * Calculate pagination data for a given dataset
 * @param {Array} items - Array of items to paginate
 * @param {number} currentPage - Current page number (1-indexed)
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Object} Pagination data including paginated items and metadata
 */
export function paginate(items, currentPage, itemsPerPage) {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Ensure currentPage is within valid range
    const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
    
    const startIndex = (validPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
        items: paginatedItems,
        currentPage: validPage,
        totalPages,
        totalItems,
        startIndex,
        endIndex,
        hasNextPage: validPage < totalPages,
        hasPreviousPage: validPage > 1,
    };
}

/**
 * Generate an array of page numbers to display in pagination controls
 * Uses intelligent truncation with ellipsis for large page counts
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {number} maxPagesToShow - Maximum number of page buttons to show (default: 5)
 * @returns {Array} Array of page numbers and ellipsis ('...')
 * 
 * @example
 * getPageNumbers(1, 10, 5) // [1, 2, 3, 4, '...', 10]
 * getPageNumbers(5, 10, 5) // [1, '...', 4, 5, 6, '...', 10]
 * getPageNumbers(10, 10, 5) // [1, '...', 7, 8, 9, 10]
 */
export function getPageNumbers(currentPage, totalPages, maxPagesToShow = 5) {
    const pages = [];
    
    if (totalPages <= maxPagesToShow) {
        // Show all pages if total is small
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Show first, last, current, and surrounding pages
        if (currentPage <= 3) {
            // Near the beginning
            for (let i = 1; i <= 4; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
            // Near the end
            pages.push(1);
            pages.push('...');
            for (let i = totalPages - 3; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // In the middle
            pages.push(1);
            pages.push('...');
            pages.push(currentPage - 1);
            pages.push(currentPage);
            pages.push(currentPage + 1);
            pages.push('...');
            pages.push(totalPages);
        }
    }
    
    return pages;
}

/**
 * Format pagination info text
 * @param {number} startIndex - Starting index (0-based)
 * @param {number} endIndex - Ending index (0-based)
 * @param {number} totalItems - Total number of items
 * @returns {string} Formatted string like "Showing 1-5 of 23 posts"
 */
export function getPaginationInfo(startIndex, endIndex, totalItems) {
    const start = startIndex + 1;
    const end = Math.min(endIndex, totalItems);
    return `Showing ${start}-${end} of ${totalItems}`;
}