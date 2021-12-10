<template>
    <div class="searchProfile">
        <div class="container_searchProfile">
            <h2>Busqueda de usuarios</h2>
            <form v-on:submit.prevent="searchProcess">
                <input type="text" v-model="user" placeholder="Usuario" />
                <br />
                <button type="submit">Buscar</button>
            </form>
            <div v-if="loaded" class="info">
                <h1>Perfil</h1>
                <h2>
                    Usuario: <span>{{ userProfile.username }}</span>
                </h2>
                <h2>
                    Género: <span>{{ userProfile.gender }}</span>
                </h2>
                <h2>
                    Fecha de nacimiento:
                    <span>{{ userProfile.birthDate.substring(0, 10) }}</span>
                </h2>
                <h2>
                    Teléfono: <span>{{ userProfile.cellphone }}</span>
                </h2>
                <h2>
                    Escolaridad: <span>{{ userProfile.lastEducation }}</span>
                </h2>
                <h2>
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
.searchProfile {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container_searchProfile {
    border: 5px solid #2d649e;
    border-radius: 10px;
    width: 60%;
    height: 98%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.info {
    border: 3px solid rgb(0, 0, 0);
    border-radius: 10px;
    width: 90%;
    height: 90%;
    text-indent: 20px;
    display: grid;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    overflow: scroll;
    white-space: nowrap;
}
.searchProfile form {
    width: 80%;
}
.searchProfile input {
    height: 26px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid #2d649e;
}
.searchProfile button {
    width: 100%;
    height: 35px;
    color: #e5e7e9;
    background: #0e233a;
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
}
.searchProfile button:hover {
    color: #e5e7e9;
    background: crimson;
    border: 1px solid #283747;
    cursor: pointer;
}
.info span {
    color: crimson;
}
</style>