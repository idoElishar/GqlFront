import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
const BASE_URI = import.meta.env.VITE_GRAPHQL_SERVER || "http://localhost:4000/graphql";
const httpLink = createHttpLink({
  uri: BASE_URI,
});
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token") || "no_access_token";
  operation.setContext({
    headers: {
      access_token: token ,
    },
  });
  return forward(operation);
});
export const client = new ApolloClient({
  link: authMiddleware.concat(httpLink), 
  cache: new InMemoryCache(),
});
export default client;