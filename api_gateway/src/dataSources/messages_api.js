const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class MessagesAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.messages_api_url;
    }

    async createMessage(message){
        message = new Object(JSON.parse(JSON.stringify(message)));
        return await this.post('/messages', message)
    }

    async sentMessagesByUsername(username){
        return await this.get(`/messages/sent/${username}`);
    }

    async receivedMessagesByUsername(username){
        return await this.get(`/messages/received/${username}`);
    }

}

module.exports = MessagesAPI;