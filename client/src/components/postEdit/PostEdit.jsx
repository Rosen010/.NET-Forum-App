import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import useForm from "../../hooks/useForm";

export default function PostEdit() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { request, data: post, loading } = useRequest(`/data/posts/${postId}`, null);

    const editPostHandler = async (data) => {
        try {
            await request(`/data/posts/${postId}`, 'PATCH', data);
            navigate(`/posts/${postId}`);
        } catch (err) {
            alert('Failed to update post: ' + err);
        }
    }

    const { register, formAction, setValues } = useForm(editPostHandler, {
        category: '',
        title: '',
        content: '',
    });

    useEffect(() => {
        if (post) {
            setValues({
                category: post.category || '',
                title: post.title || '',
                content: post.content || '',
            });
        }
    }, [post]);

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

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Post</h1>
                    <p className="text-gray-400">Update your post content</p>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                    <form className="space-y-6" action={formAction}>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                {...register('category')}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your post category"
                            />
                        </div>

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                {...register('title')}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your post title"
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                                Content
                            </label>
                            <textarea
                                id="content"
                                {...register('content')}
                                rows="12"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                placeholder="Write your post content here..."
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                            <Link
                                to={`/posts/${postId}`}
                                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors">
                                Cancel
                            </Link>
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors">
                                    Update Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}