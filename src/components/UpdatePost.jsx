import {useEffect, useState} from "react";
import toastr from "toastr";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, login, createPost, getPost} from "../utils/Requester.js";
import {saveAuthData} from "../utils/Auth.js";
import {postFormMode} from '../utils/constants.js';
import {authActions} from "../store/authSlice.js";
import PostForm from "./PostForm.jsx";

export default function UpdatePost() {
    return (
        <PostForm mode={postFormMode.update}/>
    );
}
