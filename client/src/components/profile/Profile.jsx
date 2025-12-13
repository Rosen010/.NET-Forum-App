import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { getUserInitials } from "../../utils/userUtils";
import UserPosts from "../userPosts/UserPosts";

export default function Profile() {
    const { user, isAuthenticated } = useUserContext();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-400">
                        Please log in to view your profile
                    </div>
                </div>
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-6">
                            {user.profilePicture ? (
                                <img
                                    src={user.profilePicture}
                                    alt={user.email}
                                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-medium">
                                        {getUserInitials(user?.email)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-700 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400 mb-2">Email</h3>
                                    <p className="text-white text-lg">{user.email}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-400 mb-2">User ID</h3>
                                    <p className="text-gray-300 text-sm font-mono">{user._id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <UserPosts userId={user._id} />
                </div>
            </div>
        </div>
    );
}