<template>
    <div id="app" class="app">
        <div class="header">
            <h1>RedTic</h1>
            <nav>
                <button v-if="is_auth" v-on:click="loadHome">Inicio</button>
                <button v-if="is_auth" v-on:click="loadProfile">Perfil</button>
                <button v-if="is_auth" v-on:click="loadBoard">Publicaciones</button>
                <button v-if="is_auth" v-on:click="loadSearchProfile">Buscar Usuarios</button>
                <button v-if="is_auth" v-on:click="loadMessages">Mensajes</button>
                <button v-if="is_auth" v-on:click="logOut">Cerrar Sesión</button>
                <button v-if="!is_auth" v-on:click="loadLogIn">
                    Iniciar Sesión
                </button>
                <button v-if="!is_auth" v-on:click="loadSignUp">
                    Registrarse
                </button>
            </nav>
        </div>

        <div class="main-component">
            <router-view
                v-on:completedLogIn="completedLogIn"
                v-on:completedSignUp="completedSignUp"
                v-on:logOut="logOut"
            >
            </router-view>
        </div>

        <div class="footer">
            <h2>RedTic 2021 All Rights Reserved</h2>
        </div>
    </div>
</template>




<script>
export default {
    name: "App",

    computed: {
        is_auth: {
            get: function () {
                return this.$route.meta.requiresAuth;
            },
            set: function () {},
        },
    },

    methods: {
        loadLogIn: function () {
            this.$router.push({ name: "logIn" });
        },

        loadSignUp: function () {
            this.$router.push({ name: "signUp" });
        },

        completedLogIn: function (data) {
            localStorage.setItem("username", data.username);
            localStorage.setItem("token_access", data.token_access);
            localStorage.setItem("token_refresh", data.token_refresh);
            alert("Autenticación Exitosa");
            this.loadHome();
        },

        completedSignUp: function (data) {
            alert("Registro Exitoso");
            this.completedLogIn(data);
            this.loadProfileSignUp();
        },

        loadProfileSignUp: function () {
            this.$router.push({ name: "profileSignUp" });
        },

        loadBoard: function () {
            this.$router.push({ name: "board" });
        },

        loadHome: function () {
            this.$router.push({ name: "home" });
        },

        loadProfile: function () {
            this.$router.push({ name: "profile" });
        },

        loadSearchProfile: function () {
            this.$router.push({ name: "searchProfile" });
        },

        loadMessages: function () {
            this.$router.push({ name: "mail" });
        },

        logOut: function () {
            localStorage.clear();
            alert("Sesión Cerrada");
            this.loadLogIn();
        },
    },
};
</script>




<style>
body {
    margin: 0 0 0 0;
}

.header {
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;

    background-color: #283747;
    color: #e5e7e9;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header h1 {
    width: 20%;
    text-align: center;
}

.header nav {
    height: 100%;
    width: 40%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 20px;
}

.header nav button {
    color: #e5e7e9;
    background: #283747;
    border: 1px solid #e5e7e9;

    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.header nav button:hover {
    color: #283747;
    background: #e5e7e9;
    border: 1px solid #e5e7e9;
}

.main-component {
    height: 75vh;
    margin: 0%;
    padding: 0%;

    background: #fdfefe;
}

.footer {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;

    background-color: #283747;
    color: #e5e7e9;
}

.footer h2 {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
