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
    <div class="searchProfile">
        <div class="container_searchProfile">
            <h1 class="information">Busqueda de usuarios</h1>
            <form v-on:submit.prevent="searchProcess">
                <input
                    type="text"
                    v-model="user"
                    placeholder="&#xF002;  Buscar Usuarios"
                    style="font-family: Arial, FontAwesome"
                    class="buscador"
                />
                <br />
                <button type="submit" class="boton-busqueda">Buscar</button>
            </form>
        </div>
        <div v-if="loaded" class="container-buscador">
            <h1 class="titulo-buscador1 perfil">Perfil</h1>
            <div>
                <h2 class="titulo-buscador1">
                    Usuario: <span>{{ userProfile.username }}</span>
                </h2>
                <h2 class="titulo-buscador1">
                    Género: <span>{{ userProfile.gender }}</span>
                </h2>
                <h2 class="titulo-buscador1">
                    Fecha de nacimiento:
                    <span>{{ userProfile.birthDate.substring(0, 10) }}</span>
                </h2>
                <h2 class="titulo-buscador1">
                    Teléfono: <span>{{ userProfile.cellphone }}</span>
                </h2>
                <h2 class="titulo-buscador1">
                    Escolaridad: <span>{{ userProfile.lastEducation }}</span>
                </h2>
                <h2 class="titulo-buscador1">
                    Institución Educativa:
                    <span>{{ userProfile.lastInstitution }}</span>
                </h2>
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: "SearchProfile",

    data: function () {
        return {
            user: "",
            userProfile: {
                username: "",
                gender: "",
                birthDate: "",
                cellphone: "",
                lastEducation: "",
                lastInstitution: "",
            },
            loaded: false,
        };
    },

    methods: {
        searchProcess: async function () {
            await this.$apollo
                .query({
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
                    variables: {
                        username: this.user,
                        loaded: true,
                    },
                })
                .then((result) => {
                    this.userProfile = {
                        username: result.data.profileByUsername.username,
                        gender: result.data.profileByUsername.gender,
                        birthDate: result.data.profileByUsername.birthDate,
                        cellphone: result.data.profileByUsername.cellphone,
                        lastEducation:
                            result.data.profileByUsername.lastEducation,
                        lastInstitution:
                            result.data.profileByUsername.lastInstitution,
                    };
                    alert("Busqueda Exitosa!");
                    this.loaded = true;
                })
                .catch((error) => {
                    alert("Error al buscar");
                });
        },
    },
};
</script>



<style>
.perfil {
    margin-top: 10px;
}

.buscador {
    width: 75%;
    height: 35px;
    margin-top: 40px;
    margin-left: 170px;
    border-radius: 20px;
    border: 1px solid black;
    padding-left: 17px;
}

.titulo-buscador {
    text-align: center;
    margin-top: 20px;
}

.boton-busqueda {
    text-align: center;
    font-size: 27px;
    width: 100px;
    height: 45px;
    display: flex;
    margin-left: 700px;
    margin-top: 20px;
    border-radius: 10px;
    border: 1px solid black;
}

.information {
    text-align: center;
    margin-top: 20px;
}

.titulo-buscador2 {
    margin-top: 20px;
}

.titulo-buscador1 {
    margin-bottom: 40px;
    margin-left: 40px;
}

.container-buscador {
    margin-top: 30px;
    margin-left: 400px;
    border: 1px solid black;
    width: 700px;
    height: 500px;
    border-radius: 10px;
}
</style>