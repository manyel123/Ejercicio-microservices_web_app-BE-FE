<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="app" class="app">
        <div class="main-component">
            <router-view
                v-on:completedLogIn="completedLogIn"
                v-on:completedSignUp="completedSignUp"
                v-on:logOut="logOut"
            >
            </router-view>
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
            this.$router.push({ name: "LogIn" });
        },
        loadSignUp: function () {
            this.$router.push({ name: "SignUp" });
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
        },
        loadHome: function () {
            this.$router.push({ name: "home" });
        },
        loadAccount: function () {
            this.$router.push({ name: "Perfil" });
        },
        loadTransaction: function () {
            this.$router.push({ name: "Chat" });
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
    width: 30%;

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
