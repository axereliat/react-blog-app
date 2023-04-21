import {postFormMode} from '../utils/constants.js';
import PostForm from "./PostForm.jsx";

export default function UpdatePost() {
    return (
        <>
            <h1 className="text-sm text-center font-bold tracking-tight sm:text-4xl">Edit Post</h1>
            <PostForm mode={postFormMode.update}/>
        </>
    );
}
