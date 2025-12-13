import { useCommentsContext } from "../../contexts/CommentsContext";
import { useUserContext } from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";

export default function CommentForm({ postId }) {
    const { isAuthenticated, user } = useUserContext();
    const { addComment } = useCommentsContext();

    const addCommentHandler = async ({ content }) => {
        if (!content.trim()) {
            return alert('Comment cannot be empty!');
        }

        try {
            const newComment = {
                postId,
                content: content.trim(),
                _createdOn: Date.now(),
                _ownerId: user._id,
                author: {
                    email: user.email,
                    profilePicture: user.profilePicture || '',
                },
            };

            await addComment(newComment);
            
            // Reset form
            setValues({ content: '' });
        } catch (err) {
            alert('Failed to add comment: ' + err.message);
        }
    };

    const { register, formAction, setValues } = useForm(addCommentHandler, {
        content: '',
    });

    if (!isAuthenticated) {
        return (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <p className="text-gray-400 text-center">
                    Please log in to leave a comment
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add a Comment</h3>
            
            <form action={formAction} className="space-y-4">
                <div>
                    <textarea
                        {...register('content')}
                        rows="4"
                        placeholder="Share your thoughts..."
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                </div>
                
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors">
                    Post Comment
                </button>
            </form>
        </div>
    );
}