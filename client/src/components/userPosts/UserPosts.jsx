import { Link } from "react-router-dom";
import useRequest from "../../hooks/useRequest";

export default function UserPosts({ userId }) {

    const whereClause = `_ownerId="${userId}"`;
    const sortBy = '_createdOn desc';
    const { data: userPosts, loading: postsLoading } = useRequest(
        userId ? `/data/posts?where=${encodeURIComponent(whereClause)}&sortBy=${encodeURIComponent(sortBy)}` : null,
        []
    );

    if (postsLoading) {
        return (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">My Posts</h2>
                <div className="text-center text-gray-400 py-8">Loading posts...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">My Posts</h2>

            {userPosts && userPosts.length > 0 ? (
                <div className="space-y-4">
                    {userPosts.map(post => (
                        <Link
                            key={post._id}
                            to={`/posts/${post._id}`}
                            className="block bg-gray-700 hover:bg-gray-650 rounded-lg p-5 border border-gray-600 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    {post.category && (
                                        <span className="inline-block bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs font-medium mb-2">
                                            {post.category}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                        {post.content}
                                    </p>
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <span>
                                            {new Date(post._createdOn).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {new Date(post._createdOn).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">You haven't created any posts yet.</p>
                    <Link
                        to="/create-post"
                        className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-sm font-medium transition-colors">
                        Create Your First Post
                    </Link>
                </div>
            )}
        </div>
    );
}