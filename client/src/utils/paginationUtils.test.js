import { describe, it, expect } from 'vitest';
import { paginate, getPageNumbers, getPaginationInfo } from './paginationUtils';

describe('Pagination Utils', () => {
  describe('paginate', () => {
    const testItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it('returns correct first page items', () => {
      const result = paginate(testItems, 1, 3);
      
      expect(result.items).toEqual([1, 2, 3]);
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(4);
      expect(result.totalItems).toBe(10);
    });

    it('returns correct middle page items', () => {
      const result = paginate(testItems, 2, 3);
      
      expect(result.items).toEqual([4, 5, 6]);
      expect(result.currentPage).toBe(2);
    });

    it('returns correct last page items', () => {
      const result = paginate(testItems, 4, 3);
      
      expect(result.items).toEqual([10]);
      expect(result.currentPage).toBe(4);
    });

    it('handles empty array', () => {
      const result = paginate([], 1, 5);
      
      expect(result.items).toEqual([]);
      expect(result.totalPages).toBe(0);
      expect(result.totalItems).toBe(0);
    });

    it('correctly identifies hasNextPage', () => {
      const result = paginate(testItems, 1, 3);
      expect(result.hasNextPage).toBe(true);
      
      const lastPage = paginate(testItems, 4, 3);
      expect(lastPage.hasNextPage).toBe(false);
    });

    it('correctly identifies hasPreviousPage', () => {
      const result = paginate(testItems, 2, 3);
      expect(result.hasPreviousPage).toBe(true);
      
      const firstPage = paginate(testItems, 1, 3);
      expect(firstPage.hasPreviousPage).toBe(false);
    });
  });

  describe('getPageNumbers', () => {
    it('returns all pages when total is small', () => {
      const result = getPageNumbers(1, 3, 5);
      expect(result).toEqual([1, 2, 3]);
    });

    it('shows ellipsis for large page counts at start', () => {
      const result = getPageNumbers(1, 10, 5);
      expect(result).toEqual([1, 2, 3, 4, '...', 10]);
    });

    it('shows ellipsis for large page counts in middle', () => {
      const result = getPageNumbers(5, 10, 5);
      expect(result).toEqual([1, '...', 4, 5, 6, '...', 10]);
    });

    it('shows ellipsis for large page counts at end', () => {
      const result = getPageNumbers(10, 10, 5);
      expect(result).toEqual([1, '...', 7, 8, 9, 10]);
    });
  });

  describe('getPaginationInfo', () => {
    it('formats pagination info correctly for first page', () => {
      const result = getPaginationInfo(0, 5, 23);
      expect(result).toBe('Showing 1-5 of 23');
    });

    it('formats pagination info correctly for middle page', () => {
      const result = getPaginationInfo(5, 10, 23);
      expect(result).toBe('Showing 6-10 of 23');
    });

    it('formats pagination info correctly for last partial page', () => {
      const result = getPaginationInfo(20, 25, 23);
      expect(result).toBe('Showing 21-23 of 23');
    });
  });
});