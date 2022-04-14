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
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
}

type Query {
    me(_id: ID!): User
    users: [User]
    user(username: String!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID, description: String, title: String, image: String, link: String): Auth
}

type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs