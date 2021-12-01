const authResolver = require('./auth_resolver');
const boardResolver = require('./board_resolver');
const messagesResolver = require('./messages_resolver');
const profileResolver = require('./profile_resolver');

const lodash = require('lodash');

const resolvers = lodash.merge(authResolver, boardResolver, messagesResolver, profileResolver);

module.exports = resolvers;