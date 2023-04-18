import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {likePost, unlikePost} from "../../utils/Requester.js";
import {useState} from 'react';
import TimeAgo from "react-timeago";
import {getUsername} from "../../utils/Auth.js";

export default ({onDeletePost, post}) => {
    const likeButtonOneStyles = {color: "gray", fontSize: 30, cursor: 'pointer'};
    const likeButtonTwoStyles = {color: "black", fontSize: 40, cursor: 'pointer'};

    const [postLiked, setPostLiked] = useState(post.liked);
    const [likesCount, setLikesCount] = useState(post.likes);

    const onHandleLike = () => {
        if (postLiked) {
            unlikePost(post.id)
                .then(() => {
                    setLikesCount(prevState => prevState - 1);
                })
                .catch(console.log);
        } else {
            likePost(post.id)
                .then(() => {
                    setLikesCount(prevState => prevState + 1);
                })
                .catch(console.log);
        }
        setPostLiked(!postLiked);
    }

    return <div>
        <div>
            <Link to={'/posts/' + post.id} className="text-base font-semibold leading-6 text-gray-900">
                {post.title}
            </Link>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
                {post.content.substr(0, 30)}
            </p>
            <p>Author: {post.author.username}</p>
            <TimeAgo date={post.createdAt}/>
        </div>
        <div className="flex items-center justify-between">
            <div>
                <div className="my-2 flex justify-start space-x-2 items-center">
                    {post.author.username === getUsername() ?
                        <>
                            <button className="bg-red-600 text-white py-1 px-2 rounded" onClick={onDeletePost}>
                                Delete
                            </button>
                            {' '}
                            <Link to={"/posts/" + post.id + "/edit"}
                                  className="bg-gray-600 text-white py-1 px-2 rounded">Edit</Link>
                        </>
                        : null}
                    {' '}
                    <button onClick={onHandleLike}>
                        <FontAwesomeIcon style={postLiked ? likeButtonTwoStyles : likeButtonOneStyles}
                                         icon={faThumbsUp}/>
                    </button>
                    <span>{likesCount}</span>
                </div>
            </div>
            <div>
                <div className="flex justify-start space-x-2">
                    {post.categories.map((c) => (
                        <span className="bg-red-300 rounded-xl px-3" key={c.id}>{c.name}</span>
                    ))}
                </div>
            </div>
        </div>
    </div>;
}
