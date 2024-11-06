import axios from 'axios';
import Link from 'next/link';
import { useQuery } from 'react-query';

const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:3000/posts');
    return data;
};

const Posts = () => {
    const { data: posts = [], isLoading } = useQuery('posts', fetchPosts);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex flex-wrap justify-center">
            {posts.map((post) => (
                <div key={post.id} className="max-w-sm p-6 m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link href={`/posts/${post.id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Views: {post.views}</p>
                    <p className="mb-4 text-gray-700 dark:text-red-300">Description: {post.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Posts;
