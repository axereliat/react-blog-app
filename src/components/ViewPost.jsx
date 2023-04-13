import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addComment, deleteComment, getPost} from "../utils/Requester.js";
import TimeAgo from "react-timeago";
import toastr from "toastr";
import ConfirmationModal from "./ConfirmationModal.jsx";

export default () => {
    let {id} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        getPost(id)
            .then(res => {
                setPost(res.data);
                setComments(res.data.comments);
                console.log(res.data);
            })
            .catch(console.log);
    }, []);

    if (!post) {
        return <h1>Loading...</h1>
    }

    const handleSubmit = e => {
        e.preventDefault();

        addComment(id, comment)
            .then(res => {
                toastr.success('Your comment was successfully added');
                setComment('');

                const newComments = comments.concat(res.data)
                    .sort((a, b) => b.id - a.id);
                setComments(newComments);
            })
            .catch(console.log);
    }

    const handleDeleteComment = e => {
        e.preventDefault();

        deleteComment(id, selectedId)
            .then(() => {
                toastr.success('Your comment was successfully deleted');
                setComments(comments.filter(c => c.id !== selectedId));
                setOpen(false);
            })
            .catch(console.log);
    }

    return (
        <div>
            <ConfirmationModal open={open} setOpen={setOpen}
            item="comment" handleYes={handleDeleteComment}/>
            <div className="border-b border-gray-200 pb-5" key={post.id}>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-base font-semibold leading-6 text-gray-900">
                            {post.title}
                        </h2>
                        <p className="mt-2 max-w-4xl text-sm text-gray-500">
                            {post.content}
                        </p>
                        <p>Author: {post.author}</p>
                        <TimeAgo date={post.createdAt}/>
                    </div>
                    <div className="flex justify-start space-x-2">
                        {post.categories.map((c, i) => (
                            <span className="bg-red-300 rounded-xl px-3" key={i}>{c}</span>
                        ))}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="col-span-full">
                    <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                        Add comment
                    </label>
                    <div className="mt-2">
                                    <textarea
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        id="comment"
                                        required={true}
                                        name="comment"
                                        placeholder="your comment..."
                                        rows={3}
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                    />
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
            <ul role="list" className="divide-y divide-gray-200">
                {comments.map(c => (
                    <li key={c.id} className="py-4">
                        <div className="ml-3 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">{c.createdBy.name}</p>
                                <p className="text-sm font-medium text-gray-900">{c.content}</p>
                                <p className="text-sm text-gray-500"><TimeAgo date={c.createdAt}/></p>
                            </div>
                            <div>
                                <button
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => {
                                        setSelectedId(c.id);
                                        setOpen(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}