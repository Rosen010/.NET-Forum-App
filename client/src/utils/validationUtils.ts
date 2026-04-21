/**
 * Form validation utilities
 */

/**
 * A validator takes a field value (and optionally the full form's values for
 * cross-field checks) and returns an error message string, or `null` if valid.
 */
export type Validator = (
    value: unknown,
    allValues?: Record<string, unknown>,
) => string | null;

/**
 * A bag of validation rules, mapping each field name to an ordered list of
 * validators. Rules run in order and the first error short-circuits.
 */
export type ValidationRules = Record<string, Validator[]>;

/**
 * Record of error messages produced after validation, keyed by field name.
 * Fields with no error are simply absent from the record.
 */
export type ValidationErrors = Record<string, string>;

/**
 * Built-in validator functions.
 */
export const validators = {
    required: ((value) => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            return 'This field is required';
        }
        return null;
    }) as Validator,

    email: ((value) => {
        if (!value) return null; // Let 'required' handle empty values
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value !== 'string' || !emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return null;
    }) as Validator,

    minLength: (min: number): Validator => (value) => {
        if (!value) return null; // Let 'required' handle empty values
        
        if (typeof value !== 'string' || value.length < min) {
            return `Must be at least ${min} characters`;
        }
        return null;
    },

    maxLength: (max: number): Validator => (value) => {
        if (!value) return null;
        
        if (typeof value !== 'string' || value.length > max) {
            return `Must be at most ${max} characters`;
        }
        return null;
    },

    url: ((value) => {
        if (!value) return null; // Optional field
        
        if (typeof value !== 'string') {
            return 'Please enter a valid URL';
        }

        try {
            new URL(value);
            return null;
        } catch {
            return 'Please enter a valid URL';
        }
    }) as Validator,

    matchField: (fieldName: string, fieldLabel: string): Validator =>
        (value, allValues) => {
            if (!allValues || value !== allValues[fieldName]) {
                return `Must match ${fieldLabel}`;
            }
            return null;
        },
};

/**
 * Validate a single field against its validation rules. Returns the first
 * error, or null if all rules pass.
 */
export function validateField(
    fieldName: string,
    value: unknown,
    rules: Validator[],
    allValues: Record<string, unknown> = {},
): string | null {
    if (!rules || rules.length === 0) {
        return null;
    }

    for (const rule of rules) {
        const error = rule(value, allValues);
        if (error) {
            return error;
        }
    }

    return null;
}

/**
 * Validate all fields in a form. Returns a record of errors keyed by field
 * name; empty record means all fields are valid.
 */
export function validateForm(
    values: Record<string, unknown>,
    validationRules: ValidationRules,
): ValidationErrors {
    const errors: ValidationErrors = {};

    for (const [fieldName, rules] of Object.entries(validationRules)) {
        const error = validateField(fieldName, values[fieldName], rules, values);
        if (error) {
            errors[fieldName] = error;
        }
    }

    return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
    return Object.keys(errors).length > 0;
}