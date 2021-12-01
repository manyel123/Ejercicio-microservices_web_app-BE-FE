const boardResolver = {
    Query: {
        publicationsByUsername: async(_, {username}, { dataSources }) => {
            return dataSources.boardAPI.publicationsByUsername(username)
        },
        allPublications: async(_, {}, { dataSources }) => {
            return dataSources.boardAPI.allPublications()
        }
    },
    Mutation: {
        createBoard: async(_, {publication}, { dataSources, userIdToken }) => {
            usernameToken =  (await dataSources.authAPI.getUser(userIdToken)).username
            if (publication.username == usernameToken)              
                return dataSources.boardAPI.createBoard(publication)
            else
                return null
        }
    }
};

module.exports = boardResolver;