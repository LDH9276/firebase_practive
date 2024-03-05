import React, { useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = ["font", "header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "align", "color", "background", "size", "h1"];

function QuillEditor({ setContent: setContentProp, contents }: { setContent: React.Dispatch<React.SetStateAction<string>>, contents: string }) {
    const [content, setContent] = useState("");
    const quillRef = React.useRef<ReactQuill>(null); // Quill instance를 저장하기 위한 ref

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
                    ["bold", "italic", "underline", "strike", "image"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                ],
                handlers: {
                    image: () => {
                        const quill = quillRef.current!.getEditor();
                        const range = quill.getSelection();
                        const input = document.createElement('input');

                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.click();

                        input.onchange = async () => {
                            const file = input.files![0];
                            const formData = new FormData();

                            formData.append('image', file);

                            // 이미지를 서버에 업로드하고 URL을 받아옵니다.
                            const response = await fetch('/upload/image', {
                                method: 'POST',
                                body: formData,
                            });
                            const data = await response.json();
                            const url = data.url;

                            // 서버에서 받아온 URL을 에디터에 삽입합니다.
                            quill.insertEmbed(range!.index, 'image', url);
                        };
                    },
                },
            },
        };
    }, []);

    return <ReactQuill ref={quillRef} theme="snow" modules={modules} formats={formats} onChange={handleChange} value={contents}/>;
}

export default QuillEditor;