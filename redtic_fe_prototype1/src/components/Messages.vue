<template>
    <div id="Messages" class="messages">
        <div class="container_messages">
            <h2>Enviar Mensajes</h2>
            <form v-on:submit.prevent="processSendMessage">
                <input
                    type="text"
                    v-model="createMessage.usernameDestiny"
                    placeholder="Usuario Destino"
                />
                <br />
                <input
                    type="text"
                    v-model="createMessage.post"
                    placeholder="Mensaje"
                />
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
        <div class="container_receivedMessages">
            <h2>Mensajes Recibidos</h2>
            <table>
                <tr>
                    <th>Mensaje</th>
                    <th>Emisor</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                </tr>

                <tr v-for="post in receivedMessagesByUsername" :key="post">
                    <td>{{ post.post }}</td>
                    <td>{{ post.usernameOrigin }}</td>
                    <td>{{ post.sentDate.substring(0, 10) }}</td>
                    <td>{{ post.sentDate.substring(11, 19) }}</td>
                </tr>
            </table>
        </div>
        <div class="container_sentMessages">
            <h2>Mensajes Enviados</h2>
            <table>
                <tr>
                    <th>Mensaje</th>
                    <th>Destino</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                </tr>

                <tr v-for="post in sentMessagesByUsername" :key="post">
                    <td>{{ post.post }}</td>
                    <td>{{ post.usernameDestiny }}</td>
                    <td>{{ post.sentDate.substring(0, 10) }}</td>
                    <td>{{ post.sentDate.substring(11, 19) }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>




<script>
import gql from "graphql-tag";

export default {
    name: "Messages",

    data: function () {
        return {
            username: localStorage.getItem("username"),
            receivedMessagesByUsername: [],
            sentMessagesByUsername: [],
            createMessage: {
                usernameOrigin: localStorage.getItem("username"),
                usernameDestiny: "",
                post: "",
            },
        };
    },

    methods: {
        processSendMessage: async function () {
            if (
                localStorage.getItem("token_access") === null ||
                localStorage.getItem("token_refresh") === null
            ) {
                this.$emit("logOut");
                return;
            }

            if (this.createMessage.post === "") {
                alert("Escribe un mensaje!");
            } else {
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
                            mutation ($message: MessageInput!) {
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
                        alert("¡Mensaje Enviado!");
                        this.createMessage.usernameDestiny = "";
                        this.createMessage.post = "";
                    })
                    .catch((error) => {
                        alert(
                            "Error al enviar el mensaje. ¿Usuario incorrecto?"
                        );
                    });
            }
        },
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

        sentMessagesByUsername: {
            query: gql`
                query ($username: String!) {
                    sentMessagesByUsername(username: $username) {
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
        this.$apollo.queries.sentMessagesByUsername.refetch();
    },
};
</script>




<style>
.messages {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.container_messages {
    border: 3px solid #283747;
    border-radius: 10px;
    width: 20%;
    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container_receivedMessages {
    border: 3px solid #283747;
    border-radius: 10px;
    width: 35%;
    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container_sentMessages {
    border: 3px solid #283747;
    border-radius: 10px;
    width: 35%;
    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.messages h2 {
    color: #283747;
}

.messages form {
    width: 90%;
}

.messages input {
    height: 40px;
    width: 100%;

    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;

    border: 1px solid #283747;
}

.messages button {
    width: 100%;
    height: 40px;

    color: #e5e7e9;
    background: #283747;
    border: 1px solid #e5e7e9;

    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0;
}

.messages button:hover {
    color: #e5e7e9;
    background: crimson;
    border: 1px solid #283747;
    cursor: pointer;
}
</style>