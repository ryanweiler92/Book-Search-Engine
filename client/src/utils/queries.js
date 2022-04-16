import { gql } from '@apollo/client';


export const GET_ME = gql`
query me {
    me{
      username
    email
    _id
    bookCount
    savedBooks{
      title
    bookId
    authors
    description
    image
    link
    }
    }
  }
`;


// export const QUERY_ME = gql`
// query me($_id: ID!) {
//     me(id: $_id){
//         username
//         email
//         bookCount
//     }
// }
// `;

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
    }
}
`