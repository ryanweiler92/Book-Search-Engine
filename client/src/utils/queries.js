import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me($_id: ID!) {
    me(id: $_id){
        username
        email
        bookCount
    }
}
`;