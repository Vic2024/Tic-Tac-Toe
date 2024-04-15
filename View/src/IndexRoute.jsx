/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import ErrorPage from "./page/ErrorPage.jsx";
import Index from "./page/index.jsx";
import App from "./page/App.jsx";
import Login from "./page/Login.jsx";
import CreateAccount from "./page/CreateAccount.jsx";
import RecoverPassword from "./page/RecoverPassword.jsx";
import ResetPassword from "./page/ResetPassword.jsx";
import DashBoard from "./page/DashBoard.jsx";
import EditProfile from "./page/EditProfile.jsx";
import SearchGame from "./page/SearchGame.jsx";
import Request from "./page/Request.jsx";
import GameLog from "./page/GameLog.jsx";
import Permissions from "./page/Permissions.jsx";
import Game from './Layout/Game.jsx'
import InGame from "./page/inGame.jsx";
import UsersOnline from "./page/Online.jsx";
import UsersOffline from "./page/Offline.jsx";
import { SearchGameProvider } from "./Context/SearchGameContext.jsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Index />
            }, {
                path: '/local-game',
                element: <App />
            }, {
                path: '/login',
                element: <Login />
            }, {
                path: '/create_account',
                element: <CreateAccount />
            }, {
                path: '/recover_password',
                element: <RecoverPassword />
            }, {
                path: '/reset_password/:id_user/:token',
                element: <ResetPassword />
            }
        ]
    }, {
        path: 'online',
        element: <Permissions />,
        errorElement: <ErrorPage />,
        children: [{
            path: 'dashboard/:id',
            element: <DashBoard />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/online/dashboard/:id/searchgame',
                    element: <SearchGameProvider><SearchGame /></SearchGameProvider>,
                    errorElement: <ErrorPage />,
                    children: [
                        {
                            path: '/online/dashboard/:id/searchgame/usersOnline',
                            element: <UsersOnline />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: '/online/dashboard/:id/searchgame/usersOffline',
                            element: <UsersOffline />,
                            errorElement: <ErrorPage />,
                        },
                    ]
                },
                {
                    path: '/online/dashboard/:id/edit_profile',
                    element: <EditProfile />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: '/online/dashboard/:id/game_log',
                    element: <GameLog />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: '/online/dashboard/:id/requests',
                    element: <Request />,
                    errorElement: <ErrorPage />,
                },
            ]
        }, {
            path: 'game/:id',
            element: <Game />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/online/game/:id',
                    element: <InGame />,
                    errorElement: <ErrorPage />,
                }
            ]
        }]
    }
])

export default router
