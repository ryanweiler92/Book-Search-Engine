const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user){
            const userData = User.findOne({ _id: context.user._id })
            .select('-__v -password');

            return userData
            }
            throw new AuthenticationError('Not logged in!')
        },
        
        users: async () => {
            return await User.find({})
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
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
            const token = signToken(user);
            return { token, user};
        },
        saveBook: async (parent, {bookId, description, title, image, link}, context) => {
            if (context.user) {

                const updatedUser = await User
                .findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {savedBooks: { bookId, description, title, image, link}  } },
                    { new: true }
                );

                return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    }

}

module.exports = resolvers