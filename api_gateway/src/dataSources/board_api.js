const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class BoardAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.board_api_url;
    }

    async createBoard(board){
        board = new Object(JSON.parse(JSON.stringify(board)));
        return await this.post('/board/newpublication', board)
    }

    async publicationsByUsername(username){
        return await this.get(`/board/${username}`);
    }

    async allPublications(){
        return await this.get('/board/all');
    }
}

module.exports = BoardAPI; 