import axios from "axios";
import {getToken} from "./Auth.js";

const baseUrl = 'http://localhost:8080/api';

export const register = (name, email, username, password) => {
    return axios.post(baseUrl + '/auth/register', {name, email, username, password});
}

export const login = (username, password) => {
    return axios.post(baseUrl + '/auth/login', {usernameOrEmail: username, password});
}

export const getCategories = () => {
    return axios.get(baseUrl + '/categories', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    });
}

export const getPosts = () => {
    return axios.get(baseUrl + '/posts', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    });
}

export const createPost = (title, content, categoryIds) => {
    return axios.post(baseUrl + '/posts', {title, content, categoryIds},{
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    });
}

export const getPost = id => {
    return axios.get(baseUrl + '/posts/' + id,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    });
}

export const getComments = (id, page) => {
    return axios.get(baseUrl + '/posts/' + id + '/comments?page=' + page,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    });
}

export const addComment = (id, content) => {
    return axios.post(baseUrl + '/posts/' + id + '/comments',{content}, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    });
}

export const deleteComment = (postId, commentId) => {
    return axios.post(baseUrl + '/posts/' + postId + '/comments/' + commentId + '/delete', {},{
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    });
}
