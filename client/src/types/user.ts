/**
 * Public-facing user data. This is what comes back when a post or comment
 * is loaded with `?load=author=_ownerId:users` — the embedded `author` field.
 */
export interface User {
    _id: string;
    _createdOn: number;
    email: string;
    profilePicture?: string;
}

/**
 * The currently logged-in user. Same as `User` plus the session token returned
 * by the login/register endpoints. Stored in UserContext and localStorage.
 */
export interface AuthUser extends User {
    accessToken: string;
}

/**
 * Payload sent to the login endpoint.
 */
export interface UserCredentials {
    email: string;
    password: string;
}

/**
 * Payload sent to the register endpoint (credentials plus an optional avatar).
 */
export interface RegisterInput extends UserCredentials {
    profilePicture?: string;
}
