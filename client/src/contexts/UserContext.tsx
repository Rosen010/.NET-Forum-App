import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import useRequest from "../hooks/useRequest";
import type { AuthUser } from "../types";

interface UserContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    registerHandler: (
        email: string,
        password: string,
        profilePicture?: string,
    ) => Promise<void>;
    loginHandler: (email: string, password: string) => Promise<void>;
    logoutHandler: () => Promise<unknown>;
    clearSession: () => void;
}

const UserContext = createContext<UserContextValue>({
    user: null,
    isAuthenticated: false,
    registerHandler: async () => {},
    loginHandler: async () => {},
    logoutHandler: async () => {},
    clearSession: () => {},
});

const USER_STORAGE_KEY = 'forumApp_user';

export function UserProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<AuthUser | null>(() => {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        return storedUser ? (JSON.parse(storedUser) as AuthUser) : null;
    });

    const { request } = useRequest();

    // Sync user state to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    }, [user]);

    const registerHandler = async (
        email: string,
        password: string,
        profilePicture?: string,
    ): Promise<void> => {
        const newUser = { email, password, profilePicture };

        const result = await request<AuthUser>('/users/register', 'POST', newUser);

        setUser(result);
    };

    const loginHandler = async (email: string, password: string): Promise<void> => {
        const result = await request<AuthUser>('/users/login', 'POST', { email, password });

        console.log(result);

        setUser(result);
    };

    const logoutHandler = (): Promise<unknown> => {
        return request('/users/logout', 'GET', null, { accessToken: user?.accessToken })
            .finally(() => setUser(null));
    };

    // Clear session without making API call (for expired tokens)
    const clearSession = (): void => {
        setUser(null);
    };

    const userContextValues: UserContextValue = {
        user,
        isAuthenticated: user?.accessToken != null,
        registerHandler,
        loginHandler,
        logoutHandler,
        clearSession,
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext(): UserContextValue {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;
