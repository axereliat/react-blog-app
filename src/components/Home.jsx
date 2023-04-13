import {useEffect, useState} from "react";
import {getPosts} from "../utils/Requester.js";
import TimeAgo from "react-timeago";
import {Link} from "react-router-dom";

export default () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            {posts.map(p => (
                <div className="border-b border-gray-200 pb-5" key={p.id}>
                    <div className="flex justify-between items-center">
                        <div>
                            <Link to={'/posts/' + p.id} className="text-base font-semibold leading-6 text-gray-900">
                                {p.title}
                            </Link>
                            <p className="mt-2 max-w-4xl text-sm text-gray-500">
                                {p.content.substr(0, 30)}
                            </p>
                            <p>Author: {p.author}</p>
                            <TimeAgo date={p.createdAt} />
                        </div>
                        <div className="flex justify-start space-x-2">
                            {p.categories.map((c, i) => (
                                <span className="bg-red-300 rounded-xl px-3" key={i}>{c}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

