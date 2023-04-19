import {Link} from "react-router-dom";
import TimeAgo from "react-timeago";
import {getUsername} from "../../utils/Auth.js";
import ConfirmationModal from "../ConfirmationModal.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {likeComment, likePost, unlikeComment, unlikePost} from "../../utils/Requester.js";

export default ({
                    handleSubmit, commentModalOpen, handleDeleteComment,
                    comment, setComment, comments, setComments, setSelectedId, setCommentModalOpen, hasMore, loadMore
                }) => {

    const likeButtonOneStyles = {color: "gray", fontSize: 30, cursor: 'pointer'};
    const likeButtonTwoStyles = {color: "black", fontSize: 40, cursor: 'pointer'};

    const onHandleLike = comment => {
        if (comment.liked) {
            unlikeComment(comment.id)
                .then(() => {
                    // setLikesCount(prevState => prevState - 1);
                    setComments(comments.map(c => {
                        if (c.id === comment.id) {
                            c.liked = false;
                            c.likes--;
                        }
                        return c;
                    }));
                })
                .catch(console.log);
        } else {
            likeComment(comment.id)
                .then(() => {
                    // setLikesCount(prevState => prevState + 1);
                    setComments(comments.map(c => {
                        if (c.id === comment.id) {
                            c.liked = true;
                            c.likes++;
                        }
                        return c;
                    }));
                })
                .catch(console.log);
        }
        // setPostLiked(!postLiked);
    }

    return (
        <>
            <ConfirmationModal open={commentModalOpen} setOpen={setCommentModalOpen}
                               item="comment" handleYes={handleDeleteComment}/>
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
                            <div className="flex justify-start">
                                <div>
                                    <Link to={"/users/" + c.createdBy.id}
                                          className="underline text-sm text-blue-500">{c.createdBy.name}</Link>
                                    <p className="text-sm font-medium text-gray-900">{c.content}</p>
                                    <p className="text-sm text-gray-500"><TimeAgo date={c.createdAt}/></p>
                                </div>
                                <div>
                                    <button onClick={() => onHandleLike(c)}>
                                        <FontAwesomeIcon style={c.liked ? likeButtonTwoStyles : likeButtonOneStyles}
                                                         icon={faThumbsUp}/>
                                    </button>
                                    {' '}
                                    <span>{c.likes}</span>
                                </div>
                            </div>
                            <div>
                                {c.createdBy.username === getUsername() ?
                                    <button
                                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={() => {
                                            setSelectedId(c.id);
                                            setCommentModalOpen(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                    : null}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
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
        </>
    );
}
