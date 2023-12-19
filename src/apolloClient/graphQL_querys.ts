import { gql } from "@apollo/client";

export const FETCH_BANNERS = gql`
  query getAllBanners {
    getAllBanners {
      _id
      sale
      author
      category
      createdAt
      id
      image {
        alt
        url
      }
      productID
      rating
      text
    }
  }

`;

export const DELETE_USER = gql`
  mutation deleteUser($id: string!) {
    deleteUser(id: $id)
  }

`;

export const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($id: ID!, $updatedUserData: UserInput!) {
  updateUserById(id: $id, updatedUserData: $updatedUserData) {
    id
   
  }
}
`


export const GET_PRODUCT_CLICKS_BY_ID = gql`
  query GetProductClicksById($id: ID!) {
    getProductClicksById(id: $id) {
      clicks {
        date
        count
      }
    }
  }
`;
