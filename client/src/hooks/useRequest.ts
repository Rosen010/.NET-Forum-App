import { useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import UserContext from "../contexts/UserContext";

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3030';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
    accessToken?: string;
}

export interface UseRequestResult<T> {
    request: <R = unknown>(
        endpoint: string,
        method?: HttpMethod,
        data?: unknown,
        config?: RequestConfig,
    ) => Promise<R>;
    data: T;
    setData: Dispatch<SetStateAction<T>>;
    loading: boolean;
}

export default function useRequest<T = unknown>(
    endpoint?: string,
    initialState?: T,
): UseRequestResult<T> {
    const { user, isAuthenticated, clearSession } = useContext(UserContext);
    const [data, setData] = useState<T>(initialState as T);
    const [loading, setLoading] = useState<boolean>(!!endpoint);

    const request = async <R = unknown>(
        reqEndpoint: string,
        method?: HttpMethod,
        reqData?: unknown,
        config: RequestConfig = {},
    ): Promise<R> => {
        const options: RequestInit = {};

        if (method) {
            options.method = method;
        }

        if (reqData) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(reqData);
        }

        const token = config.accessToken ?? user?.accessToken;

        if (token) {
            options.headers = {
                ...options.headers,
                'X-Authorization': token,
            };
        }


        const response = await fetch(`${baseUrl}${reqEndpoint}`, options);

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
            return {} as R;
        }

        const result = await response.json();

        return result as R;
    };

    useEffect(() => {
        if (!endpoint) {
            return;
        }

        setLoading(true);
        request<T>(endpoint)
            .then(result => setData(result))
            .catch((err: Error) => {
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
    };
}
