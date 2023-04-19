import {Fragment, useEffect, useState} from "react";
import {deletePost, getCategories, getComments, getPosts, likePost, unlikePost} from "../utils/Requester.js";
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
    const [categories, setCategories] = useState([]);
    const [selectedCats, setSelectedCats] = useState([]);
    const [title, setTitle] = useState([]);

    useEffect(() => {
        getPosts(page)
            .then(res => {
                setPosts(res.data.items);
                setHasMore(res.data.hasMore);
                getCategories()
                    .then(res => {
                        setCategories(res.data);
                    })
                    .catch(console.log);
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

    const handleFilter = e => {
        e.preventDefault();
        const categoryIds = selectedCats.join(',');

        getPosts(page, title, categoryIds)
            .then(res => {
                setPosts(res.data.items);
                setHasMore(res.data.hasMore);
                getCategories()
                    .then(res => {
                        setCategories(res.data);
                    })
                    .catch(console.log);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleCategory = e => {
        if (e.target.checked) {
            setSelectedCats(prevState => prevState.concat(+e.target.value));
        } else {
            setSelectedCats(prevState => prevState.filter(s => +s !== +e.target.value));
        }
    }

    return (
        <div>
            <ConfirmationModal open={open} setOpen={setOpen}
                               item="post" handleYes={handleDelete}/>
            <div className="mb-4 relative flex gap-x-3 items-center">
                <div>
                    <div className="mt-2">
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Search by title"
                            autoComplete="title"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                {categories.map(c => (
                    <Fragment key={c.id}>
                        <div className="flex h-6 items-center">
                            <input
                                id={`categories_${c.id}`}
                                name="categories"
                                type="checkbox"
                                value={c.id}
                                checked={selectedCats.indexOf(c.id) > -1}
                                onChange={handleCategory}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                {c.name}
                            </label>
                        </div>
                    </Fragment>
                ))}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleFilter}
                >
                    Filter
                </button>
            </div>
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

