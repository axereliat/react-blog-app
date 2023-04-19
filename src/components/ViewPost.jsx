import {Link, Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addComment, deleteComment, deletePost, getComments, getPost, likePost, unlikePost} from "../utils/Requester.js";
import TimeAgo from "react-timeago";
import toastr from "toastr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import ConfirmationModal from "./ConfirmationModal.jsx";
import {getUsername} from "../utils/Auth.js";
import PostTile from "./common/PostTile.jsx";
import CommentsTile from "./common/CommentsTile.jsx";

export default () => {
    let {id} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [postDeleted, setPostDeleted] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [postLiked, setPostLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        getPost(id)
            .then(res => {
                setPost(res.data);
                setPostLiked(res.data.liked);
                setLikesCount(res.data.likes);

                getComments(id, page)
                    .then(res => {
                        setComments(res.data.items);
                        setHasMore(res.data.hasMore);
                        setPage(page + 1);
                    })
                    .catch(console.log);
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
                setCommentModalOpen(false);
            })
            .catch(console.log);
    }

    const handleDeletePost = e => {
        e.preventDefault();

        deletePost(selectedId)
            .then(() => {
                setCommentModalOpen(false);
                toastr.success('Your post was successfully deleted');
                setPostDeleted(true);
            })
            .catch(console.log);
    }

    if (postDeleted) {
        return <Navigate to="/" replace={true}/>;
    }

    const loadMore = () => {
        setPage(page + 1);

        getComments(id, page)
            .then(res => {
                setComments(comments.concat(res.data.items));
                setHasMore(res.data.hasMore);
            })
            .catch(console.log);
    };

    const onPostDeleted = postId => {
        setSelectedId(postId);
        setPostModalOpen(true);
    };

    return (
        <div>
            <ConfirmationModal open={postModalOpen} setOpen={setPostModalOpen}
                               item="post" handleYes={handleDeletePost}/>
            <div className="border-b border-gray-200 pb-5" key={'post-' + post.id}>
                <PostTile
                    onDeletePost={() => onPostDeleted(post.id)}
                    post={post}
                />
            </div>
            <CommentsTile handleSubmit={handleSubmit}
                          setComment={setComment}
                          handleDeleteComment={handleDeleteComment}
                          commentModalOpen={commentModalOpen}
                          setCommentModalOpen={setCommentModalOpen}
                          setSelectedId={setSelectedId}
                          hasMore={hasMore}
                          loadMore={loadMore}
                          comments={comments}
                          setComments={setComments}
                          comment={comment}  />
        </div>
    );
}
