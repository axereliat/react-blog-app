import {useEffect, useState} from "react";
import {getCategories, login, createPost, updatePost, getPost} from "../utils/Requester.js";
import toastr from "toastr";
import {Navigate, useParams} from "react-router-dom";
import {saveAuthData} from "../utils/Auth.js";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/authSlice.js";
import {postFormMode} from "../utils/constants.js";

export default ({mode}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCats, setSelectedCats] = useState([]);
    const [postFormDone, setPostFormDone] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        getCategories()
            .then(res => {
                setCategories(res.data);
                getPost(id)
                    .then(res => {
                        const postToUpdate = res.data;

                        setTitle(postToUpdate.title);
                        setContent(postToUpdate.content);
                        setSelectedCats(postToUpdate.categories.map(c => c.id));
                    })
                    .catch(console.log);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const validateFields = () => {
        if (!title || !content || selectedCats.length === 0) {
            return 'All fields are required';
        }

        if (title.length < 3) {
            return 'Title must be at least 3 characters'
        }

        if (content.length < 3) {
            return 'Content must be at least 3 characters'
        }

        return '';
    }

    const handleCreate = async e => {
        e.preventDefault();

        const validationRes = validateFields();

        if (validationRes) {
            toastr.error(validationRes);
            return;
        }

        console.log('request body', {title, content, selectedCats});
        createPost(title, content, selectedCats)
            .then(() => {
                toastr.success('Post was successfully created');
                setPostFormDone(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleUpdate = async e => {
        e.preventDefault();

        const validationRes = validateFields();

        if (validationRes) {
            toastr.error(validationRes);
            return;
        }

        console.log({title, content, selectedCats});
        updatePost(id, title, content, selectedCats)
            .then(() => {
                toastr.success('Post was successfully updated');
                setPostFormDone(true);
            })
            .catch(err => {
                console.log(err);
            });


    }

    if (postFormDone) {
        return <Navigate to="/" replace={true}/>;
    }

    const handleCategory = e => {
        console.log(e.target.value);
        console.log(e.target.checked);

        if (e.target.checked) {
            setSelectedCats(prevState => prevState.concat(+e.target.value));
        } else {
            setSelectedCats(prevState => prevState.filter(s => +s !== +e.target.value));
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={mode === postFormMode.create ? handleCreate : handleUpdate} className="space-y-6" action="#" method="POST">
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
                                    />
                                </div>
                            </div>

                            {categories.map(c => (
                                <div className="relative flex gap-x-3" key={c.id}>
                                    <div className="flex h-6 items-center">
                                        <input
                                            value={c.id}
                                            checked={selectedCats.indexOf(c.id) > -1}
                                            onChange={handleCategory}
                                            id={`categories_${c.id}`}
                                            name="categories"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor={`categories_${c.id}`} className="font-medium text-gray-900">
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
                                    {mode === postFormMode.create ? 'Create' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
