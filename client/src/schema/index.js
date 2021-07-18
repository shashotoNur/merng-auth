import { gql } from 'apollo-boost';

const loginUserQuery = gql`
    query loginUserQuery($email: String!, $password: String!, $idToken: Object!) {
        token
        status
    }
`;

const getProfileQuery = gql`
    query getProfileQuery {
        name
        status
    }
`;

const createUserMutation = gql`
    mutation createUserMutation($name: String!, $email: String!, $password: String!, $idToken: Object!) {
        token
        status
    }
`;

const deleteUserMutation = gql`
    mutation deleteUserMutation {
        status
    }
`;

const updatePasswordMutation = gql`
    mutation UpdatePassword($password: String!) {
        status
    }
`;


export { loginUserQuery, createUserMutation, deleteUserMutation,
        updatePasswordMutation, getProfileQuery };