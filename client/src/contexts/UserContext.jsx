import { createContext, useContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: '',
    },
    registerHandler() { },
    loginHandler() { },
    logoutHandler() { },
    clearSession() { },
});

const USER_STORAGE_KEY = 'forumApp_user';

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
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

    const registerHandler = async (email, password, profilePicture) => {
        const newUser = { email, password, profilePicture };

        const result = await request('/users/register', 'POST', newUser);

        setUser(result);
    }

    const loginHandler = async (email, password) => {
        const result = await request('/users/login', 'POST', { email, password });

        console.log(result);

        setUser(result);
    }

    const logoutHandler = () => {
        return request('/users/logout', 'GET', null, { accessToken: user.accessToken })
            .finally(() => setUser(null));
    }

    // Clear session without making API call (for expired tokens)
    const clearSession = () => {
        setUser(null);
    }

    const userContextValues = {
        user,
        isAuthenticated: user?.accessToken != null,
        registerHandler,
        loginHandler,
        logoutHandler,
        clearSession,
    }

    return (
        <UserContext.Provider value={userContextValues} >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;