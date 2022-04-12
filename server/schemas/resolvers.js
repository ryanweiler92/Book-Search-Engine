const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { _id }) => {
            return await User.findOne({ _id })
            //still gotta add context.user or whatever and authentication error
        },
        
        users: async () => {
            return await User.find({})
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            
            //when you figure out auth and tokens
            // const token = signToken(user);
            // return { token, user };
          
            return { user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            return user;
        }
    }

}

module.exports = resolvers