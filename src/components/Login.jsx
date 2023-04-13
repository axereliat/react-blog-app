import {useState} from "react";
import {login} from "../utils/Requester.js";
import toastr from "toastr";
import {Navigate} from "react-router-dom";
import {saveAuthData} from "../utils/Auth.js";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/authSlice.js";

export default function Login() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginDone, setLoginDone] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await login(username, password);
            const token = res.data.accessToken;

            saveAuthData(token, username);
            toastr.success('You are now logged in');

            dispatch(authActions.login({token, username}));
            setLoginDone(true)
        } catch (e) {
            toastr.error('Bad credentials');
            setUsername('');
            setPassword('');
        }
    }

    if (loginDone) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username or email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
