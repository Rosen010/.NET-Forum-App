import { useCommentsContext } from "../../contexts/CommentsContext";
import CommentItem from "./CommentItem";

export default function Comments() {
    const { comments, loading, deleteComment } = useCommentsContext();

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId);
        } catch (err) {
            alert('Failed to delete comment: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Comments</h3>
                <p className="text-gray-400 text-center">Loading comments...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
                Comments ({comments.length})
            </h3>

            {comments.length > 0 ? (
                <div className="space-y-4">
                    {comments.map(comment => (
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                            onDelete={handleDeleteComment}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center py-4">
                    No comments yet. Be the first to comment!
                </p>
            )}
        </div>
    );
}