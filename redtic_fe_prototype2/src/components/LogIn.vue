<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="titulo1">RedTic</h1>
                <p class="texto">
                    Te ayudamos a comunicarte
                    <br />
                    con todas las personas
                    <br />
                    de todo el mundo.
                </p>
            </div>

            <div class="col">
                <div class="card">
                    <div class="form-box">
                        <h1 class="titulo1">RedTic</h1>
                        <div class="button-box">
                            <div id="elegir"></div>
                            <button class="toggle-btn" onclick="login()">
                                INICIAR SESION
                            </button>
                        </div>
                        <form
                            id="login"
                            class="input-group"
                            v-on:submit.prevent="processLogInUser"
                        >
                            <input
                                type="text"
                                class="input-field"
                                placeholder="Username"
                                required
                                v-model="user.username"
                            />
                            <input
                                type="password"
                                class="input-field"
                                placeholder="Contraseña"
                                required
                                v-model="user.password"
                            />
                            <button class="submit-btn" type="submit">
                                Iniciar Sesión
                            </button>
                            <p class="texto">
                                ¿No tienes una cuenta?
                                <router-link to="/registrarse" class="link">
                                    Regístrate
                                </router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: "LogIn",

    data: function () {
        return {
            user: {
                username: "",
                password: "",
            },
        };
    },

    methods: {
        processLogInUser: async function () {
            await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation ($credentials: CredentialsInput!) {
                            logIn(credentials: $credentials) {
                                refresh
                                access
                            }
                        }
                    `,
                    variables: {
                        credentials: this.user,
                    },
                })
                .then((result) => {
                    let dataLogIn = {
                        username: this.user.username,
                        token_access: result.data.logIn.access,
                        token_refresh: result.data.logIn.refresh,
                    };

                    this.$emit("completedLogIn", dataLogIn);
                })
                .catch((error) => {
                    alert("ERROR 401: Credenciales Incorrectas.");
                });
        },
    },
};
</script>

<style>
.container {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background: #fff;
    padding-left: 8%;
    padding-right: 8%;
}

.row {
    display: flex;
    height: 88%;
    align-items: center;
}

.row .texto {
    font-size: 30px;
}

.col {
    flex-basis: 50%;
}

.titulo1 {
    color: #000;
    font-size: 70px;
    font-family: "XXIIGeomDEMO-Book";
    margin: 50px, auto;
}

.texto {
    color: #000;
    font-size: 10px;
    font-family: "XXIIGeomDEMO-Book";
}
.card {
    width: 1000px;
    height: 760px;
    display: inline-block;
    border-radius: 10px;
    padding: 15px 25px;
    box-sizing: border-box;
    cursor: pointer;
    margin: 10px 15px;
    background-image: url(../assets/celular.png);
    background-position: right;
    background-size: cover;
}

.card .texto {
    font-size: 15px;
    margin-left: 40px;
}

/* login */

.form-box {
    width: 370px;
    height: 628px;
    position: relative;
    margin: 6% auto;
    margin-left: 390px;
    background: transparent;
    padding: 5px;
    border-radius: 10px;
    overflow: hidden;
}

.form-box .titulo1 {
    font-size: 30px;
    text-align: center;
}

.marca .titulo1 {
    text-align: center;
    margin-top: 40px;
    font-family: "XXIIGeomDEMO-Book";
    font-size: 10px;
}

.button-box {
    width: 240px;
    margin: 30px auto;
    position: relative;
    margin-left: 120px;
}

.toggle-btn {
    padding: 10px 22px;
    cursor: pointer;
    background: transparent;
    border: 0px;
    outline: none;
    position: relative;
    color: #000;
}

#elegir {
    top: 0;
    left: 0;
    position: absolute;
    width: 140px;
    height: 100%;
    background: linear-gradient(
        to right,
        rgba(40, 126, 255, 0.7),
        rgba(18, 247, 255, 0.7)
    );
    border-radius: 30px;
    transition: 0.8s;
}

.input-group {
    top: 200px;
    position: absolute;
    width: 280px;
    transition: 0.8s;
    text-align: center;
    color: #adadad;
}

.input-group .texto {
    font-size: 15px;
    font-family: "ghotic";
}

.input-field {
    width: 100%;
    padding: 10px 0;
    margin: 40px 0;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 2px solid #adadad;
    outline: none;
    background: transparent;
}

.input-fild {
    width: 100%;
    padding: 10px 0;
    margin: 20px 0;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 2px solid #adadad;
    outline: none;
    background: transparent;
}

.submit-btn {
    width: 60%;
    padding: 10px 30px;
    cursor: pointer;
    display: inline-block;
    margin: 40px;
    background: linear-gradient(
        to right,
        rgba(40, 126, 255, 0.7),
        rgba(18, 247, 255, 0.7)
    );
    border: 0px;
    outline: none;
    border-radius: 30px;
    color: #fff;
    margin-left: 50px;
}

.submit-btn:hover {
    transform: scale(1.1);
}

#login {
    left: 50px;
}

#register {
    left: 450px;
}

.link {
    font-size: 15px;
    cursor: pointer;
    color: #00c4da;
    font-family: "ghotic";
    text-decoration: none;
}
</style>