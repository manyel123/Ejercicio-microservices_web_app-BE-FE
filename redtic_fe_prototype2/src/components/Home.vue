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

            <router-link to="/" v-on:click="logOut" class="cerrar-cuenta"
                ><h2 class="texto-sesion">Cerrar Sesión</h2></router-link
            >
        </div>
    </div>

    <div class="inicio-cuenta">
        <div class="circulo-cuenta">
            <div class="imagen-cuenta">
                <div class="foto-cuenta"><i class="fa fa-user"></i></div>
            </div>
        </div>
        <div class="text-cuenta">
            <h2>
                Bienvenido:
                <span>{{ userDetailById.username }}</span>
            </h2>
        </div>

        <div class="seleccion-cuenta">
            <div class="flex-texto">
                <router-link class="palabras-home" to="/Home"
                    ><h3>Inicio</h3></router-link
                >
                <router-link class="palabras-home completar-cuenta" to="/Cuenta"
                    ><h3>Completar Cuenta</h3></router-link
                >
                <router-link class="palabras-home" to="/Publicaciones"
                    ><h3>Publicaciones</h3></router-link
                >
            </div>
        </div>
        <div>
            <h2 class="titulo-publicar">¡Publica ahora!</h2>

            <form v-on:submit.prevent="processPublication">
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    class="input-publicar"
                    v-model="createPublication.publication"
                    placeholder="¿Que estás pensando?"
                ></textarea>
                <br />
                <button type="submit" class="boton-publicar">Publicar!</button>
            </form>
        </div>
        <router-view v-on:logOut="logOut"> </router-view>
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
        logOut: function () {
            localStorage.clear();
            alert("Sesión Cerrada");
            this.loadLogIn();
        },
    },
};
</script>
<style>
* {
    margin: 0px;
}

.menu-cuenta {
    height: 70px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(
        to right,
        rgba(40, 126, 255, 0.7),
        rgba(18, 247, 255, 0.7)
    );
}

.perfil-cuenta {
    display: flex;
    width: 44px;
    height: 44px;
    border: 1px solid black;
    border-radius: 100px;
}

.titulo-cuenta {
    margin-left: 30px;
    font-size: 18px;
    margin-top: 5px;
}

.alado {
    margin-left: 20px;
}

.links-cuenta {
    margin-right: 30px;
}

.texto-cuenta {
    margin-top: 8px;
    margin-bottom: 0px;
    font-size: 40px;
    color: white;
}

.buscar-cuenta {
    margin-top: 15px;
    margin-right: 20px;
}

.input-cuenta {
    width: 500px;
    height: 30px;
    margin-left: 170px;
    border-radius: 20px;
}

.links-cuenta {
    margin-top: 5px;
    font-size: 42px;
    display: flex;
    margin-right: 30px;
}

.font {
    margin-left: 10px;
    margin-right: 40px;
    color: black;
    font-size: 50px;
}

.img-cuenta {
    border-radius: 100px;
}

.inicio-cuenta {
    width: 97%;
    height: 500px;
    margin-top: 120px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
    border: 1px solid black;
}

.circulo-cuenta {
    display: flex;
    justify-content: center;
}

.foto-cuenta {
    display: flex;
    width: 100px;
    height: 100px;
    border: 1px solid black;
    border-radius: 100px;
    margin-top: -55px;
    margin-bottom: 10px;
    background: white;
}

.text-cuenta {
    text-align: center;
    margin-top: 10px;
}

.seleccion-cuenta {
    margin-top: 15px;
    border: 1px solid black;
    height: 40px;
    border-left: white;
    border-right: white;
    background: linear-gradient(
        to right,
        rgba(40, 126, 255, 0.7),
        rgba(18, 247, 255, 0.7)
    );
}

.flex-texto {
    margin-left: 100px;
    margin-right: 100px;
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    margin-top: 2px;
}

.completar-cuenta {
    margin-left: 90px;
}

.palabras-home {
    text-decoration: none;
    color: black;
}

.perfil-inicio {
    text-align: center;
    margin-top: 100px;
}

.cerrar-cuenta {
    height: 60px;
    border-radius: 5px;
    background: white;
    font-size: 20px;
    background: linear-gradient(
        to right,
        rgba(40, 126, 255, 0.7),
        rgba(18, 247, 255, 0.7)
    );
    border: 1px solid black;
    text-decoration: none;
    color: black;
}

.texto-sesion {
    margin-top: 10px;
}

.fa-user::before {
    font-size: 94px;
    margin-top: 15px;
    margin-left: 16px;
}

.titulo-publicar {
    text-align: center;
    margin-top: 20px;
    font-size: 30px;
}

.input-publicar {
    margin: 30px;
    max-width: 1349px;
    max-height: 132px;
    width: 1349px;
    height: 132px;
    border: 1px solid black;
}

.boton-publicar {
    margin-left: 667px;
    width: 100px;
    height: 50px;
    font-size: 20px;
    border-radius: 10px;
    background: linear-gradient(
        to right,
        rgba(40, 126, 255, 0.7),
        rgba(18, 247, 255, 0.7)
    );
    border: none;
}
</style>