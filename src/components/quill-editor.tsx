import React, { useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = ["font", "header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "align", "color", "background", "size", "h1"];

function QuillEditor({ setContent: setContentProp, contents }: { setContent: React.Dispatch<React.SetStateAction<string>>, contents: string }) {
    const [content, setContent] = useState("");

    const handleChange = (content: string) => {
        setContent(content);
        setContentProp(content); // 부모 컴포넌트의 상태 업데이트
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ["small", false, "large", "huge"] }],
                    [{ align: [] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                ],
            },
        };
    }, []);

    return <ReactQuill theme="snow" modules={modules} formats={formats} onChange={handleChange} value={contents}/>;
}

export default QuillEditor;
