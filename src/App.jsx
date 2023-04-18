import {useState} from 'react'
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import {Route, Routes, Navigate} from 'react-router-dom'
import Home from "./components/Home";
import {useSelector} from "react-redux";
import GuestLayout from "./components/layout/GuestLayout.jsx";
import Layout from "./components/layout/Layout.jsx";
import CreatePost from "./components/CreatePost.jsx";
import ViewPost from "./components/ViewPost";
import UpdatePost from "./components/UpdatePost.jsx";
import {UserProfile} from "./components/UserProfile";

function App() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return (
            <GuestLayout>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace/>}
                    />
                </Routes>
            </GuestLayout>
        )
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/posts/create" element={<CreatePost/>}/>
                <Route path="/posts/:id/edit" element={<UpdatePost/>}/>
                <Route path="/posts/:id" element={<ViewPost/>}/>
                <Route path="/users/:id" element={<UserProfile/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace/>}
                />
            </Routes>
        </Layout>
    )
}

export default App
