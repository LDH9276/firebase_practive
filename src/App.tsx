import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import SignIn from "./routes/SignIn";
import Profile from "./routes/profile";
import SignUp from "./routes/Signup";
import ProtectedRoute from "./routes/protected-route";
import Write from "./routes/write";
import Readpost from "./routes/read";
import BoardList from "./routes/board";


const router = createBrowserRouter([



    {
        path: "/",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "/:boardID",
                element: <BoardList />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/login",
        element: <SignIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/write/",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
            {
                path: ":mode/:write_id",
                element: <Write />,
            },
        ],
    },
    {
        path: "/read",
        element: <Layout />,
        children: [
            {
                path: ":id",
                element: <Readpost />,
            },
        ],
    }
])

function App() {

    const [dark, setDark] = useState(false);

    useEffect(() => {
        // 로컬스토리지에서 다크모드 상태를 가져옴
        const isDarkMode = localStorage.getItem('darkMode') === 'true';

        // 브라우저의 다크모드 상태를 가져옴
        const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // 다크모드 상태를 설정
        setDark(isDarkMode || isBrowserDarkMode);

        // 다크모드 상태가 변경될 때마다 로컬스토리지에 저장
        const handleDarkModeChange = (event: MediaQueryListEvent) => {
            setDark(event.matches);
            localStorage.setItem('darkMode', event.matches.toString());
        };

        // 브라우저의 다크모드 상태 변경을 감지
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleDarkModeChange);

        return () => {
            // 이벤트 리스너 제거
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleDarkModeChange);
        };
    }, []);

    return (
        <div className={dark ? "dark" : ""}>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App;