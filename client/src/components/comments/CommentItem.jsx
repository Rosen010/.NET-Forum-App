import { useUserContext } from "../../contexts/UserContext";
import { getUserInitials } from "../../utils/userUtils";

export default function CommentItem({ comment, onDelete }) {
    const { user, isAuthenticated } = useUserContext();
    const isOwner = isAuthenticated && user?._id === comment._ownerId;

    const handleDelete = () => {
        const confirmed = confirm('Are you sure you want to delete this comment?');
        if (confirmed && onDelete) {
            onDelete(comment._id);
        }
    };

    return (
        <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                    {comment.author?.profilePicture ? (
                        <img
                            src={comment.author.profilePicture}
                            alt={comment.author.email}
                            className="w-10 h-10 rounded-full object-cover border border-gray-500"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                                {getUserInitials(comment.author?.email)}
                            </span>
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium text-white">
                            {comment.author?.email || 'Unknown User'}
                        </p>
                        <p className="text-xs text-gray-400">
                            {new Date(comment._createdOn).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>

                {isOwner && (
                    <button
                        onClick={handleDelete}
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                        Delete
                    </button>
                )}
            </div>

            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                {comment.content}
            </p>
        </div>
    );
}