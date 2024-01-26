import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom";

export interface Post {
    id: string;
    photo?: string;
    writer: string;
    title: string;
    date: string; // Assuming date is a Firebase Timestamp
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
            // Convert Firebase Timestamp to a string or other suitable format
            const formattedDate = date.toDate().toLocaleString(); // Example conversion to a localized string
            return {
                writer,
                title,
                post_id,
                date: formattedDate,
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
                <Link to={`/read/${post.post_id}`} key={index}  className="flex justify-start">
                    <p>{post.post_id}</p>
                    <p>{post.title}</p>
                    <p>{post.writer}</p>
                    <p>{post.date}</p>
                </Link>
            ))}

            <button type="button" onClick={moveToWrite}>글쓰기</button>
        </div>
    );
}

export default BoardList;