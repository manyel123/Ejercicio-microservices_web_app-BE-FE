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
    <div class="rectangulo-mensaje">
        <div class="chat-mensaje">
            <div class="chat-recipiente">
                <h1 class="titulo-mensaje">Mensajes</h1>
                <router-link to="/Chat/Recibidos" class="texto-mensaje"
                    ><i class="fa fa-users"></i>Recibidos</router-link
                >
                <router-link to="/Chat/Enviados" class="texto-mensaje"
                    ><i class="fa fa-users"></i>Enviados</router-link
                >
                <router-link to="/Chat/Enviar" class="texto-mensaje"
                    ><i class="fa fa-users"></i>Enviar</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Chat",

    data: function () {
        return {
            is_auth: true,
        };
    },
};
</script>

<style>
.rectangulo-mensaje {
    border: 1px solid black;
    width: 94%;
    height: 580px;
    background: white;
    margin: 50px;
    display: flex;
}

.chat-mensaje {
    display: flex;
    border-right: 1px solid black;
    width: 35%;
    background: linear-gradient(
        to right,
        rgba(40, 126, 255, 0.7),
        rgba(18, 247, 255, 0.7)
    );
}

.texto-mensaje {
    display: flex;
    margin-left: 50px;
    text-decoration: none;
    font-size: 40px;
    color: black;
    margin-bottom: 40px;
}

.titulo-mensaje {
    margin-bottom: 60px;
    text-align: center;
    font-size: 45px;
}

.fa-users::before {
    margin-right: 40px;
    margin-top: 10px;
    font-size: 50px;
}
</style>