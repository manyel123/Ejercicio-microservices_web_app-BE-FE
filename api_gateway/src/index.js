const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const AuthAPI = require('./dataSources/auth_api');
const BoardAPI = require('./dataSources/board_api');
const MessagesAPI = require('./dataSources/messages_api');
const ProfileAPI = require('./dataSources/profile_api');
const authentication = require('./utils/authentication');

const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        authAPI: new AuthAPI(),
        boardAPI: new BoardAPI(),
        messagesAPI: new MessagesAPI(),
        profileAPI: new ProfileAPI(),
    }),
    introspection: true,
    playground: true
});
server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});