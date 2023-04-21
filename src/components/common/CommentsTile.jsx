import {Link} from "react-router-dom";
import TimeAgo from "react-timeago";
import {getUsername} from "../../utils/Auth.js";
import ConfirmationModal from "../ConfirmationModal.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {likeComment, likePost, unlikeComment, unlikePost} from "../../utils/Requester.js";

export default ({comment, onHandleLike, likeButtonTwoStyles, likeButtonOneStyles,
                    setSelectedId, setCommentModalOpen}) => {

    return (
        <li key={comment.id} className="py-4">
            <div className="ml-3 flex justify-between items-center">
                <div className="flex justify-start">
                    <div>
                        <Link to={"/users/" + comment.createdBy.id}
                              className="underline text-sm text-blue-500">{comment.createdBy.name}</Link>
                        <p className="text-sm font-medium text-gray-900">{comment.content}</p>
                        <p className="text-sm text-gray-500"><TimeAgo date={comment.createdAt}/></p>
                    </div>
                    <div>
                        <button onClick={() => onHandleLike(comment)}>
                            <FontAwesomeIcon style={comment.liked ? likeButtonTwoStyles : likeButtonOneStyles}
                                             icon={faThumbsUp}/>
                        </button>
                        {' '}
                        <span>{comment.likes}</span>
                    </div>
                </div>
                <div>
                    {comment.createdBy.username === getUsername() ?
                        <button
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => {
                                setSelectedId(comment.id);
                                setCommentModalOpen(true);
                            }}
                        >
                            Delete
                        </button>
                        : null}
                </div>
            </div>
        </li>
    );
}
