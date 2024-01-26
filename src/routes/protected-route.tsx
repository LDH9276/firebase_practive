import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "../atom/user-info";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    
    const setUser = useSetRecoilState(userInfoState);
    const navigate = useNavigate();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user === null) {
            navigate('/login');
        } else {
            setUser({
                name: user.displayName || "",
                email: user.email ?? "",
            });
        }
    });

    useEffect(() => {
        return () => unsubscribe();
    }, [navigate, setUser]);

    return children;
}