import { gql } from 'apollo-boost';

const loginUserQuery = gql`
    query LoginUser($email: String!, $password: String!, $idToken) {
        loginUserQuery(email: $email, password: $password, idToken: $idToken) {
            token
            status
        }
    }
`;

const getProfileQuery = gql`
    query GetProfile {
        getProfileQuery {
            name
            status
        }
    }
`;

const createUserMutation = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!, $idToken) {
        createUserMutation(name: $name, email: $email, password: $password, idToken: $idToken) {
            token
            status
        }
    }
`;

const deleteUserMutation = gql`
    mutation DeleteUser {
        deleteUserMutation {
            status
        }
    }
`;

const updatePasswordMutation = gql`
    mutation UpdatePassword($password: String!) {
        updatePassword(password: $password) {
            status
        }
    }
`;


export { loginUserQuery, createUserMutation, deleteUserMutation,
        updatePasswordMutation, getProfileQuery };