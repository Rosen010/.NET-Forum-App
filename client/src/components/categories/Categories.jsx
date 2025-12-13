import { Link, useSearchParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import styles from './Categories.module.css';

export default function Categories() {
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category');

    const { data: posts } = useRequest('/data/posts', []);

    const categories = [...new Set(
        posts
            .map(post => post.category)
            .filter(category => category && category.trim() !== '')
    )].sort();

    return (
        <div className="lg:col-span-1">
            <div className={styles.categoriesCard}>
                <h2 className={styles.categoriesTitle}>Categories</h2>
                <ul className={styles.categoriesList}>
                    <li className={styles.categoryItem}>
                        <Link
                            to="/"
                            className={`${styles.categoryLink} ${
                                !selectedCategory 
                                    ? styles.categoryLinkActive 
                                    : styles.categoryLinkInactive
                            }`}
                        >
                            All Categories
                        </Link>
                    </li>

                    {categories.map(category => (
                        <li key={category} className={styles.categoryItem}>
                            <Link
                                to={`/?category=${encodeURIComponent(category)}`}
                                className={`${styles.categoryLink} ${
                                    selectedCategory === category
                                        ? styles.categoryLinkActive
                                        : styles.categoryLinkInactive
                                }`}
                            >
                                {category}
                            </Link>
                        </li>
                    ))}

                    {categories.length === 0 && (
                        <li className={styles.emptyState}>
                            No categories yet
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}