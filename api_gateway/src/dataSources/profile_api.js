const { RESTDataSource } = require('apollo-datasource-rest');

const serverConfig = require('../server');

class ProfileAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.profile_api_url;
    }

    async signUpCompleteProfile(profile){
        profile = new Object(JSON.parse(JSON.stringify(profile)));
        return await this.post('/profiles', profile)
    }

    async profileByUsername(username){
        return await this.get(`/profiles/${username}`);
    }

    async allProfiles(){
        return await this.get('/profiles/all');
    }
}

module.exports = ProfileAPI;