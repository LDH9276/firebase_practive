import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom";

export interface Post {
    post_id: any;
    id: string;
    photo?: string;
    writer: string;
    title: string;
    date: string;
}

function BoardList() {

    const { boardID } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    const loadPosts = async () => {
        const postQuery = query(collection(db, "post_list"), orderBy("post_id", "desc"), where("board", "==", boardID));
        const docs = await getDocs(postQuery);
        const postData = docs.docs.map((doc) => {
            const { writer, title, date, post_id } = doc.data();
            const formattedDate = date.toDate().toLocaleString();
            return {
                writer: writer,
                title: title,
                post_id: post_id,
                date: formattedDate,
                id: doc.id,
            };
        });
        setPosts(postData);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const moveToWrite = () => {
        navigate(`/write/write/${boardID}`);
    };

    return (
        <div>
            {posts.map((post, index) => (
                <Link to={`/read/${post.post_id}`} key={index}  className="flex justify-between items-center border-b border-gray-300 p-2">
                    <p className="block w-8 text-center">{post.post_id}</p>
                    <p className="w-1/2">{post.title}</p>
                    <p className="w-24">{post.writer}</p>
                    <p className="w-1/4">{post.date}</p>
                </Link>
            ))}

            <button type="button" onClick={moveToWrite}>글쓰기</button>
        </div>
    );
}

export default BoardList;