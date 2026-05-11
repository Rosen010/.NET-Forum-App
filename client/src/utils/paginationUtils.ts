import type { PaginationData, PageNumberEntry } from "../types";

/**
 * Calculate pagination data for a given dataset. Generic over the item type so
 * the returned `items` array keeps its element type (e.g. Post[] in, Post[] out).
 */
export function paginate<T>(items: T[], currentPage: number, itemsPerPage: number): PaginationData<T> {
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
 * Generate page numbers with ellipsis for pagination controls.
 *
 * @example
 *   getPageNumbers(1, 10, 5)  // [1, 2, 3, 4, '...', 10]
 *   getPageNumbers(5, 10, 5)  // [1, '...', 4, 5, 6, '...', 10]
 *   getPageNumbers(10, 10, 5) // [1, '...', 7, 8, 9, 10]
 */
export function getPageNumbers(currentPage: number, totalPages: number, maxPagesToShow: number = 5): PageNumberEntry[] {
    const pages: PageNumberEntry[] = [];

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
 * Format pagination info text like "Showing 1-5 of 23".
 */
export function getPaginationInfo(startIndex: number, endIndex: number, totalItems: number): string {
    const start = startIndex + 1;
    const end = Math.min(endIndex, totalItems);
    return `Showing ${start}-${end} of ${totalItems}`;
}