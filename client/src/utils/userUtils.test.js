import { describe, it, expect } from 'vitest';
import { getUserInitials } from './userUtils';

describe('User Utils', () => {
  describe('getUserInitials', () => {
    it('returns initials from email with two parts', () => {
      const result = getUserInitials('john.doe@example.com');
      expect(result).toBe('JD');
    });

    it('returns first two letters when email has single word', () => {
      const result = getUserInitials('username@example.com');
      expect(result).toBe('US');
    });

    it('handles uppercase emails', () => {
      const result = getUserInitials('JOHN.DOE@EXAMPLE.COM');
      expect(result).toBe('JD');
    });

    it('handles emails with numbers', () => {
      const result = getUserInitials('user123@example.com');
      expect(result).toBe('US');
    });

    it('handles emails with underscores', () => {
      const result = getUserInitials('first_last@example.com');
      expect(result).toBe('FL');
    });

    it('returns ?? for undefined email', () => {
      const result = getUserInitials(undefined);
      expect(result).toBe('??');
    });

    it('returns ?? for null email', () => {
      const result = getUserInitials(null);
      expect(result).toBe('??');
    });

    it('returns ?? for empty string', () => {
      const result = getUserInitials('');
      expect(result).toBe('??');
    });
  });
});