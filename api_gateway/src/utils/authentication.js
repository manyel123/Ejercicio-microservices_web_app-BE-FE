const { ApolloError } = require('apollo-server');
const serverConfig = require('../server');
const fetch = require('node-fetch');

//Se define la función de autenticación, que recibe una petición como parametro(req)
const authentication = async ({ req }) => {
    //Se asigna el token que viene en el headers o se deja null en caso de que no
    const token = req.headers.authorization || '';

    //Se valida si el token está vacio
    if (token == '')
        return { userIdToken: null }

    //Si token no está vacio se hace la verificación del token
    else {
        try {
            let requestOptions = {
                method: 'POST', headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }), redirect: 'follow'
            };

            //Verifica el token en la url
            let response = await fetch(
                `${serverConfig.auth_api_url}/verifyToken/`,
                requestOptions)

            //Si el token es inválido(resp != 200) se lanza un error 
            if (response.status != 200) {
                console.log(response)
                throw new ApolloError(`SESION INACTIVA - ${401}` + response.status, 401)
            }

            //Si el token es válido se retorna el Id del usuario
            return { userIdToken: (await response.json()).UserId };
        }
        catch (error) {
            throw new ApolloError(`TOKEN ERROR: ${500}: ${error}`, 500);
        }
    }
}

//Se exporta el modulo de autenticación
module.exports = authentication;