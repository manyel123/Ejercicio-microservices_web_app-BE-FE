const { gql } = require('apollo-server');

const boardTypeDefs = gql `
    type Board {
        id: String!
        username: String!
        publication: String!
        pubDate: String!
    }

    input BoardInput {
        username: String!
        publication: String!
    }

    extend type Query {
        publicationsByUsername(username: String!): [Board]
        allPublications: [Board]
    }
    
    extend type Mutation {
        createBoard(publication: BoardInput!): Board
    }
`;

module.exports = boardTypeDefs;