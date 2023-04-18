import {useEffect, useState} from "react";
import {deletePost, getComments, getPosts, likePost, unlikePost} from "../utils/Requester.js";
import TimeAgo from "react-timeago";
import {Link} from "react-router-dom";
import {getUsername} from "../utils/Auth.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import toastr from 'toastr';
import PostTile from "./common/PostTile.jsx";

export default () => {
    const [posts, setPosts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [postLiked, setPostLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

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

    const onPostDeleted = postId => {
        setSelectedId(postId);
        setOpen(true);
    };

    return (
        <div>
            <ConfirmationModal open={open} setOpen={setOpen}
                               item="post" handleYes={handleDelete}/>
            {posts.map(p => (
                <div className="border-b border-gray-200 pb-5" key={p.id}>
                        <PostTile
                            onDeletePost={() => onPostDeleted(p.id)}
                            post={p}/>
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

