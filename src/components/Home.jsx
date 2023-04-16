import {useEffect, useState} from "react";
import {deletePost, getPosts} from "../utils/Requester.js";
import TimeAgo from "react-timeago";
import {Link} from "react-router-dom";
import {getUsername} from "../utils/Auth.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import toastr from 'toastr';

export default () => {
    const [posts, setPosts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getPosts()
            .then(res => {
                setPosts(res.data);
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
        </div>
    );
}

