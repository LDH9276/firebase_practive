import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { db } from "../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import DOMPurify from "dompurify";

function Readpost() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const loadPosts = async () => {
        const postQuery = query(
            collection(db, "post_list"),
            where("post_id", "==", Number(id)) // Number()로 변환
        );
        const docs = await getDocs(postQuery);
        const postData = docs.docs.map((doc) => {
            const { writer, title, date, content, post_id } = doc.data();
            const formattedDate = date.toDate().toLocaleString();
            return { writer, title, post_id, content, date: formattedDate };
        });

        console.log(postData);
        setPosts(postData);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const moveToList = () => {
        navigate("/");
    };

    const moveToModify = () => {
        navigate(`/write/modify/${id}`);
    }

    const moveToDelete = () => {
        alert("준비중");
        // const deleteQuery = query(
        //     collection(db, "post_list"),
        //     where("post_id", "==", Number(id))
        // );
        // const docs = getDocs(deleteQuery);
        // docs.then((snapshot) => {
        //     snapshot.docs[0].ref.delete();
        // });
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post.post_id}>
                    <div className="flex justify-start">
                        <p>{post.post_id}</p>
                        <p>{post.title}</p>
                    </div>
                    <div className="flex">
                        <p>{post.writer}</p>
                        <p>{post.date}</p>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}></div>
                </div>
            ))}
            <button onClick={moveToModify}>수정</button>
            <button onClick={moveToDelete}>삭제</button>
            <button onClick={moveToList}>목록으로</button>
        </div>
    );
}

export default Readpost;
