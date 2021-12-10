<template>
    <div class="information">
        <h1>
            ¡Bienvenido a RedTic
            <span>{{ userDetailById.name }}</span
            >!
        </h1>

        <div class="details">
            <h3>Tu usuario en RedTic</h3>

            <h2>
                Nombre de usuario:
                <span>{{ userDetailById.username }}</span>
            </h2>

            <h2>
                Correo electrónico:
                <span>{{ userDetailById.email }}</span>
            </h2>

            <h2>¡Publica ahora!</h2>

            <form v-on:submit.prevent="processPublication">
                <input
                    type="text"
                    v-model="createPublication.publication"
                    placeholder="¿Que estás pensando?"
                />
                <br />
                <button type="submit">Publicar!</button>
            </form>
        </div>
    </div>
</template>


<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
    name: "Home",

    data: function () {
        return {
            userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
            userDetailById: {
                username: "",
                name: "",
                email: "",
            },
            createPublication: {
                username: localStorage.getItem("username"),
                publication: "",
            },
        };
    },

    apollo: {
        userDetailById: {
            query: gql`
                query ($userId: Int!) {
                    userDetailById(userId: $userId) {
                        username
                        name
                        email
                    }
                }
            `,
            variables() {
                return {
                    userId: this.userId,
                };
            },
        },
    },

    created: function () {
        this.$apollo.queries.userDetailById.refetch();
    },

    methods: {
        processPublication: async function () {
            if (
                localStorage.getItem("token_access") === null ||
                localStorage.getItem("token_refresh") === null
            ) {
                this.$emit("logOut");
                return;
            }

            if (this.createPublication.publication === "") {
                alert("Escribe algo primero!");
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
                            mutation ($publication: BoardInput!) {
                                createBoard(publication: $publication) {
                                    id
                                    username
                                    publication
                                    pubDate
                                }
                            }
                        `,
                        variables: {
                            publication: this.createPublication,
                        },
                    })
                    .then((result) => {
                        alert("Publicaste con Exito!");
                        this.createPublication.publication = "";
                    })
                    .catch((error) => {
                        alert("Error al publicar");
                    });
            }
        },
    },
};
</script>


<style>
.information {
    margin: 0;
    padding: 0%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.information h1 {
    font-size: 60px;
    color: #283747;
}
.information h2 {
    font-size: 40px;
    color: #283747;
}
.information span {
    color: crimson;
    font-weight: bold;
}
.details h3 {
    font-size: 35px;
    color: #283747;
    text-align: center;
}
.details h2 {
    font-size: 35px;
    color: #283747;
}
.details {
    border: 3px solid rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    padding: 30px 80px;
    margin: 30px 0 0 0;
}
.information form {
    width: 50%;
}
.information input {
    height: 40px;
    width: 100%;

    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;

    border: 1px solid #283747;
}
.information button {
    width: 100%;
    height: 40px;

    color: #e5e7e9;
    background: #283747;
    border: 1px solid #e5e7e9;

    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0;
}
.information button:hover {
    color: #e5e7e9;
    background: crimson;
    border: 1px solid #283747;
    cursor: pointer;
}
</style>