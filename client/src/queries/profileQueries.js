import { gql } from 'apollo-boost';

const getProfileQuery = gql`
    {
        getProfileQuery {
            name
            status
        }
    }
`;

const deleteUserMutation = gql`
    mutation DeleteUserMutation {
        deleteUserMutation {
            status
        }
    }
`;

const updatePasswordMutation = gql`
    mutation UpdatePasswordMutation($password: String!) {
        updatePasswordMutation(password: $password) {
            status
        }
    }
`;

export { getProfileQuery, deleteUserMutation, updatePasswordMutation };