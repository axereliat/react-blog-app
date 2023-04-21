import {postFormMode} from '../utils/constants.js';
import PostForm from "./PostForm.jsx";

export default function CreatePost() {
    return (
        <>
            <h1 className="text-sm text-center font-bold tracking-tight sm:text-4xl">Create Post</h1>
            <PostForm mode={postFormMode.create}/>
        </>
    );
}
