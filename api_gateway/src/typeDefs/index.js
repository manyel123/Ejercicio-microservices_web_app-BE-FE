const authTypeDefs = require('./auth_type_defs');
const boardTypeDefs = require('./board_type_defs');
const messagesTypeDefs = require('./messages_type_defs');
const profileTypeDefs = require('./profile_type_defs');

const schemaArrays = [authTypeDefs, boardTypeDefs, messagesTypeDefs, profileTypeDefs];

module.exports = schemaArrays;