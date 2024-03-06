import { useState } from "react";
import { auth } from "../firebase.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            Navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setEmail("");
            setPassword("");
        }
    }
    
    return (

        <div className="w-[800px] flex justify-center">
            <div className="flex flex-col w-[450px]">
                <input type="text" name="email" id="ID" onChange={(e) => setEmail(e.target.value)} className="w-full border-0 border-t border-b border-l border-r border-gray-400 mb-4"/>
                <input type="password" name="password" id="PW" onChange={(e) => setPassword(e.target.value)} className="w-full border-0 border-t border-b border-l border-r border-gray-400 mb-6"/>
                <button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)} className="bg-emerald-600 text-white" >로그인</button>
                <p className="flex flex-col text-center">
                    <span>회원이 아니십니까?</span>
                    <Link to="/signup">회원가입</Link>
                </p>
            </div>
        </div>
    );
}

export default SignIn;