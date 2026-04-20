import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3030';

export default function useRequest(endpoint, initialState) {
    const { user, isAuthenticated, clearSession } = useContext(UserContext);
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(!!endpoint);

    const request = async (endpoint, method, data, config = {}) => {
        let options = {};

        if (method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }

        if (config.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken || user.accessToken,
            }
        }

        const response = await fetch(`${baseUrl}${endpoint}`, options);

        // Handle authentication errors (expired/invalid token)
        if (response.status === 401 || response.status === 403) {
            clearSession();
        }

        if (!response.ok) {
            let errorMessage = response.statusText;

            try {
                const errorBody = await response.json();

                if (errorBody.message) {
                    errorMessage = errorBody.message;
                }
            } catch {
                // Ignore JSON parse errors
            }

            throw new Error(errorMessage);
        }

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        return result;
    }

    useEffect(() => {
        if (!endpoint) {
            return;
        }

        setLoading(true);
        request(endpoint)
            .then(result => setData(result))
            .catch(err => {
                console.error('Request failed:', err);
                // Don't show alert for authentication errors since we're logging out
                if (!err.message?.includes('session has expired')) {
                    alert(err);
                }
            })
            .finally(() => setLoading(false));
    }, [endpoint]);

    return {
        request,
        data,
        setData,
        loading,
    }
}