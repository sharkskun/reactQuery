import axios from 'axios';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const fetchPost = async (id) => {
    const { data } = await axios.get(`http://localhost:3001/posts/${id}`);
    return data;
};

const fetchComments = async (postId) => {
    const { data } = await axios.get(`http://localhost:3001/comments?postId=${postId}`);
    return data;
};

const PostDetail = () => {
    const { query: { id } } = useRouter();

    const { data: post, isLoading: postLoading } = useQuery(['post', id], () => fetchPost(id), {
        enabled: !!id,
    });

    const { data: comments = [], isLoading: commentsLoading } = useQuery(['comments', id], () => fetchComments(id), {
        enabled: !!id,
    });
    
    if (postLoading || commentsLoading) return <div>Loading...</div>;

    if (!post) return <div>posts tidak ada</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-400">Views: {post.views}</p>
            <p className="mb-4 text-gray-700 dark:text-red-300">Description: {post.description}</p>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Comments</h2>
            {comments.length === 0 ? (
                <p>komen tidak adaaaa.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="p-4 border-b border-gray-200">
                        <p className="text-gray-700 dark:text-gray-400">{comment.text}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostDetail;
