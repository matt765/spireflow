import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL }),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

client.defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "cache-first",
    errorPolicy: "all",
  },
};
