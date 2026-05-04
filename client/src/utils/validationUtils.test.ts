import { describe, it, expect } from 'vitest';
import { validators } from './validationUtils';

describe('Validation Utils', () => {
  describe('required validator', () => {
    it('returns error for empty string', () => {
      const result = validators.required('');
      expect(result).toBe('This field is required');
    });

    it('returns error for whitespace only', () => {
      const result = validators.required('   ');
      expect(result).toBe('This field is required');
    });

    it('returns null for valid input', () => {
      const result = validators.required('valid input');
      expect(result).toBeNull();
    });
  });

  describe('minLength validator', () => {
    it('returns error when value is too short', () => {
      const validator = validators.minLength(5);
      const result = validator('abc');
      expect(result).toBe('Must be at least 5 characters');
    });

    it('returns null when value meets minimum length', () => {
      const validator = validators.minLength(5);
      const result = validator('abcde');
      expect(result).toBeNull();
    });

    it('returns null when value exceeds minimum length', () => {
      const validator = validators.minLength(5);
      const result = validator('abcdefgh');
      expect(result).toBeNull();
    });
  });

  describe('maxLength validator', () => {
    it('returns error when value is too long', () => {
      const validator = validators.maxLength(5);
      const result = validator('abcdefgh');
      expect(result).toBe('Must be at most 5 characters');
    });

    it('returns null when value meets maximum length', () => {
      const validator = validators.maxLength(5);
      const result = validator('abcde');
      expect(result).toBeNull();
    });

    it('returns null when value is under maximum length', () => {
      const validator = validators.maxLength(5);
      const result = validator('abc');
      expect(result).toBeNull();
    });
  });

  describe('email validator', () => {
    it('returns error for invalid email format', () => {
      const result = validators.email('notanemail');
      expect(result).toBe('Please enter a valid email address');
    });

    it('returns error for email without @', () => {
      const result = validators.email('test.com');
      expect(result).toBe('Please enter a valid email address');
    });

    it('returns error for email without domain', () => {
      const result = validators.email('test@');
      expect(result).toBe('Please enter a valid email address');
    });

    it('returns null for valid email', () => {
      const result = validators.email('test@example.com');
      expect(result).toBeNull();
    });

    it('returns null for valid email with subdomain', () => {
      const result = validators.email('user@mail.example.com');
      expect(result).toBeNull();
    });
  });
});