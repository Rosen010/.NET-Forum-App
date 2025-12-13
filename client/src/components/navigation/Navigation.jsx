import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { getUserInitials } from "../../utils/userUtils";
import styles from './Navigation.module.css';

function GuestLinks() {
    return (
        <>
            <Link to="/login" className={`${styles.button} ${styles.loginButton}`}>
                Login
            </Link>
            <Link to="/register" className={`${styles.button} ${styles.registerButton}`}>
                Register
            </Link>
        </>
    );
}

function AuthLinks({ user }) {
    return (
        <>
            <Link to="/profile" className={styles.authLink}>
                {user?.profilePicture ? (
                    <img
                        src={user.profilePicture}
                        alt={user.email}
                        className={styles.avatar}
                    />
                ) : (
                    <div className={styles.avatarPlaceholder}>
                        <span>{getUserInitials(user?.email)}</span>
                    </div>
                )}
                <span>{user?.email}</span>
            </Link>
            <Link to="/logout" className={`${styles.button} ${styles.logoutButton}`}>
                Logout
            </Link>
        </>
    );
}

export default function Navigation() {
    const { isAuthenticated, user } = useUserContext();

    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>
                <div className={styles.navContent}>
                    <div>
                        <Link to="/">
                            <h1 className={styles.logo}>ForumApp</h1>
                        </Link>
                    </div>
                    <div className={styles.navLinks}>
                        {isAuthenticated ? <AuthLinks user={user} /> : <GuestLinks />}
                    </div>
                </div>
            </div>
        </nav>
    );
}