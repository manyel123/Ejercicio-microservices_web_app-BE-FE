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

    <div class="inicio-cuenta">
        <div class="circulo-cuenta">
            <div class="imagen-cuenta">
                <div class="foto-cuenta"><i class="fa fa-user"></i></div>
            </div>
        </div>
        <div class="text-cuenta">
            <h2>Bienvenido a RedTic</h2>
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
        <div class="container-rebicion">
            <h1 class="titulo4-publicacion">
                Publicaciones de usuarios RedTic
            </h1>
            <div class="container-table1">
                <table class="table-publicacion">
                    <tr>
                        <th>Usuario</th>
                        <th>Publicación</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                    </tr>

                    <tr
                        v-for="publication in allPublications"
                        :key="publication"
                    >
                        <td>{{ publication.username }}</td>
                        <td>{{ publication.publication }}</td>
                        <td>{{ publication.pubDate.substring(0, 10) }}</td>
                        <td>{{ publication.pubDate.substring(11, 19) }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import gql from "graphql-tag";

export default {
    name: "Publications",

    data: function () {
        return {
            allPublications: [],
        };
    },

    apollo: {
        allPublications: {
            query: gql`
                query {
                    allPublications {
                        username
                        publication
                        pubDate
                    }
                }
            `,
        },
    },

    created: function () {
        this.$apollo.queries.allPublications.refetch();
    },
};
</script>

<style>
.titulo4-publicacion {
    margin-bottom: 20px;
}

.container-rebicion {
    border: 3px solid #2d649e;
    border-radius: 10px;
    width: 97%;
    height: 60%;
    display: grid;
    text-indent: 25px;
    overflow: scroll;
    margin: 20px;
}

.container-table1 {
    width: 100%;
    display: center;
}

.table-publicacion {
    margin-top: -120px;
}
</style>