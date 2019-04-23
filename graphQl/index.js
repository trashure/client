import gql from "graphql-tag"

export const login = gql`
mutation Login (
    $email : String!, 
    $password : String!) {
    login(
        email: $email, 
        password: $password)
        {
            token
        }
}`

export const register = gql` 
mutation {
    register(
        name:"batman", 
        email: "batman@gmail.com", 
        password:"1234567ASDq@!") 
    {
        name
        email
    }
}`

export const createTrash = gql`
mutation createTrash(
    $token : String!, 
    $path : String!, 
    $coordinate : String!, 
    $description : String!, 
    $createdAt : String!, 
    $title:String! ) {
 createTrash (
     token : $token, 
     path :$path, 
     coordinate :$coordinate, 
     description :$description, 
     createdAt : $createdAt, 
     title : $title 
     ) 
    {
        path
        description
    }
}`

export const getGarbages = gql`
query garbages($token: String!){
        garbages(token: $token) {
            _id
            path
            description
            type
            createdAt
            coordinate
            color
            userID{
                name
            }
        }
    }
    `;

export const getCollections = gql`
query collections($token: String!){
    collections(token: $token) {
            _id
            path
            description
            type
            createdAt
            coordinate
            userID{
                name
            }
        }
    }
    `;