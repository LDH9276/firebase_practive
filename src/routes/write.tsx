import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { addDoc, collection, getDocs, orderBy, where, query, limit, updateDoc, doc } from "firebase/firestore"; // limit 추가
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import QuillEditor from "../components/quill-editor";

function Write() {

    const {mode, write_id} = useParams();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [postId, setPostId] = useState("");
    const navigate = useNavigate();
    const [writer, setWriter] = useState(auth.currentUser?.displayName ?? "");

    useEffect(() => {
        console.log(`${mode} ${write_id}`);
    
        if (mode === "modify") {
            (async () => {
                const postQuery = query(collection(db, "post_list"), where("post_id", "==", Number(write_id)));
                const docs = await getDocs(postQuery);
                const postData = docs.docs.map((doc) => {
                    const { writer, title, content, post_id } = doc.data();
                    return { id: doc.id, writer, title, post_id, content }; // doc.id를 추가합니다.
                });
                if (postData[0]) {
                    setContent(postData[0].content);
                    setTitle(postData[0].title);
                    setPostId(postData[0].id); // postId 상태를 업데이트합니다.
                }
            })();
        }
    }, [mode, write_id]);



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (mode === "modify") {
            try{
                await updateDoc(doc(db, "post_list", postId), {
                    title,
                    content,
                    update_date: new Date()
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
        }

        else {
            // 가장 먼저 게시물의 최신글 번호를 가져온다.
            const lastPostId = await getDocs(query(collection(db, "post_list"), orderBy("post_id", "desc"), limit(1)))
            .then(snapshot => snapshot.docs[0].data().post_id);

            // 최신 게시물 번호의 +1을 하여 새로운 게시물 번호를 만든다.
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
        }

    };

    // useEffect(() => {
    //     console.log(content);
    // }, [content]);

    return (
        <div>
            {title? <input type="text" onChange={(e) => setTitle(e.target.value)} className="w-full leading-8 mb-4 border-0 border-b border-blue-900 pb-2" value={title}/> : <input type="text" onChange={(e) => setTitle(e.target.value)} className="w-full leading-8 mb-4 border-0 border-b border-blue-900 pb-2"/>}

            <QuillEditor setContent={setContent} contents={content}/>

            <button onClick={onSubmit} type="button">글쓰기</button>
        </div>
    );
}

export default Write;