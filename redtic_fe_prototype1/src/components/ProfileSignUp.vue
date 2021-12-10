<template>
    <div class="profileSignUp_profile">
        <div class="container_profileSignUp_profile">
            <h2>
                Completa tu perfil <span>{{ profile.username }}</span>
            </h2>

            <form v-on:submit.prevent="processProfileSignUp">
                <input
                    disabled
                    type="text"
                    name="Usuario"
                    v-model="profile.username"
                />
                <br />

                <input
                    type="text"
                    required
                    v-model="profile.gender"
                    placeholder="Género"
                />
                <br />

                <input
                    type="text"
                    required
                    v-model="profile.birthDate"
                    placeholder="Fecha de nacimiento"
                />
                <br />

                <input
                    type="number"
                    required
                    v-model="profile.cellphone"
                    placeholder="Teléfono"
                />
                <br />

                <input
                    type="text"
                    required
                    v-model="profile.lastEducation"
                    placeholder="Escolaridad"
                />
                <br />

                <input
                    type="text"
                    required
                    v-model="profile.lastInstitution"
                    placeholder="Institución Educativa"
                />
                <br />

                <button type="submit">Completar Perfil</button>
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
                    this.$router.push({ name: "home" });
                })
                .catch((error) => {
                    alert("ERROR: Fallo en el registro del perfil.");
                });
        },
    },
};
</script>




<style>
.profileSignUp_profile {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container_profileSignUp_profile {
    border: 3px solid #2d649e;
    border-radius: 10px;
    width: 95%;
    height: 98%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.profileSignUp_profile h2 {
    color: #2d649e;
}
.profileSignUp_profile form {
    width: 80%;
}
.profileSignUp_profile input {
    height: 26px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid #2d649e;
}
.profileSignUp_profile button {
    width: 100%;
    height: 40px;
    color: #e5e7e9;
    background: #2d649e;
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
}
.profileSignUp_profile button:hover {
    color: #e5e7e9;
    background: rgb(23, 116, 54);
    border: 1px solid #283747;
    cursor: pointer;
}
</style>