import { Link, useNavigate } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import useForm from "../../hooks/useForm";
import { validators } from "../../utils/validationUtils";
import FormField from "../formField/FormField";

export default function PostCreate() {
    const navigate = useNavigate();
    const { request } = useRequest();

    const createPostHandler = async (data) => {
        try {
            await request('/data/posts', 'POST', data);
            navigate('/');
        } catch (err) {
            alert('Failed to create post: ' + (err.message || err));
        }
    }

    const { 
        register, 
        formAction,
        getFieldError,
    } = useForm(createPostHandler, {
        category: '',
        title: '',
        content: '',
    }, {
        category: [validators.required, validators.minLength(2), validators.maxLength(50)],
        title: [validators.required, validators.minLength(5), validators.maxLength(100)],
        content: [validators.required, validators.minLength(10), validators.maxLength(5000)],
    });

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Create New Post</h1>
                    <p className="text-gray-400">Share your thoughts with the community</p>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                    <form className="space-y-6" action={formAction}>
                        <FormField 
                            label="Category" 
                            error={getFieldError('category')}
                            required
                        >
                            <input
                                type="text"
                                id="category"
                                {...register('category')}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    getFieldError('category') ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="e.g. Technology, Gaming, General"
                            />
                        </FormField>

                        <FormField 
                            label="Title" 
                            error={getFieldError('title')}
                            required
                        >
                            <input
                                type="text"
                                id="title"
                                {...register('title')}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    getFieldError('title') ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="Enter your post title (5-100 characters)"
                            />
                        </FormField>

                        <FormField 
                            label="Content" 
                            error={getFieldError('content')}
                            required
                        >
                            <textarea
                                id="content"
                                {...register('content')}
                                rows="12"
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y ${
                                    getFieldError('content') ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="Write your post content here (at least 10 characters)..."
                            ></textarea>
                        </FormField>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                            <Link
                                to="/"
                                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors">
                                Create Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}