import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../atom/user-info";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Layout() {
    const user = useRecoilValue(userInfoState);
    const navigate = useNavigate();

    const logOut = () => {
        auth.signOut();
    };

    const moveTomain = () => {
        navigate("/");
    };

    return (
        <div className="w-[800px] ">

            <div className="flex w-full justify-between rounded-2xl shadow-md text-white p-8 items-center mb-6 mt-5 h-7 bg-black">
                <div className="flex w-1/2 justify-around">
                    <h1 onClick={moveTomain}>메인 페이지</h1>
                    <p>{user.name}</p>
                </div>
                <button onClick={logOut}>로그아웃</button>
            </div>

            <Outlet />
        </div>
    );
}

export default Layout;
