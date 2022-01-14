import {gql} from '@apollo/client'

// Apollo Query
export const GET_DETAILS = gql`
  query getDetails($id: ID!) {
    product(id: $id) {
      variants {
        qty
      }
    }
  }
`
