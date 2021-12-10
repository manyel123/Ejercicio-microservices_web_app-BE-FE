import gql from "graphql-tag";
import { createRouter, createWebHistory } from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Search from './components/Search.vue'
import Chat from './components/Chat.vue'
import Enviar from './components/Enviar.vue'
import Recibidos from './components/Recibidos.vue'
import Cuenta from './components/Cuenta.vue'
import Perfil from './components/Perfil.vue'
import Publicaciones from './components/Publicaciones.vue'
import Enviados from './components/Enviados.vue'

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn,
    meta: { requiresAuth: false }
  },
  {
    path: '/registrarse',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search,
    meta: { requiresAuth: true }
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true }
  },
  {
    path: '/Chat/Enviar',
    name: 'Enviar',
    component: Enviar,
    meta: { requiresAuth: true }
  },
  {
    path: '/Chat/Enviados',
    name: 'Enviados',
    component: Enviados,
    meta: { requiresAuth: true }
  },
  {
    path: '/Chat/Recibidos',
    name: 'Recibidos',
    component: Recibidos,
    meta: { requiresAuth: true }
  },
  {
    path: '/Cuenta',
    name: 'Cuenta',
    component: Cuenta,
    meta: { requiresAuth: true }
  },
  {
    path: '/Perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true }
  },
  {
    path: '/Publicaciones',
    name: 'Publicaciones',
    component: Publicaciones,
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
