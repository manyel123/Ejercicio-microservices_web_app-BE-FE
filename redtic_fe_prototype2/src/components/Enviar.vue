<template>
    <div class="menu-cuenta">
        <div class="titulo-cuenta">
            <p class="texto-cuenta">RedTic</p>
        </div>

        <div class="links-cuenta">
            <router-link to="/Home" class="font"
                ><i class="fa fa-home"></i
            ></router-link>

            <router-link to="/Search" class="font"
                ><i class="fa fa-search"></i
            ></router-link>

            <router-link to="/Chat" class="font"
                ><i class="fa fa-paper-plane"></i
            ></router-link>

            <router-link to="/Perfil" class="font"
                ><i class="fa fa-address-book"></i
            ></router-link>

            <button class="cerrar-cuenta" v-if="is_auth" v-on:click="logOut">
                Cerrar Sesión
            </button>
        </div>
    </div>
    <div class="rectangulo-mensaje">
        <div class="chat-mensaje">
            <div class="chat-recipiente">
                <h1 class="titulo-mensaje">Mensajes</h1>
                <router-link to="/Chat/Recibidos" class="texto-mensaje"
                    ><i class="fa fa-users"></i>Recibidos</router-link
                >
                <router-link to="/Chat/Enviados" class="texto-mensaje"
                    ><i class="fa fa-users"></i>Enviados</router-link
                >
                <router-link to="/Chat/Enviar" class="texto-mensaje"
                    ><i class="fa fa-users"></i>Enviar</router-link
                >
            </div>
        </div>
        <div class="chat-enviar">
            <div class="chat-enviar-datos">
                <h1 class="titulo-enviar">Enviar Mensaje</h1>
                <form v-on:submit.prevent="processTransaction">
                    <input
                        type="text"
                        required placeholder="Usuario Destino"
                        class="input-enviar"
                        v-model="createMessage.usernameDestiny"
                    />
                    <br />
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        class="input-enviar input-textarea"
                        required v-model="createMessage.post"
                    ></textarea>
                    <br />
                    <button type="submit" class="boton-enviar">Enviar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
export default {
    name: "Enviar",
    data: function () {
        return {
            createMessage: {
                usernameOrigin: localStorage.getItem("username"),
                usernameDestiny: "",
                post: "",
            },
        };
    },

    methods: {
        processTransaction: async function () {
            if (
                localStorage.getItem("token_access") === null ||
                localStorage.getItem("token_refresh") === null
            ) {
                this.$emit("logOut");
                return;
            }

            localStorage.setItem("token_access", "");
            await this.$apollo
                .mutate({
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
                .then((result) => {
                    localStorage.setItem(
                        "token_access",
                        result.data.refreshToken.access
                    );
                })
                .catch((error) => {
                    this.$emit("logOut");
                    return;
                });

            await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation LogIn($message: MessageInput!) {
                            createMessage(message: $message) {
                                id
                                usernameOrigin
                                usernameDestiny
                                post
                                sentDate
                            }
                        }
                    `,
                    variables: {
                        message: this.createMessage,
                    },
                })
                .then((result) => {
                    alert("Mesaneje Enviado Exitosamente");
                })
                .catch((error) => {
                    alert("Mensaje no Enviado");
                });
        },
    },
};
</script>

<style>
.chat-enviar {
    display: flex;
    height: 100%;
    width: 100%;
}

.chat-recipiente {
    width: 480px;
}

.input-enviar {
    height: 30px;
    width: 300px;
    margin-top: 30px;
    margin-left: 30px;
}

.titulo-enviar {
    font-size: 40px;
    text-align: center;
    margin-left: 320px;
    margin-bottom: 20px;
}

.boton-enviar {
    margin-top: 30px;
    margin-left: 30px;
    height: 50px;
    width: 130px;
    font-size: 20px;
    background: linear-gradient(
        to right,
        rgba(40, 126, 255, 0.7),
        rgba(18, 247, 255, 0.7)
    );
    border: none;
    border-radius: 10px;
}

.titulo-enviar{
    margin-top: 30px;
    margin-left: 30px;
}

.mensaje-chat {
    height: 200px;
}

.input-textarea {
    width: 552px;
    height: 92px;
    max-width: 552px;
    max-height: 270px;
}
</style>