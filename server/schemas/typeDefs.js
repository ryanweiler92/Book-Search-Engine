const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID
    authors: String
    description: String
    title: String
}

type Query {
    users: [User]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): User
}

type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs