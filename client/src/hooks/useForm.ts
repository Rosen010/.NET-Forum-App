import { useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { validateField, validateForm, hasErrors } from "../utils/validationUtils";
import type { ValidationRules, ValidationErrors } from "../utils/validationUtils";

/**
 * Callback fired by `formAction` once validation passes. Receives the current
 * form values and the native FormData object from the submit event.
 */
export type FormCallback<T> = (values: T, formData?: FormData) => void | Promise<void>;

type TouchedFields<T> = Partial<Record<keyof T, boolean>>;

export interface UseFormResult<T> {
    values: T;
    setValues: Dispatch<SetStateAction<T>>;
    errors: ValidationErrors;
    touched: TouchedFields<T>;
    register: (fieldName: keyof T & string) => {
        name: keyof T & string;
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        onBlur: () => void;
        value: T[keyof T];
    };
    changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formAction: (formData?: FormData) => void;
    getFieldError: (fieldName: keyof T & string) => string | null;
    hasErrors: boolean;
}

export default function useForm<T>(
    callback: FormCallback<T>,
    initialValues: T,
    validationRules: ValidationRules = {},
): UseFormResult<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<TouchedFields<T>>({});

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof T & string;

        setValues(state => ({
            ...state,
            [fieldName]: value,
        }));

        // Validate on change if field was already touched
        if (touched[fieldName] && validationRules[fieldName]) {
            const error = validateField(fieldName, value, validationRules[fieldName], {
                ...values,
                [fieldName]: value,
            } as Record<string, unknown>);

            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: error ?? '',
            }));
        }
    };

    const blurHandler = (fieldName: keyof T & string) => {
        setTouched(state => ({
            ...state,
            [fieldName]: true,
        }));

        if (validationRules[fieldName]) {
            const error = validateField(
                fieldName,
                values[fieldName],
                validationRules[fieldName],
                values as Record<string, unknown>,
            );

            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: error ?? '',
            }));
        }
    };

    const formAction = (formData?: FormData) => {
        // Validate all fields before submission
        const formErrors = validateForm(values as Record<string, unknown>, validationRules);

        if (hasErrors(formErrors)) {
            setErrors(formErrors);
            // Mark all fields as touched to show errors
            const allTouched = Object.keys(validationRules).reduce<TouchedFields<T>>((acc, key) => {
                acc[key as keyof T] = true;
                return acc;
            }, {});
            setTouched(allTouched);
            return;
        }

        // Clear errors and proceed with callback
        setErrors({});
        callback(values, formData);
    };

    const register = (fieldName: keyof T & string) => {
        return {
            name: fieldName,
            onChange: changeHandler,
            onBlur: () => blurHandler(fieldName),
            value: values[fieldName],
        };
    };

    const getFieldError = (fieldName: keyof T & string): string | null => {
        return touched[fieldName] ? (errors[fieldName] || null) : null;
    };

    return {
        values,
        setValues,
        errors,
        touched,
        register,
        changeHandler,
        formAction,
        getFieldError,
        hasErrors: hasErrors(errors),
    };
}
