import {useEffect, useState} from "react";
import {deletePost, getComments, getPosts} from "../utils/Requester.js";
import TimeAgo from "react-timeago";
import {Link} from "react-router-dom";
import {getUsername} from "../utils/Auth.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import toastr from 'toastr';

export default () => {
    const [posts, setPosts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        getPosts(page)
            .then(res => {
                setPosts(res.data.items);
                setHasMore(res.data.hasMore);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = e => {
        e.preventDefault();

        deletePost(selectedId)
            .then(() => {
                setPosts(posts.filter(p => p.id !== selectedId));
                setOpen(false);
                toastr.success('Your post was successfully deleted');
            })
            .catch(console.log);
    }

    const loadMore = () => {
        setPage(page + 1);

        getPosts(page)
            .then(res => {
                setPosts(posts.concat(res.data.items));
                setHasMore(res.data.hasMore);
            })
            .catch(console.log);
    };

    return (
        <div>
            <ConfirmationModal open={open} setOpen={setOpen}
                               item="post" handleYes={handleDelete}/>
            {posts.map(p => (
                <div className="border-b border-gray-200 pb-5" key={p.id}>
                    <div className="flex justify-between items-center">
                        <div>
                            <Link to={'/posts/' + p.id} className="text-base font-semibold leading-6 text-gray-900">
                                {p.title}
                            </Link>
                            <p className="mt-2 max-w-4xl text-sm text-gray-500">
                                {p.content.substr(0, 30)}
                            </p>
                            <p>Author: {p.author.username}</p>
                            <TimeAgo date={p.createdAt}/>
                            <br/>
                            {p.author.username === getUsername() ?
                                <div>
                                    <button className="bg-red-600 text-white p-2 rounded" onClick={() => {
                                        setSelectedId(p.id);
                                        setOpen(true);
                                    }}>Delete</button>
                                    {' '}
                                    <Link to={"/posts/" + p.id + "/edit"}  className="bg-gray-600 text-white p-2 rounded">Edit</Link>
                                </div>
                                : null}
                        </div>
                        <div className="flex justify-start space-x-2">
                            {p.categories.map((c) => (
                                <span className="bg-red-300 rounded-xl px-3" key={c.id}>{c.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            {hasMore ?
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={loadMore}
                        className="flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Load more
                    </button>
                </div>
                : null}
        </div>
    );
}

