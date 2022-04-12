const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({})
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            
          
            return { user };
        }
    }

}

module.exports = resolvers