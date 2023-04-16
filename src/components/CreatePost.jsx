import {useEffect, useState} from "react";
import toastr from "toastr";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, login, createPost} from "../utils/Requester.js";
import {saveAuthData} from "../utils/Auth.js";
import {postFormMode} from '../utils/constants.js';
import {authActions} from "../store/authSlice.js";
import PostForm from "./PostForm.jsx";

export default function CreatePost() {
    return (
        <PostForm mode={postFormMode.create}/>
    );
}
