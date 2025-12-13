import { useState } from "react";
import { validateField, validateForm, hasErrors } from "../utils/validationUtils";

export default function useForm(callback, initialValues, validationRules = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;
        
        setValues(state => ({
            ...state,
            [name]: value
        }));

        // Validate on change if field was already touched
        if (touched[name] && validationRules[name]) {
            const error = validateField(name, value, validationRules[name], {
                ...values,
                [name]: value
            });
            
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: error
            }));
        }
    };

    const blurHandler = (fieldName) => {
        setTouched(state => ({
            ...state,
            [fieldName]: true
        }));

        if (validationRules[fieldName]) {
            const error = validateField(fieldName, values[fieldName], validationRules[fieldName], values);
            
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldName]: error
            }));
        }
    };

    const formAction = (formData) => {
        // Validate all fields before submission
        const formErrors = validateForm(values, validationRules);
        
        if (hasErrors(formErrors)) {
            setErrors(formErrors);
            // Mark all fields as touched to show errors
            const allTouched = Object.keys(validationRules).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {});
            setTouched(allTouched);
            return;
        }

        // Clear errors and proceed with callback
        setErrors({});
        callback(values, formData);
    };

    const register = (fieldName) => {
        return {
            name: fieldName,
            onChange: changeHandler,
            onBlur: () => blurHandler(fieldName),
            value: values[fieldName],
        };
    };

    const getFieldError = (fieldName) => {
        return touched[fieldName] ? errors[fieldName] : null;
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