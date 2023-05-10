import FriendsList from "../../pages/FriendList";
import Home from "../../pages/Home";
import Chat from "../../pages/Messages/Chat";
import Profile from "../../pages/Profile";
import RegistrationPage from "../../pages/RegistrationPage/Registration/RegistrationPage";

export const routes = [
    {
        path: '/auth',
        exact: true,
        component: RegistrationPage,
        auth: false,
    },
    {
        path: '/',
        exact: true,
        component: Home,
        auth: true,
    },
    {
        path: '/profile',
        exact: true,
        component: Profile,
        auth: true,
    },
    {
        path: '/messages',
        exact: true,
        component: Chat,
        auth: true,
    },
    {
        path: '/friends',
        exact: false,
        component: FriendsList,
        auth: true,
    },
    
]