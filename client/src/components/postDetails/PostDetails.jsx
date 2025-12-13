import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import UserContext from "../../contexts/UserContext";
import { getUserInitials } from "../../utils/userUtils";
import Comments from "../comments/Comments";
import CommentForm from "../comments/CommentForm";
import { CommentsProvider } from "../../contexts/CommentsContext";

export default function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(UserContext);
    const { request } = useRequest();
    const [refreshComments, setRefreshComments] = useState(0);

    const urlParams = new URLSearchParams({
        load: 'author=_ownerId:users'
    });

    const { data: post, loading } = useRequest(
        `/data/posts/${postId}?${urlParams.toString()}`,
        null
    );

    const deleteHandler = async () => {
        const confirmed = confirm('Are you sure you want to delete this post?');
        if (!confirmed) return;

        try {
            await request(`/data/posts/${postId}`, 'DELETE');
            navigate('/');
        } catch (err) {
            alert('Failed to delete post: ' + err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-400">Loading...</div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-400">Post not found</div>
                </div>
            </div>
        );
    }

    const isOwner = isAuthenticated && user?._id === post._ownerId;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <Link
                        to="/"
                        className="text-blue-400 hover:text-blue-300 flex items-center space-x-2">
                        <span>←</span>
                        <span>Back to Posts</span>
                    </Link>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                    {post.category && (
                        <div className="mb-4">
                            <span className="inline-block bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                                {post.category}
                            </span>
                        </div>
                    )}

                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            {post.title}
                        </h1>

                        <div className="flex items-center space-x-4">
                            {post.author.profilePicture ? (
                                <img
                                    src={post.author.profilePicture}
                                    alt={post.author.email}
                                    className="w-12 h-12 rounded-full object-cover border border-gray-600"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium">
                                        {getUserInitials(post.author.email)}
                                    </span>
                                </div>
                            )}
                            <div>
                                <p className="text-white font-medium">{post.author.email}</p>
                                <p className="text-gray-400 text-sm">
                                    {new Date(post._createdOn).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none mb-8">
                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </p>
                    </div>

                    {isOwner && (
                        <div className="pt-6 border-t border-gray-700 flex items-center space-x-3">
                            <Link
                                to={`/posts/${postId}/edit`}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors">
                                Edit Post
                            </Link>
                            <button
                                onClick={deleteHandler}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors">
                                Delete Post
                            </button>
                        </div>
                    )}
                </div>

               <div className="mt-8 space-y-6">
                    <CommentsProvider postId={postId}>
                        <Comments />
                        <CommentForm postId={postId} />
                    </CommentsProvider>
                </div>
            </div>
        </div>
    );
}