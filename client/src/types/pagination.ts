/**
 * The return shape of `paginate()`. Generic over the element type so a single
 * type covers paginated posts, comments, or anything else.
 *
 * @example
 *   const result: PaginationData<Post> = paginate(posts, 1, 5);
 *   result.items; // Post[]
 */
export interface PaginationData<T> {
    items: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    startIndex: number;
    endIndex: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/**
 * An entry in a page-number list produced by `getPageNumbers()`.
 * Most entries are page numbers; gaps are represented by the literal '...'.
 */
export type PageNumberEntry = number | "...";
