<template>
    <div id="Publications">
        <div class="container">
            <h1>Publicaciones de usuarios RedTic</h1>
            <div class="container-table">
                <table>
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
#Publications {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#Publications .container {
    border: 3px solid #2d649e;
    border-radius: 10px;
    width: 60%;
    height: 90%;
    display: grid;
    text-indent: 25px;
    overflow: scroll;
}
#Publications h2 {
    color: #163b63;
}
#Publications h1 {
    color: #112131;
}
#Publications .container-table {
    width: 100%;
    display: center;
}

#Publications table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid rgba (0, 0, 0, 0.3);
}

#Publications table td,
#Publications table th {
    border: 1px solid #ddd;
    padding: 8px;
}

#Publications table tr:nth-child(even) {
    background-color: #f2f2f2;
}

#Publications table tr:hover {
    background-color: #ddd;
}

#Publications table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: rgb(179, 127, 199);
    color: white;
}

#Publications .container span {
    color: rgb(182, 17, 100);
    font-weight: bold;
}
</style>