import { gql, useQuery } from "@apollo/client";

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



export function useGetAllProductClicks() {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCT_CLICKS);
  return { data, loading, error };
}
export const GET_BANNER_BY_ID = gql`
    query GetBannerById($bannerId: String!) {
        getBannerById(_id: $bannerId) {
            id 
            image {
                alt 
                url
            } 
            text 
            _id 
            createdAt 
            author 
            category 
            rating 
            sale 
            productID
        }
    }
`;

// GraphQL Query: GetAllProductClicks
export const GET_ALL_PRODUCT_CLICKS = gql`
    query GetAllProductClicks {
        getAllProductClicks {
            _id
            banner_id
            clicks {
                date
                count
            }
        }
    }
`;