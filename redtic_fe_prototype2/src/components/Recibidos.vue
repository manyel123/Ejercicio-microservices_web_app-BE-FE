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
            <div class="chat-enviar-datos2">
                <h1 class="titulo-recibidos">Mensajes Recibidos</h1>
                <div class="titulo2-recibidos">
                    <h2>Usuario:</h2>
                    <h2>{{ username }}</h2>
                </div>
                <div class="container-table">
                    <table>
                        <tr>
                            <th>Fecha</th>
                            <th>Origen</th>
                            <th>Mensajes</th>
                        </tr>
                        <tr
                            v-for="receivedMessages in receivedMessagesByUsername"
                            :key="receivedMessages.id"
                        >
                            <td>
                                {{ receivedMessages.sentDate.substring(0, 10) }}
                            </td>
                            <td>{{ receivedMessages.usernameOrigin }}</td>
                            <td>{{ receivedMessages.post }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: "Account",

    data: function () {
        return {
            username: localStorage.getItem("username") || "none",
            receivedMessagesByUsername: [],
        };
    },

    apollo: {
        receivedMessagesByUsername: {
            query: gql`
                query ($username: String!) {
                    receivedMessagesByUsername(username: $username) {
                        id
                        usernameOrigin
                        usernameDestiny
                        post
                        sentDate
                    }
                }
            `,
            variables() {
                return {
                    username: this.username,
                };
            },
        },
    },

    created: function () {
        this.$apollo.queries.receivedMessagesByUsername.refetch();
    },
};
</script>


<style>
.container-table {
    display: flex;
    margin-left: 30px;

    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.rectangulo-mensaje {
    display: flex;
}

.titulo-recibidos {
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
}

.titulo2-recibidos {
    display: flex;
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
    margin-left: 262px;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid rgba(0, 0, 0, 0.3);
    margin-right: 30px;
}
table td,
table th {
    border: 1px solid #ddd;
    padding: 8px;
}

table tr:nth-child(even) {
    background-color: #f2f2f2;
}

td {
    width: 100px;
    height: 100px;
}

table tr:hover {
    background-color: #ddd;
}
table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: crimson;
    color: white;
}

.chat-enviar-datos2 {
    width: 100%;
}
</style>