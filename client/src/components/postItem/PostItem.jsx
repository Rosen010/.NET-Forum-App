import { Link } from "react-router-dom";
import { getUserInitials } from "../../utils/userUtils";
import styles from './PostItem.module.css';

export default function PostItem({ post }) {
    const {
        _id,
        title,
        content,
        _createdOn,
        author,
    } = post;

    return (
        <Link to={`/posts/${_id}`}>
            <div className={styles.postCard}>
                <div className={styles.postContent}>
                    <div className={styles.postBody}>
                        <h3 className={styles.postTitle}>
                            {title}
                        </h3>
                        <p className={styles.postText}>
                            {content}
                        </p>
                        <div className={styles.postMeta}>
                            <span>By: {author.email}</span>
                            <span className={styles.metaSeparator}>•</span>
                            <span>{new Date(_createdOn).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className={styles.authorSection}>
                        {author.profilePicture ? (
                            <img
                                src={author.profilePicture}
                                alt={author.email}
                                className={styles.authorImage}
                            />
                        ) : (
                            <div className={styles.authorPlaceholder}>
                                <span>
                                    {getUserInitials(author?.email)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}