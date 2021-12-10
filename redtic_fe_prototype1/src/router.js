import gql from "graphql-tag";
import { createRouter, createWebHistory } from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import ProfileSignUp from './components/ProfileSignUp.vue'
import Board from './components/Board.vue'
import SearchProfile from './components/SearchProfile.vue'
import Messages from './components/Messages.vue'

const routes = [{
    path: '/user/logIn',
    name: "logIn",
    component: LogIn,
    meta: { requiresAuth: false }
},
{
    path: '/user/signUp',
    name: "signUp",
    component: SignUp,
    meta: { requiresAuth: false }
},
{
    path: '/user/profileSignUp',
    name: "profileSignUp",
    component: ProfileSignUp,
    meta: { requiresAuth: true }
},
{
    path: '/user/home',
    name: "home",
    component: Home,
    meta: { requiresAuth: true }
},
{
    path: '/user/searchProfile',
    name: "searchProfile",
    component: SearchProfile,
    meta: { requiresAuth: true }
},
{
    path: '/user/board',
    name: "board",
    component: Board,
    meta: { requiresAuth: true }
},
{
    path: '/user/profile',
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true }
},
{
    path: '/user/mail',
    name: "mail",
    component: Messages,
    meta: { requiresAuth: true }
},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: 'https://redtic-api-gateway.herokuapp.com/' }),
    cache: new InMemoryCache()
})

async function isAuth() {
    if (localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null) {
        return false;
    }

    try {
        var result = await apolloClient.mutate({
            mutation: gql`
                mutation ($refresh: String!) {
                    refreshToken(refresh: $refresh) {
                        access
                    }
                }
            `,
            variables: {
                refresh: localStorage.getItem("token_refresh"),
            },
        })

        localStorage.setItem("token_access", result.data.refreshToken.access);
        return true;
    } catch {
        localStorage.clear();
        alert("Su sesión expiró, por favor vuelva a iniciar sesión");
        return false;
    }
}

router.beforeEach(async (to, from) => {
    var is_auth = await isAuth();

    if (is_auth == to.meta.requiresAuth) return true
    if (is_auth) return { name: "home" };
    return { name: "logIn" };
})

export default router;