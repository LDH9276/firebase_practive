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
        <div>
            <input type="text" name="email" id="ID" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" id="PW" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}>로그인</button>
            <p>
                회원이 아니십니까?
                <Link to="/signup">회원가입</Link>
            </p>
        </div>
    );
}

export default SignIn;