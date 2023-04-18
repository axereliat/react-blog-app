import {useEffect, useState} from "react";
import {getProfileInfo} from "../utils/Requester.js";
import {useParams} from "react-router-dom";

export const UserProfile = () => {
    const {id} = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        getProfileInfo(id)
            .then(res => {
                setUser(res.data)
            })
            .catch(console.log);
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Full name: {user.name}</h3>
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
