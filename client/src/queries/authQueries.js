import { gql } from 'apollo-boost';

const loginUserQuery = gql`
    query LoginUserQuery($email: String, $password: String, $tokenId: String){
        loginUserQuery(email: $email, password: $password, tokenId: $tokenId) {
            token
            status
        }
    }
`;

const createUserMutation = gql`
    mutation CreateUserMutation($name: String, $email: String, $password: String, $tokenId: String) {
        createUserMutation(name: $name, email: $email, password: $password, tokenId: $tokenId) {
            token
            status
        }
    }
`;


export { loginUserQuery, createUserMutation };