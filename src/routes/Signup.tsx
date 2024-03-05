import { useEffect, useState } from "react";
import { auth } from "../firebase.ts";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(password.length < 8) {
            setError("비밀번호는 8자리 이상이어야 합니다.");
        } else {
            setError("");
        }
    }, [password])


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
        } catch (error) {
            console.log(error);
            setError((error as Error).message);
        } finally {
            setEmail("");
            setPassword("");
            navigate("/");
        }
    }

    return (
        <>
            <input type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} value={name} required />
            <input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            <button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}>{newAccount ? "Create Account" : "Log In"}</button>
            <p>{error}</p>
        </>
    );
}

export default SignUp;
