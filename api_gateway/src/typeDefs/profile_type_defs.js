const { gql } = require('apollo-server');

const profileTypeDefs = gql `
    type Profile{
        username: String!
        gender:  String!
        birthDate: String!
        cellphone: Int!
        lastEducation: String!
        lastInstitution: String!
    }

    input CompleteProfileInput{
        username: String!
        gender:  String!
        birthDate: String!
        cellphone: Int!
        lastEducation: String!
        lastInstitution: String!
    }

    extend type Mutation {
        signUpCompleteProfile(profile: CompleteProfileInput!): Profile
    }

    extend type Query {
        profileByUsername(username: String!): Profile
        allProfiles: [Profile]
    }
`;
//Por definir funcion getAllProfiles
module.exports = profileTypeDefs;