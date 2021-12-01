const profileResolver = {
    Query: {
        profileByUsername: async(_, {username}, { dataSources }) => {
            return dataSources.profileAPI.profileByUsername(username)
        },
        allProfiles: async(_, {}, { dataSources }) => {
                return dataSources.profileAPI.allProfiles()
        }
    },
    Mutation: {
        signUpCompleteProfile: async(_, {profile}, { dataSources, userIdToken }) => {
            usernameToken =  (await dataSources.authAPI.getUser(userIdToken)).username
            if (profile.username == usernameToken)              
                return dataSources.profileAPI.signUpCompleteProfile(profile)
            else
                return null
        }
    }
};

module.exports = profileResolver;