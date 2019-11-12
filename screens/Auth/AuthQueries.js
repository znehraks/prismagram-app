import {gql} from "apollo-boost";

export const LOG_IN = gql`
    mutation login(
        $email: String!
        $password: String!
        )
        {
            login(
                email: $email
                password: $password 
            )
        }
`;

export const CREATE_ACCOUNT = gql`
    mutation createAccount(
        $userName: String!
        $email: String!
        $password: String!
        $firstName: String
        $lastName: String
    ){
        createAccount(
        userName: $userName
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        )
    }
`;


