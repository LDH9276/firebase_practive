import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { addDoc, collection, getDocs, orderBy, query, limit } from "firebase/firestore"; // limit 추가
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import QuillEditor from "../components/quill-editor";

function Write() {

    const {mode, write_id} = useParams();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const [writer, setWriter] = useState(auth.currentUser?.displayName ?? "");

    // useEffect(() => {
    //     console.log(`${mode} ${write_id}`);

    //     if(mode === "modify") {
    //         const postQuery = query(
    //             collection(db, "post_list"),
    //             where("post_id", "==", Number(write_id))
    //         );
            
    //     }


    // }, [mode, write_id]);



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const lastPostId = await getDocs(query(collection(db, "post_list"), orderBy("post_id", "desc"), limit(1))).then(snapshot => snapshot.docs[0].data().post_id);
        let postId = lastPostId;
        postId++;

        try{
            await addDoc(collection(db, "post_list"), {
                title,
                content,
                date: new Date(),
                update_date: new Date(),
                writer: writer,
                post_id: postId,
                mode: mode === "write",
                board: write_id
            });
        }
        catch(e) {
            console.log(e);
        }
        finally {
            setContent("");
            setTitle("");
            navigate("/")
        }
    };

    useEffect(() => {
        console.log(content);
    }, [content]);

    return (
        <div>
            <input type="text" onChange={(e) => setTitle(e.target.value)} className="w-full leading-8 mb-4 border-0 border-b border-blue-900 pb-2"/>

            <QuillEditor setContent={setContent} />

            <button onClick={onSubmit} type="button">글쓰기</button>
        </div>
    );
}

export default Write;