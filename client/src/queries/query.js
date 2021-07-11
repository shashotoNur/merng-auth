import { gql } from 'apollo-boost';

const loginUserQuery = gql`
    {
        user {
            name
            level
            id
            projects {
                id
            }
        }
    }
`;

const createUserMutation = gql`
        mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
            addBook(name: $name, genre: $genre, authorId: $authorId){
                    name
                    id
                }
            }
        }
`;


const deleteUserMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;


export { loginUserQuery, createUserMutation, deleteUserMutation };