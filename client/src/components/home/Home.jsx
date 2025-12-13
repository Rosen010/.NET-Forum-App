import Categories from "../categories/Categories";
import Posts from "../posts/Posts";

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Categories />
                <Posts />
            </div>
        </div>
    );
}