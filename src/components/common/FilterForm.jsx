import {Fragment, useState} from "react";

export default ({title, setTitle, categories, selectedCats, handleFilter, handleCategory, resetFilter}) => {

    return (
        <div className="mb-4 relative flex gap-x-3 items-center">
            <div>
                <div className="mt-2">
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Search by title"
                        autoComplete="title"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            {categories.map(c => (
                <Fragment key={c.id}>
                    <div className="flex h-6 items-center">
                        <input
                            id={`categories_${c.id}`}
                            name="categories"
                            type="checkbox"
                            value={c.id}
                            checked={selectedCats.indexOf(c.id) > -1}
                            onChange={handleCategory}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="candidates" className="font-medium text-gray-900">
                            {c.name}
                        </label>
                    </div>
                </Fragment>
            ))}
            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleFilter}
            >
                Filter
            </button>
            <button
                type="submit"
                className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={resetFilter}
            >
                Reset Filter
            </button>
        </div>
    );
}
