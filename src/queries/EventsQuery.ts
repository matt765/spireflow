import { gql } from "@apollo/client";

export const EVENTS_QUERY = gql`
  query GetEvents {
    events {
      eventId
      title     
    }
  }
`;
