import {useEffect, useState} from "react";
import {editProfile, getProfileInfo} from "../utils/Requester.js";
import {useParams} from "react-router-dom";
import {getUserId} from "../utils/Auth.js";
import {postFormMode} from "../utils/constants.js";
import toastr from 'toastr';
import FormLabel from "./common/FormLabel.jsx";

export const UserProfile = () => {
    const {id} = useParams();

    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProfileInfo(id)
            .then(res => {
                setUser(res.data)
                setAvatarUrl(res.data.avatarUrl)
                if (+id === +getUserId()) {
                    setEditMode(true);
                    setName(res.data.name)
                }
            })
            .catch(console.log);
    }, []);

    if (!user) {
        return null;
    }

    const handleSave = e => {
        e.preventDefault();

        setLoading(true);

        editProfile(avatar, name)
            .then(res => {
                setLoading(false);
                setAvatarUrl(res.data.avatarUrl);
            })
            .catch(console.log);
    }

    return (
        <div>
            <h1 className="text-sm text-center font-bold tracking-tight sm:text-4xl">Profile</h1>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="text-base font-semibold leading-6 text-gray-900">
                    <form onSubmit={handleSave}>
                        <div className="mt-4">
                            <FormLabel htmlFor="name">Full name</FormLabel>
                            {' '}
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="mt-4">
                            <img src={avatarUrl} width="10%" alt="no avatar"/>
                            <FormLabel htmlFor="avatar">Avatar</FormLabel>
                            <input
                                onChange={e => setAvatar(e.target.files[0])}
                                id="avatar"
                                name="avatar"
                                type="file"
                                autoComplete="avatar"
                                required
                                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {' '}
                            <button
                                disabled={loading}
                                type="submit"
                                className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {loading ? 'Loading...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Username: {user.username}</h3>
            </div>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Email: {user.email}</h3>
            </div>
        </div>
    );
}
