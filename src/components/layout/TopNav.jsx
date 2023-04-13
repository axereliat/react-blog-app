import { Disclosure } from '@headlessui/react'
import {Link, Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {authActions} from "../../store/authSlice.js";
import {useState} from "react";
import {deleteAuthData} from "../../utils/Auth.js";
import toastr from "toastr";

export default function Example () {
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();

  const [logoutDone, setLogoutDone] = useState(false);

  const handleLogout = () => {
      dispatch(authActions.logout());
      deleteAuthData();

      setLogoutDone(true);
  }

  if (logoutDone) {
      toastr.success('You have successfully logged out');
      return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow-sm">
          {({open}) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      <Link to="/"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                        Home
                      </Link>
                      <Link to="/posts/create"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                        Create Post
                      </Link>
                      <button onClick={handleLogout}
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                        Log out
                      </button>
                    </div>
                  </div>

                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <div
                      className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${username}`}
                        alt={username}
                        title={username}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}
