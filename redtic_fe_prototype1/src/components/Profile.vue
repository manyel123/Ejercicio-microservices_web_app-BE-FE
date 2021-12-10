<template>
    <div id="Perfil">
        <div class="container">
            <h1>Tu Perfil en RedTic</h1>
            <h2>
                Usuario: <span>{{ profileByUsername.username }}</span>
            </h2>
            <h2>
                Género: <span>{{ profileByUsername.gender }}</span>
            </h2>
            <h2>
                Fecha de nacimiento: <span>{{ profileByUsername.birthDate.substring(0, 10) }}</span>
            </h2>
            <h2>
                Teléfono: <span>{{ profileByUsername.cellphone }}</span>
            </h2>
            <h2>
                Escolaridad: <span>{{ profileByUsername.lastEducation }}</span>
            </h2>
            <h2>
                Institución Educativa: <span>{{ profileByUsername.lastInstitution }}</span>
            </h2>
            <h2>
                Tus publicaciones:
            </h2>
            <div class="container-table">
                <table>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Publicación</th>
                    </tr>

                    <tr
                        v-for="publication in publicationsByUsername"
                        :key="publication"
                    >
                        <td>{{ publication.pubDate.substring(0, 10) }}</td>
                        <td>{{ publication.pubDate.substring(11, 19) }}</td>
                        <td>{{ publication.publication }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>




<script>
import gql from "graphql-tag";

export default {
    name: "Profile",

    data: function () {
        return {
            username: localStorage.getItem("username"),
            publicationsByUsername: [], 
            profileByUsername: {
                username: "",
                gender: "",
                birthDate: "",
                cellphone: "",
                lastEducation: "",
                lastInstitution: "",
            },        
        };
    },

    apollo: {
        profileByUsername: {
            query: gql`
                query($username: String!) {
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
                query($username: String!) {
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
        this.$apollo.queries.publicationsByUsername.refetch();
        this.$apollo.queries.profileByUsername.refetch();
    },
};
</script>





<style>
#Perfil {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#Perfil .container {
    border: 3px solid #2d649e;
    border-radius: 10px;
    width: 60%;
    height: 90%;
    display: grid;
    text-indent: 25px;
    overflow: scroll;
}
#Perfil h2 {
    color: #163b63;
}
#Perfil h1 {
    color: #112131;
}
#Perfil .container-table {
    width: 100%;
    display: center;
}

#Perfil table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid rgba (0, 0, 0, 0.3);
}

#Perfil table td,
#Perfil table th {
    border: 1px solid #ddd;
    padding: 8px;
}

#Perfil table tr:nth-child(even) {
    background-color: #f2f2f2;
}

#Perfil table tr:hover {
    background-color: #ddd;
}

#Perfil table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: rgb(179, 127, 199);
    color: white;
}

#Perfil .container span {
    color: rgb(182, 17, 100);
    font-weight: bold;
}
</style>