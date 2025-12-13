/**
 * Form validation utilities
 */

/**
 * Validation rule functions
 */
export const validators = {
    required: (value) => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            return 'This field is required';
        }
        return null;
    },

    email: (value) => {
        if (!value) return null; // Let 'required' handle empty values
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return null;
    },

    minLength: (min) => (value) => {
        if (!value) return null; // Let 'required' handle empty values
        
        if (value.length < min) {
            return `Must be at least ${min} characters`;
        }
        return null;
    },

    maxLength: (max) => (value) => {
        if (!value) return null;
        
        if (value.length > max) {
            return `Must be at most ${max} characters`;
        }
        return null;
    },

    url: (value) => {
        if (!value) return null; // Optional field
        
        try {
            new URL(value);
            return null;
        } catch {
            return 'Please enter a valid URL';
        }
    },

    matchField: (fieldName, fieldLabel) => (value, allValues) => {
        if (value !== allValues[fieldName]) {
            return `Must match ${fieldLabel}`;
        }
        return null;
    },
};

/**
 * Validate a single field against its validation rules
 * @param {string} fieldName - Name of the field
 * @param {any} value - Value to validate
 * @param {Array} rules - Array of validation functions
 * @param {Object} allValues - All form values (for cross-field validation)
 * @returns {string|null} Error message or null if valid
 */
export function validateField(fieldName, value, rules, allValues = {}) {
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
 * Validate all fields in a form
 * @param {Object} values - Form values object
 * @param {Object} validationRules - Object mapping field names to arrays of validation functions
 * @returns {Object} Object mapping field names to error messages (empty object if all valid)
 */
export function validateForm(values, validationRules) {
    const errors = {};

    for (const [fieldName, rules] of Object.entries(validationRules)) {
        const error = validateField(fieldName, values[fieldName], rules, values);
        if (error) {
            errors[fieldName] = error;
        }
    }

    return errors;
}

export function hasErrors(errors) {
    return Object.keys(errors).length > 0;
}