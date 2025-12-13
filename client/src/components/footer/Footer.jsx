import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerText}>
                        © {new Date().getFullYear()} ForumApp. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}