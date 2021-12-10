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
        </div>
    </div>

    <div class="inicio-cuenta">
        <div class="circulo-cuenta">
            <div class="imagen-cuenta">
                <div class="foto-cuenta"><i class="fa fa-user"></i></div>
            </div>
        </div>
        <div class="text-cuenta">
            <h2></h2>
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
        <div class="perfil-modiicaciones">
            <form v-on:submit.prevent="processProfileSignUp">
                <div class="modificador">
                    <h4 class="titulo4">Username:</h4>
                    <input
                        disabled
                        type="text"
                        name="Usuario"
                        v-model="profile.username"
                        class="input-modiicacione"
                    />
                    <h4 class="titulo4">Género:</h4>
                    <input
                        type="text"
                        v-model="profile.gender"
                        placeholder="Género"
                        class="input-modiicacione"
                    />
                    <h4 class="titulo4">Fecha de nacimiento:</h4>
                    <input
                        type="text"
                        name=""
                        id=""
                        class="input-modiicacione"
                        v-model="profile.birthDate"
                    />
                    <br />
                </div>

                <div class="">
                    <input
                        type="number"
                        v-model="profile.cellphone"
                        name=""
                        id=""
                        placeholder="Numero Celular"
                        class="input-modiicacione input-flex"
                    />
                    <br />
                    <input
                        type="text"
                        v-model="profile.lastEducation"
                        name=""
                        id=""
                        placeholder="Ultima educacion"
                        class="input-modiicacione input-flex"
                    />
                    <br />
                    <input
                        type="text"
                        v-model="profile.lastInstitution"
                        name=""
                        id=""
                        placeholder="Ultima institución"
                        class="input-modiicacione input-flex"
                    />
                    <br />
                </div>
                <button type="submit" class="boton-cuenta">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: "profileSignUp",

    data: function () {
        return {
            profile: {
                username: localStorage.getItem("username") || "none",
                gender: "",
                birthDate: "",
                cellphone: null,
                lastEducation: "",
                lastInstitution: "",
            },
        };
    },

    methods: {
        processProfileSignUp: async function () {
            await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation SignUpCompleteProfile(
                            $profile: CompleteProfileInput!
                        ) {
                            signUpCompleteProfile(profile: $profile) {
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
                        profile: this.profile,
                    },
                })
                .then(() => {
                    alert("Registro exitoso.");
                    this.$router.push({ name: "Home" });
                })
                .catch((error) => {
                    alert("ERROR: Fallo en el registro del perfil.");
                });
        },
    },
};
</script>

<style>
.perfil-modiicaciones {
    margin-top: 20px;
    font-size: 20px;
    margin-left: 25px;
}

.input-modiicacione {
    font-size: 25px;
    border-radius: 10px;
    margin-left: 20px;
    width: 20%;
    margin-bottom: 30px;
    border: 1px solid black;
    margin-right: 10px;
}

.titulo4 {
    margin-bottom: 10px;
    font-size: 22px;
    margin-top: 10px;
    margin-left: 20px;
}

.modificador {
    display: flex;
}

.input-flex {
    width: 30%;
    padding: 3px;
}

.boton-cuenta {
    margin-left: 20px;
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
</style>