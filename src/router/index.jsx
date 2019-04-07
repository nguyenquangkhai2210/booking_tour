import withAdminRouteComponent from "./withAdminRouteComponent";
import withUserRouteComponent from "./withUserRouteComponent";

import Login from '../main/loginPage/Login.jsx';
import AdminPage from '../main/adminPage';
import UserPage from '../main/userPage';
import HomePage from '../main/publicPage';
import Register from "../main/loginPage/Register";

const withAdmin = withAdminRouteComponent("/");
const withUser = withUserRouteComponent("/");

const indexRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/booking',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/admin',
        name: 'Admin',
        component: withAdmin(AdminPage)
    },
    {
        path: '/user',
        name: 'User',
        component: withUser(UserPage)
    },
    { path: '/', pathTo: '/booking', name: 'Home', redirect: true }
];

export default indexRoutes;
