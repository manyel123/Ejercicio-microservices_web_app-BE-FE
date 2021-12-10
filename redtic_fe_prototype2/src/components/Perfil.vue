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
    <div class="buscarPaciente_paciente">
        <div class="container_buscarPaciente_paciente">
            <h1>Perfil</h1>
            <h2>
                Nombre de usuario: <span>{{ profileByUsername.username }}</span>
            </h2>
            <h2>
                Género: <span>{{ profileByUsername.gender }}</span>
            </h2>
            <h2>
                Fecha de nacimiento:
                <span>{{ profileByUsername.birthDate.substring(0, 10) }}</span>
            </h2>
            <h2>
                Teléfono: <span>{{ profileByUsername.cellphone }}</span>
            </h2>
            <h2>
                Escolaridad: <span>{{ profileByUsername.lastEducation }}</span>
            </h2>
            <h2>
                Institución Educativa:
                <span>{{ profileByUsername.lastInstitution }}</span>
            </h2>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: "Perfil",

    data: function () {
        return {
            username: localStorage.getItem("username"),
            profileByUsername: {
                username: "",
                gender: "",
                birthDate: "",
                cellphone: "",
                lastEducation: "",
                lastInstitution: "",
            },
            publicationsByUsername: {
                username: "",
                publication: "",
                pubDate: "",
            },
        };
    },

    apollo: {
        profileByUsername: {
            query: gql`
                query ($username: String!) {
                    profileByUsername(username: $username) {
                        username
                        gender
                        birthDate
                        cellphone
                        lastEducation
                        lastInstitution
                    }
                }
            `,
            variables() {
                return {
                    username: this.username,
                };
            },
        },

        publicationsByUsername: {
            query: gql`
                query ($username: String!) {
                    publicationsByUsername(username: $username) {
                        username
                        publication
                        pubDate
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
        this.$apollo.queries.profileByUsername.refetch();
        this.$apollo.queries.publicationsByUsername.refetch();
    },
};
</script>

<style>
.buscarPaciente_paciente {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 600px;
}
.container_buscarPaciente_paciente {
    border: 3px solid #2d649e;
    border-radius: 10px;
    width: 40%;
    height: 80%;
    display: grid;
    text-indent: 25px;
    margin-top: 40px;
}
</style>