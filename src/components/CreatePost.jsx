import {useEffect, useState} from "react";
import {getCategories, login, createPost} from "../utils/Requester.js";
import toastr from "toastr";
import {Navigate} from "react-router-dom";
import {saveAuthData} from "../utils/Auth.js";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/authSlice.js";

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCats, setSelectedCats] = useState([]);
    const [createPostDone, setCreatePostDone] = useState(false);

    useEffect(() => {
        getCategories()
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        console.log({title, content, selectedCats});
        createPost(title, content, selectedCats)
            .then(res => {
                toastr.success('Post was successfully created');
                setCreatePostDone(true);
            })
            .catch(err => {
                console.log(err);
            });


    }

    if (createPostDone) {
        return <Navigate to="/" replace={true}/>;
    }

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        id="title"
                                        name="title"
                                        type="text"
                                        autoComplete="title"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                                    Content
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        id="content"
                                        name="content"
                                        rows={3}
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>

                            {categories.map(c => (
                                <div className="relative flex gap-x-3" key={c.id}>
                                    <div className="flex h-6 items-center">
                                        <input
                                            value={c.id}
                                            onChange={e => setSelectedCats(selectedCats.concat(e.target.value))}
                                            id="categories"
                                            name="categories"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="categories" className="font-medium text-gray-900">
                                            {c.name}
                                        </label>
                                    </div>
                                </div>
                            ))}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
