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
mutation Register (
    $name: String!,
    $email : String!, 
    $password : String!) {
    register(
        name: $name,
        email: $email, 
        password: $password)
        {
            _id
            email
        }
}`

export const IOT = gql`
mutation iot(
    $path : String! ) {
 iot (
     path :$path
     ) 
    {
        path
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
            title
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
            title
            path
            description
            type
            createdAt
            color
            coordinate
            userID{
                name
            }
        }
    }
    `;