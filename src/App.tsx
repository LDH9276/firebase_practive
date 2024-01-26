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
    return (
        <div className="flex justify-center">
            <RouterProvider router={router}/>
        </div>
    )
}

export default App;